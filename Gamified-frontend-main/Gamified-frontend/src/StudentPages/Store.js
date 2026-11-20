import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Accordion, Image, Nav, Button, Tab, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

import PurchaseModal from '../Modal_Windows/PurchaseModal';
import CoinsModal from '../Modal_Windows/CoinsModal';
import SidebarSt from './SidebarSt';

const Store = () => {
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [itemToDeactivate, setItemToDeactivate] = useState('');

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseModalTitle, setPurchaseModalTitle] = useState('');
  const [purchaseModalMessage, setPurchaseModalMessage] = useState('');

  const [showCoinsModal, setShowCoinsModal] = useState(false);
  const [coinsModalTitle, setCoinsModalTitle] = useState('');
  const [coinsModalMessage, setCoinsModalMessage] = useState('');

  const [countdowns, setCountdowns] = useState({});

  const [counter, setCounter] = React.useState(60);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This item can only be used during a game.
    </Tooltip>
  );

  const handleUse = async (item) => {
    const name = item.name.toLowerCase();
    console.log('Item name:', name);

    if (name.includes("heart")) {
      try {
        const response = await axios.get(`http://localhost:8080/student/hearts/${userId}`);
        console.log('Current hearts:', response.data);

        if (response.data < 5) {
          if (name.includes("extra")) {
            await axios.patch(`http://localhost:8080/student/hearts/${userId}`, { hearts: response.data + 1 });

            console.log("Added one heart.");
          } else {
            await axios.patch(`http://localhost:8080/student/hearts/${userId}`, { hearts: 5 });
            console.log("Refilled hearts.");
          }
          await axios.put(`http://localhost:8080/inventory/quantity/${userId}/${item.id}`);
          console.log("decremented quantity.");
        } else {
          setCoinsModalTitle('Your hearts are full.');
          setCoinsModalMessage('You have 5 hearts, you cannot add to it.');
          setShowCoinsModal(true);
          console.log("Full hearts. No action needed.");
        }
      } catch (error) {
        console.error('Error fetching or updating hearts:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
      }
    } else {
      try {
        await axios.patch(`http://localhost:8080/inventory/active/${userId}/${item.id}`, { active: true });
        await axios.put(`http://localhost:8080/inventory/quantity/${userId}/${item.id}`);
        console.log("Item activated.");
        startCountdown(item.id);
      } catch (error) {
        console.error('Error activating item:', error);
      }
    }
  }

  const startCountdown = (itemId) => {
    const endTime = Date.now() + 1 * 60 * 1000;
    setCountdowns(prev => ({ ...prev, [itemId]: endTime }));
    console.log(countdowns);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(prev => {
        const now = Date.now();
        let newCountdowns = {};
        Object.entries(prev).forEach(([itemId, endTime]) => {
          if (endTime <= now) {
            axios.patch(`http://localhost:8080/inventory/active/${userId}/${itemId}`, { active: false });
            console.log('countdown ended');
            console.log('active is false');
            newCountdowns[itemId] = 0;
            newCountdowns = {}
          } else {
            newCountdowns[itemId] = endTime - 1;
          }
        });
        console.log(countdowns);
        console.log('countdown still going')
        localStorage.setItem('countdowns', JSON.stringify(countdowns));
        return newCountdowns;
      });

    }, 1000);
    return () => clearInterval(interval);
  }, [countdowns]);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log(decodedToken);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.userId);
        console.log(userRole, userId);
      } catch (error) {
        console.error('Invalid or expired token:', error);
        localStorage.removeItem('jwt');
      }
    }

    const config = {
      headers: {
        ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:8080/item', config)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setItems(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });

    if (userRole === 'STUDENT') {
      console.log("Getting inventory elements")
      fetch(`http://localhost:8080/inventory/${userId}`, config)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setInventory(data);
          console.log(data);
        })
        .catch(error => {
          console.error('Failed to fetch inventory:', error);
        });
    }
    const savedCountdowns = JSON.parse(localStorage.getItem('countdowns'));
    if (savedCountdowns) {
      setCountdowns(savedCountdowns);
    }
  }, [userRole, userId]);

  const handlePurchase = async (itemId, price) => {
    const jwtToken = localStorage.getItem('jwt');

    if (!userRole || userRole !== 'STUDENT') {
      setPurchaseModalTitle('Purchase Error');
      setPurchaseModalMessage('You must be signed up with a student account to be able to purchase items.');
      setShowPurchaseModal(true);
      return;
    }

    const config = {
      headers: {
        ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
        'Content-Type': 'application/json',
      },
    };

    try {
      console.log("BUYNG!!!!!!!!");
      console.log(price);
      const coins = await axios.get(`http://localhost:8080/student/coins/${userId}`, config);
      console.log(coins.data)
      if (coins.data < price) {
        setCoinsModalTitle('Purchase Error. You lack some coins.');
        setCoinsModalMessage('You do not have enough coins to buy this item.');
        setShowCoinsModal(true);
      } else {
        const exists = await axios.get(`http://localhost:8080/inventory/exists/${userId}/${itemId}`, config);
        await axios.put(`http://localhost:8080/challengestate/updatedaily/${userId}/14`);
        console.log('challenge completed');

        console.log(exists.data);
        if (exists.data === 1) {
          console.log("ALREADY THERE!");
          const response = await axios.put(`http://localhost:8080/inventory/quantityPlus/${userId}/${itemId}`, config);
        } else {
          console.log("NEW BOUGHT ITEM!");
          const response = await axios.put(`http://localhost:8080/inventory/quantityPlus/${userId}/${itemId}`, config);
          console.log(response.status, response.data);
        }
        await axios.put(`http://localhost:8080/student/coinsMinus/${userId}/${price}`, config);
        await axios.put(`http://localhost:8080/student/itemsbought/${userId}`);
        console.log("put");
        await axios.put(`http://localhost:8080/challengestate/progress/${userId}/item`);
        console.log("put2");
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
  };

  const closeCoinsModal = () => {
    setShowCoinsModal(false);
  };


  if (!items) {
    return <div>Loading...</div>;
  }

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className='d-flex'>
      <SidebarSt />

      <div className="d-flex contentContainer">

        <div className='storeContainer' style={{width: '61vw', padding: '1vw'}}>
        <h1 style={{padding:'0px 0 0 0px', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>Store</h1>
          <div className="cards-container" style={{width: '60vw', display: 'flex', flexWrap:'wrap'}}>

            {items.map(item => (
              <div className="card-div" key={item.id} >
                <Card style={{background: 'rgba(255,255,255,0.7)'}}>
                  <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.effect}
                    </Card.Text>
                    <div className="card-buttons">
                      <Button onClick={() => handlePurchase(item.id, item.category.price)}>Purchase {item.category.price}</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className='inventoryContainer'style={{padding: '1vw 1vw 0 0'}}>
          {userRole === 'STUDENT' && (
            <div className="inventory">
              <h1 style={{padding:'0px 0 0 0px', color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>Inventory</h1>
              {inventory.map(element => (
                <div className="card-div" key={element.id}>
                  <Card style={{background: 'rgba(255,255,255,0.7)', marginBottom: '3px'}}>
                    <Card.Body>
                        <Card.Text>{element.item.name} <span style={{marginLeft: '10px'}}>QTE: {element.quantity}</span> {countdowns[element.item.id] > 0 ? (<p>Currently 1 activated</p>) : null} </Card.Text>
                      {element.item.name.toLowerCase().includes("heart") || element.item.name.toLowerCase().includes("double") || element.item.name.toLowerCase().includes("triple") ? (
                        <div className="card-buttons">
  
                          {countdowns[element.item.id] > 0 ? (
                            <Button variant="secondary" disabled>
                              Activation ends in {formatTime(countdowns[element.item.id] - Date.now())}
                            </Button>
                          ) : (
                            <Button onClick={() => handleUse(element.item)}>
                              Use
                            </Button>
                          )}

                        </div>
                      ) : (<div className="card-buttons">
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <Button variant="success">In game</Button>
                        </OverlayTrigger>

                      </div>)
                      }
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      <PurchaseModal
        show={showPurchaseModal}
        onHide={closePurchaseModal}
        title={purchaseModalTitle}
        message={purchaseModalMessage}
      />

      <CoinsModal
        show={showCoinsModal}
        onHide={closeCoinsModal}
        title={coinsModalTitle}
        message={coinsModalMessage}
      />

    </div>
  );
};

export default Store;