import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import styled from 'styled-components';
import './StyleSidebarSt.css';
import * as icon from '../Images'
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
    height: '100vh',
  }
};
const handleLogout = () => {
  // Remove the 'jwt' item from localStorage
  localStorage.removeItem('jwt');
  // Redirect to '/HomeP'
};
const SidebarSt = () => {
  const location = useLocation();

  const getStyle = (path) => {
    return location.pathname === path ? styles.selected : styles.link;
  };

  return (
    <Sidebar  style={styles.sidebg} backgroundColor="rgba(12, 6, 45, 1)">
      
      <Menu style={{paddingTop: '80px'}}>
        <Link to="/StudentDashboard" style={styles.link}>
          <MenuItem style={getStyle("/StudentDashboard")}><img src={icon.dashboard} style={{width: '30px', marginRight:'20px'}}/>Dashboard</MenuItem>
        </Link>
        <Link to="/AllCourses" style={styles.link}>
          <MenuItem style={getStyle("/AllCourses")}><img src={icon.course} style={{height: '20px', marginRight:'20px'}}/>All Courses</MenuItem>
        </Link>
        <Link to="/Store" style={styles.link}>
          <MenuItem style={getStyle("/Store")}><img src={icon.store} style={{height: '20px', marginRight:'20px'}}/>Store</MenuItem>
        </Link>
        <Link to="/Leaderboard" style={styles.link}>
          <MenuItem style={getStyle("/Leaderboard")}><img src={icon.leaderboard} style={{height: '25px', marginRight:'10px'}}/>Leaderboard</MenuItem>
        </Link>
        <Link to="/Achievements" style={styles.link}>
          <MenuItem style={getStyle("/Achievements")}><img src={icon.trophy} style={{height: '20px', marginRight:'20px'}}/>Achievements</MenuItem>
        </Link>
        <Link to="/ChatPage" style={styles.link}>
          <MenuItem style={getStyle("/ChatPage")}><img src={icon.chat} style={{height: '20px', marginRight:'20px'}}/>Chatrooms</MenuItem>
        </Link>
        <Link to="/HomeP" style={styles.link}>
          <MenuItem onClick={handleLogout}><img src={icon.logout} style={{height: '20px', marginRight:'20px'}}/>Logout</MenuItem>
        </Link>
      </Menu>
    </Sidebar>
  );
};


export default SidebarSt;