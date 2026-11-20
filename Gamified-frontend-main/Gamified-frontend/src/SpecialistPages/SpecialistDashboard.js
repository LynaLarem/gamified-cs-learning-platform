import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';
import './SpecialistDashboard.css';

const SpecialistDashboard = () => {
  const [userId, setUserId] = useState('');
  const [createdCourses, setCreatedCourses] = useState(0);
  const [draftCourses, setDraftCourses] = useState(0);
  const [createdLevels, setCreatedLevels] = useState(0);
  const [createdSteps, setCreatedSteps] = useState(0);
  const [specialistData, setSpecialistData] = useState(null);
  const [specialistCourses, setSpecialistCourses] = useState([]);
  const [averageDifficulty, setAverageDifficulty] = useState('N/A');
  const [averageDifficultyScore, setAverageDifficultyScore] = useState(0);

  const difficultyMap = {
    'beginner': 1,
    'intermediate': 2,
    'advanced': 3,
  };

  useEffect(() => { }, [userId]);

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

    const fetchData = async () => {
      try {
        const responseSpecialist = await axios.get(`http://localhost:8080/specialist/${userId}`);
        setSpecialistData(responseSpecialist.data);

        const responseCourses = await axios.get(`http://localhost:8080/course/specialist/${userId}`);
        setSpecialistCourses(responseCourses.data);

        let totalCourses = 0;
        let totalDraftCourses = 0;
        let totalLevels = 0;
        let totalDifficulty = 0;

        for (const course of responseCourses.data) {
          totalCourses++;
          if (!course.available) {
            totalDraftCourses++;
          }
          totalDifficulty += difficultyMap[course.difficulty] || 0;

          const courseId = course.id;
          const responseLevels = await axios.get(`http://localhost:8080/level/course/${courseId}`);
          totalLevels += responseLevels.data.length;
        }

        setCreatedCourses(totalCourses);
        setDraftCourses(totalDraftCourses);
        setCreatedLevels(totalLevels);

        if (totalCourses > 0) {
          const averageDifficultyScore = totalDifficulty / totalCourses;
          const averageDifficultyString =
            averageDifficultyScore <= 1.5
              ? 'beginner'
              : averageDifficultyScore <= 2.5
                ? 'intermediate'
                : 'advanced';
          setAverageDifficulty(averageDifficultyString);
          setAverageDifficultyScore(averageDifficultyScore);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  // const getDifficultyIcon = (difficulty) => {
  //   switch (difficulty) {
  //     case 'beginner':
  //       return <FaFeather style={styles.difficultyIcon} />;
  //     case 'intermediate':
  //       return <FaAdjust style={styles.difficultyIcon} />;
  //     case 'advanced':
  //       return <FaFire style={styles.difficultyIcon} />;
  //     default:
  //       return null;
  //   }
  // };

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
    <div style={styles.mainp} >
      <SidebarSpecialist />
      <div style={styles.flex} className="SPcontentContainer">

        <div style={styles.main}>
          <div className="SPwelcomeContainer">
            
              {specialistData && (
                <h1 style={styles.title} className="mb-4">
                  Welcome, dear {specialistData.firstname} {specialistData.lastname}!
                </h1>
              )}
           
          </div>

          <div>
            {/* h4 style={styles.subtitle}  */}
            <h3 style={{ PaddingBottom: '6px', marginLeft: '5px', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)' }}>Overview</h3>

            <div className="stat-div" style={styles.statdiv}>
              <div style={styles.statItem} className="SPoverviewElement">
                <h4>{createdCourses}</h4>
                <p>Created courses</p>
              </div>
              <div style={styles.statItem} className="SPoverviewElement">
                <h4>{draftCourses}</h4>
                <p>Incompleted courses</p>
              </div>
              <div style={styles.statItem} className="SPoverviewElement">
                <h4>{createdLevels}</h4>
                <p>Created levels</p>
              </div>
              <div style={styles.statItem} className="SPoverviewElement" >
                <h4>{averageDifficulty}</h4>
                <p>Average course difficulty ({averageDifficultyScore.toFixed(2)} / 3)</p>
              </div>
            </div>
          </div>
          <div>
            <div className="my-courses">
              <Link to={`/AllCoursesSpecialist/${userId}`} style={styles.link}>
                <h3 style={{ marginLeft: '5px',color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)' }}>
                  My Courses</h3>
              </Link>
              <a href="/AddCourse" className="icon">
                <img src={image.plus} alt="Logo" className="icon" />
              </a>
            </div>
            <div>
              <div className="course-list" style={styles.courseList}>
                {specialistCourses.map((course) => (
                  <Link to={`/ViewCourseSpecialist/${course.id}`} style={styles.link} key={course.id} >

                    <Card
                      className="SPcourse-card"
                      style={styles.courseCard}

                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Card.Img variant="top" src={course.photo} style={styles.cardImage} alt={course.name} />
                      <Card.Body style={styles.cardContent}>
                        <Card.Title style={{fontFamily: 'Orbitron", sans-serif', textAlign: 'center', color: 'white', fontSize: '30px', }}>{course.name}</Card.Title>
                        <Card.Text>
                          {getDifficultyIcon(course.difficulty)} {course.difficulty}
                        </Card.Text>
                        <Card.Text>{course.dateadded}</Card.Text>
                        <h6>Availability: {course.available ? 'true' : 'false'}</h6>
                      </Card.Body>
                    </Card>


                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  welcomeContainer:{
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
  subtitle: {
    // fontSize: 'px',
    color: '#fff',
    marginLeft: '35px',
  },

  mainp: {
    display: 'flex',
    flexDirection: 'row',
  },
  main: {
    //marginLeft: '10px',
  },
  flex: {
    display: 'flex',
    width: '100%',
    // backgroundImage: 'linear-gradient(to right bottom, #042142, #03224c, #092356, #15235f, #232167, #2e2171, #3a207a, #471d83, #551e91, #631d9f, #731bac, #8316b9)',
    paddingTop: '20px',
    color: '#fff',
    backgroundSize: 'cover', /* Cover the entire div */
  backgroundPosition: 'center',  


  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  statdiv: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
    marginLeft: '30px',
  },
  statItem: {
    width: 'calc(50% - 20px)',
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
  },
  cardImage: {
    marginTop: '8px',
    margin: 'auto',
    padding: '6px',
    objectFit: 'cover',
    width: '100%',
    height: '50%',
    display: 'block',
  },
  courseList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '20px',
    marginLeft: '35px',
  },

  courseCard: {
    borderRadius: '0%',
    textAlign: 'left',
    marginLeft: '20px',
    marginBottom: '7px',
    maxWidth: '250px',
    height: '320px',
    // border: '2px solid #7209b7',
    // boxShadow: '0px 0px 10px 3px rgba(138, 43, 226, 0.7)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundImage: 'linear-gradient(rgb(15, 152, 189), rgb(9, 6, 75))',
     boxShadow: 'rgb(77 121 164) 6px 4px 6px, rgba(59, 57, 139, 0.66) -6px -3px 5px, rgb(15 149 187) -4px 3px 5px, rgba(17, 26, 55, 0.44) 4px -3px 5px',
    backdropFilter: 'blur(4.9px)',
    WebkitBackdropFilter: 'blur(4.9px)',
  },

  cardContent: {
    padding: '8px',
    color: '#fff',
  },

  cardTitle: {
    color: 'white',
    textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)',
  },
  difficultyIcon: {
    marginRight: '10px',
    width: '20px',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default SpecialistDashboard;
