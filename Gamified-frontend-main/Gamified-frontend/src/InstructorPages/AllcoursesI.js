import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as image from '../Images';
import AddedModal from '../Modal_Windows/AddedModal';
import SidebarComponent from './Sidebar';

const AllCoursesI = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [addedCourses, setAddedCourses] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [addedModalTitle, setAddedModalTitle] = useState('');
  const [addedModalMessage, setAddedModalMessage] = useState('');

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleView = (course) => {
    navigate(`/ViewCourse/${course.id}`);
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

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error('Invalid or expired token:', error);
        localStorage.removeItem('jwt');
      }
    }

    const config = {
      headers: {
        ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:8080/course', config)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const fetchAverageRating = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/review/averageRating/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch average rating:', error);
      return null;
    }
  };

  const isCourseTaught = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/instructorcourse/${userId}/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch enrollment status:', error);
      return false;
    }
  };

  useEffect(() => {
    const fetchRatings = async () => {
      const ratings = {};
      for (const course of courses) {
        const rating = await fetchAverageRating(course.id);
        ratings[course.id] = rating;
      }
      setAverageRatings(ratings);
    };

    if (courses.length > 0) {
      fetchRatings();
    }
  }, [courses]);

  useEffect(() => {
    const fetchTaught = async () => {
      const taughtCourses = {};
      for (const course of courses) {
        const taught = await isCourseTaught(course.id);
        taughtCourses[course.id] = taught;
      }
      setAddedCourses(taughtCourses);
    };

    if (courses.length > 0 && userId) {
      fetchTaught();
    }
  }, [courses, userId]);

  const handleAdd = async (course) => {
    const jwtToken = localStorage.getItem('jwt');

    const config = {
      headers: {
        ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(`http://localhost:8080/instructorcourse/${userId}/${course.id}`, config);
      console.log(response.status, response.data);
      loadCourses();
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  const closeAddedModal = () => {
    setShowAddedModal(false);
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
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className="contentContainer" style={styles.bg}>
        <h1>Explore our courses</h1>
        <div style={styles.cardsContainer}>
          {courses.map(course => (
            <div style={styles.courseCard} key={course.id}>
              <Card style={styles.courseCard}>

                <Card.Img variant="top" src={course.photo} style={styles.cardImage} />

                <Card.Body style={styles.cardContent}>

                  <Card.Title style={{ fontFamily: 'Orbitron", sans-serif', textAlign: 'center', color: 'white', fontSize: '30px', }}>
                    {course.name}</Card.Title>

                  <Card.Text style={styles.cardText}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {getDifficultyIcon(course.difficulty)}
                      <span>{course.difficulty}</span>
                    </div>
                  </Card.Text>
                  <div className="card-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <Button
                      onMouseEnter={(e) => Object.assign(e.target.style, styles.viewbtnHover)}
                      onMouseLeave={(e) => Object.assign(e.target.style, styles.viewbtn)}
                      onClick={() => handleView(course)} style={styles.viewbtn}>View Statistics</Button> */}

                    {addedCourses[course.id] === true ? (
                      <Button className="btn btn-outline"
                        onMouseEnter={(e) => Object.assign(e.target.style, styles.addbtnHover)}
                        onMouseLeave={(e) => Object.assign(e.target.style, styles.addbtn)}
                        onClick={() => handleAdded(course)} style={styles.addbtn}>
                        Added
                      </Button>
                    ) : (
                      <Button className="btn btn-outline"
                        onMouseEnter={(e) => Object.assign(e.target.style, styles.addbtnHover)}
                        onMouseLeave={(e) => Object.assign(e.target.style, styles.addbtn)}
                        onClick={() => handleAdd(course)} style={styles.addbtn}>
                        Add
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <AddedModal
        show={showAddedModal}
        onHide={closeAddedModal}
        title={addedModalTitle}
        message={addedModalMessage}
        onConfirm={() => handleConfirm(selectedCourse)}
      />
    </div>
  );
};

const styles = {
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '90px',
  },
  courseCard: {
    borderRadius: '0%',
    textAlign: 'left',
    //marginLeft: '10px',
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
  bg: {
    padding: '20px',
    color: 'white',
},
};
export default AllCoursesI;
