import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';
import './style.css';
import './styleSP.css';

const ViewGameSpecialist = () => {
  const navigate = useNavigate();
  const { gameId, courseId } = useParams();
  const [quests, setQuests] = useState([]);

  const fetchGameQuests = async (gameId) => {
    try {
      const response = await axios.get(`http://localhost:8080/quest/gamequests/${gameId}`);
      const questIds = response.data;
      const questDetailsPromises = questIds.map(id => axios.get(`http://localhost:8080/quest/${id}`));
      const questDetails = await Promise.all(questDetailsPromises);
      setQuests(questDetails.map(response => response.data));
    } catch (error) {
      console.error('Failed to fetch quests:', error);
    }
  };

  const showAlertDelete = (entity) => {
    return Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${entity}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#20C620",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `Your ${entity} has been deleted.`,
          icon: "success"
        });
      }
      return result.isConfirmed;
    });
  };

  const deleteGame = async () => {
    const isConfirmed = await showAlertDelete('game');
    if (isConfirmed) {
      try {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
        await axios.delete(`http://localhost:8080/game/${gameId}`, config);
        navigate(`/ViewCourseSpecialist/${courseId}`);
      } catch (error) {
        console.error('Failed to delete game:', error);
      }
    }
  };

  const deleteQuest = async (questId) => {
    const isConfirmed = await showAlertDelete('quest');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/quest/${questId}`);
        setQuests(quests.filter(quest => quest.id !== questId));
      } catch (error) {
        console.error('Failed to delete quest:', error);
      }
    }
  };

  useEffect(() => {
    fetchGameQuests(gameId);
  }, [gameId]);

  return (
    <div style={styles.pageContainer}>
      <SidebarSpecialist />
      <div style={styles.container}>
        <Container fluid>
          <h2 style={{ textAlign: 'center', fontSize: '45px', color: '#fff', marginLeft: '70px', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)' }}>
            Game Questions</h2>

          <Link to={`/ViewCourseSpecialist/${courseId}`} style={styles.backButton}>
            <img src={image.back} alt="Back" style={styles.icon}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            />
          </Link>

          <div style={styles.buttonContainer}>
            <button onClick={deleteGame}
              style={styles.btn}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.btnHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.btn)}
            >Delete Game</button>
            {quests.length < 10 && (
              <Link style={styles.btn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
                to={`/AddQuest/${courseId}/${gameId}`}>
                <button variant="success" style={styles.btn}>Add New Quest</button>
              </Link>
            )}
          </div>



          {quests.map((quest, index) => (
            <Card key={quest.id} style={styles.card}>
              <Card.Header
              style={{fontSize: '1.5rem',backgroundColor: 'rgb(12 194 222 / 78%)', color: 'white' }}
              >Question {index + 1}</Card.Header>
              <Card.Body>
                {quest.question.trim() !== "" ? (
                  <>
                    <Card.Title>{quest.question}</Card.Title>
                    <Card.Text>
                      <strong>Options:</strong>
                      <ul>
                        <li>{quest.option1}</li>
                        <li>{quest.option2}</li>
                        <li>{quest.option3}</li>
                        <li>{quest.option4}</li>
                      </ul>
                      <strong>Right Answer:</strong> Option {quest.rightanswer}
                    </Card.Text>
                  </>
                ) : (
                  <Card.Text style={styles.warningText}>This question doesn't have values yet. Please add values for it to function properly.</Card.Text>
                )}
                <div style={styles.buttonContainer}>

                  <Link to={`/EditQuest/${courseId}/${gameId}/${quest.id}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                    <button style={styles.btn}
                    >Edit</button>
                  </Link>
                  <button button onClick={() => deleteQuest(quest.id)}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteBtnHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteBtn)}
                    style={styles.deleteBtn}> Delete</button>
                </div>
              </Card.Body>
            </Card>
          ))}

        </Container>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    width: '100%',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '2rem',
    position: 'relative',
    background: `url(${image.bgImgage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  backButton: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1000,
  },
  icon: {
    width: '60px',
    height: '60px',
    transition: 'transform 0.3s ease',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    gap: '10px',
  },
  btn: {
    margin: '3px',
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

  btnHover: {
    backgroundColor: '#fff',
    color: '#1babcb',
    border: '2px solid #1babcb',
    transform: 'translateY(-5px)',
  },
  deleteBtn: {
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
  deleteBtnHover: {
    backgroundColor: '#ffffff',
    border: '2px solid #1babcb',
    color: '#1babcb',
    transform: 'translateY(-5px)',
  },





  card: {
    marginBottom: '15px',
    width: '100%',
    backgroundColor: 'transparent',
    border: '3px solid rgb(16 108 155)',
    boxShadow: 'rgb(35 255 255) 2px 6px 13px',
    color: 'white',
    fontSize: '1.2rem',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  editButton: {
    marginRight: '10px',
  },
  deleteButton: {},
  addButton: {
    marginTop: '20px',
    width: '200px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  warningText: {
    color: 'red',
  },
};

export default ViewGameSpecialist;
