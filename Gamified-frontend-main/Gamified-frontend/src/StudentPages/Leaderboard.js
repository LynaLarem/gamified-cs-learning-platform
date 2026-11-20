import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from 'react-bootstrap/Stack';
import { Card, Accordion, Image, Nav, Button, Tab, Table } from 'react-bootstrap';
import SidebarSt from './SidebarSt';

function Leaderboard() {
  const [students, setStudents] = useState([]);
  const [top, setTop] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {

    fetch('http://localhost:8080/student/leaderboard')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStudents(data.slice(3));
        console.log(students);
        setTop(data.slice(0, 3));
        setTop(prevTop => {
          // Switch elements at index 0 and index 1 of topData
          const switchedTopData = [...prevTop];
          if (switchedTopData.length >= 2) {
            [switchedTopData[0], switchedTopData[1]] = [switchedTopData[1], switchedTopData[0]];
          }
          return switchedTopData;
        });

        console.log(top);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      })
  };

  return (
    <>
      <div className='d-flex'>
        <SidebarSt />
        <div className='contentContainer'>
          <h1 style={{padding:'20px 0 0 40px', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>Leaderboard</h1>
          <div className='leaderboardFr' style={styles.leaderboardFr}>
            <Stack gap={4}>

                <Stack direction="horizontal" gap={2} style={styles.horStack}>
                  {top.map((student, index) => (
                    <div key={student.id} className="p-2" style={{
                      borderRadius: '8px',
                      boxShadow: ' 0 4px 30px rgba(11, 255, 255, 0.8)',
                      height: `${index === 0 ? '230px' : index === 1 ? '250px' : '210px'}`,
                      width: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(11, 255, 255, 0.68)',
                      backdropFilter: 'blur(4.8px)',

                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100px'
                      }}>
                        <p style={{ margin: '0px', fontSize: `${index === 0 ? '25px' : index === 1 ? '27px' : '23px'}`, fontWeight: 'bold', textShadow: '-2px 0 rgba(149, 15, 60, 0.6), 0 1px rgba(149, 15, 60, 0.6)' }}>{index === 0 ? '2' : index === 1 ? '1' : '3'}</p>
                        <Image className="student-img" src={student.image} roundedCircle style={{ width: `${index === 0 ? '50px' : index === 1 ? '60px' : '45px'}`, height: `${index === 0 ? '50px' : index === 1 ? '60px' : '45px'}`, borderRadius: '50%' }} />
                        <div style={{
                          marginBottom: '15px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}>
                          <p style={{ margin: '0px', fontSize: `${index === 0 ? '16px' : index === 1 ? '18px' : '14px'}` , fontWeight: 'bold', textShadow: '-1px 0 #ffffff, 0 1px #ffffff' }}>{student.firstname}</p>
                          <p style={{ margin: '0px', fontSize: `${index === 0 ? '16px' : index === 1 ? '18px' : '14px'}`  , fontWeight: 'bold', textShadow: '-1px 0 #ffffff, 0 1px #ffffff'}}> {student.lastname}</p>
                        </div>
                        <div style={{fontWeight: 'bold', textShadow: '-1px 0 #ffffff, 0 1px #ffffff'}}>{student.score}</div>
                      </div>

                    </div>
                  ))}
                </Stack>

              <Stack gap={3}>
                {students.map((student, index) => (
                  <div key={student.id}
                    className="p-2 leaderboardElement" style={styles.leaderboardElement}>
                    <div style={{ display: 'flex' }}>
                      <div className='leaderboardNumber' style={styles.leaderboardNumber}>{index + 4}</div>
                      <Image className="leaderboardImage" src={student.image} roundedCircle style={styles.leaderboardImage} />
                      <div className='leaderboardText' style={{marginTop:'8px'}}>{student.firstname} {student.lastname}</div>
                    </div>
                    <div className='leaderboardNumber'>{student.score}</div>
                  </div>
                ))}
              </Stack>

            </Stack>
          </div>

        </div>
      </div>
    </>
  );
};

const styles = {
  leaderboardContainer:{

  },
  leaderboardFr:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '30%',
      margin: '0 auto'
  },
  leaderboardElement:{
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '50px',
    boxShadow: '0 0 15px -2px rgba(255, 51, 118, 0.6)',
    background: 'rgba(255, 51, 118, 0.6)',
    bordeRadius: '16px',
    boxShadow: '0 0 15px -2px rgba(255, 51, 118, 0.48)',
    backdropFilter: 'blur(4.9px)',
    },

      leaderboardNumber:{
        fontSize: '22px',
      padding: '0vw 1vw 0vw 2vw',
      margin: '6px 10px 0 0'
  },

  studentLeaderboardDetails:{
    width: '10vw',
    display: 'flex',
    alignItems: 'center',
    margin: '0vw'
  },
  horStack:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

  leaderboardImage:{
    width: '3vw', 
    height: '3vw', 
    borderRadius: '50%', 
    marginRight:'1.5vw', 
  },
}

export default Leaderboard;