import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';
import './form.css';
import './styleSP.css';

const EditLesson = () => {
    let navigate = useNavigate();
    const { courseId, levelId, stepId } = useParams();
    const [id, setIdt] = useState(null);
    const lessonId = stepId;

    const [step, setStep] = useState({
        content: '',
        link: '',
        stepOrder: '',
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
        const fetchStepDetails = async () => {
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
                const response = await axios.get(`http://localhost:8080/lesson/${lessonId}`, config);
                const data = response.data;
                console.log(data)

                setStep({
                    content: data.content,
                    link: data.link,
                    stepOrder: data.stepOrder,
                });
            } catch (error) {
                console.error('Error fetching step details:', error.message);
            }
        };

        fetchStepDetails();
    }, [lessonId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!id) {
            console.error("Error: specialistId is undefined.");
            return;
        }

        try {
            const updatedStep = {
                ...step,
                courseId: courseId,
            };
            const jwtToken = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            };

            await axios.put(`http://localhost:8080/lesson/${lessonId}`, updatedStep, config);
            showAlertEdite();
            navigate(`/ViewLessonSpecialist/${courseId}/${levelId}/${lessonId}`);
        } catch (error) {
            console.error('Error updating Course:', error.message);
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

    return (
        <div className="d-flex">
            <SidebarSpecialist />

            <div style={styles.container} >
                <div style={styles.formcontainer} className="col-md-6 offset-md-3  rounded p-4 mb-3">

                    <div style={styles.titleContainer}>
                        <img src={image.lesson} alt="Course Icon" style={styles.icon} />
                        <h2 style={styles.formtitle} >Edit Lesson</h2>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <p>Step ID: {stepId}</p>
                        <p>Lesson ID: {lessonId}</p>


                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">
                                Content
                            </label>
                            <textarea
                            style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter the Lesson Content"
                                name="content"
                                value={step.content}
                                onChange={(e) => setStep({ ...step, content: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="link" className="form-label">
                                Link
                            </label>
                            <input
                            style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Would you like to add a link?"
                                name="link"
                                value={step.link}
                                onChange={(e) => setStep({ ...step, link: e.target.value })}
                            />
                            {!isValidLink(step.link) && step.link && (
                                <p style={{ color: "red" }}>Please enter a valid link.</p>
                            )}
                        </div>

                        <div style={styles.buttonContainer}>

                            <button className="btn btn-outline-primary mx-2" style={styles.confirmbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.confirmbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.confirmbtn)}
                                type="submit" >Save changes</button>

                            <Link className="btn btn-outline-primary mx-2"
                                to={`/ViewLessonSpecialist/${courseId}/${levelId}/${stepId}`}
                                style={styles.linkbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.linkbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.linkbtn)}>
                                Cancel
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
        height: '580px',
        marginTop: '60px',
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

export default EditLesson;
