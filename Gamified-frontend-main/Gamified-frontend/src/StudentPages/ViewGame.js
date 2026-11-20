import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Unity, useUnityContext } from "react-unity-webgl";
import axios from 'axios';
import CoinsModal from "../Modal_Windows/CoinsModal";
import { jwtDecode } from 'jwt-decode';

const ViewGame = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();

  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [end, setEnd] = useState(false);
  const [stepIndex, setStepIndex] = useState('');
  const [previousStep, setPreviousStep] = useState('');
  const [nextStep, setNextStep] = useState('');

  const [showCoinsModal, setShowCoinsModal] = useState(false);
  const [coinsModalTitle, setCoinsModalTitle] = useState('');
  const [coinsModalMessage, setCoinsModalMessage] = useState('');

  const { unityProvider, sendMessage, isLoaded, requestFullscreen } = useUnityContext({
    loaderUrl: process.env.PUBLIC_URL + "/doorgame/Build/doorgame.loader.js",
    dataUrl: process.env.PUBLIC_URL + "/doorgame/Build/doorgame.data",
    frameworkUrl: process.env.PUBLIC_URL + "/doorgame/Build/doorgame.framework.js",
    codeUrl: process.env.PUBLIC_URL + "/doorgame/Build/doorgame.wasm",
  });


  function setstudentid() {
    const studentid = localStorage.getItem("studentId")
    sendMessage("Maincamera", "setstudentid", studentid);

    const quest = localStorage.getItem("arrayData")
    sendMessage("Maincamera", "setquests", quest);

    const courseid = localStorage.getItem("courseId")
    sendMessage("Maincamera", "setcourseid", courseid);

    const shouldupdate = localStorage.getItem("shouldupdate")
    sendMessage("Maincamera", "setshouldupdate", shouldupdate.toString());

  }

  const getPreviousAndNextStepsIds = async () => {
    const response1 = await axios.get(`http://localhost:8080/game/${gameId}`);
    //const levelId = response1.data.level.id;
    const courseID = response1.data.level.course.id;
    setCourseId(courseID);

    const response = await axios.get(`http://localhost:8080/level/allsteps/course/${courseID}`);
    const allsteps = response.data;
    // console.log(steps);
    // setSteps(steps);
    console.log(allsteps);
    const index = allsteps.findIndex(step => step.id == gameId);
    console.log(gameId);
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
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log(decodedToken);
        setUserId(decodedToken.userId);
        console.log(userId);
      } catch (error) {
        console.error('Invalid or expired token:', error);
        localStorage.removeItem('jwt');
      }
    }
    getPreviousAndNextStepsIds();
  }, [gameId]);

  useEffect(() => {
    console.log("Loaded: " + isLoaded);

    // Define a function to execute setstudentid() after 5 seconds
    const delayedsetstudentidExecution = () => {
      console.log("Executing setstudentid()");
      setstudentid();
    };

    // If isLoaded is false, wait for 5 seconds before executing setstudentid()
    if (!isLoaded) {
      const timeoutId = setTimeout(delayedsetstudentidExecution, 5000); // 5000 milliseconds = 5 seconds

      // Clean up the timeout if the component unmounts or isLoaded becomes true before the timeout
      return () => clearTimeout(timeoutId);
    }

    // If isLoaded is true, log a message
    console.log("Component is loaded");

    // This block will execute if isLoaded is true
    if (isLoaded) {
      setstudentid();
    } else {
      console.log("not yet");
    }

    // Add event listener to listen for messages from Unity
    window.redirecttolevel = async function () {
      // Define the behavior of redirecttolevel function
      //navigate('/Allcourses');
      if (end === false) {


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
      } else {
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
    };
    window.lostthegame = function () {
      // Define the behavior of redirecttolevel function
      navigate('/StudentDashboard');
    };
    const handleKeyDown = (event) => {
      // Check if F11 is pressed
      if (event.key === "F11") {
        // Prevent the default F11 action
        event.preventDefault();
        // Enable fullscreen mode
        requestFullscreen(true);
      }
    };

    // Add event listener for keydown events
    document.addEventListener('keydown', handleKeyDown);
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('redirecttolevel', window.redirecttolevel);
      window.removeEventListener('lostthegame', window.lostthegame);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoaded, requestFullscreen]); // Dependency array ensures this effect runs only when isLoaded changes

  const closeCoinsModal = () => {
    setShowCoinsModal(false);
    navigate(`/ViewCourse/${courseId}`)
  };

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", overflow: 'hidden' }}>
        <Unity unityProvider={unityProvider} style={{ width: "100vw", height: "100vh" }} />
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

export default ViewGame;
