import React, { useState, useEffect } from 'react';
import * as image from '../../Images';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarComponent from '../Sidebar';


const AllItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems();
    }, []);
    const loadItems = async () => {
        // const jwtToken = localStorage.getItem('jwt');
        //     const config = {
        //       headers: {
        //         Authorization: `Bearer ${jwtToken}`,
        //         'Content-Type': 'application/json',
        //       },
        //     };
        const result = await axios.get('http://localhost:8080/item');
        setItems(result.data);
    };
    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/item/${id}`);
            loadItems();

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent />
            <div className="contentCont">
                <div style={styles.container}>
                    <div style={styles.title}>
                        <h1 style={styles.heading}>All Items</h1>
                        <a href="/AddItem" className="icon">
                            <img src={image.plus} alt="Add Daily Challenge" className="icon" />
                        </a>
                    </div>

                    <div style={styles.itemContainer}>
                        {items.map(item => (
                            <div key={item.id} style={styles.item}>
                                <div>
                                    <div style={styles.itemName}>{item.name}</div>
                                    <div style={styles.itemEffect}>{item.effect}</div>
                                    <div style={styles.itemCategory}>Category : {item.category.name}</div>
                                </div>
                                <div style={styles.buttons}>
                                    <Link className="btn btn-primary mx-2" to={`/EditItem/${item.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger mx-2" onClick={() => deleteItem(item.id)} >
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

const styles = {
    container: {
        margin: '20px 20px',
        padding: 20,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        background: 'rgba(33, 84, 172, 0.7)',
        borderradius: '16px',
        boxshadow: '0 0 15px -2px rgba(11, 255, 255, 0.72)',
        borderRadius:'10px',
    },
    heading: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
        color: '#f5f5f5',
    },
    itemContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Change to 'space-between' to evenly distribute space between items
        alignItems: 'flex-start', // Align items at the start of the cross axis (top)
        marginTop: '20px', // Add some top margin for spacing
        // backgroundcolor: '#666',
        // color: '#f5f5f5',
        // bordercolor: '#888',
    },
    item: {
        backgroundColor: 'rgba(169, 169, 169, 0.4)',
        padding: 10,
        borderRadius: 8,
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignitems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        color:'white',
        width: '30%', // Set each item to occupy 30% of the container width to ensure three items per line
    },
    itemName: {
        fontWeight: 'bold',
    },
    itemEffect: {
        marginTop: 5,
    },
    itemCategory: {
        marginTop: 5,
        fontStyle: 'italic',
    },
    title: {
        display: 'flex',
        alignitems: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row', // Ensure the buttons are in the same line
        justifyContent: 'center', // Center the buttons horizontally
        alignItems: 'center', // Center the buttons vertically
    },
};

export default AllItems;
