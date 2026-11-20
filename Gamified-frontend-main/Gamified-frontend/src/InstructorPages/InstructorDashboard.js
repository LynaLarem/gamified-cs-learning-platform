import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import * as image from '../Images';
import AddedModal from '../Modal_Windows/AddedModal';
import './InstructorDashboard.css';
import SidebarComponent from './Sidebar';



const InstructorDashboard = () => {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [userId, setUserId] = useState('');
    const [showAddedModal, setShowAddedModal] = useState(false);
    const [addedModalTitle, setAddedModalTitle] = useState('');
    const [addedModalMessage, setAddedModalMessage] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleView = (course) => {
        navigate(`/CoursestatisticsI/${course.id}`);
    };
    const handleAdded = (course) => {
        setSelectedCourse(course);
        setAddedModalTitle('Do you want to remove this course from your taught courses?');
        setAddedModalMessage('By confirming, you will not be able to view statistics about this course until you add it again.');
        setShowAddedModal(true);
    };
    const handleConfirm = async (course) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await axios.delete(`http://localhost:8080/instructorcourse/${userId}/${course.id}`, config);
        setShowAddedModal(false);
        loadCourses();
    };
    const closeAddedModal = () => {
        setShowAddedModal(false);
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt');

        if (jwtToken) {
            try {
                const decodedToken = jwtDecode(jwtToken);
                setUserId(decodedToken.userId);
            } catch (error) {
                console.error('Invalid or expired token:', error);
                localStorage.removeItem('jwt');
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            loadCourses();
        }
    }, [userId]);

    const loadCourses = async () => {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
            headers: {
                ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await axios.get(`http://localhost:8080/course/instructor/${userId}`, config);
            setCourses(response.data);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };


    const getDifficultyIcon = (difficulty) => {
        switch (difficulty) {
            case 'beginner':
                return <img src={image.dif1} alt="Beginner Icon" style={styles.difficultyIcon} />;
            case 'intermediate':
                return <img src={image.dif2} alt="Intermediate Icon" style={styles.difficultyIcon} />;
            case 'advanced':
                return <img src={image.dif3} alt="Advanced Icon" style={styles.difficultyIcon} />;
            default:
                return null;
        }
    };
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SidebarComponent />
            <div style={styles.bg} className="contentContainer">
                <div>
                    <div style={styles.flex}>
                        <div className="welcomeContainer">
                            <h4 style={styles.title} className="mb-4">Welcome, Instructor!</h4>

                            <p style={styles.welcomeText}>Step into your personalized Instructor Dashboard,
                                your central hub for guiding and nurturing the learning journey of your students.
                                Here, you're not just a teacher, you're a mentor, a guide, and a facilitator of knowledge.
                                Handpick the subjects you teach, and delve into the intricacies of your students' progress.
                                From monitoring their performance to analyzing insightful statistics,
                                this dashboard empowers you to tailor your approach and foster an environment of growth
                                and achievement. Embrace the role of an instructor, where every interaction shapes minds
                                and sparks curiosity. Let's embark on this educational odyssey together, empowering students
                                and shaping futures along the way!</p>
                        </div>
                    </div>
                    <h3 style={{ marginLeft: '5px', PaddingBottom: '6px', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)' }}>
                        Your Courses</h3>
                    <div style={styles.flex}>
                        <div style={styles.sliderContainer}>
                            <Slider {...sliderSettings}>
                                {courses.map(course => (
                                    <div key={course.id}>
                                       <Card style={styles.courseCard}>

                                            <Card.Img variant="top" src={course.photo} style={styles.cardImage} />

                                            <Card.Body style={styles.cardContent}>

                                                <Card.Title style={{fontFamily: 'Orbitron", sans-serif', textAlign: 'center', color: 'white', fontSize: '30px', }}>
                                                    {course.name}</Card.Title>

                                                <Card.Text style={styles.cardText}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {getDifficultyIcon(course.difficulty)}
                                                        <span>{course.difficulty}</span>
                                                    </div>
                                                </Card.Text>
                                                <div className="card-buttons" style={styles.buttonContainer}>
                                                    <Button
                                                        onMouseEnter={(e) => Object.assign(e.target.style, styles.viewbtnHover)}
                                                        onMouseLeave={(e) => Object.assign(e.target.style, styles.viewbtn)}
                                                        onClick={() => handleView(course)} style={styles.viewbtn}>View Statistics</Button>

                                                    <Button className="btn btn-outline"
                                                        onMouseEnter={(e) => Object.assign(e.target.style, styles.addbtnHover)}
                                                        onMouseLeave={(e) => Object.assign(e.target.style, styles.addbtn)}
                                                        onClick={() => handleAdded(course)} style={styles.addbtn}>
                                                        Remove
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <AddedModal
                            show={showAddedModal}
                            onHide={closeAddedModal}
                            title={addedModalTitle}
                            message={addedModalMessage}
                            onConfirm={() => handleConfirm(selectedCourse)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {

    welcomeContainer: {
        color: '#ffffff',
        textShadow: '-2px 0 #721740, 0 2px #721740, 2px 0 #721740, 0 -2px #721740',
        // backgroundColor:'rgba(195, 177, 225)',
        // boxShadow: '5px 5px 5px rgba(195, 177, 225, 0.5)',
        padding: '0.5vw 1vw 0.5vw 1vw',
        //border: '1px solid black',
        borderRadius: '30px',
        marginBottom: '2vh',
        height: '20vh'
    },
    title: {
        color: '#fff',
        textAlign: 'center',
    },
    bg: {
        //backgroundImage: 'linear-gradient(to right bottom, #042142, #03224c, #092356, #15235f, #232167, #2e2171, #3a207a, #471d83, #551e91, #631d9f, #731bac, #8316b9)',
        paddingTop: '20px',
        flex: 1,
        color: 'white',
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
    },
    courseTitle: {
        color: 'white',
        marginLeft: '50px',
        marginTop: '50px',
    },
    sliderContainer: {
        width: 'calc(90vw - 250px)',
        padding: '20px',
    },
    ImageStyled: {
        width: '100%',
        height: '20px',
        objectFit: 'cover',
    },
    card: {
        backgroundColor: '#2e2171',
        color: 'white',
    },
    cardTitle: {
        color: '#ffffff',
    },
    // cardText: {
    //     color: '#dcdcdc',
    // },
    cardButtons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#551e91',
        borderColor: '#551e91',
        color: 'white',
    },
    title: {
        color: 'white',
        fontSize: '2em',
        textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: '1.1em',
    },



    courseCard: {
        borderRadius: '0%',
        textAlign: 'left',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '20px',
        maxWidth: '250px',
        height: '300px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',

        backgroundImage: 'linear-gradient(rgb(15, 152, 189), rgb(9, 6, 75))',
        boxShadow: 'rgb(77, 121, 164) 6px 4px 6px, rgb(33 90 123 / 66%) -6px -3px 5px, rgb(15, 149, 187) 0px 4px 5px, rgba(17, 26, 55, 0.44) 4px -3px 5px',
        backdropFilter: 'blur(4.9px)',
        WebkitBackdropFilter: 'blur(4.9px)',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 0px 15px 5px rgba(148, 0, 211, 0.9)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease',

        },
    },

    cardImage: {
        width: '100%',
        height: '50%',
        // marginTop: '8px',
        // margin: 'auto',
        objectFit: 'cover',
        display: 'block',
        padding: '5px',
        //  borderRadius : '20%',
        // border:  '5px solid violet',
    },

    ImageStyled: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },

    cardContent: {
        padding: '8px',
        color: '#fff',
    },

    difficultyIcon: {
        marginRight: '10px',
        width: '20px',
    },

    buttonContainer: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        display: 'flex',
        gap: '10px'
    },

    viewbtn: {
        padding: '3px 10px',
        fontSize: '14px',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        backgroundColor: '#ffffff',
        color: '#1babcb',
        border: '2px solid #1babcb',
        transform: 'translateY(0)',
    },

    addbtn: {
        padding: '3px 10px',
        fontSize: '15px',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        backgroundColor: '#1babcb',
        border: '2px solid #1babcb',
        transform: 'translateY(0)',
    },

    viewbtnHover: {
        backgroundColor: '#1babcb',
        color: '#fff',
        transform: 'translateY(-5px)',

    },

    addbtnHover: {
        backgroundColor: '#ffffff',
        border: '2px solid #1babcb',
        color: '#1babcb',
        transform: 'translateY(-5px)',

    },

};

export default InstructorDashboard;
