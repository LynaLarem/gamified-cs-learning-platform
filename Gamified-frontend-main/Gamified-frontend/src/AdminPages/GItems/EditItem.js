import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Style.css';
import SidebarComponent from '../Sidebar';

export default function EditItem() {
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

    useEffect(() => {
        loadItem();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            effect,
        };
        // const jwtToken = localStorage.getItem('jwt');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${jwtToken}`,
        //     'Content-Type': 'application/json',
        //   },
        // };
        await axios.put(`http://localhost:8080/item/${id}/${category_id}`, payload);
        navigate(`/AllItems`);
    };

    const loadItem = async () => {
        // const jwtToken = localStorage.getItem('jwt');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${jwtToken}`,
        //     'Content-Type': 'application/json',
        //   },
        // };
        const result = await axios.get(`http://localhost:8080/item/${id}`);
        const { name, effect, category } = result.data;
        setItem({ name, effect, category_id: category.id }); // Set category_id to the ID of the category
    };

    return (
        <div style={{ display: 'flex' }}>
        <SidebarComponent />
        <div className="admincontainer">
            <div className="row">
                <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow border-dark">
                    <h2 className="text-center m-4">Edit Item</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"> name  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="effect" className="form-label"> effect  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the effect"
                                name="effect"
                                value={effect}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category_id" className="form-label">
                                Item Category
                            </label>
                            <select
                                className="form-select"
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
                            <button type="submit" className="details btn btn-outline-success">Submit</button>
                            <Link className="btn btn-outline-danger mx-2" to="/AllItems">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}