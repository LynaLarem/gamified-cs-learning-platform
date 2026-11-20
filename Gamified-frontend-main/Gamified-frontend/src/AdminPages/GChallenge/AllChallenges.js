import React, { useState, useEffect } from 'react';
import './AllChallenges.css'; // Import CSS file for styling
import * as image from '../../Images';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SidebarComponent from '../Sidebar';

const AllChallenges = () => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        loadChallenges();
    }, []);

    const loadChallenges = async () => {
        // const jwtToken = localStorage.getItem('jwt');
        //     const config = {
        //       headers: {
        //         Authorization: `Bearer ${jwtToken}`,
        //         'Content-Type': 'application/json',
        //       },
        //     };
        const result = await axios.get('http://localhost:8080/challenge');
        setChallenges(result.data);
    };

    const dailyChallenges = challenges.filter(challenge => challenge.type === 'DAILY');
    const achievementChallenges = challenges.filter(challenge => challenge.type === 'ACHIEVEMENT');

    const deleteChallenge = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/challenge/${id}`);
            loadChallenges();

        } catch (error) {
            console.error('Error deleting challenge:', error);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
                <div className="admin-challenge-container contentCont">
                    <div className="admin-challenge-column">
                        <div className="challenge-title">
                            <h2 style={{ color: '#f5f5f5' }}>Daily Challenges</h2>
                            <a href="/AddChallenge/DAILY" className="icon">
                                <img src={image.plus} alt="Add Daily Challenge" className="icon" />
                            </a>
                        </div>
                        <div className="admin-challenge-ul">
                            {dailyChallenges.map(challenge => (
                                <div key={challenge.id} className="admin-challenge-li">
                                    <div>
                                        <strong>{challenge.title}</strong> - {challenge.description} <br />
                                        Rewards: {challenge.coinsreward} coins, {challenge.xpreward} XP, {challenge.keyreward} keys
                                    </div>
                                    <div>
                                        <Link className="btn btn-primary mx-2" to={`/EditChallenge/DAILY/${challenge.id}`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger mx-2" onClick={() => deleteChallenge(challenge.id)} >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="admin-challenge-column">
                        <div className="challenge-title">
                            <h2 style={{ color: '#f5f5f5' }}>Achievements</h2>
                            <a href="/AddChallenge/ACHIEVEMENT" className="icon">
                                <img src={image.plus} alt="Add Achievement Challenge" className="icon" />
                            </a>
                        </div>
                        <div className="admin-challenge-ul">
                            {achievementChallenges.map(challenge => (
                                <div key={challenge.id} className="admin-challenge-li">
                                    <div>
                                        <strong>{challenge.title}</strong> - {challenge.description} <br />
                                        Rewards: {challenge.coinsreward} coins, {challenge.xpreward} XP, {challenge.keyreward} keys
                                    </div>
                                    <div>
                                        <Link className="btn btn-primary mx-2" to={`/EditChallenge/ACHIEVEMENT/${challenge.id}`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger mx-2" onClick={() => deleteChallenge(challenge.id)} >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default AllChallenges;
