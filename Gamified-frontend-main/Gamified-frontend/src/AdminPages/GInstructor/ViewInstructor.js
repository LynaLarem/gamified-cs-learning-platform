import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Style.css';
import SidebarComponent from '../Sidebar';


export default function ViewInstructor() {

    let navigate = useNavigate();
    const [instructor, setInstructor] = useState({
        password: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        email: "",
        image: "",
        role: "INSTRUCTOR",
    },
    );

    const { id } = useParams();

    useEffect(() => {
        loadInstructor();
    }, []);

    const loadInstructor = async () => {
        // const jwtToken = localStorage.getItem('jwt');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${jwtToken}`,
        //     'Content-Type': 'application/json',
        //   },
        // };
        const result = await axios.get(`http://localhost:8080/instructor/${id}`);
        setInstructor(result.data);
    };

    const deleteInstructor = async (id) => {
        // const jwtToken = localStorage.getItem('jwt');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${jwtToken}`,
        //     'Content-Type': 'application/json',
        //   },
        // };
        await axios.delete(`http://localhost:8080/instructor/${id}`)
        navigate("/AllInstructors");
    }

    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
            <div className="admincontainer contentCont">
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 mt-5" style={styles.bigcont}>
                        <h2 className="text-center m-4" style={{ color: '#f5f5f5' }} >Instructor {instructor.firstname} {instructor.lastname} Details</h2>

                        <div className="admincard">
                            <div className="card-header">

                                <ul className="list-group list-group-flush">
                                <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>First Name: </b>
                                        {instructor.firstname}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Last Name: </b>
                                        {instructor.lastname}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Email: </b>
                                        {instructor.email}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Birth Date: </b>
                                        {instructor.birthdate}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Gender: </b>
                                        {instructor.gender}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Link className="btn btn-primary my-2"
                            to={`/EditInstructor/${instructor.id}`}
                        >
                            Edit
                        </Link>
                        <button className='btn btn-danger mx-2'
                            onClick={() => deleteInstructor(instructor.id)}
                        >Delete</button>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <Link className=" btn btn-success" to={"/AllInstructors"}>
                        All Instructors
                    </Link>
                </div>
            </div>
            <style>
                {`
                    .custom-list-item {
                        background-color: #666;
                        color: #f5f5f5;
                        border-color: #888;
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