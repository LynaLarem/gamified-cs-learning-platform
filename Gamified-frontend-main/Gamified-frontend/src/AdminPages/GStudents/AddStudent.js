import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Style.css';
import SidebarComponent from '../Sidebar';

export default function AddStudent() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [student, setStudent] = useState({
        password: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        email: "",
        image: "",
        role: "STUDENT",
        studylvl: "",
        gender: "",
        level: 1,
        xp: 0,
        itemsbought: 0,
        keysleft: 0,
        openedchests: 0,
        coins: 0,
        hearts: 5,
        score: 0,
    });

    const { password, firstname, lastname, birthdate, image, email, role, studylvl, gender, level,
        xp, itemsbought, keysleft, openedchests, coins, hearts, score
    } = student;

    const onInputChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/student", student);
        navigate(`/AllStudents`);
    };

    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
            <div className="admincontainer contentCont">
                <div className="row">
                    <div className="col-md-8 offset-md-2 p-4 mt-3 " style={styles.bigcont} >
                        <h2 className="text-center m-4" style={{ color: '#f5f5f5' }}>Add Student</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label custom-label">Password</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label custom-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the first name"
                                    name="firstname"
                                    value={firstname}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label custom-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the last name"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="birthdate" className="form-label custom-label">Birthdate</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the birthdate"
                                    name="birthdate"
                                    value={birthdate}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label custom-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label custom-label">Image</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the image URL"
                                    name="image"
                                    value={image}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="studylvl" className="form-label custom-label">Study Level</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the study level"
                                    name="studylvl"
                                    value={studylvl}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label custom-label">Gender</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the gender"
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="details btn btn-outline-success mx-2">
                                    Submit
                                </button>
                                <Link className="btn btn-outline-danger mx-2" to="/AllStudents">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .custom-label {
                        color: #f5f5f5;
                    }
                    .custom-input {
                            background-color: rgba(169, 169, 169, 0.4);
                            color: #f5f5f5;
                            border-color: #888;
                        }
                        .custom-input::placeholder {
                            color: #bbb;
                        }
                        .custom-input:focus {
                            background-color: rgba(169, 169, 169, 0.4);
                            border-color: #777;
                            color: #fff;
                        }
                        input:-webkit-autofill,
                        input:-webkit-autofill:hover,
                        input:-webkit-autofill:focus,
                        input:-webkit-autofill:active {
                            -webkit-box-shadow: 0 0 0 30px rgba(169, 169, 169, 0.4) inset !important;
                            -webkit-text-fill-color: #f5f5f5 !important;
                            transition: background-color 5000s ease-in-out 0s;
                        }
                `}
            </style>
        </div>
    );
}
const styles = {
    bigcont: {
        background: 'rgba(33, 84, 172, 0.7)',
        borderradius: '16px',
        boxshadow: '0 0 15px -2px rgba(11, 255, 255, 0.72)',
        borderRadius:'10px',
      },
}
