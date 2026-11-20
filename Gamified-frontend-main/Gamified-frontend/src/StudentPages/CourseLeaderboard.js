import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Stack from 'react-bootstrap/Stack';
import {Card, Accordion, Image, Nav, Button, Tab, Table} from 'react-bootstrap';

const CourseLeaderboard = () => {
    const { courseId } = useParams();
    const [students, setStudents] = useState([]);
    const [top, setTop] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadStudents();
      }, []);

      const loadStudents = async () => { 
      
          fetch(`http://localhost:8080/enrollement/leaderboard/${courseId}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              setStudents(data);
              console.log(students);
              console.log(top);
              setIsLoading(false);
            })
            .catch(error => {
              setError(error.message);
              setIsLoading(false);
            })
       };

  return (
    <div style={styles.leaderboardContainer}>
    <h1 style={{color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>Leaderboard</h1>
    
    <Stack gap={2} style={{padding: '6px'}}>
    <div
            className="p-2 leaderboardElement" style={styles.leaderboardTitle}> 
          <div style={{display: 'flex'}}>
                <div className='leaderboardNumber' style={{marginRight: '60px'}}>#</div> 
                {/* <Image className="student-img" src={student.image} roundedCircle style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight:'10px'}}/> */}
                <div className="leaderboardNumber" style={{fontSize: '14px', marginRight: '30px'}}>Name</div> 
           </div>
           <div className="leaderboardNumber" style={styles.leaderboardText}>Answers</div>
        </div>
    {students.map((student, index)=> (
        <div key={student.id}
            className="p-2 leaderboardElement" style={styles.leaderboardElement}> 
          
                <div className='leaderboardNumber' style={{marginRight: '10px'}}>{index + 1}</div> 
                <div style={styles.studentLeaderboardDetails}>
                <Image className="student-img" src={student.student.image} roundedCircle style={styles.leaderboardImage}/>
                <div className="leaderboardText" style={styles.leaderboardText}>{student.student.firstname} {student.student.lastname}</div> 
           </div>
           <div className="leaderboardScore" style={styles.leaderboardScore}>{student.correctanswers}</div>
        </div>
    ))}
    </Stack>
    </div>
  );
};

const styles ={
  leaderboardContainer:{
    width: '22vw',
    padding: '0.5vw',
  },
  leaderboardTitle:{
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    width: '85%',
    height: '30px'
  },
  leaderboardElement:{
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '85%',
    height: '40px'
  },
  leaderboardNumber:{
    padding: '0vw 1vw 0vw 1vw',
  },
  studentLeaderboardDetails:{
    width: '10vw',
    display: 'flex',
    alignItems: 'center',
    margin: '0vw'
  },
  leaderboardImage:{
    width: '2.5vw', 
    height: '2.5vw', 
    borderRadius: '50%', 
    marginRight:'0.5vw'
  },
  leaderboardText:{
    marginTop: '0',
  },
  leaderboardScore:{
    marginTop: '0',
    textAlign: 'right',
    width:'4.5vw'
  }
};

export default CourseLeaderboard;