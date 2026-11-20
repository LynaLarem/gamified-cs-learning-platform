import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import { jwtDecode } from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';
import SidebarSt from './SidebarSt';


const AddReviewForm = () => {
  const { courseId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState('');
  //const navigate = useNavigate();

  const MAX_CHARACTERS = 255;


  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error('Invalid or expired token:', error);
        localStorage.removeItem('jwt');
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("userId mossing");
    }
  }, [userId]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleChange = (event) => {
    let value = event.target.value;
    if (value.length > MAX_CHARACTERS) {
      value = value.slice(0, MAX_CHARACTERS);
    }
    setComment(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId || !courseId) {
      console.error('userId or courseId is missing');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
      };

      console.log(rating);
      console.log(comment);
      const response = await axios.post(`http://localhost:8080/review/${userId}/${courseId}`, {
        rating,
        comment,
      }, config);

      console.log(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  return (
    <div className='d-flex'>
    <SidebarSt />

      <div className="contentContainer" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px'}}>

      <h1 style={{color: 'white', textShadow: '-1px 0 rgb(149, 15, 60), 0 2px rgb(149, 15, 60), 1px 0 rgb(149, 15, 60), 0 -1px rgb(149, 15, 60)'}}>Review Form</h1>
      <Form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '20px', width: '30vw', borderRadius:'16px' }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>How many stars would you give this course?</Form.Label>
          <br/>
          <Rating
            name="simple-controlled"
            value={rating}
            size="large"
            onChange={handleRatingChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Would you like to share your thoughts? Write it right here!</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            rows={4}
            value={comment}
            onChange={handleChange}
            style={{height:'137px', width:'400px', maxWidth: '100%', boxSizing: 'border-box', resize:'none'}}
            required
          />
          
        </Form.Group>
        <Form.Group style={{marginTop:'10px',display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Badge className='mt-3' bg={`${comment.length == MAX_CHARACTERS? 'danger' : 'info'}`} style={{color:'black'}}>
            {comment.length}/{MAX_CHARACTERS}
          </Badge>
          <Button type="submit">Submit Review</Button>
        </Form.Group>
        
      </Form>
      </div>
    </div>
  );
}

export default AddReviewForm;
