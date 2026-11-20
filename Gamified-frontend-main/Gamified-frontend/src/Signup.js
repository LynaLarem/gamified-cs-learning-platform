import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [studyLevel, setStudyLevel] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = async (e) => {
    const gmailtoken = localStorage.getItem('account');
    var userData = jwtDecode(gmailtoken);
    console.log(userData);

    if (selectedRole === 'STUDENT') {
      const student = {
        password: userData.sub, // Using sub as the password
        firstname: userData.given_name,
        lastname: userData.family_name,
        email: userData.email,
        image: userData.picture,
        role: selectedRole,
        image: userData.picture,
        studylvl: studyLevel,
        gender: gender,
        birthdate: birthdate,
        coins: 0,
        hearts: 5,
        itemsbought: 0,
        keysleft: 0,
        openedchests: 0,
        score: 0,
        xp: 0,
        level: 1,
      };

      await axios.post("http://localhost:8080/student", student);
      const response = await axios.post('http://localhost:8080/auth/signin', {
        username: userData.email,
        password: userData.sub,
      });
      if (response && response.data) {
        const { token } = response.data;
        localStorage.setItem('jwt', token);
        localStorage.setItem('studentId', response.data.id);
      }
      navigate(`/HomeP`);
    } else if (selectedRole === 'INSTRUCTOR') {
      const instructor = {
        password: userData.sub, // Using sub as the password
        firstname: userData.given_name,
        lastname: userData.family_name,
        email: userData.email,
        gender: gender,
        birthdate: birthdate,
        role: selectedRole,
        image: userData.picture,
        gender: gender,
        birthdate: birthdate,
      };
      const response = await axios.post("http://localhost:8080/instructor", instructor);
      if (response && response.data) {
        const { token } = response.data;
        localStorage.setItem('jwt', token);
      }
      navigate(`/HomeP`);
    }
  };

  return (
    <div>
      <h2>Choose Your Role</h2>
      <button onClick={() => handleRoleSelection('STUDENT')}>Student</button>
      <button onClick={() => handleRoleSelection('INSTRUCTOR')}>Instructor</button>

      {selectedRole === 'STUDENT' && (
  <div>
    <div>
      <label htmlFor="studyLevel">Enter Study Level:</label>
      <input
        type="text"
        id="studyLevel"
        value={studyLevel}
        onChange={(e) => setStudyLevel(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="gender" className="form-label">
        Gender
      </label>
      <select
        id="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
    <div>
      <label htmlFor="birthdate">Enter Birthdate:</label>
      <input
        type="date"
        id="birthdate"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
    </div>
  </div>
)}
{selectedRole === 'INSTRUCTOR' && (
  <div>
    <div>
      <label htmlFor="gender" className="form-label">
        Gender
      </label>
      <select
        id="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
    <div>
      <label htmlFor="birthdate">Enter Birthdate:</label>
      <input
        type="date"
        id="birthdate"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
    </div>
  </div>
)}
      {selectedRole && (
        <div>
          <button onClick={handleContinue}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default Signup;
