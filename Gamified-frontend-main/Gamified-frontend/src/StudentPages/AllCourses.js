import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as image from '../Images';
import ResumeCourseModal from '../Modal_Windows/ResumeCourseModal';
import StudentRoleModal from '../Modal_Windows/StudentRoleModal';
import { useSearchContext } from '../Navbar/SearchContext';
import './AllCoursesSt.css';
import SidebarSt from './SidebarSt';
import Rating from '@mui/material/Rating';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollModalTitle, setEnrollModalTitle] = useState('');
  const [enrollModalMessage, setEnrollModalMessage] = useState('');
  const [averageRatings, setAverageRatings] = useState({});
  const [enrollmentStatus, setEnrollmentStatus] = useState({});

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeModalTitle, setResumeModalTitle] = useState('');
  const [resumeModalMessage, setResumeModalMessage] = useState('');

  const [step, setStep] = useState('');

  const [selectedFilterSort, setSelectedFilterSort] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const { searchResults, searched } = useSearchContext();



  const handleApply = async () => {
    switch (selectedFilterSort) {
      case 'filterDiff':
        switch (selectedValue) {
          case 'beginner':
            const response1 = await axios.get(`http://localhost:8080/course/filteredbydiff/beginner`);
            setCourses(response1.data);
            break;
          case 'intermediate':
            const response2 = await axios.get(`http://localhost:8080/course/filteredbydiff/intermediate`);
            setCourses(response2.data);
            break;
          default:
            const response3 = await axios.get(`http://localhost:8080/course/filteredbydiff/advanced`);
            setCourses(response3.data);
        }
        break;
      case 'filterRate':
        switch (selectedValue) {
          case 'five':
            const response1 = await axios.get(`http://localhost:8080/course/filteredbyrating/5`);
            setCourses(response1.data);
            break;
          case 'four':
            const response2 = await axios.get(`http://localhost:8080/course/filteredbyrating/4`);
            setCourses(response2.data);
            break;
          case 'three':
            const response3 = await axios.get(`http://localhost:8080/course/filteredbyrating/3`);
            setCourses(response3.data);
            break;
          case 'two':
            const response4 = await axios.get(`http://localhost:8080/course/filteredbyrating/2`);
            setCourses(response4.data);
            break;
          default:
            const response5 = await axios.get(`http://localhost:8080/course/filteredbyrating/1`);
            setCourses(response5.data);
        }
        break;
      case 'sortAlph':
        switch (selectedValue) {
          case 'asc':
            const response1 = await axios.get(`http://localhost:8080/course/sortbynameasc`);
            setCourses(response1.data);
            break;
          default:
            const response2 = await axios.get(`http://localhost:8080/course/sortbynamedesc`);
            setCourses(response2.data);
        }
        break;
      case 'sortPop':
        switch (selectedValue) {
          case 'mtl':
            const response1 = await axios.get(`http://localhost:8080/course/sortbypopularitymost`);
            setCourses(response1.data);
            break;
          default:
            const response2 = await axios.get(`http://localhost:8080/course/sortbypopularityleast`);
            setCourses(response2.data);
        }
        break;
      default:
    }
  }

  const handleView = (course) => {
    navigate(`/ViewCourse/${course.id}`);
  }


  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log(decodedToken);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.userId);
        console.log(userRole, userId);
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
      })
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

  const fetchEnrollmentStatus = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/enrollement/status/${userId}/${courseId}`);
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
        console.log(rating);
        ratings[course.id] = rating;
      }
      setAverageRatings(ratings);
    };

    if (courses.length > 0) {
      fetchRatings();
    }
  }, [courses]);

  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = {};
      for (const course of courses) {
        const status = await fetchEnrollmentStatus(course.id);
        statuses[course.id] = status;
      }
      setEnrollmentStatus(statuses);
    };

    if (courses.length > 0 && userId) {
      fetchStatuses();
    }
  }, [courses, userId]);

  const closeEnrollModal = () => {
    setShowEnrollModal(false);
  };

  const closeResumeModal = () => {
    setShowResumeModal(false);
  };

  const handleEnroll = async (course) => {
    const jwtToken = localStorage.getItem('jwt');

    if (!userRole || userRole !== 'STUDENT') {
      setEnrollModalTitle('Enrollment Error');
      setEnrollModalMessage('You must be signed up with a student account to enroll in courses.');
      setShowEnrollModal(true);
      return;
    }

    const config = {
      headers: {
        ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.get(`http://localhost:8080/enrollement/existsevencancelled/${userId}/${course.id}`, config);
      if (response.data === false) {
        await axios.post(`http://localhost:8080/enrollement/${userId}/${course.id}`, config);
        loadCourses();
        console.log("added enrollement");
      } else {
        const newState = "ongoing";
        await axios.patch(`http://localhost:8080/enrollement/${userId}/${course.id}`, { state: newState }, config);
        console.log("updated enrollement");
        loadCourses();
      }
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };


  const handleResume = async (course) => {
    const response = await axios.get(`http://localhost:8080/enrollement/currentstepdetails/${userId}/${course.id}`);
    setStep(response.data);
    const steptype = response.data.steptype;
    const msg = "Last time, you reached a " + steptype + ". Would you like to continue from there?";
    setResumeModalTitle('You want to resume where you left off?');
    setResumeModalMessage(msg);
    setShowResumeModal(true);
    return;
  }

  const handleContinue = async (step) => {
    if (step.steptype === "lesson") {
      setShowResumeModal(false);
      navigate(`/ViewLesson/${step.id}`);
    } else {
      try {
        const response = await axios.get(`http://localhost:8080/quest/gamequests/${step.id}`);
        const arrayData = response.data;
        const quest = arrayData.join(',');

        // Store array data in local storage
        localStorage.setItem("arrayData", quest);
        localStorage.setItem("courseId", step.level.course.id);

        const response2 = await axios.get(`http://localhost:8080/game/steporder/${step.id}`);
        const steporder = response2.data;

        const studentid = localStorage.getItem("studentId");
        const courseid = localStorage.getItem("courseId");
        const response3 = await axios.get(`http://localhost:8080/enrollement/currentstep/${studentid}/${courseid}`);
        const currentstep = response3.data;
        const shouldupdate = currentstep == step.id;

        localStorage.setItem("shouldupdate", shouldupdate);


        // Navigate to the ViewGame component
        navigate(`/ViewGame/${step.id}`);
      } catch (error) {
        console.error('Failed to fetch array data:', error);
      }
      navigate(`/ViewGame/${step.id}`);
    }

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
    <div className='d-flex'>
      {userRole === "STUDENT" && <SidebarSt />}

      <div style={styles.contentContainer}>
        <div style={styles.filterAndCourseContainer}>
          <h1 style={styles.title}>Explore our courses</h1>
          <div style={styles.filterContainer}>
            <Form style={styles.filterForm}>
              <Form.Group style={styles.filterOption} controlId="filterSortOptions">
                <Form.Select value={selectedFilterSort} onChange={(e) => setSelectedFilterSort(e.target.value)}>
                  <option hidden>Filter/Sort by...</option>
                  <option value="filterDiff">Filter By Difficulty</option>
                  <option value="filterRate">Filter By Rating</option>
                  <option value="sortAlph">Sort By Name</option>
                  <option value="sortPop">Sort By Popularity</option>
                </Form.Select>
              </Form.Group>

              <Form.Group style={styles.filterValue} controlId="valuesDropdown">
                <Form.Select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} disabled={!selectedFilterSort}>
                  <option hidden>Select Value</option>
                  {selectedFilterSort === 'filterDiff' ? (
                    <>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </>
                  ) : selectedFilterSort === 'filterRate' ? (
                    <>
                      <option value="five">5 stars</option>
                      <option value="four">More than 4 stars</option>
                      <option value="three">More than 3 stars</option>
                      <option value="two">More than 2 stars</option>
                      <option value="one">More than 1 star</option>
                    </>
                  ) : selectedFilterSort === 'sortAlph' ? (
                    <>
                      <option value="asc">A to Z</option>
                      <option value="desc">Z to A</option>
                    </>
                  ) : selectedFilterSort === 'sortPop' ? (
                    <>
                      <option value="mtl">Most to least</option>
                      <option value="ltm">Least to most</option>
                    </>
                  ) : null}
                </Form.Select>
              </Form.Group>

              <Button className='applybtn' onClick={handleApply} disabled={!selectedFilterSort && !selectedValue}>Apply</Button>
            </Form>
          </div>





          <div className="cards-container" style={styles.coursesContainer}>
            {searched && searchResults.length === 0 && <p>No results found.</p>}

            {!courses.length ? (
              <p>No courses.</p>
            ) :

              (!searched && courses.map(course => (
                <div className="card-div" key={course.id}>

                  <Card style={styles.courseCard}>
                    <Card.Img variant="top" src={course.photo} style={styles.cardImage} />
                    <Card.Body style={styles.cardContent}>
                      {/* <Image className="course-img" src={course.photo} roundedCircle /> */}
                      <Card.Title style={styles.cardTitle}>{course.name}</Card.Title>
                      <Card.Text style={styles.cardText}>
                        <div style={{ marginBottom:'5px', display: 'flex', alignItems: 'center' }}>


                          {course.difficulty === 'Beginner' ? (
                            <img src={image.dif1} alt="Beginner Icon" style={styles.difficultyIcon} />
                          ) : (course.difficulty === 'Intermediate' ? (
                            <img src={image.dif2} alt="Intemediate Icon" style={styles.difficultyIcon} />
                          ) : (
                            <img src={image.dif3} alt="Advanced Icon" style={styles.difficultyIcon} />
                          )
                          )}
                          <span>{course.difficulty}</span>
                        </div>

                        <p style={styles.rating}>{averageRatings[course.id] || 'no ratings yet'}</p>
                      </Card.Text>
                      <Card.Text>

                      </Card.Text>
                      <div className="card-buttons" style={styles.buttonContainer}>
                        <Button onMouseEnter={(e) => Object.assign(e.target.style, styles.viewbtnHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.viewbtn)}
                          onClick={() => handleView(course)} style={styles.viewbtn}>Learn more</Button>
                        {enrollmentStatus[course.id] === 'ongoing' ? (
                          <Button className="btn btn-outline-primary mx-2"
                            onMouseEnter={(e) => Object.assign(e.target.style, styles.addbtnHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, styles.addbtn)}
                            onClick={() => handleResume(course)} style={styles.addbtn}>
                            Resume
                          </Button>
                        ) : enrollmentStatus[course.id] === 'completed' ? (
                          <div className="" style={styles.finishbtn}>
                            Finished!
                          </div>
                        ) : (
                          <Button className="btn btn-outline"
                            onMouseEnter={(e) => Object.assign(e.target.style, styles.addbtnHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, styles.addbtn)}
                            onClick={() => handleEnroll(course)} style={styles.addbtn}>
                            Enroll
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>

                </div>
              )))}




            {!courses.length ? (
              <p>No courses.</p>
            ) : (searched && searchResults.length > 0 && (
                searchResults.map(course => (
                  <div className="card-div" key={course.id}>

                    <Card style={styles.courseCard}>
                      <Card.Img variant="top" src={course.photo} style={styles.cardImage} />
                      <Card.Body style={styles.cardContent}>
                        {/* <Image className="course-img" src={course.photo} roundedCircle /> */}
                        <Card.Title style={styles.cardTitle}>{course.name}</Card.Title>
                        <Card.Text style={styles.cardText}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>


                            {course.difficulty === 'Beginner' ? (
                              <img src={image.dif1} alt="Beginner Icon" style={styles.difficultyIcon} />
                            ) : (course.difficulty === 'Intermediate' ? (
                              <img src={image.dif2} alt="Intemediate Icon" style={styles.difficultyIcon} />
                            ) : (
                              <img src={image.dif3} alt="Advanced Icon" style={styles.difficultyIcon} />
                            )
                            )}
                            <span>{course.difficulty}</span>
                          </div>
                          <p style={styles.rating}>{averageRatings[course.id] || 'no ratings yet'}</p>
                        </Card.Text>
                        <Card.Text>

                        </Card.Text>
                        <div className="card-buttons" style={styles.buttonContainer}>
                          <Button onMouseEnter={(e) => Object.assign(e.target.style, styles.viewbtnHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, styles.viewbtn)}
                            onClick={() => handleView(course)} style={styles.viewbtn}>Learn more</Button>
                          {enrollmentStatus[course.id] === 'ongoing' ? (
                            <Button className="btn btn-outline-primary mx-2"
                              onMouseEnter={(e) => Object.assign(e.target.style, styles.addbtnHover)}
                              onMouseLeave={(e) => Object.assign(e.target.style, styles.addbtn)}
                              onClick={() => handleResume(course)} style={styles.addbtn}>
                              Resume
                            </Button>
                          ) : enrollmentStatus[course.id] === 'completed' ? (
                            <div className="" style={styles.finishbtn}>
                              Finished!
                            </div>
                          ) : (
                            <Button className="btn btn-outline"
                              onMouseEnter={(e) => Object.assign(e.target.style, styles.addbtnHover)}
                              onMouseLeave={(e) => Object.assign(e.target.style, styles.addbtn)}
                              onClick={() => handleEnroll(course)} style={styles.addbtn}>
                              Enroll
                            </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>

                  </div>
                ))))}

          </div>
        </div>
        <StudentRoleModal
          show={showEnrollModal}
          onHide={closeEnrollModal}
          title={enrollModalTitle}
          message={enrollModalMessage}
        />

        <ResumeCourseModal
          show={showResumeModal}
          onHide={closeResumeModal}
          title={resumeModalTitle}
          message={resumeModalMessage}
          onContinue={() => handleContinue(step)}
        />
      </div>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '55px',
    color: 'white',
    fontWeight: 'bold',
    textShadow: '-2px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)',
  },
  contentContainer: {
    backgroundImage: `url(${image.bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh'

  },
  filterAndCourseContainer: {
    width: '70vw',
    height: '20vh'
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'flex-end',

  },
  filterForm: {
    width: '30vw',
    display: 'flex',
    justifyContent: 'space-between',
  },
  filterOption: {
    width: '12vw',
  },
  filterValue: {
    width: '12vw'
  },

  coursesContainer: {
    display: 'flex',
    padding: '4vh 0 4vh 0'
  },
  courseCard: {
    borderRadius: '0%',
    textAlign: 'left',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '20px',
    maxWidth: '250px',
    height: '350px',
    borderRadius: '18px',
    padding: '8px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',

    backgroundImage: 'linear-gradient(to right bottom, rgb(15, 152, 189), rgba(9, 6, 75, 0.8), rgba(109, 81, 206, 1))',
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
    objectFit: 'cover',
    display: 'block',
    padding: '5px',
    borderRadius: '30px'
  },

  cardTitle: {
    fontFamily: 'Orbitron", sans-serif',
    textAlign: 'center',
    color: 'white',
    fontSize: '18px',
    height: '6vh'
  },

  cardContent: {
    padding: '8px',
    color: '#fff',
  },

  rating: {
    margin: '0px',
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
    gap: '10px',

  },

  viewbtn: {
    // padding: '3px 10px',
    fontSize: '14px',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#1babcb',
    border: '2px solid #1babcb',
    transform: 'translateY(0)',
    fontWeight: 'bold',
    textShadow: '-1px 0 #351546, 0 1px #351546, 1px 0 #351546, 0 -1px #351546',
    letterSpacing: '1.5px'
  },

  addbtn: {
    //padding: '3px 10px',
    fontSize: '15px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    backgroundColor: '#1babcb',
    border: '2px solid #1babcb',
    transform: 'translateY(0)',
    fontWeight: 'bold',
    textShadow: '-1px 0 #351546, 0 1px #351546, 1px 0 #351546, 0 -1px #351546',
    letterSpacing: '1px'
  },

  finishbtn: {
    marginLeft: '30px',
    paddingTop: '2px',
    fontWeight: 'bold',
    textShadow: '-1px 0 #351546, 0 1px #351546, 1px 0 #351546, 0 -1px #351546',
  },

  viewbtnHover: {
    backgroundColor: '#1babcb',
    color: '#fff',
    transform: 'translateY(-5px)',

  },

  addbtnHover: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    border: '2px solid #1babcb',
    color: '#1babcb',
    transform: 'translateY(-5px)',

  },

  difficultyIcon: {
    marginRight: '10px',
    width: '20px',
  }
};

export default AllCourses;