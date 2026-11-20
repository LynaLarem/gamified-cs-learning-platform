import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';
import './form.css';
import './styleSP.css';

const EditQuest = () => {
  const navigate = useNavigate();
  const { gameId, questId, courseId } = useParams();

  const [quest, setQuest] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightanswer: "",
  });

  const showAlertEdite = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your changes have been saved successfully.",
      showConfirmButton: false,
      timer: 1500
    });
  };

  useEffect(() => {
    const fetchQuestDetails = async () => {
      try {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.get(`http://localhost:8080/quest/${questId}`, config);
        const data = response.data;

        setQuest({
          question: data.question,
          option1: data.option1,
          option2: data.option2,
          option3: data.option3,
          option4: data.option4,
          rightanswer: data.rightanswer,
        });
      } catch (error) {
        console.error('Error fetching quest details:', error.message);
      }
    };

    fetchQuestDetails();
  }, [questId]);

  const onInputChange = (e) => {
    setQuest({ ...quest, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = localStorage.getItem('jwt');
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      };

      await axios.put(`http://localhost:8080/quest/${questId}`, quest, config);
      showAlertEdite();
      navigate(`/ViewGameSpecialist/${courseId}/${gameId}`);
    } catch (error) {
      console.error('Error updating Quest:', error.message);
    }
  };

  return (
    <div className="d-flex">
      <SidebarSpecialist />
      <div style={styles.container} >
        <div style={styles.formcontainer} className="col-md-6 offset-md-3  rounded p-4 mt-3 mb-3">

          <div style={styles.titleContainer}>
            <img src={image.quest} alt="Course Icon" style={styles.icon} />
            <h2 style={styles.formtitle} >Edit Quest</h2>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
              style={styles.input}
                name="question"
                value={quest.question}
                onChange={onInputChange}
                className="form-control input-placeholder"
                rows={4}
                placeholder="Question"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Option 1</label>
              <input
              style={styles.input}
                type="text"
                name="option1"
                value={quest.option1}
                onChange={onInputChange}
                className="form-control input-placeholder"
                placeholder="Option 1"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Option 2</label>
              <input
              style={styles.input}
                type="text"
                name="option2"
                value={quest.option2}
                onChange={onInputChange}
                className="form-control input-placeholder"
                placeholder="Option 2"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Option 3</label>
              <input
              style={styles.input}
                type="text"
                name="option3"
                value={quest.option3}
                onChange={onInputChange}
                className="form-control input-placeholder"
                placeholder="Option 3"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Option 4</label>
              <input
              style={styles.input}
                type="text"
                name="option4"
                value={quest.option4}
                onChange={onInputChange}
                className="form-control input-placeholder"
                placeholder="Option 4"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Right Answer</label>
              <select
              style={styles.input}
                name="rightanswer"
                value={quest.rightanswer}
                onChange={onInputChange}
                className="form-control"
              >
                <option value="">Select Right Answer</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </select>
            </div>

            <div style={styles.buttonContainer}>

                            <button className="btn btn-outline-primary mx-2" style={styles.confirmbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.confirmbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.confirmbtn)}
                                type="submit" >Save changes</button>

                            <Link className="btn btn-outline-primary mx-2"
                              to={`/ViewGameSpecialist/${courseId}/${gameId}`}
                            style={styles.linkbtn}
                            onMouseEnter={(e) => Object.assign(e.target.style, styles.linkbtnHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, styles.linkbtn)}>
                                Cancel
                            </Link>

                            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
container: {
  width: '100%',
  display: 'flex',
  height: '100%',
  background: `url(${image.bgImgage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: ' cover',
  backgroundPosition: 'center',

},
  formcontainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
   color: 'white',
    backgroundImage: 'linear-gradient(rgb(198 64 111 / 59%),  rgb(9 6 75))',
    boxShadow: 'rgba(174, 83, 144, 0.9) -11px -8px 15px, rgb(13 114 158) 5px -9px 12px, rgb(0 206 255) -3px 2px 5px, rgb(14 109 165) 6px 8px 12px', 
    borderRadius: '10px',  
},
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'column',
  },
  formtitle: {
    marginTop: '2px',
    marginBottum: '5px',
    textAlign: 'center',

  },
  icon: {
    width: '150px',
    height: '150px',

  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //   marginBottom: '10px',
    marginTop: '10px',
},
confirmbtn: {
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


linkbtn: {
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


linkbtnHover: {
    backgroundColor: '#1babcb',
    color: '#fff',
    transform: 'translateY(-5px)',

},

confirmbtnHover: {
    backgroundColor: '#ffffff',
    border: '2px solid #1babcb',
    color: '#1babcb',
    transform: 'translateY(-5px)',

},
input: {
  backgroundColor: '#07064652',
  color: 'rgb(0, 209, 255)',
  border: '2px solid rgb(0, 209, 255)',
},
};
export default EditQuest;
