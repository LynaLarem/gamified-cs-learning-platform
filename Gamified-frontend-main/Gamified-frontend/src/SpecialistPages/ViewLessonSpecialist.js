import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';

const ViewLessonSpecialist = () => {
    const { lessonId, levelId, courseId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken) {
            try {
                const decodedToken = jwtDecode(jwtToken);
                setUserId(decodedToken.userId);
            } catch (error) {
                console.error('Invalid or expired token:', error);
            }
        }
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        axios.get(`http://localhost:8080/lesson/${lessonId}`, config)
            .then(response => {
                const data = response.data;
                setLesson(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [lessonId]);

    const showAlertDelete = async (entity) => {
        return Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this ${entity}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#20C620",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", `Your ${entity} has been deleted.`, "success");
            }
            return result.isConfirmed;
        });
    };

    const deleteLesson = async () => {
        const isConfirmed = await showAlertDelete('lesson');
        if (isConfirmed) {
            try {
                const jwtToken = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                await axios.delete(`http://localhost:8080/lesson/${lessonId}`, config);
                navigate(`/ViewCourseSpecialist/${courseId}`);
            } catch (error) {
                console.error('Failed to delete lesson:', error);
            }
        }
    };

    if (!lesson) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.pageContainer}>
            <SidebarSpecialist />
            <div style={styles.container}>
                <Link to={`/ViewCourseSpecialist/${courseId}`} style={styles.backButton}>
                    <img src={image.back} alt="Back" style={styles.icon}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    />
                </Link>
                <Container className="mt-5" style={styles.cardContainer}>
                    <Card style={styles.card}>
                        <Card.Header style={{  textAlign: 'center', fontSize: '1.5rem',backgroundColor: 'rgb(12 194 222 / 78%)', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)' }}>Lesson</Card.Header>
                        <Card.Body style={{ backgroundColor: 'rgb(158 47 119 / 61%)' }}>
                            <Card.Text style={styles.cardContent}>{lesson.content}</Card.Text>

                            <div className='d-flex'>
                                <img src={image.link} alt="link icon" style={styles.linkIcon} />
                                <Card.Link href={lesson.link} style={styles.cardLink}>

                                    For more info
                                </Card.Link>
                            </div>
                            <div style={styles.buttonContainer}>
                                <Link to={`/EditLesson/${courseId}/${levelId}/${lessonId}`} className="btn btn-primary"
                                    style={styles.editBtn}
                                    onMouseEnter={(e) => Object.assign(e.target.style, styles.editBtnHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, styles.editBtn)}
                                >Edit</Link>
                                <button style={styles.deleteBtn}
                                    onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteBtnHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteBtn)}
                                    onClick={deleteLesson} className="btn btn-danger">Delete</button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        width: '100%',
        height: '100vh',
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '2rem',
        position: 'relative',
        background: `url(${image.bgImgage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    backButton: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1000,
    },
    icon: {
        width: '60px',
        height: '60px',
        transition: 'transform 0.3s ease',
    },
    iconHover: {
        transform: 'translateX(-5px) translateY(-5px)',
    },
    iconClicked: {
        transform: 'translateX(5px) translateY(5px)',
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        width: '50%',
        backgroundColor: 'transparent',
        border: '3px solid rgb(16 108 155)',
        boxShadow: 'rgb(35 255 255) 2px 6px 13px',
        color: 'white',
        fontSize: '1.2rem',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',

    },
    cardContent: {
        textAlign: 'left',
    },
    cardLink: {
        color: 'rgb(0 209 255)', // La couleur bleue des boutons
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        textShadow: '1px 1px 2px rgb(0 0 0) 1px 1px 2px',
    },
    linkIcon: {
        marginRight: '5px',
        width: '20px',
        height: '20px',

    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        gap: '10px',
    },
    editBtn: {

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
    deleteBtn: {
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
    editBtnHover: {
        backgroundColor: '#1babcb',
        color: '#fff',
        transform: 'translateY(-5px)',
    },
    deleteBtnHover: {
        backgroundColor: '#ffffff',
        border: '2px solid #1babcb',
        color: '#1babcb',
        transform: 'translateY(-5px)',
    },
};

export default ViewLessonSpecialist;
