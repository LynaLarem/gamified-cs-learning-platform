import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useHistory
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import '../StudentPages/StyleSidebarSt.css';
import * as icon from '../Images';
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

const SidebarComponent = () => {
  const location = useLocation();

  const getStyle = (path) => {
    return location.pathname === path ? styles.selected : styles.link;
  };

  const handleLogout = () => {
    // Remove the 'jwt' item from localStorage
    localStorage.removeItem('jwt');
    // Redirect to '/HomeP'
  };

  return (
    <Sidebar style={styles.sidebg} backgroundColor="rgba(12, 6, 45, 1)">
      <Menu style={{paddingTop: '80px'}}>
        <Link to="/InstructorDashboard" style={styles.link}>
          <MenuItem style={getStyle("/InstructorDashboard")}><img src={icon.dashboard} style={{width: '30px', marginRight:'20px'}}/>Dashboard</MenuItem>
        </Link>
        <Link to="/MycoursesI" style={styles.link}>
          <MenuItem style={getStyle("/Allstudents")}><img src={icon.course} style={{height: '20px', marginRight:'20px'}}/>My courses</MenuItem>
        </Link>
        <Link to="/AllCoursesI" style={styles.link}>
          <MenuItem style={getStyle("/AllCoursesI")}><img src={icon.course} style={{height: '20px', marginRight:'20px'}}/>All courses</MenuItem>
        </Link>
        <Link to="/InstructorProfile" style={styles.link}>
          <MenuItem style={getStyle("/InstructorProfile")}><img src={icon.user} style={{height: '20px', marginRight:'20px'}}/>Profile</MenuItem>
        </Link>
        <Link to="/HomeP" style={styles.link}>
          <MenuItem onClick={handleLogout}><img src={icon.logout} style={{height: '20px', marginRight:'20px'}}/>Logout</MenuItem>
        </Link>

      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
