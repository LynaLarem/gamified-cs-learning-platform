import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Accordion, Card, Image, Nav, Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';
import './style.css';
import './styleSP.css';

const ViewCourseSpecialsit = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState([]);
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const isCourseAvailable = course && course.available === 1;


  const showAlertDelete = (entity) => {
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
        Swal.fire({
          title: "Deleted!",
          text: `Your ${entity} has been deleted.`,
          icon: "success"
        });
      }
      return result.isConfirmed;
    });
  };

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios.get(`http://localhost:8080/course/${courseId}`, config)
      .then(response => {
        console.log(response.data);
        const data = response.data;
        setCourse(data);
        console.log(data.levels.map(level => level.steps));
      })
      .catch(error => {
        console.error(error);
      });

  }, [courseId]);


  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log(decodedToken);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error('Invalid or expired token:', error);
      }
    }

    const config = {
      headers: {
        ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
        'Content-Type': 'application/json',
      },
    };
  }, [userId]);


  

  const handleEdit = (course) => {
    navigate(`/EditCourse/${course.id}`);
  }

  const handleDelete = (course) => {
    showAlertDelete("course").then((confirmed) => {
      if (confirmed) {
        deleteCourse(course);
      }
    });
  };

  const deleteCourse = async (course) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.delete(`http://localhost:8080/course/${course.id}`, config);
      navigate(`/AllCoursesSpecialist/${userId}`);
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  const handleDeleteLevel = async (levelId) => {
    showAlertDelete("level").then((confirmed) => {
      if (confirmed) {
        deleteLevel(levelId);
      }
    });
  };

  const deleteLevel = async (levelId) => {
    try {
      await axios.delete(`http://localhost:8080/level/${levelId}`);
      setLevels(levels.filter(level => level.id !== levelId));
      // Forcer une mise à jour manuelle de l'interface
      setLevels([...levels]); // Utilisation du spread operator pour créer un nouvel objet
      fetchCourseLevels(courseId);
    } catch (error) {
      console.error(`Error in delete level ID ${levelId}:`, error);
    }
  };


  const fetchCourseReviews = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/review/course/${courseId}`);
      setReviews(response.data)
      return response.data;
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      return null;
    }
  };

  const fetchCourseLevels = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/level/course/${courseId}`);
      setLevels(response.data)
      return response.data;
    } catch (error) {
      console.error('Failed to fetch levels:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchCourseReviews(courseId);
    fetchCourseLevels(courseId);
  }, []);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.flex}>
      <SidebarSpecialist />

      <div style={styles.container} >

        <div style={styles.courseHeader}>
          <div style={styles.sep}>

            <div style={styles.courseinfo}>
              <Image className="course-img" src={course.photo} roundedCircle />
              <div >
                <h1
                style={{  fontSize:'3rem', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}
                >{course.name}</h1>
                <h5
                style={{fontSize:'1.2rem', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}
                >Difficulty: {course.difficulty}</h5>
                <h6 style={{fontSize:'1.2rem', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}
                >Date:  {course.dateadded}</h6>
                <h6 style={{fontSize:'1.2rem', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}
                >Availability: {isCourseAvailable ? 'true' : 'false'}</h6>


              </div>
            </div>

          </div>

          <div style={styles.btncontainer}>
            <Button style={styles.btn} 
            onMouseEnter={(e) => Object.assign(e.target.style, styles.btnHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.btn)}
            onClick={() => handleEdit(course)}>Edit</Button>
            <Button 
            onMouseEnter={(e) => Object.assign(e.target.style, styles.btnHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.btn)}
            style={styles.btn} onClick={() => handleDelete(course)}>Delete</Button>
          </div>


        </div>

        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)} style={styles.spCoursesContainer}>
          <Card className='course-details' style={styles.fullWidthCard}>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="overview" href="#overview">Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="content" href="#content">Content</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="reviews" href="#reviews">Reviews</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Tab.Content >
                <Tab.Pane eventKey="overview">
                  <Card.Title style={{color: 'white', textShadow: 'rgb(0 255 255) 1px 1px 7px'}}> Description</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  {course.learnobj1 &&
                    <>
                      <Card.Title style={{color: 'white', textShadow: 'rgb(0 255 255) 1px 1px 7px'}}>Learning objectives</Card.Title>
                      <ul>
                        <li>{course.learnobj1}</li>
                        {course.learnobj2 && <><li>{course.learnobj2}</li></>}
                        {course.learnobj3 && <><li>{course.learnobj3}</li></>}
                        {course.learnobj4 && <><li>{course.learnobj4}</li></>}
                        {course.learnobj5 && <><li>{course.learnobj5}</li></>}
                      </ul>
                    </>
                  }
                </Tab.Pane>
                <Tab.Pane eventKey="content"  >

                  <div className="levels">
                    <h3 style={{color: 'white', textShadow: 'rgb(0 255 255) 1px 1px 7px'}}>Levels</h3>
                    <Link to={`/AddLevel/${courseId}`} className="icon">
                      <img src={image.plus} alt="Logo" className="icon" />
                    </Link>
                  </div>

                  <Accordion defaultActiveKey="0" slot=''> 
                    {levels.map((level, index) => (
                      <Accordion.Item eventKey={index.toString()} key={index} >
                       
                        <Accordion.Header >
                        <div style={styles.accordionHeader} >
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                          <div style={{marginRight: '10px', fontSize: '1rem', fontWeight: 'bold'}} >{`Level ${index + 1}:`} </div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 'bold'}}>{`${level.title}`} </div>
                          </div>
                          <div className="icons-container" >

                            <Link to={`/AddStep/${courseId}/${level.id}`} className="icon-link">
                              <img src={image.plus} alt="Icon 1" className="icon" />
                            </Link>
                            <Link to={`/EditLevel/${courseId}/${level.id}`} className="icon-link">
                              <img src={image.edit} alt="Icon 2" className="icon" />
                            </Link>

                            <img
                              src={image.bin}
                              alt="Icon 3"
                              className="icon"
                              onClick={() => handleDeleteLevel(level.id)}
                            />
                          </div>
                          </div>
                        </Accordion.Header>
                       

                        <Accordion.Body style={styles.accordionBody}>
                          <ul>
                            {level.steps.map((step, stepIndex) => (
                              <li key={stepIndex}>
                                {step.steptype === 'lesson' ? (
                                  <Link to={`/ViewLessonSpecialist/${courseId}/${level.id}/${step.id}`} style={styles.link}>Lesson</Link>
                                ) : (
                                  <Link to={`/ViewGameSpecialist/${courseId}/${step.id}`} style={styles.link}>Practice game</Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </Accordion.Body>

                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Tab.Pane>
                <Tab.Pane eventKey="reviews">
                  {reviews.map(review => (
                    <div key={review.id}>
                      <Card>
                        <Card.Body>
                          <div >
                            <Image src={review.student.image} />
                            <Card.Title>{review.student.firstname} {review.student.lastname}</Card.Title>
                          </div>
                          <Card.Text>
                            {review.rating}
                            {review.comment}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>

      </div>
    </div >
  );
};
const styles = {
  flex: {
    display: 'flex',
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: '#ccc', // Change to your selected background color
    color: '#000', // Change to your selected text color
    // Add any other selected styles you want
  },
  fullWidthCard: {
    width: '100%', // Make the card occupy full width
    background: 'rgb(149 53 105 / 76%)',
    borderRadius: '16px',
    boxShadow: 'rgb(76 133 218 / 66%) 0px 0px 15px -2px',
    backdropFilter: 'blur(4.9px)',
    WebkitBackdropFilter: 'blur(4.9px)',
    color: '#fff',


  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    //background: 'rgb(162 78 124)',
    backdropFilter: 'blur(4.9px)',
    WebkitBackdropFilter: 'blur(4.9px)',
    //color: '#fff',
    padding: '0px !important',
   // boxShadow: 'rgba(149, 53, 105, 0.76) 20px -20px 20px 0px, rgba(149, 53, 105, 0.76) -20px 20px 20px 1px, rgba(149, 53, 105, 0.76) 20px 20px 20px -2px, rgba(149, 53, 105, 0.76) -20px -19px 20px 0px',
    
  },
  accordionBody: {
    background: 'rgb(13 131 197 / 39%)',
    backdropFilter: 'blur(4.9px)',
    WebkitBackdropFilter: 'blur(4.9px)',
   // color: '#fff',
    padding: '0.5rem 1rem',
  },
  iconsContainer: {
    display: 'flex',
    marginleft: '1250px',
    gap: '5px',
  },
  title: {
    fontSize: '1.2rem', // Adjust the font size as needed
    fontWeight: 'bold', // Make the title bold if desired

  },
  courseHeader: { // Ajoutez votre style course-header ici
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    padding: '1rem',
    width: '100%',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    alignItems: 'flex-start',

    background: `url(${image.bgImgage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: ' cover',
    backgroundPosition: 'center',
   // paddingTop: '20px',
    width: '100%',
    color: '#fff',
  },

  courseinfo: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    margin: '2px',
  },
  btncontainer: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginRight: '15px',
  },
  btn: {
    marginBottom: '20px',
    width: '180px',
    height: '44px',
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
  btnHover: {
    backgroundColor: '#ffffff',
    border: '2px solid #1babcb',
    color: '#1babcb',
    transform: 'translateY(-5px)',

  },
  spCoursesContainer: {
    background: 'rgba(255, 51, 118, 0.6)',
    borderRadius: '16px',
    boxShadow: '0 0 15px -2px rgba(255, 51, 118, 0.48)',
    backdropFilter: 'blur(4.9px)',
    WebkitBackdropFilter: 'blur(4.9px)',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },
}

export default ViewCourseSpecialsit;