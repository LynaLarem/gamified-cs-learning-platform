import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';
import './form.css';
import './style.css';

const showAlertAdd = () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your course has been added successfully.",
        showConfirmButton: false,
        timer: 1500
    });
};

const AddCourse = () => {
    const [id, setIdt] = useState(null);
    const [isPhotoValid, setIsPhotoValid] = useState(true);
    const currentDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            setIdt(decodedToken.userId);
        }
    }, []);

    let navigate = useNavigate();

    const [course, setCourse] = useState({
        dateadded: currentDate,
        description: "",
        difficulty: "",
        learnobjs: [{ id: 1, value: "" }],
        name: "",
        photo: "",
        specialist_id: "",
        available: false
    });

    const { dateadded, description, difficulty, name, photo, learnobjs, available } = course;

    const onInputChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setCourse({ ...course, [name]: checked });
        } else if (name === 'value') {
            const updatedLearnObjs = [...course.learnobjs];
            updatedLearnObjs[index].value = value;
            setCourse({ ...course, learnobjs: updatedLearnObjs });
        } else {
            setCourse({ ...course, [name]: value });
        }
        if (name === 'photo') {
            setIsPhotoValid(isValidLink(value));
        }
    };

    const isValidLink = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    const onAddLearnObj = () => {
        if (course.learnobjs.length < 5) {
            const newLearnObj = { id: course.learnobjs.length + 1, value: "" };
            setCourse({ ...course, learnobjs: [...course.learnobjs, newLearnObj] });
        } else {
            alert("You cannot add more than 5 Learn Objects.");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            console.error("Error: specialistId is undefined.");
            return;
        }

        if (!course.learnobjs[0].value) {
            alert("Please fill in the required field: Learn Object 1");
            return;
        }

        if (!isPhotoValid) {
            alert("Please enter a valid photo link.");
            return;
        }

        try {
            const currentDate = new Date().toISOString().split('T')[0];
            const courseToSend = { ...course };
            course.learnobjs.forEach((learnobj, index) => {
                courseToSend[`learnobj${index + 1}`] = learnobj.value;
            });

            courseToSend.available = course.available ? 1 : 0;  // Convert boolean to byte

            const jwtToken = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            };

            setCourse({ ...course, specialist_id: id });
            console.log("Course object before sending:", courseToSend);

            await axios.post(`http://localhost:8080/course/specialist/${id}`, courseToSend, config);
            showAlertAdd();
            navigate(`/AllCoursesSpecialist/${id}`);
        } catch (error) {
            console.error("Error adding course:", error.message);
        }
    };

  

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
            <div style={styles.container}>
                <div style={styles.formcontainer} className="col-md-6 offset-md-3 rounded p-4 mt-3 mb-3">
                    <div style={styles.titleContainer}>
                        <img src={image.course2} alt="Course Icon" style={styles.icon} />
                        <h2 style={styles.formtitle}>Add Course</h2>
                    </div>
                    <p>dateadded: {course.dateadded}</p>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label htmlFor="available" className="form-label">Available</label>
                                <input
                                    type="checkbox"
                                    name="available"
                                    checked={course.available}
                                    onChange={onInputChange}
                                    style={styles.input}
                                />
                            </div>
                            <label htmlFor="name" className="form-label">Course Name</label>
                            <input
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter the course name"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="difficulty" className="form-label">
                                Course difficulty
                            </label>
                            <select
                            style={styles.input}
                                className="form-select input-placeholder"
                                name="difficulty"
                                value={difficulty}
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
                            <label htmlFor="description" className="form-label">Course description</label>
                            <input
                            style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter the course description"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Photo Link</label>
                            <input
                            style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter the link to the course photo"
                                name="photo"
                                value={photo}
                                onChange={onInputChange}
                                required
                            />
                            {!isPhotoValid && (
                                <p style={{ color: 'red' }}>Please enter a valid photo link.</p>
                            )}
                        </div>
                        {course.learnobjs.map((learnobj, index) => (
                            <div key={learnobj.id} className="mb-3">
                                <label htmlFor={`learnobj${learnobj.id}`} className="form-label">
                                    Learn Object {learnobj.id} {index === 0 ? '*' : ''}
                                </label>
                                <input
                                    type="text"
                                    className="form-control input-placeholder"
                                    placeholder={`Enter Learn Object ${learnobj.id}`}
                                    name="value"
                                    value={learnobj.value}
                                    onChange={(e) => onInputChange(e, index)}
                                    required={index === 0}
                                    style={styles.input}
                                />
                            </div>
                        ))}
                        {course.learnobjs.length < 5 && (
                            <button
                                style={styles.confirmbtn}
                                type="button"
                                className="btn btn-secondary mb-3"
                                onClick={onAddLearnObj}
                            >
                                Add Learn Object
                            </button>
                        )}
                        <div style={styles.buttonContainer}>
                            <button
                                className="btn btn-outline-primary mx-2"
                                style={styles.confirmbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.confirmbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.confirmbtn)}
                                type="submit"
                            >
                                Confirm
                            </button>
                            <Link
                                className="btn btn-outline-primary mx-2"
                                to={`/SpecialistDashboard`}
                                style={styles.linkbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.linkbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.linkbtn)}
                            >
                                Add level
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        height: '100%',
        background: `url(${image.bgImgage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    formcontainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        color: 'white',
        backgroundImage: 'linear-gradient(rgb(198 64 111 / 59%), rgb(9 6 75))',
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
        marginBottom: '5px',
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

export default AddCourse;
