import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import { jwtDecode } from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Stack, ProgressBar } from 'react-bootstrap';
import SidebarSt from './SidebarSt';
import { Padding } from '@mui/icons-material';


const Achievements = () => {


  const [userId, setUserId] = useState('');
  const [challenges, setChallenges] = useState([]);

  const MAX_CHARACTERS = 255;


  useEffect(() => {
    loadChallenges();
  }, [userId]);

  const loadChallenges = async () => {
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`http://localhost:8080/challengestate/achievement/${userId}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setChallenges(data);
        console.log(challenges);
        //console.log(top);
        //   setIsLoading(false);
      })
      .catch(error => {
        //   setError(error.message);
        //   setIsLoading(false);
        console.error(error);
      })
  };

  const handleClaim = async (challengeId) => {
    const response = await axios.patch(`http://localhost:8080/challengestate/completed/${userId}/${challengeId}`, {
      completed: 1,
    });
    console.log(response.data);
    const response2 = await axios.patch(`http://localhost:8080/challengestate/rewardtaken/${userId}/${challengeId}`, {
      rewardtaken: 1,
    });
    console.log(response2.data);
  }

  return (
    <div className='d-flex'>
      <SidebarSt />
      <div className="contentContainer">
        <h1 style={{padding:'20px 0 0 40px', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>Achievements</h1>
      <Stack direction="vertical" gap={3} style={{ width: '50vw', padding: '1%', marginLeft: '16vw'}}>

        {challenges.map(challenge => {
          let nbr;
          const progressPercentage = Math.min((challenge.progress * 100) / challenge.challenge.required, 100);
          if (challenge.progress > challenge.challenge.required) {
            nbr = challenge.challenge.required;
          } else {
            nbr = challenge.progress;
          }
          return (
            <div key={challenge.id} className="border rounded" style={{padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
              <h5 style={{fontWeight:'800'}}>{challenge.challenge.title}</h5>
              <p style={{fontWeight:'600'}}>{challenge.challenge.description}</p>
              <div style={{display: 'flex',
                    justifyContent:'space-between',
                    alignItems: 'center',
                    marginTop: '-10px'
              }}>
              <ProgressBar
                variant="success"
                now={progressPercentage}
                label={`${progressPercentage}%`} style={{width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
              />
              <p style={{fontWeight:'700', PaddingTop:'6px'}}>{nbr}/{challenge.challenge.required}</p>
              {progressPercentage === 100 && challenge.rewardtaken === 0 ? (
                <Button onClick={() => handleClaim(challenge.challenge.id)}>Claim reward</Button>
              ) : (progressPercentage === 100 && challenge.rewardtaken === 1 ? (
                <Button style={{backgroundColor: 'rgba(8, 234, 253, 0.7)', color: '#351546', letterSpacing: '1px', fontWeight: 'bold'}} disabled>Claimed</Button>
              ) : null
              )}
              </div>
            </div>
          );
        })}

      </Stack>
      </div>
    </div>
  );
}

export default Achievements;
