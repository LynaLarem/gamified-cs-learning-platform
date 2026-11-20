import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../Style.css';
import SidebarComponent from '../Sidebar';

export default function AddChallenge() {
    let navigate = useNavigate();
    const { type } = useParams();

    const [challenge, setChallenge] = useState({
        description: "",
        title: "",
        coinsreward: "",
        xpreward: "",
        keyreward: "",
        element: "", // Add element attribute
        required: "", // Add required attribute
        type: type === "DAILY" ? "DAILY" : "ACHIEVEMENT", // Set type based on URL param
    });

    const { description, title, coinsreward, xpreward, keyreward, element, required } = challenge;

    const onInputChange = (e) => {
        setChallenge({ ...challenge, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/challenge", challenge);
        navigate(`/AllChallenges`);
    };

    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
            <div className="admincontainer contentCont">
                <div className="row">
                    <div className="col-md-8 offset-md-2 p-4 mt-3 " style={styles.bigcont} >
                        <h2 className="text-center m-4" style={{ color: '#f5f5f5' }}>Add Challenge</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label custom-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label custom-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="coinsreward" className="form-label custom-label">Coins Reward</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the coins reward"
                                    name="coinsreward"
                                    value={coinsreward}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="xpreward" className="form-label custom-label">XP Reward</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the XP reward"
                                    name="xpreward"
                                    value={xpreward}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="keyreward" className="form-label custom-label">Key Reward</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the key reward"
                                    name="keyreward"
                                    value={keyreward}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            {type !== "DAILY" && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="element" className="form-label custom-label">Element</label>
                                        <select
                                            className="form-control"
                                            name="element"
                                            value={element}
                                            onChange={(e) => onInputChange(e)}
                                        >
                                            <option value="">Select Element</option>
                                            <option value="random">random</option>
                                            <option value="lesson">lesson</option>
                                            <option value="game">game</option>
                                            <option value="item">item</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="required" className="form-label custom-label">Required</label>
                                        <input
                                            type="number"
                                            className="form-control custom-input "
                                            placeholder="Enter the required value"
                                            name="required"
                                            value={required}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn btn-success">Submit</button>
                                <Link className="btn btn-danger mx-2" to="/AllChallenges">Cancel</Link>
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
