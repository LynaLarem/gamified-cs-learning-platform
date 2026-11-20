import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Style.css';
import SidebarComponent from '../Sidebar';


export default function ViewSpecialist() {

    let navigate = useNavigate();
    const [specialist, setSpecialist] = useState({
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        image: "",
        role: "SPECIALIST",
        gender: "",
    },
    );

    const { id } = useParams();

    useEffect(() => {
        loadSpecialist();
    }, []);

    const loadSpecialist = async () => {
        // const jwtToken = localStorage.getItem('jwt');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${jwtToken}`,
        //     'Content-Type': 'application/json',
        //   },
        // };
        const result = await axios.get(`http://localhost:8080/specialist/${id}`);
        setSpecialist(result.data);
    };

    const deleteSpecialist = async (id) => {
        // const jwtToken = localStorage.getItem('jwt');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${jwtToken}`,
        //     'Content-Type': 'application/json',
        //   },
        // };
        await axios.delete(`http://localhost:8080/specialist/${id}`)
        navigate("/AllSpecialists");
    }

    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
            <div className="admincontainer contentCont">
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 mt-5" style={styles.bigcont}>
                        <h2 className="text-center m-4" style={{ color: '#f5f5f5' }}>Specialist {specialist.firstname} {specialist.lastname} Details</h2>

                        <div className="admincard">
                            <div className="card-header">

                                <ul className="list-group list-group-flush">
                                <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>First Name: </b>
                                        {specialist.firstname}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Last Name: </b>
                                        {specialist.lastname}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Email: </b>
                                        {specialist.email}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Birth Date: </b>
                                        {specialist.birthdate}
                                    </li>
                                    <li className="list-group-item custom-list-item"style={{backgroundColor: 'rgba(169, 169, 169, 0.4)',borderRadius:'5px'}}>
                                        <b>Gender: </b>
                                        {specialist.gender}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Link className="btn btn-primary my-2"
                            to={`/EditSpecialist/${specialist.id}`}
                        >
                            Edit
                        </Link>
                        <button className='btn btn-danger mx-2'
                            onClick={() => deleteSpecialist(specialist.id)}
                        >Delete</button>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <Link className="btn btn-success" to={"/AllSpecialists"}>
                        All Specialist
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