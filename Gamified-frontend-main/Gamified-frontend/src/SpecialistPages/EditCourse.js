import axios from 'axios';
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';
import './form.css';
import './styleSP.css';

const EditCourse = () => {
    let navigate = useNavigate();
    const { courseId } = useParams();
    const [id, setIdt] = useState(null);
    const currentDate = format(new Date(), 'yyyy-MM-dd');

    const [course, setCourse] = useState({
        dateadded: currentDate,
        description: "",
        difficulty: "",
        learnobj1: "",
        learnobj2: "",
        learnobj3: "",
        learnobj4: "",
        learnobj5: "",
        name: "",
        photo: "",
        specialist_id: "",
        available: "",
    });



    const showAlertEdite = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your changes have been saved successfully.",
            showConfirmButton: false,
            timer: 1500
        });
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const jwtToken = localStorage.getItem('jwt');
                if (jwtToken) {
                    const decodedToken = jwtDecode(jwtToken);
                    setIdt(decodedToken.userId);
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const response = await axios.get(`http://localhost:8080/course/${courseId}`, config);
                const data = response.data;

                setCourse({
                    name: data.name,
                    description: data.description,
                    difficulty: data.difficulty,
                    dateadded: currentDate,
                    photo: data.photo,
                    learnobj1: data.learnobj1,
                    learnobj2: data.learnobj2,
                    learnobj3: data.learnobj3,
                    learnobj4: data.learnobj4,
                    learnobj5: data.learnobj5,
                    specialist_id: id,
                    available: data.available === 1 // Convert byte to boolean
                });
            } catch (error) {
                console.error('Error fetching course details:', error.message);
            }
        };

        fetchCourseDetails();
    }, [courseId]);


    const onInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setCourse({ ...course, specialist_id: id, [name]: newValue });
    };







    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('Updated Course:', course);
        if (!id) {
            console.error("Error: specialistId is undefined.");
            return;
        }

        try {
            const updatedCourse = {
                ...course,
                specialist_id: id,
                courseId: courseId,
                available: course.available ? 1 : 0 // Convert boolean to byte
            };
            const jwtToken = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            };

            await axios.put(`http://localhost:8080/course/${courseId}`, updatedCourse, config);
            showAlertEdite();
            navigate(`/ViewCourseSpecialist/${courseId}`);
        } catch (error) {
            console.error('Error updating Course:', error.message);
        }
    };

    const difficultyOptions = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' }
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#07064652',
            color: 'hsl(190.82deg 100% 50%)',
            border: '2px solid rgb(0, 209, 255)',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'rgb(0, 209, 255)' : '#07064652',
            color: state.isSelected ? 'withe' : 'rgb(0, 209, 255)',
            padding: 10,
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'rgb(0, 209, 255)',
        }),
    };


    return (
        <div className="d-flex">
            <SidebarSpecialist />
            <div style={styles.container} >
                <div style={styles.formcontainer} className="col-md-6 offset-md-3  rounded p-4 mt-3 mb-3">

                    <div style={styles.titleContainer}>
                        <img src={image.course2} alt="Course Icon" style={styles.icon} />
                        <h2 style={styles.formtitle} >Edit Course</h2>
                    </div>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="available" className="form-label">
                                Available
                            </label>
                            <input
                              style={styles.input}
                                type="checkbox"
                                className="form-check-input input-placeholder"
                                id="available"
                                name="available"
                                checked={course.available}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Course name
                            </label>
                            <input
                              style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter the course name"
                                name="name"
                                value={course.name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <input
                              style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter the description"
                                name="description"
                                value={course.description}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="difficulty" className="form-label">
                                Difficulty
                            </label>
                            <select
                             styles={customStyles}
                              style={styles.input}
                                className="form-select input-placeholder"
                                name="difficulty"
                                value={course.difficulty}
                                onChange={(e) => onInputChange(e)}
                                required
                            >
                                <option value="">Select difficulty</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="learnobj1" className="form-label">
                                Learning Objective 1
                            </label>
                            <input
                              style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter Learning Objective 1"
                                name="learnobj1"
                                value={course.learnobj1 || ''}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="learnobj2" className="form-label">
                                Learning Objective 2
                            </label>
                            <input
                              style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter Learning Objective 2"
                                name="learnobj2"
                                value={course.learnobj2 || ''}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="learnobj3" className="form-label">
                                Learning Objective 3
                            </label>
                            <input
                              style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter Learning Objective 3"
                                name="learnobj3"
                                value={course.learnobj3 || ''}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="learnobj4" className="form-label">
                                Learning Objective 4
                            </label>
                            <input
                              style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter Learning Objective 4"
                                name="learnobj4"
                                value={course.learnobj4 || ''}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="learnobj5" className="form-label">
                                Learning Objective 5
                            </label>
                            <input
                              style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter Learning Objective 5"
                                name="learnobj5"
                                value={course.learnobj5 || ''}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div style={styles.buttonContainer}>
                       
                            <Link className="btn btn-outline-primary mx-2" to={`/AddLevel/${courseId}`}
                                style={styles.linkbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.linkbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.linkbtn)}>
                                Add level
                            </Link>

                            <button className="btn btn-outline-primary mx-2" style={styles.confirmbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.confirmbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.confirmbtn)}
                                type="submit" >Save changes</button>

                            <Link className="btn btn-outline-primary mx-2"
                            to={`/ViewCourseSpecialist/${courseId}`}
                            style={styles.linkbtn}
                            onMouseEnter={(e) => Object.assign(e.target.style, styles.linkbtnHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, styles.linkbtn)}>
                                Cancel
                            </Link>

                            </div>

                    </form>

                </div>

            </div >
        </div >

    );

};

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        height: '100%',
        background: `url(${image.bgImgage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: ' cover',
        backgroundPosition: 'center',

    },
    formcontainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        color: 'white',
        backgroundImage: 'linear-gradient(rgb(198 64 111 / 59%),  rgb(9 6 75))',
        boxShadow: 'rgba(174, 83, 144, 0.9) -11px -8px 15px, rgb(13 114 158) 5px -9px 12px, rgb(0 206 255) -3px 2px 5px, rgb(14 109 165) 6px 8px 12px',
        borderRadius: '10px',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        flexDirection: 'column',
    },
    formtitle: {
        marginTop: '2px',
        marginBottum: '5px',
        textAlign: 'center',

    },
    icon: {
        width: '150px',
        height: '150px',

    },

    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //   marginBottom: '10px',
        marginTop: '10px',
    },
    confirmbtn: {
        marginRight: '65px',
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


    linkbtn: {
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


    linkbtnHover: {
        backgroundColor: '#1babcb',
        color: '#fff',
        transform: 'translateY(-5px)',

    },

    confirmbtnHover: {
        backgroundColor: '#ffffff',
        border: '2px solid #1babcb',
        color: '#1babcb',
        transform: 'translateY(-5px)',

    },
    input: {
        backgroundColor: '#07064652',
        color: 'rgb(0, 209, 255)',
        border: '2px solid rgb(0, 209, 255)',
    },
};
export default EditCourse;