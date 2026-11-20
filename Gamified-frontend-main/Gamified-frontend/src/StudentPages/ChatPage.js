import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Use named import
import { Form, Button, Badge, Image } from 'react-bootstrap';
import SidebarSt from './SidebarSt';

const ChatPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedChatroomId, setSelectedChatroomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [msg, setMsg] = useState('');
  const messagesContainerRef = useRef(null);

  const MAX_CHARACTERS = 255;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId || !selectedChatroomId) {
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

      console.log(msg);
      const response = await axios.post(`http://localhost:8080/chatroom/student/${userId}/${selectedChatroomId}`, {
        message: msg
      }, config);

      setMsg('');
      await selectChatroom(selectedChatroomId);

      console.log(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    console.log('ChatPage component mounted'); // Log to confirm component mount
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const jwtToken = localStorage.getItem('jwt');
    console.log('Retrieved JWT Token:', jwtToken); // Debug log

    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log('Decoded Token:', decodedToken); // Debug log
        setUserRole(decodedToken.role);
        setUserId(decodedToken.userId);

        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };

        try {
          const response = await axios.get(`http://localhost:8080/enrollement/student/${decodedToken.userId}`, config);
          console.log('API Response:', response.data); // Debug log
          setCourses(response.data);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      } catch (error) {
        console.error('Invalid or expired token:', error);
        localStorage.removeItem('jwt');
      }
    } else {
      console.log('No JWT Token found in localStorage');
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    if (value.length > MAX_CHARACTERS) {
      value = value.slice(0, MAX_CHARACTERS);
    }
    setMsg(value);
  };

  const selectChatroom = async (courseId) => {
    setSelectedChatroomId(courseId);
    try {
      const response = await axios.get(`http://localhost:8080/chatroom/course/${courseId}`);
      console.log('Chatroom Messages:', response.data); // Debug log
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  //   useEffect(() => {
  //     if (messages.length > 0) {
  //       const totalHeight = messages.reduce((total, message) => total + message.height, 0);
  //       const containerHeight = messagesContainerRef.current.offsetHeight;
  //       const scrollAmount = totalHeight - containerHeight;
  //       messagesContainerRef.current.scrollTop = scrollAmount;
  //     }
  //   }, [messages]);

  return (
    <div className='d-flex'>

      <SidebarSt />
      <div className='contentContainer'>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:'12vh'}}>
        <div style={{ display: 'flex', alignItems: 'flex-start'}}>
          <div style={{height: '419px', width: '240px', overflowY: 'scroll', background: 'rgba(255,255,255,0.7)', borderRadius: '20px' }}>
            {courses.length > 0 ? (
              courses.map(course => (
                <div style={{borderBottom: '2px solid rgba(255, 51, 118, 0.8)', borderRadius:'16px',padding:'10px'}} key={course.course.id} onClick={() => selectChatroom(course.course.id)}>
                  {course.course.name}
                </div>
              ))
            ) : (
              <div>You have to enroll in a course to join its chatroom.</div>
            )}
          </div>
          <div style={{height: '400px' }}>
            <div style={{ overflowY: 'scroll', height: '300px', ref: messagesContainerRef, background: 'rgba(255,255,255,0.7)'}}>
              {selectedChatroomId ? (
                messages.length > 0 ? (
                  messages.map(message => (
                    userId == message.student.id ? (
                      <div
                        key={message.id}
                        style={{
                          textAlign: 'right',
                          //width:'200px',
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <span style={{backgroundColor:'rgba(255, 51, 118, 0.6)', width: '200px', padding: '5px', marginBottom: '3px',marginTop: '3px', borderRadius: '16px'}}>{message.message}</span>
                        <Image className="student-img" src={message.student.image} roundedCircle style={{ width: '25px', height: '25px', borderRadius: '50%', marginLeft: '10px', marginTop:'8px' }} />

                      </div>
                    ) : (
                      <div
                        key={message.id}
                        style={{
                          textAlign: 'left',
                          height: '40px',
                          display: 'flex',
                          alignItems:'center',
                        }}
                      >
                        <Image className="student-img" src={message.student.image} roundedCircle style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '10px' }} />
                        <span style={{backgroundColor:'rgba(27, 171, 203, 0.7)', width: '200px', padding: '5px', marginBottom: '3px',marginTop: '3px', borderRadius: '16px'}}>{message.message}</span>
                      </div>
                    )

                  ))
                ) : (
                  <div style={{padding: '4px'}}>Be the first to send a message!</div>
                )
              ) : (
                <div style={{padding: '4px'}}>Select a chat room to send a message.</div>
              )}
            </div>
            <Form onSubmit={handleSubmit} style={{background: 'rgba(255,255,255,0.8)' , padding: '10px' }}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  placeholder="Type a message..."
                  rows={2}
                  value={msg}
                  onChange={handleChange}
                  style={{ height: '60px', width: '400px', maxWidth: '100%', boxSizing: 'border-box', resize: 'none' }}
                  required
                />  
              </Form.Group>
              <Form.Group style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Badge className='mt-3' bg={`${msg.length == MAX_CHARACTERS ? 'danger' : 'info'}`} style={{color:'black'}}>
                  {msg.length}/{MAX_CHARACTERS}
                </Badge>
                <Button type="submit">Send</Button>
              </Form.Group>

            </Form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
