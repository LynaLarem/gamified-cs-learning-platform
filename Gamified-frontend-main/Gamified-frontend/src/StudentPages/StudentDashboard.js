import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import SidebarSt from "./SidebarSt";
import {Tab, Tabs, Stack, Image, ProgressBar} from 'react-bootstrap';
import * as icon from '../Images';
import { typographyClasses } from "@mui/material";
import { BiFontColor, BiFontSize } from "react-icons/bi";
import './StyleStDashboard.css'
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [userId, setUserId] = useState('');
  const[studentName, setName] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const[ongoing, setOngoing]=useState([]);
  const[completed, setCompleted]=useState([]);
  const[cancelled, setCancelled]=useState([]);
  const [progress, setProgressValues] = useState({});
  const[totalLessons, setLessons] = useState('');
  const[totalGames, setGames] = useState('');
  const[challenges, setChallenges]=useState([]);
  const[leaderboard, setLeaderboard]=useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserId();
  }, []);

  // useEffect(() => {
  //   if (userId) {
  //     fetchTimeLeft();
  //   }
  // }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchStudentData();
    }
  }, [userId])

  // useEffect(() => {
  //   let timerInterval;
  //   if (timeLeft !== null) {
  //     timerInterval = setInterval(() => {
  //       setTimeLeft((prevTimeLeft) => {
  //         if (prevTimeLeft > 1000) {
  //           return prevTimeLeft - 1000;
  //         } else {
  //          clearInterval(timerInterval);
  //         //  fetchTimeLeft(); // Check for next decrement
  //           return 0;
  //         }
  //       });
  //     }, 1000);
  //   }
  //   return () => clearInterval(timerInterval);
  // }, [timeLeft]);

  useEffect(() => {
    const fetchProgress = async () => {
      const progress = {};
      for (const enrollement of ongoing) {
        const pro = await fetchEnrollProgress(enrollement);
        console.log(pro);
        progress[enrollement.id] = pro;
      }
      setProgressValues(progress);
    };
  
    if (ongoing.length > 0) {
      fetchProgress();
    }
  }, [ongoing]);

  const fetchEnrollProgress = async (enrollement) => {
    try {
       const response = await axios.get(`http://localhost:8080/enrollement/progress/${userId}/${enrollement.course.id}`);
       return response.data;
    } catch (error) {
       console.error('Failed to fetch average rating:', error);
       return null;
    }
   };

  const loadUserId = async () => {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log(decodedToken);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error('Invalid or expired token:', error);
        localStorage.removeItem('jwt');
      }
    }
  };

  // const fetchTimeLeft = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/student/hearts/time-left/${userId}`);
  //     const timeLeftFromServer = response.data;
  //     console.log("------------------");
  //     console.log(timeLeftFromServer);
  //     setTimeLeft(timeLeftFromServer);
  //   } catch (error) {
  //     console.error('Error fetching time left:', error);
  //   }
  // };

  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwt');
    console.log("OUT");
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const fetchStudentData = async () => {
    const response = await axios.get(`http://localhost:8080/student/${userId}`);
    setName(response.data.firstname);
    const response2 = await axios.get(`http://localhost:8080/enrollement/completedcourses/student/${userId}`);
    setCompleted(response2.data);
    console.log(completed)
    const response3 = await axios.get(`http://localhost:8080/enrollement/ongoingcourses/student/${userId}`);
    setOngoing(response3.data);
    console.log(ongoing);
    const response4 = await axios.get(`http://localhost:8080/enrollement/cancelledcourses/student/${userId}`);
    setCancelled(response4.data);
    console.log(cancelled);
    const response5 = await axios.get(`http://localhost:8080/enrollement/totalcompletedlessons/${userId}`);
    setLessons(response5.data);
    console.log(totalLessons);
    const response6 = await axios.get(`http://localhost:8080/enrollement/totalplayedgames/${userId}`);
    setGames(response6.data);
    console.log(totalGames);
    const response7 = await axios.get(`http://localhost:8080/challengestate/daily/${userId}`);
    setChallenges(response7.data);
    console.log(challenges);
    const response8 = await axios.get(`http://localhost:8080/student/dashboard/leaderboard/${userId}`);
    setLeaderboard(response8.data);
    console.log(leaderboard);
  };

  const handleView = (course) => {
    navigate(`/ViewCourse/${course.id}`);
  }

  return (
    <div className="d-flex">
      <SidebarSt />
      <div className="d-flex content-Container" style={styles.contentContainer}>
        {/* <Button onClick={handleLogout}>Sign out</Button> */}
        {/* <h1>timer</h1> */}
        {/* {timeLeft !== null && timeLeft > 0 && (
          <div>
            Time left for heart recovery: {formatTime(timeLeft)}
          </div>
        )} */}
      


        <div style={styles.mainContainer}>
            {/* Welcome container */}
            <div className="welcome-Container" style={styles.welcomeContainer}>
              {studentName && (
                <>
                <h1 className="mb-4">
                  Welcome, dear {studentName}!
                </h1>
                <p style={styles.welcomeText}>
                  This is your personnal space where you are provided with an overview on your learning achievements. You can browse your enrollements, which daily challenges were completed and which were not as well as your rankk in the general leaderboard
                </p>
                </>
              )}
            </div>

            {/* Overview container */}
            
            <h3 style={{color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>Overview</h3>
            <div style={styles.overviewElementsContainer}>
              
              <div className="overview-Element element1" style={styles.overviewElement}>
                <h4>{completed.length}</h4>
                {completed.length === 1?(
                  <p>Completed course</p>
                ):(
                  <p>Completed courses</p>
                )}
              </div>
              <div className="overview-Element element2" style={styles.overviewElement}>
                <h4>{ongoing.length}</h4>
                {ongoing.length === 1?(
                  <p>Ongoing course</p>
                ):(
                  <p>Ongoing courses</p>
                )}
              </div>
              <div className="overview-Element element3" style={styles.overviewElement}>
                <h4>{cancelled.length}</h4>
                {cancelled.length === 1?(
                  <p>Cancelled course</p>
                ):(
                  <p>Cancelled courses</p>
                )}
              </div>
              <div className="overview-Element element4" style={styles.overviewElement}>
                <h4>{totalLessons?(totalLessons):0}</h4>
                {totalLessons === 1?(
                  <p>Completed lesson</p>
                ):(
                  <p>Completed lessons</p>
                )}
              </div>
              <div className="overview-Element element5" style={styles.overviewElement}>
                <h4>{totalGames?(totalGames):0}</h4>
                {totalGames === 1?(
                  <p>Played game</p>
                ):(
                  <p>Played games</p>
                )}
              </div>
            </div>
          
            <h3 style={{color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>My Courses</h3>
          <div className="myCourses-Container" style={styles.myCoursesContainer}>
            
            <Tabs
              defaultActiveKey="ongoing"
              className="mb-3"  
            >
              <Tab eventKey="ongoing" title="Ongoing" className="custom-title">
                <Stack direction="vertical" gap={2}>
                  {ongoing.map((enrollement, index) => {
                    return (
                      <div key={index} className=" rounded course-Container" style={styles.courseContainer}>
                        <div style={styles.courseDetailsContainer}>
                          <Image className="course-img" src={enrollement.course.photo} roundedCircle style={styles.courseImage}/>
                          <h6 className="course-Title" style={styles.courseTitle}>{enrollement.course.name}</h6>
                        </div>
                          

                          <div style={styles.progressContainer}>
                            <ProgressBar className="bar" now={progress[enrollement.id]} style={styles.bar}/>
                            <p className="percentageText" style={styles.percentageText}>{progress[enrollement.id]}%</p>
                          </div>
                          
                          <div style={styles.btnContainer}>
                            <Button className="actionBtn" onClick={() => handleView(enrollement.course)}>View</Button>
                            <a href="/Chatpage" className="icon">
                            <Image src={icon.chat} alt="chat" className="icon" style={styles.chatIcon}/>
                            </a>
                            
                          </div>
                      </div>
                    );
                  })}
                </Stack>
              </Tab>
              <Tab eventKey="completed" title="Completed">
                <Stack direction="vertical" gap={2}>
                    {completed.map((enrollement, index) => {
                      return (
                        <div key={index} className=" rounded course-Container" style={styles.courseContainer}>
                          <div style={styles.courseDetailsContainer}>
                            <Image className="course-img" src={enrollement.course.photo} roundedCircle style={styles.courseImage}/>
                            <h6 className="course-Title" style={styles.courseTitle}>{enrollement.course.name}</h6>
                          </div>
                            
  
                            <div style={styles.progressContainer}>
                              <ProgressBar className="bar" now={100} style={styles.bar}/>
                              <p className="percentageText" style={styles.percentageText}>100%</p>
                            </div>
                            
                            <div style={styles.btnContainer}>
                              <Button className="actionBtn" onClick={() => handleView(enrollement.course)}>View</Button>
                              <a href="/Chatpage" className="icon">
                              <Image src={icon.chat} alt="chat" className="icon" style={styles.chatIcon}/>
                              </a>
                              
                            </div>
                        </div>
                      );
                    })}
                  </Stack>
              </Tab>
              <Tab eventKey="Cancelled" title="Cancelled" >
              <Stack direction="vertical" gap={2}>
                    {cancelled.map((enrollement, index) => {
                      return (
                        <div key={index} className="rounded course-Container" style={styles.courseContainer}>
                          <div style={styles.courseDetailsContainer}>
                          <Image className="course-img" src={enrollement.course.photo} roundedCircle style={styles.courseImage}/>
                          <h6 className="course-Title" style={styles.courseTitle}>{enrollement.course.name}</h6>
                          </div>
                          <div style={styles.progressContainer}>
                          <p className="percentageText" style={styles.percentageText}>cancelled</p>
                          </div>
                          <div style={styles.btnContainer}>
                          <Button className="actionBtn" onClick={() => handleView(enrollement.course)}>View</Button>
                          </div>
                        </div>
                      );
                    })}
                  </Stack>
              </Tab>
            </Tabs>
          </div>
        </div>

        

        <div style={styles.challengeLeaderboardContainer}>
          <div style={styles.challengesContainer}>
            <h3 style={{color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>Challenges</h3>
            <Stack direction="vertical" gap={2}>
                  {challenges.map((challenge, index) => {
                    return (
                      <div key={index} className="rounded challengeElement" style={styles.challengeElement}>
                        <div style={styles.challengeIconContainer}>
                        {challenge.completed === 1?(
                              <img src={icon.check} alt="chat" style={styles.challengeIcon} />
                        ):(
                              <img src={icon.close} alt="chat" style={styles.challengeIcon} />
                        )}
                        </div>
                        <div>
                        <h5 className="challengeTitle">{challenge.challenge.title}</h5>
                        <p className="challengeDescription" style={styles.challengeDescription}>{challenge.challenge.description}</p>
                        </div>                    
                      </div>
                    );
                  })}
                </Stack>
          </div>
          <div style={styles.leaderboardContainer}>
            <h3 style={{color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>Leaderboard</h3>
            <Stack gap={2}>
              {leaderboard.map(([i, student], index)=> (
                  <div className="leaderboardElement" key={student.id} style={styles.leaderboardElement}> 
                    <h5 className="leaderboardNumber" style={styles.leaderboardNumber}>{i}</h5> 
                    <div style={styles.studentLeaderboardDetails}>
                          <Image src={student.image} style={styles.leaderboardImage}/>
                          <p className="leaderboardText" style={styles.leaderboardText}>{student.firstname}</p> 
                    </div>
                    <p className="leaderboardScore" style={styles.leaderboardScore}>{student.score}</p>
                  </div>
              ))}
              </Stack>
          </div>
      </div>
      </div>
      
    </div>
  );
};

const styles = {
  contentContainer:{
    //backgroundImage: 'linear-gradient(to right bottom, #042142, #03224c, #092356, #15235f, #232167, #2e2171, #3a207a, #471d83, #551e91, #631d9f, #731bac, #8316b9)',
    paddingTop: '20px',
    width: '100vw'
  },
  mainContainer:{
    marginLeft: '2vw',
    marginRight: '2vw',
    width:'58vw',
    marginTop: '1vw',
    height: '86vh'
  },
  welcomeContainer:{
    color: '#ffffff',
    textShadow: '-2px 0 #721740, 0 2px #721740, 2px 0 #721740, 0 -2px #721740',
    padding: '0.5vw 1vw 0.5vw 1vw',
    borderRadius: '30px',
    marginBottom: '2vh',
    height: '20vh'
  },
  welcomeText:{
    marginTop: '-3vh',
  },
  overviewContainer: {
    padding: '1vw 1vw 0vw 1vw',
    border: '2px solid black',
    borderRadius: '30px',
    marginBottom: '2vh',
  },
  overviewElementsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '4vh',
  },
  overviewElement:{
    borderRadius: '25%',
    padding: '10px 10px 0px 10px',
    width: '8vw',
    color: 'white'
  },
  myCoursesContainer: {
    backgroundColor:'rgba(224, 9, 70, 0.3)',
    padding: '1vw',
    borderRadius: '30px',
 },
  courseContainer: {
     display: 'flex',
    justifyContent: 'space-between',
    padding: '4px'
  },
  courseDetailsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '20vw',
    alignItems: 'center',
    paddingLeft: '1vw'
 },
  courseImage: {
    width: '4vw', 
    height: '4vw', 
    borderRadius: '50%', 
    marginRight:'1vw'
  },
  textContainer:{
    display: 'flex',
  },
  progressContainer:{
    display: 'flex',
    alignItems: 'center',
    width: '20vw',
    
  },
  bar:{
    width: '17vw',
    height: '1.5vh',
    marginRight:'1vw'
  },
  percentageText: {
    marginTop: '2vh',
  },
  btnContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '2vw'
  },
  chatIcon:{
    width: '3vw',
    height: '3vw'
  },
  challengeLeaderboardContainer:{
    width:'20vw',
    paddingRight: '1vw',
    marginTop: '-1vh'
  },
  challengesContainer:{
    padding: '0.5vw',
    
  },
  leaderboardContainer:{
    padding: '0.5vw',
  },
  challengeElement:{
    display: 'flex',
    alignItem: 'center',
    padding: '0.5vw',
  },
  challengeDescription:{
    margin: '0px',
    marginTop: '-0.85vh',
    fontSize: '0.95vw'
  },
  challengeIconContainer:{
    display: 'flex',
    alignItems: 'center'
  },
  challengeIcon:{
    width: '3vw',
    height: '3vw',
    marginRight: '1vw'
  }, 
  leaderboardElement:{
    //border: '1px solid gray',
    borderRadius: '8px',
    //boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  leaderboardNumber:{
    padding: '0vw 1vw 0vw 1vw',
  },
  studentLeaderboardDetails:{
    width: '7.5vw',
    display: 'flex',
    alignItems: 'center',
    marginRight: '1.15vw'
  },
  leaderboardImage:{
    width: '2.5vw', 
    height: '2.5vw', 
    borderRadius: '50%', 
    marginRight:'0.5vw'
  },
  leaderboardText:{
    marginTop: '2vh',
  },
  leaderboardScore:{
    marginTop: '2vh',
    textAlign: 'right',
    width:'4.5vw'
  }
};

export default StudentDashboard;
