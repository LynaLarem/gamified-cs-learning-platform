import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Style.css';
import SidebarComponent from '../Sidebar';

export default function AddItem() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [item, setItem] = useState({
        name: "",
        effect: "",
        category_id: ""
    });

    const { name, effect, category_id } = item;

    const onInputChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/item/${category_id}`, item);
        navigate(`/AllItems`);
    };

    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
            <div className="admincontainer contentCont">
                <div className="row">
                    <div className="col-md-8 offset-md-2 p-4 mt-3" style={styles.bigcont}>
                        <h2 className="text-center m-4" style={{ color: '#f5f5f5' }}>Add Item</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label custom-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="effect" className="form-label custom-label">Effect</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the effect"
                                    name="effect"
                                    value={effect}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category_id" className="form-label custom-label">Item Category</label>
                                <select
                                    className="form-select "
                                    name="category_id"
                                    value={category_id}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="1">COMMON</option>
                                    <option value="2">RARE</option>
                                    <option value="3">VERY_RARE</option>
                                    <option value="4">LEGENDARY</option>
                                </select>
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="details btn btn-outline-success mx-2">
                                    Submit
                                </button>
                                <Link className="btn btn-outline-danger mx-2" to="/AllItems">
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
        borderRadius: '16px',
        boxShadow: '0 0 15px -2px rgba(11, 255, 255, 0.72)',
        borderRadius: '10px',
    },
};
