import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
  const navigate = useNavigate();

  async function handleCallbackResponseSignUp(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    // Extracting email domain
    const emailDomain = userObject.email.split('@')[1];

    // Check if the email domain contains "univ" and ends with ".dz"
    // if (emailDomain.includes('univ') && emailDomain.endsWith('.dz')) {
    if (true) {
      try {
        console.log("hy");
        // Check if the email is already signed up
        const check = await axios.get(`http://localhost:8080/auth/checkemail/${userObject.email}`);
        if (check.data === true) {
          alert('This email is already registered. Please sign in instead.');
        } else {
          localStorage.setItem('account', response.credential);
          localStorage.setItem('gmailaccount', userObject.email);
          navigate('/Signup');
        }
      } catch (error) {
        console.error('Error checking email:', error);
        alert('An error occurred while checking email. Please try again later.');
      }
    } else {
      alert('You can create an account only using a professional email address.');
    }
  }

  async function handleCallbackResponseSignin(response) {
    var userObject = jwtDecode(response.credential);
    try {
      const response = await axios.post('http://localhost:8080/auth/signin', {
        username: userObject.email,
        password: userObject.sub,
      });
      console.log(response.data);

      let role = '';
      if (response && response.data) {
        role = response.data.role;
        const { token } = response.data;
        localStorage.setItem('jwt', token);
        localStorage.setItem('studentId', response.data.id);
      }
      if (role === 'STUDENT') {
        await axios.put(`http://localhost:8080/challengestate/updatedaily/${response.data.id}/13`);
        console.log(response.data);
        navigate('/StudentDashboard');
      } else if (role === 'INSTRUCTOR') {
        navigate('/InstructorDashboard');
      } else if (role === 'SPECIALIST') {
        navigate('/SpecialistDashboard');
      } else {
        alert('this account is not logged up');
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "702160208350-ovofpka58k606scaljajv7qvhhtfsbm5.apps.googleusercontent.com",
      callback: handleCallbackResponseSignUp
    });
    google.accounts.id.renderButton(
      document.getElementById("singUpDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );

    google.accounts.id.initialize({
      client_id: "702160208350-ovofpka58k606scaljajv7qvhhtfsbm5.apps.googleusercontent.com",
      callback: handleCallbackResponseSignin
    });
    google.accounts.id.renderButton(
      document.getElementById("singInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );

  }, []);

  return (
    <div>
      <p>Signup</p>
      <div id="singUpDiv"></div>
      <p>Signin</p>
      <div id="singInDiv"></div>
    </div>

  );
}

export default HomePage;
