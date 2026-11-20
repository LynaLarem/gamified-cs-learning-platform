import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Style.css';
import SidebarComponent from '../Sidebar';

export default function ViewStudent() {

    let navigate = useNavigate();
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
    });

    const { id } = useParams();

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        const result = await axios.get(`http://localhost:8080/student/${id}`);
        setStudent(result.data);
    };

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:8080/student/${id}`);
        navigate("/AllStudents");
    };

    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
            <div className="admincontainer contentCont">
                <div className="row">
                    <div className="col-md-6 offset-md-3  p-4 mt-5 "style={styles.bigcont}>
                        <h2 className="text-center m-4" style={{ color: '#f5f5f5' }}>Student {student.firstname} {student.lastname} Details</h2>

                        <div className="admincard">
                            <div className="card-header">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item custom-list-item" style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>First Name: </b>
                                        {student.firstname}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Last Name: </b>
                                        {student.lastname}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Email: </b>
                                        {student.email}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Birth Date: </b>
                                        {student.birthdate}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Study Level: </b>
                                        {student.studylvl}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Gender: </b>
                                        {student.gender}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Link className="btn btn-primary my-2"
                            to={`/EditStudent/${student.id}`}
                        >
                            Edit
                        </Link>
                        <button className='btn btn-danger mx-2'
                            onClick={() => deleteStudent(student.id)}
                        >Delete</button>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <Link className="btn btn-success" to={"/AllStudents"}>
                        All Students
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
        borderRadius:'10px',
      },
}
