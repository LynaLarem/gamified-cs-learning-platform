import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Accordion, Image, Nav, Button, Tab, Tabs } from 'react-bootstrap';
//import './style.css';
import CourseLeaderboard from './CourseLeaderboard';
import { jwtDecode } from 'jwt-decode';
import AddedModal from '../Modal_Windows/AddedModal';
import StudentRoleModal from '../Modal_Windows/StudentRoleModal';
import ResumeCourseModal from '../Modal_Windows/ResumeCourseModal';
import SidebarSt from './SidebarSt';
import * as image from '../Images';
import Rating from '@mui/material/Rating';

const ViewCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState([]);
  const [levels, setLevels] = useState([]);
  const [unlockedSteps, setUnlockedSteps] = useState([]);
  const [lockedSteps, setLockedSteps] = useState([]);
  const [enrollementStatus, setEnrollementStatus] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [state, setState] = useState('');

  const [showAddedModal, setShowAddedModal] = useState(false);
  const [addedModalTitle, setAddedModalTitle] = useState('');
  const [addedModalMessage, setAddedModalMessage] = useState('');

  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollModalTitle, setEnrollModalTitle] = useState('');
  const [enrollModalMessage, setEnrollModalMessage] = useState('');

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeModalTitle, setResumeModalTitle] = useState('');
  const [resumeModalMessage, setResumeModalMessage] = useState('');

  const [step, setStep] = useState('');


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
      setEnrollementStatus(response.data)
      console.log(enrollementStatus);
      if (response.data === false) {
        await axios.post(`http://localhost:8080/enrollement/${userId}/${course.id}`, config);
        console.log("added enrollement");
      } else {
        const newState = "ongoing";
        await axios.patch(`http://localhost:8080/enrollement/${userId}/${course.id}`, { state: newState }, config);
        console.log("updated enrollement");
      }
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  const closeEnrollModal = () => {
    setShowEnrollModal(false);
  };


  const handleUnenroll = (course) => {
    setSelectedCourse(course);
    setAddedModalTitle('Do you want to unenroll from this course?');
    setAddedModalMessage('By confirming, you will remove this course from your ongoing courses and lose all your progress in it.');
    setShowAddedModal(true);
  };

  const handleConfirm = async (course) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const newState = "cancelled";
    await axios.patch(`http://localhost:8080/enrollement/${userId}/${course.id}`, { state: newState }, config);
    setShowAddedModal(false);
  };

  const handleAddReview = async (course) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (userRole === "STUDENT") {
      const response = await axios.get(`http://localhost:8080/enrollement/exists/${userId}/${course.id}`, config);
      console.log(response.data);
      if (response.data === false) {
        setAddedModalTitle('Never enrolled');
        setShowAddedModal(true);
      } else {
        const response = await axios.get(`http://localhost:8080/review/exists/${userId}/${course.id}`, config);
        if (response.data === false) {
          navigate(`/AddReviewForm/${course.id}`);
        } else {
          navigate(`/EditReviewForm/${course.id}`);
        }
      }
    } else {
      setEnrollModalTitle("Can't add review");
      setEnrollModalMessage('You must be signed up with a student account to add reviews.');
      setShowEnrollModal(true);
      return;
    }

  };

  useEffect(() => {

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


    axios.get(`http://localhost:8080/course/${courseId}`)
      .then(response => {
        console.log(response.data);
        const data = response.data;
        setCourse(data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [courseId]);

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
      const response = await axios.get(`http://localhost:8080/level/sorted/course/${courseId}`);
      setLevels(response.data)
      if (userRole === "STUDENT") {
        const response2 = await axios.get(`http://localhost:8080/enrollement/currentstep/${userId}/${courseId}`);
        const currentStep = response2.data;
        console.log(currentStep);
        const response3 = await axios.get(`http://localhost:8080/level/allsteps/course/${courseId}`);
        const allsteps = response3.data;
        console.log(allsteps);
        const index = allsteps.findIndex(step => step.id === currentStep);
        console.log(index);
        setUnlockedSteps(allsteps.slice(0, index + 1));
        console.log(unlockedSteps)
        setLockedSteps(allsteps.slice(index + 1));
        console.log(lockedSteps)
      }
      return response.data;
    } catch (error) {
      console.error('Failed to fetch levels:', error);
      return null;
    }
  };

  const fetchEnrollmentState = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/enrollement/status/${userId}/${courseId}`);
      setState(response.data);
      console.log(state)
      return response.data;
    } catch (error) {
      console.error('Failed to fetch enrollment status:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchCourseReviews(courseId);
    fetchCourseLevels(courseId);
    fetchEnrollmentState(courseId);
  }, [userId, courseId]);

  const handlePracticeGameClick = async (stepId) => {
    try {
      const response = await axios.get(`http://localhost:8080/quest/gamequests/${stepId}`);
      const arrayData = response.data;
      const quest = arrayData.join(',');

      // Store array data in local storage
      localStorage.setItem("arrayData", quest);
      localStorage.setItem("courseId", courseId);

      const response2 = await axios.get(`http://localhost:8080/game/steporder/${stepId}`);
      const steporder = response2.data;

      const studentid = localStorage.getItem("studentId");
      const response3 = await axios.get(`http://localhost:8080/enrollement/currentstep/${studentid}/${courseId}`);
      const currentstep = response3.data;
      const shouldupdate = currentstep == stepId;

      localStorage.setItem("shouldupdate", shouldupdate);


      // Navigate to the ViewGame component
      navigate(`/ViewGame/${stepId}`);
    } catch (error) {
      console.error('Failed to fetch array data:', error);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleResume = async (course) => {
    const response = await axios.get(`http://localhost:8080/enrollement/currentstepdetails/${userId}/${course.id}`);
    setStep(response.data);
    const steptype = response.data.steptype;
    const msg = "Last time, you reached a " + steptype + ". Would you like to continue from there?";
    setResumeModalTitle('You want to resume where you left off?');
    setResumeModalMessage(msg);
    setShowResumeModal(true);
    return;
  };

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
        localStorage.setItem("courseId", courseId);

        const response2 = await axios.get(`http://localhost:8080/game/steporder/${step.id}`);
        const steporder = response2.data;

        const studentid = localStorage.getItem("studentId");
        const response3 = await axios.get(`http://localhost:8080/enrollement/currentstep/${studentid}/${courseId}`);
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

  const closeResumeModal = () => {
    setShowResumeModal(false);
  };

  const closeAddedModal = () => {
    setShowAddedModal(false);
  };

  return (
    <>
      <div className='d-flex contentContainer' style={{height: '100vh', alignItems: 'center', justifyContent:'center'}}>
      {userRole === "STUDENT" && <SidebarSt />}
        <div style={styles.courseContainer}>
          <div style={styles.courseGeneral}>
            <Image className="course-img" src={course.photo} roundedCircle />
            <div style={styles.courseDef}>
              <h2 style={styles.courseName}>{course.name}</h2>
              <h5 style={styles.courseDefText}>{course.difficulty === 'Beginner' ? (
                <img src={image.dif1} alt="Beginner Icon" style={styles.difficultyIcon} />
              ) : (course.difficulty === 'Intermediate' ? (
                <img src={image.dif2} alt="Intemediate Icon" style={styles.difficultyIcon} />
              ) : (
                <img src={image.dif3} alt="Advanced Icon" style={styles.difficultyIcon} />
              )
              )}
                {course.difficulty}</h5>
              <h6 style={styles.courseDefText}>Added {course.dateadded}</h6>
            </div>
            <div style={styles.enrollementBtns}>
              {userRole === 'STUDENT' && state === 'ongoing' ? (
                <>
                  <Button className="enrollementbtn" onClick={() => handleResume(course)}>
                    Resume
                  </Button>
                  <Button className="enrollementbtn" onClick={() => handleUnenroll(course)}>
                    Unenroll
                  </Button>
                </>
              ) : state === 'completed' ? (
                <div className="" style={styles.finishbtn}>
                  Finished!
                </div>
              ) : (
                <Button className="enrollementbtn" onClick={() => handleEnroll(course)}>
                  Enroll
                </Button>
              )}
              <Button className="enrollementbtn" onClick={() => handleAddReview(course)}>Add review</Button>
            </div>

          </div>
          {/* <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Card style={styles.levelsCard}>
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
              <Card.Body> */}
          <div className="myCourses-Container" style={styles.myCoursesContainer}>
          <Tabs
            defaultActiveKey="overview"
            className="mb-3"
          >
            {/* <Tab.Content>
                  <Tab.Pane eventKey="overview"> */}
            <Tab eventKey="overview" title="Overview" className="custom-title" style={styles.tabAsWhole}>
              <h5 style={styles.tabSubTitle}>Description</h5>
              <p style={styles.tabSubContent}>{course.description}</p>
              {course.learnobj1 &&
                <>
                  <h5 style={styles.tabSubTitle}>Learning objectives</h5>
                  <ul>
                    <li style={styles.tabSubContent}>{course.learnobj1}</li>
                    {course.learnobj2 && <><li style={styles.tabSubContent}>{course.learnobj2}</li></>}
                    {course.learnobj3 && <><li style={styles.tabSubContent}>{course.learnobj3}</li></>}
                    {course.learnobj4 && <><li style={styles.tabSubContent}>{course.learnobj4}</li></>}
                    {course.learnobj5 && <><li style={styles.tabSubContent}>{course.learnobj5}</li></>}
                  </ul>
                </>
              }
              {/* </Tab.Pane> */}
            </Tab>
            {/* <Tab.Pane eventKey="content"> */}
            <Tab eventKey="levels" title="Levels" className="custom-title" style={styles.tabAsWhole}>
              <h5 style={styles.tabSubTitle}>Levels</h5>
              <Accordion defaultActiveKey="0" style={{background:'rgba(255,255,255,0.7)'}}>
                {levels.map((level, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>Level {index + 1}: {level.title}</Accordion.Header>
                    <Accordion.Body>
                      {userRole !== 'STUDENT' || (userRole === 'STUDENT' && (state !== 'cancelled' && state !== 'completed' && state !== 'ongoing')) ? (
                        <ul>
                          {level.steps.map((step, stepIndex) => {
                            if (index === 0 && stepIndex === 0) {
                              return <li key={stepIndex}>
                                {step.steptype === 'lesson' ? (
                                  <Link className="lessonLink" to={{ pathname: `/ViewLesson/${step.id}` }}>Lesson</Link>
                                ) : (
                                  <div onClick={() => handlePracticeGameClick(step.id)}>Practice game</div>
                                )}
                              </li>
                            } else {
                              return <li key={stepIndex}>
                                {step.steptype === 'lesson' ? (
                                  <Link style={{ color: 'gray' }}>Lesson</Link>
                                ) : (
                                  <div variant='secondary'>Practice game</div>
                                )}
                              </li>
                            }
                          })}
                        </ul>
                      ) : (
                        <ul>
                          {level.steps.map((step, stepIndex) => {
                            const isLocked = lockedSteps.some(instep => step.id === instep.id);

                            return (
                              <li key={stepIndex}>
                                {isLocked ? (
                                  step.steptype === 'lesson' ? (
                                    <Link style={{ color: 'gray' }}>Lesson</Link>
                                  ) : (
                                    <div className="locked practiceLink" variant="secondary">Practice game</div>
                                  )
                                ) : (
                                  step.steptype === 'lesson' ? (
                                    <Link to={{ pathname: `/ViewLesson/${step.id}` }}>Lesson</Link>
                                  ) : (
                                    <div className="unlocked practiceLink" onClick={() => handlePracticeGameClick(step.id)}>Practice game</div>
                                  )
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}


                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
              {/* </Tab.Pane> */}
            </Tab>
            {/* <Tab.Pane eventKey="reviews"> */}
            <Tab eventKey="reviews" title="Review" className="custom-title">
              <div style={{display:'flex', flexWrap:'wrap'}}>
              {reviews.map(review => (
                <div key={review.id}>
                  <Card style={{width: '12vw'}}>
                    <Card.Body>
                      <div >
                        <Image src={review.student.image} style={{width: '3vw', height: '3vw', borderRadius:'50%'}}/>
                        <Card.Title>{review.student.firstname} {review.student.lastname}</Card.Title>
                      </div>
                      <Card.Text>
                      <Rating
                        name=""
                        value={review.rating}
                        size="large"
                        disabled={false}
                      />
                        <p>{review.comment}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
              </div>
              {/* </Tab.Pane>
                </Tab.Content> */}
            </Tab>
          </Tabs>
          </div>
          {/* </Card.Body>
            </Card>
          </Tab.Container> */}
        </div>
        <CourseLeaderboard />

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
      <AddedModal
        show={showAddedModal}
        onHide={closeAddedModal}
        title={addedModalTitle}
        message={addedModalMessage}
        onConfirm={() => handleConfirm(selectedCourse)}
      />
    </>

  );
};

const styles = {
  courseContainer: {
    width: '57vw',
    padding: '2vh',
    marginRight: '2vw'
  },

  courseGeneral: {
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(11, 255, 255, 0.8)',
    display: 'flex',
    backgroundColor: 'rgba(11, 255, 255, 0.68)',
    backdropFilter: 'blur(4.8px)',
    alignItems: 'center',
    width: '55vw',
    marginBottom: '3vh'
  },

  courseDef: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2vh',
    width: '34.5vw',
  },

  courseName: {
    color: 'white',
    textShadow: '-2px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)',
  },

  difficultyIcon: {
    marginRight: '10px',
    width: '30px',
    background: 'rgba(109, 81, 206, 0.3)',
    padding: '5px',
    borderRadius: '25%',
  },

  courseDefText: {
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: '1px',
    textShadow: '2px 0 rgb(149, 15, 60), 0 1px rgb(149, 15, 60), 2px 0 rgb(149, 15, 60), 0 -2px rgb(149, 15, 60)',
  },

  enrollementBtns: {
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    paddingRight: '20px',
    width: '120px'
  },

  finishbtn: {
    letterSpacing: '2px',
    color: '#351546',
    marginLeft: '10px',
    fontWeight: '700',
  },

  myCoursesContainer: {
    backgroundColor: 'rgba(224, 9, 70, 0.3)',
    padding: '1vw',
    borderRadius: '30px',
  },

  tabAsWhole:{
    background: 'rgba(255,255,255,0.7)', 
    padding: '10px', 
    borderRadius: '16px',
  },

  tabSubTitle:{
    letterspacing: '4px',
    fontSize: '170%',
    color: 'rgba(255, 51, 118, 1)',
    textShadow: '-1px 0 navy, 0 1px navy, 1px 0 navy, 0 -1px navy',
  },

  tabSubContent:{
    color: 'navy',
    fontWeight: 'bold',
  },





};

export default ViewCourse;