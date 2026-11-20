import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as image from '../Images';
import { useSearchContext } from '../Navbar/SearchContext';
import SidebarSpecialist from './SidebarSpecialist';


import './styleSP.css';

const AllCoursesSpecialist = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { specialistId } = useParams();
  const { searchResults, searched } = useSearchContext();

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


  const handleDelete = (course) => {
    showAlertDelete("course").then((confirmed) => {
      if (confirmed) {
        deleteCourse(course);
      }
    });
  };

  const deleteCourse = async (course) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.delete(`http://localhost:8080/course/${course.id}`, config);
      loadCourses(); // Recharger la liste des cours après la suppression réussie
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };


  const handleEdit = (course) => {
    navigate(`/EditCourse/${course.id}`);
  }


  const handleView = (course) => {
    navigate(`/ViewCourseSpecialist/${course.id}`);
  }
  useEffect(() => {

    loadCourses();
  }, [specialistId]);

  const loadCourses = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:8080/course/specialist/' + specialistId, config)
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
      });
  }

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
    <div style={styles.mainp}>

      <SidebarSpecialist />


      <div style={styles.flex}>
        <div>

          <div className="my-courses">
            <h1 style={{ fontSize: '45px', color: '#fff', marginLeft: '70px', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)' }}>My courses</h1>
            <a href="/AddCourse" className="icon">
              <img src={image.plus} alt="Logo" className="icon" />
            </a>
          </div>
          <div style={styles.courseList}>

            {searched && searchResults.length === 0 && <p>No results found.</p>}

            {!searched &&
              courses.map(course => (

                <div key={course.id} style={styles.courseList}>
                  <Card style={styles.courseCard} >
                    <Card.Img
                      variant="top"
                      src={course.photo}
                      style={styles.cardImage}
                      alt={course.name}
                    />
                    <Card.Body style={styles.cardContent}>
                      <Card.Title style={{ fontFamily: 'Orbitron", sans-serif', textAlign: 'center', color: 'white', fontSize: '30px', }}>{course.name}</Card.Title>
                      {/* <div style={{ width: '1px', height: '20px', background: 'gray', margin: '0 10px' }}></div> */}
                      <Card.Text>
                        {getDifficultyIcon(course.difficulty)} {course.difficulty}
                      </Card.Text>
                      {/* <Card.Text>Date Added: {course.dateadded}</Card.Text> */}
                      <h6>Availability: {course.available ? 'true' : 'false'}</h6>


                      <div style={styles.buttonContainer}>
                        <button style={styles.viewBtn}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteBtnHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteBtn)}
                          onClick={() => handleView(course)} >View</button>


                        <button style={styles.editBtn}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.editBtnHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.editBtn)}
                          onClick={() => handleEdit(course)} >Edit</button>

                        <button style={styles.deleteBtn}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteBtnHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteBtn)}
                          onClick={() => handleDelete(course)} >Delete</button>



                      </div>

                    </Card.Body>
                  </Card>
                </div>
              ))
            }

            {searched && searchResults.length > 0 && (
              searchResults.map(course => (
                <div key={course.id} style={styles.courseList}>
                  <Card style={styles.courseCard} >
                    <Card.Img
                      variant="top"
                      src={course.photo}
                      style={styles.cardImage}
                      alt={course.name}
                    />
                    <Card.Body style={styles.cardContent}>
                      <Card.Title style={{ fontFamily: 'Orbitron", sans-serif', textAlign: 'center', color: 'white', fontSize: '30px', }}>{course.name}</Card.Title>
                      {/* <div style={{ width: '1px', height: '20px', background: 'gray', margin: '0 10px' }}></div> */}
                      <Card.Text style={styles.cardText}>
                        {getDifficultyIcon(course.difficulty)} {course.difficulty}
                      </Card.Text>
                      {/* <Card.Text>Date Added: {course.dateadded}</Card.Text> */}

                      <h6>Availability: {course.available ? 'true' : 'false'}</h6>


                      <div style={styles.buttonContainer}>
                        <button style={styles.viewBtn}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteBtnHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteBtn)}
                          onClick={() => handleView(course)} >View</button>


                        <button style={styles.editBtn}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.editBtnHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.editBtn)}
                          onClick={() => handleEdit(course)} >Edit</button>

                        <button style={styles.deleteBtn}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteBtnHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteBtn)}
                          onClick={() => handleDelete(course)} >Delete</button>



                      </div>

                    </Card.Body>
                  </Card>
                </div>
              ))
            )}

          </div>
        </div>      </div>
    </div>
  );
};



const styles = {
  title: {
    fontSize: '35px',
    color: '#fff',
    marginLeft: '35px',

  },
  mainp: {
    display: 'flex',
    flexDirection: 'row',
  },
  flex: {
    // display: 'flex',
    // flexDirection: 'column',
    background: `url(${image.bgImgage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: ' cover',
    backgroundPosition: 'center',
    paddingTop: '20px',
    width: '100%',

  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: '#ccc',
    color: '#000',

  },
  ImageStyled: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  courseList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '20px',
  },

  cardImage: {
    width: '100%',
    height: '40%',
    marginTop: '8px',
    margin: 'auto',
    objectFit: 'cover',
    display: 'block',
    padding: '5px',
    //  borderRadius : '20%',
    // border:  '5px solid violet',
  },

  courseCard: {
    borderRadius: '0%',
    textAlign: 'left',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '20px',
    maxWidth: '270px',
    height: '330px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',

    backgroundImage: 'linear-gradient(rgb(15, 152, 189), rgb(9, 6, 75))',
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

  cardContent: {
    padding: '8px',
    color: '#fff',
  },

  // cardTitle: {
  //   color: 'white',
  //   textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)',
  // },
  difficultyIcon: {
    marginRight: '10px',
    width: '20px',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    display: 'flex',
    gap: '10px'
  },
  viewBtn: {
    marginRight: '65px',
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


  editBtn: {
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

  deleteBtn: {
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
  editBtnHover: {
    backgroundColor: '#1babcb',
    color: '#fff',
    transform: 'translateY(-5px)',

  },

  deleteBtnHover: {
    backgroundColor: '#ffffff',
    border: '2px solid #1babcb',
    color: '#1babcb',
    transform: 'translateY(-5px)',

  },
};

export default AllCoursesSpecialist;
