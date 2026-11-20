import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Style.css';
import SidebarComponent from '../Sidebar';

export default function EditChallenge() {
    let navigate = useNavigate();

    const { id, type } = useParams();

    const [challenge, setChallenge] = useState({
        description: "",
        title: "",
        coinsreward: "",
        xpreward: "",
        keyreward: "",
        type: type === "DAILY" ? "DAILY" : "ACHIEVEMENT", // Set type based on URL param
    });

    const { description, title, coinsreward, xpreward, keyreward } = challenge;

    const onInputChange = (e) => {
        setChallenge({ ...challenge, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadChallenge();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            description,
            title,
            coinsreward,
            xpreward,
            keyreward,
            type,
        };
        // const jwtToken = localStorage.getItem('jwt');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${jwtToken}`,
        //     'Content-Type': 'application/json',
        //   },
        // };
        await axios.put(`http://localhost:8080/challenge/${id}`, payload);
        navigate(`/AllChallenges`);
    };

    const loadChallenge = async () => {
        // const jwtToken = localStorage.getItem('jwt');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${jwtToken}`,
        //     'Content-Type': 'application/json',
        //   },
        // };
        const result = await axios.get(`http://localhost:8080/challenge/${id}`);
        setChallenge(result.data);
    };

    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
            <div className="admincontainer">
                <div className="row">
                    <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow border-dark">
                        <h2 className="text-center m-4">Edit Challenge</h2>

                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="coinsreward" className="form-label">Coins Reward</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the coins reward"
                                    name="coinsreward"
                                    value={coinsreward}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="xpreward" className="form-label">XP Reward</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the XP reward"
                                    name="xpreward"
                                    value={xpreward}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="keyreward" className="form-label">Key Reward</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the key reward"
                                    name="keyreward"
                                    value={keyreward}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="details btn btn-outline-success">Submit</button>
                                <Link className="btn btn-outline-danger mx-2" to="/AllChallenges">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}