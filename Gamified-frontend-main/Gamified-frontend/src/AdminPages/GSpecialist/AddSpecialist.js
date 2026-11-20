import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Style.css';
import SidebarComponent from '../Sidebar';


export default function AddSpecialist() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [specialist, setSpecialist] = useState({
        password: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        email: "",
        image: "",
        role: "SPECIALIST",
        gender: "",

    });

    const { password, firstname, lastname, birthdate, image, email, role, gender } = specialist;

    const onInputChange = (e) => {
        setSpecialist({ ...specialist, [e.target.name]: e.target.value });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        // const jwtToken = localStorage.getItem('jwt');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${jwtToken}`,
        //     'Content-Type': 'application/json',
        //   },
        // };
        await axios.post("http://localhost:8080/specialist", specialist);
        navigate(`/AllSpecialists`);
    };


    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
            <div className="admincontainer contentCont">
                <div className="row">
                <div className="col-md-8 offset-md-2 p-4 mt-3 " style={styles.bigcont} >
                        <h2 className="text-center m-4" style={{ color: '#f5f5f5' }}>Add Specialist</h2>

                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label custom-label"> password  </label>
                                <input
                                    type={"text"}
                                    className="form-control custom-input"
                                    placeholder="Enter the password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label custom-label"> firstName  </label>
                                <input
                                    type={"text"}
                                    className="form-control custom-input"
                                    placeholder="Enter the firstName"
                                    name="firstname"
                                    value={firstname}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label custom-label"> lastName  </label>
                                <input
                                    type={"text"}
                                    className="form-control custom-input"
                                    placeholder="Enter the lastName"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="birthdate" className="form-label custom-label"> birthdate  </label>
                                <input
                                    type={"text"}
                                    className="form-control custom-input"
                                    placeholder="Enter the birthdate"
                                    name="birthdate"
                                    value={birthdate}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label custom-label"> email  </label>
                                <input
                                    type={"text"}
                                    className="form-control custom-input"
                                    placeholder="Enter the email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label custom-label"> image  </label>
                                <input
                                    type={"text"}
                                    className="form-control custom-input"
                                    placeholder="Enter the image"
                                    name="image"
                                    value={image}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label custom-label"> Gender  </label>
                                <input
                                    type={"text"}
                                    className="form-control custom-input"
                                    placeholder="Enter The Gender"
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="details btn btn-outline-succes">
                                    Submit
                                </button>
                                <Link className="btn btn-outline-danger mx-2" to="/AllSpecialists">
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
        borderRadius: '10px',
    },
}