import { jwtDecode } from 'jwt-decode';
import { React, useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import * as icon from '../Images';
import './StyleSidebarSt.css';

const styles = {
  link: {
    color: 'white',
    textShadow: '-2px 0 #351546, 0 2px #351546, 1px 0 #351546, 0 -1px #351546',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  selected: {
    color: 'white',
    textShadow: '-2px 0 #351546, 0 2px #351546, 1px 0 #351546, 0 -1px #351546',
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(27, 171, 203, 0.7)',
  },
  sidebg:{
    height: '120vh',
  }
};

const SidebarSpecialist = () => {
  const location = useLocation();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    try {
      const jwtToken = localStorage.getItem('jwt');
      if (jwtToken) {
        const decodedToken = jwtDecode(jwtToken);
        setUserId(decodedToken.userId);
      }
    } catch (error) {
      console.log('Error decoding token:', error);
    }
  }, []);

  const getStyle = (path) => {
    return location.pathname === path ? styles.selected : styles.link;
  };

  return (
    <Sidebar  style={styles.sidebg} backgroundColor="rgba(12, 6, 45, 1)">
     <Menu style={{paddingTop: '80px'}}>

        <Link to="/SpecialistDashboard" style={styles.link}>
          <MenuItem style={getStyle("/SpecialistDashboard")}><img src={icon.dashboard} style={{width: '30px', marginRight:'20px'}}/>Dashboard</MenuItem>
        </Link>

        <Link to={`/AllCoursesSpecialist/${userId}`}  style={styles.link}>
          <MenuItem style={getStyle(`/AllCoursesSpecialist/${userId}`)}><img src={icon.course} style={{height: '20px', marginRight:'20px'}}/>My Courses</MenuItem>
        </Link>

        <Link to="/SpecialistProfile" style={styles.link}>
          <MenuItem style={getStyle("/SpecialistProfile")}><img src={icon.user} style={{height: '20px', marginRight:'20px'}}/>My Profile</MenuItem>
        </Link>
        <Link to="/HomeP" style={styles.link}>
          <MenuItem style={getStyle("/HomeP")}><img src={icon.logout} style={{height: '20px', marginRight:'20px'}}/>Log Out</MenuItem>
        </Link>

      </Menu>
    </Sidebar>
  );
};

export default SidebarSpecialist;
