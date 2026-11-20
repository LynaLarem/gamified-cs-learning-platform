import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import CoinsModal from '../Modal_Windows/CoinsModal';
import SidebarSt from './SidebarSt';

const ViewLesson = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [stepIndex, setStepIndex] = useState('');
  const [previousStep, setPreviousStep] = useState('');
  const [nextStep, setNextStep] = useState('');
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [courseId, setCourseId] = useState('');
  const [end, setEnd] = useState(false);
  //const [allsteps, setSteps] = useState([]);
  const [showCoinsModal, setShowCoinsModal] = useState(false);
  const [coinsModalTitle, setCoinsModalTitle] = useState('');
  const [coinsModalMessage, setCoinsModalMessage] = useState('');


  const handlePrevious = async () => {
    if (previousStep.steptype === "lesson") {
      navigate(`/ViewLesson/${previousStep.id}`);
    } else {

      navigate(`/ViewGame/${previousStep.id}`);
    }

  }

  const handleNext = async () => {

    if (userRole === '') {
      setCoinsModalTitle('You cannot continue!');
      setCoinsModalMessage('To be able to continue, you need to be signed in with a student account.');
      setShowCoinsModal(true);
    } else {
      const exists = await axios.get(`http://localhost:8080/enrollement/exists/${userId}/${courseId}`);
      console.log(exists);
      if (userRole === "STUDENT" && exists.data === false) {
        setCoinsModalTitle('You cannot continue!');
        setCoinsModalMessage('To be able to continue, you need to be enrolled in the course first.');
        setShowCoinsModal(true);
      } else {
        const response = await axios.get(`http://localhost:8080/enrollement/currentstep/${userId}/${courseId}`);
        console.log(response.data);
        console.log(response.data == lessonId);
        if (response.data == lessonId) {
          await axios.patch(`http://localhost:8080/enrollement/currentstep/${userId}/${courseId}`, { currentstep: nextStep.id });
          console.log("patch");
          await axios.put(`http://localhost:8080/enrollement/completedlessons/${userId}/${courseId}`);
          console.log("put");
          await axios.put(`http://localhost:8080/challengestate/progress/${userId}/lesson`);
          console.log("put2");
        }
        if (nextStep.steptype === "lesson") {
          navigate(`/ViewLesson/${nextStep.id}`);
        } else {
          try {
            const response = await axios.get(`http://localhost:8080/quest/gamequests/${nextStep.id}`);
            const arrayData = response.data;
            const quest = arrayData.join(',');

            // Store array data in local storage
            localStorage.setItem("arrayData", quest);
            localStorage.setItem("courseId", courseId);

            const response2 = await axios.get(`http://localhost:8080/game/steporder/${nextStep.id}`);
            const steporder = response2.data;

            const studentid = localStorage.getItem("studentId");
            const response3 = await axios.get(`http://localhost:8080/enrollement/currentstep/${studentid}/${courseId}`);
            const currentstep = response3.data;
            const shouldupdate = currentstep == nextStep.id;

            localStorage.setItem("shouldupdate", shouldupdate);


            // Navigate to the ViewGame component
            navigate(`/ViewGame/${nextStep.id}`);
          } catch (error) {
            console.error('Failed to fetch array data:', error);
          }
          navigate(`/ViewGame/${nextStep.id}`);
        }
      }
    }
  }

  const handleComplete = async () => {
    const newState = "completed";
    await axios.patch(`http://localhost:8080/enrollement/${userId}/${courseId}`, { state: newState });
    const correctanswers = await axios.get(`http://localhost:8080/enrollement/correctanswers/${userId}/${courseId}`);
    console.log(correctanswers);
    const wronganswers = await axios.get(`http://localhost:8080/enrollement/wronganswers/${userId}/${courseId}`);
    console.log(wronganswers);
    const msg = "You completed a course. You got " + correctanswers.data + " correct answers and " + wronganswers.data + " wrong answers in total.";
    setCoinsModalTitle('Congratulations!');
    setCoinsModalMessage(msg);
    setShowCoinsModal(true);
  }

  const closeCoinsModal = () => {
    setShowCoinsModal(false);
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
        'Content-Type': 'application/json',
      },
    };

    axios.get(`http://localhost:8080/lesson/${lessonId}`, config)
      .then(response => {
        console.log(response.data);
        const data = response.data;
        setLesson(data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [lessonId]);

  const getPreviousAndNextStepsIds = async () => {
    const response1 = await axios.get(`http://localhost:8080/lesson/${lessonId}`);
    //const levelId = response1.data.level.id;
    const courseID = response1.data.level.course.id;
    setCourseId(courseID);

    const response = await axios.get(`http://localhost:8080/level/allsteps/course/${courseID}`);
    const allsteps = response.data;
    // console.log(steps);
    // setSteps(steps);
    console.log(allsteps);
    const index = allsteps.findIndex(step => step.id == lessonId);
    console.log(lessonId);
    setStepIndex(index);
    console.log(index);
    if (index !== 0 && index < allsteps.length - 1) {
      setPreviousStep(allsteps[index - 1]);
      console.log(previousStep);
    }
    if (index < allsteps.length - 1) {
      setNextStep(allsteps[index + 1]);
    }
    if (index === allsteps.length - 1) {
      setEnd(true);
    } else {
      setEnd(false);
    }
  }

  useEffect(() => {
    getPreviousAndNextStepsIds();
  }, [lessonId]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='d-flex'>
        <SidebarSt />
        <div className='contentContainer' >
          <Container className="mt-5" style={styles.lessonContainer}>
            <Card style={styles.lessonCard}>
              <Card.Header style={styles.lessonHeader} as="h3">Step {stepIndex + 1}: Lesson</Card.Header>
              <Card.Body style={styles.lessonBody}>

                <Card.Text>{lesson.content}</Card.Text>

              </Card.Body>
              <Card.Footer style={styles.lessonFooter}>
                {previousStep !== '' && <Button onClick={handlePrevious} className='nextprevbtn'>Previous</Button>}
                {nextStep !== '' && <Button onClick={handleNext}  className='nextprevbtn'>Next</Button>}
                {end === true && <Button onClick={handleComplete} className='nextprevbtn'>Finish!</Button>}
              </Card.Footer>
            </Card>
          </Container>
        </div>
      </div>
      <CoinsModal
        show={showCoinsModal}
        onHide={closeCoinsModal}
        title={coinsModalTitle}
        message={coinsModalMessage}
      />
    </>
  );
};

const styles = {
  lessonContainer: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0',
  },
  lessonCard: {
    height: '70vh',
    width: '50vw',
    padding: '2vw',
    background: 'rgba(224, 9, 70, 0.6)',
    borderRadius: '16px',
    boxShadow: '0 0 15px 2px rgba(224, 9, 70, 0.7)',
    backdropFilter: 'blur(4.9px)',
  },
  lessonHeader:{
    letterSpacing: '2px',
    color: 'rgba(8, 234, 253, 0.7)', 
    textShadow: '-1px 0 rgba(8, 234, 253, 0.7), 0 2px rgba(8, 234, 253, 0.7), 1px 0 rgba(8, 234, 253, 0.7), 0 -1px rgba(8, 234, 253, 0.7)'
  },
  lessonFooter:{
    display: 'flex',
    justifyContent: 'space-between'
  },
  lessonBody:{
    color: 'white',
    textShadow: '-1px 0 #351546, 0 2px #351546, 1px 0 #351546, 0 -1px #351546',
  }
}

export default ViewLesson;
