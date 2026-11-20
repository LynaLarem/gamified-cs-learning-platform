import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';
import './form.css';
import './styleSP.css';
const AddLevel = () => {
    let navigate = useNavigate();
    const { courseId } = useParams();

    const [level, setLevel] = useState({
        title: "", 
    });

    const { title } = level;

    const showAlertAdd = () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your level has been added successfully.",
          showConfirmButton: false,
          timer: 1500
        });
      };

    const onInputChange = (e) => {
        setLevel({ ...level, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const jwtToken = localStorage.getItem('jwt');
            const config = {
                headers: {
                    //  Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            };

            const formData = new FormData();
              formData.append("title", title);

            await axios.post(`http://localhost:8080/level/course/${courseId}`, formData, config);
            showAlertAdd();
            navigate(`/ViewCourseSpecialist/${courseId}`);
        } catch (error) {
            console.error("Error adding Level:", error.message);
        }
    };

    return (

        <div className="d-flex">
            <SidebarSpecialist />
            <div style={styles.container} >
            <div style={styles.formcontainer} className="col-md-6 offset-md-3  rounded p-4 mb-3">

                  <div style={styles.titleContainer}>
                        <img src={image.level} alt="Course Icon" style={styles.icon} />
                        <h2 style={styles.formtitle} >Add Level</h2>
                    </div>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Level title
                            </label>
                            <input
                            style={styles.input}
                                type="text"
                                className="form-control input-placeholder"
                                placeholder="Enter the level title"
                                name="title"
                                value={title}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>

                        <div style={styles.buttonContainer}>
                        <button className="btn btn-outline-primary mx-2" style={styles.confirmbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.confirmbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.confirmbtn)}
                                type="submit" >Confirm</button>

                            <Link className="btn btn-outline-primary mx-2" to={`/ViewCourseSpecialist/${courseId}`}
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
        background: `url(${image.bgImgage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: ' cover',
        backgroundPosition: 'center',

    },

    formcontainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
       color: 'white',
        backgroundImage: 'linear-gradient(rgb(198 64 111 / 59%),  rgb(9 6 75))',
        boxShadow: 'rgba(174, 83, 144, 0.9) -11px -8px 15px, rgb(13 114 158) 5px -9px 12px, rgb(0 206 255) -3px 2px 5px, rgb(14 109 165) 6px 8px 12px', 
        borderRadius: '10px',  
        height: '370px',
        marginTop: '120px',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    formtitle: {
        marginTop: '2px',
        marginBottum: '1px',
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

export default AddLevel;