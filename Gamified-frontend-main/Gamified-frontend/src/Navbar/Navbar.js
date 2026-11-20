import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as image from '../Images';
import './Navbar.css';
import { useSearchContext } from './SearchContext';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;
    const [timeLeft, setTimeLeft] = useState(null);

    const [id, setId] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [specialistData, setSpecialistData] = useState(null);
    const [instructorData, setInstructorData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userRole, setUserRole] = useState('');
    const { setResults } = useSearchContext();

    useEffect(() => {
        try {
            const jwtToken = localStorage.getItem('jwt');
            if (jwtToken) {
                const decodedToken = jwtDecode(jwtToken);
                setId(decodedToken.userId);
                setUserRole(decodedToken.role);
            }
        } catch {
            console.log('error token');
        }
    }, [id]);

    // Sign Up Callback
    async function handleCallbackResponseSignUp(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        // Extracting email domain
        const emailDomain = userObject.email.split('@')[1];

        // Check if the email domain contains "univ" and ends with ".dz"
        // if (emailDomain.includes('univ') && emailDomain.endsWith('.dz')) {
        if (emailDomain.includes('univ') && emailDomain.endsWith('.dz')) {
            try {
                console.log("hy");
                // Check if the email is already signed up
                const check = await axios.get(`http://localhost:8080/auth/checkemail/${userObject.email}`);
                if (check.data === true) {
                    alert('This email is already registered. Please sign in instead.');
                } else {
                    localStorage.setItem('account', response.credential);
                    localStorage.setItem('gmailaccount', userObject.email);
                    navigate('/Signup');
                }
            } catch (error) {
                console.error('Error checking email:', error);
                alert('An error occurred while checking email. Please try again later.');
            }
        } else {
            alert('You can create an account only using a professional email address.');
        }
    }

    // Sign In Callback
    async function handleCallbackResponseSignin(response) {
        var userObject = jwtDecode(response.credential);
        try {
            const response = await axios.post('http://localhost:8080/auth/signin', {
                username: userObject.email,
                password: userObject.sub,
            });
            console.log(response.data);

            let role = '';
            if (response && response.data) {
                role = response.data.role;
                const { token } = response.data;
                localStorage.setItem('jwt', token);
                localStorage.setItem('studentId', response.data.id);
            }
            if (role === 'STUDENT') {
                await axios.put(`http://localhost:8080/challengestate/updatedaily/${response.data.id}/13`);
                console.log(response.data);
                navigate('/StudentDashboard');
            } else if (role === 'INSTRUCTOR') {
                navigate('/InstructorDashboard');
            } else if (role === 'SPECIALIST') {
                navigate('/SpecialistDashboard');
            } else {
                alert('this account is not logged up');
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    }

    // Initialize Google Sign-In and Sign-Up buttons
    useEffect(() => {
        if (pathname === '/HomeP') {
            /* global google */
            google.accounts.id.initialize({
                client_id: "702160208350-ovofpka58k606scaljajv7qvhhtfsbm5.apps.googleusercontent.com",
                callback: handleCallbackResponseSignUp
            });
            google.accounts.id.renderButton(
                document.getElementById("singUpDiv"),
                {
                    theme: "outline",
                    size: "medium",
                }
            );

            google.accounts.id.initialize({
                client_id: "702160208350-ovofpka58k606scaljajv7qvhhtfsbm5.apps.googleusercontent.com",
                callback: handleCallbackResponseSignin
            });
            google.accounts.id.renderButton(
                document.getElementById("singInDiv"),
                {
                    theme: "outline",
                    size: "medium",
                }
            );
        }
    }, [pathname]);

    /* SEARCH COURSES */
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/course/search/${searchTerm}`);
            setResults(response.data);

            setSearchTerm('');
            // Vérifiez le rôle de l'utilisateur pour naviguer vers la bonne page de cours
            if (userRole === 'STUDENT') {
                navigate('/AllCourses');
            } else if (userRole === 'SPECIALIST') {
                navigate(`/AllCoursesSpecialist/${id}`);
            } else {
                navigate('/AllCourses');
                console.log('Guest user performing search');
            }
        } catch (error) {
            console.error('Error searching courses:', error);
        }
    };

    /* TIME LEFT */
    useEffect(() => {
        if (id) {
            fetchTimeLeft();
        }
    }, [id]);

    useEffect(() => {
        let timerInterval;
        if (timeLeft !== null) {
            timerInterval = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft > 1000) {
                        return prevTimeLeft - 1000;
                    } else {
                        clearInterval(timerInterval);
                        fetchTimeLeft(); // Check for next decrement
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [timeLeft]);

    const loadUserId = async () => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            try {
                const decodedToken = jwtDecode(jwtToken);
                console.log(decodedToken);
                setId(decodedToken.id);
            } catch (error) {
                console.error('Invalid or expired token:', error);
                localStorage.removeItem('jwt');
            }
        }
    };

    const fetchTimeLeft = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/student/hearts/time-left/${id}`);
            const timeLeftFromServer = response.data;
            console.log("------------------");
            console.log(timeLeftFromServer);
            setTimeLeft(timeLeftFromServer);
        } catch (error) {
            console.error('Error fetching time left:', error);
        }
    };
    const formatTime = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        if (id) {
            const jwtToken = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            };

            const fetchStudentData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/student/${id}`);
                    setStudentData(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des données de l\'étudiant:', error);
                }
            };

            const fetchSpecialistData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/specialist/${id}`);
                    setSpecialistData(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des données du spécialiste:', error);
                }
            };

            const fetchInstructorData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/instructor/${id}`);
                    setInstructorData(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des données de l\'instructeur:', error);
                }
            };

            fetchStudentData();
            fetchSpecialistData();
            fetchInstructorData();
        }
    }, [id]);

    let navbarContent;
    let studentContent;

    switch (pathname) {
        case '/StudentDashboard':
        case '/Store':
        case '/Leaderboard':
        case '/CourseLeaderboard':
        case '/AddReviewForm':
        case '/EditReviewForm':
        case '/ChatPage':
        case '/Achievements':
            if (!studentData) {
                return <div>Loading student data...</div>;
            }
            studentContent = (
                <div className="main-div">
                    <div className="div1">
                        <img src={image.heart} alt="Icône" className='icon' />
                        <div>{studentData.hearts}</div>
                        {timeLeft !== null && timeLeft > 0 && (
                            <div style={{ paddingLeft: '15px' }}>
                                <div>{formatTime(timeLeft)}</div>
                                <div>Time left for heart recovery</div>
                            </div>
                        )}
                    </div>
                    <div className="main-div">
                        <div>{studentData.coins}</div>
                        <img src={image.currency} alt="Icône" className='icon' />
                    </div>
                </div>
            );
            navbarContent = (
                <div className="main-div">
                    <img src={studentData.image} alt="User Icon" className='icon' />
                    <div><a className="logo-link">{studentData.firstname} {studentData.lastname}</a></div>
                </div>
            );
            break;

        case '/SpecialistDashboard':
            if (!specialistData) {
                return <div>Loading specialist data...</div>;
            }
            navbarContent = (
                <div className="main-div">
                    <img src={image.profile} alt="User Icon" className='icon' />
                    <div><a className="logo-link">{specialistData.firstname} {specialistData.lastname}</a></div>
                </div>
            );
            break;

        case '/InstructorDashboard':
        case '/MycoursesI':
        case '/AllCoursesI':
        case '/InstructorProfile':
            if (!instructorData) {
                return <div>Loading instructor data...</div>;
            }
            navbarContent = (
                <div className="main-div">
                    <img src={instructorData.image} alt="User Icon" className='icon' />
                    <div><a className="logo-link">{instructorData.firstname} {instructorData.lastname}</a></div>
                </div>
            );
            break;

        case '/HomeP':
            navbarContent = (
                <div className="main-div">
                    <div style={{ marginRight: "10px" }}>SingUp:</div><div id="singUpDiv"></div>
                    <div style={{ marginRight: "10px", marginLeft: "10px" }}>SingIn:</div><div id="singInDiv"></div>
                </div>
            );
            break;
        // navbarContent = (

        // );
        // break;
        // <div className="main-div">
        //     <button className="signin" id='btnnav'>Sign In</button>
        //     <button className="signup" id='btnnav'> Sign Up</button>
        // </div>
        default:
            navbarContent = null;
            break;
    }

    return (
        <nav className="navbar-wrapper">
            <div className="navbar-inner">
                <div className="main-div">
                    <div className="logo-wrapper">
                        <a href="#" className="logo-link">
                            <img src={image.logo} alt="Logo" className="icon" />
                            CSQuest
                        </a>
                    </div>
                    <div>
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ marginRight: '10px' }}
                            />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                {studentContent}
                {navbarContent}
            </div>
        </nav>
    );
}

export default Navbar;
