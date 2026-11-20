import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import './StyleSidebar.css';
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

const SidebarComponent = () => {
  const location = useLocation();

  const getStyle = (path) => {
    return location.pathname === path ? styles.selected : styles.link;
  };

  return (
    <Sidebar style={styles.sidebg} backgroundColor="rgba(12, 6, 45, 1)">
      
      <Menu style={{paddingTop: '80px'}}>
        <Link to="/AdminHome" style={styles.link}>
          <MenuItem style={getStyle("/AdminHome")}><img src={icon.dashboard} style={{width: '30px', marginRight:'20px'}}/>Dashboard</MenuItem>
        </Link>
        <SubMenu label="Manage Users">
          <Link to="/Allstudents" style={styles.link}>
            <MenuItem style={getStyle("/Allstudents")}>Students</MenuItem>
          </Link>
          <Link to="/allspecialists" style={styles.link}>
            <MenuItem style={getStyle("/allspecialists")}>Specialists</MenuItem>
          </Link>
          <Link to="/allinstructors" style={styles.link}>
            <MenuItem style={getStyle("/allinstructors")}>Instructors</MenuItem>
          </Link>
        </SubMenu>
        <Link to="/allitems" style={styles.link}>
          <MenuItem style={getStyle("/allitems")}><img src={icon.axe} style={{width: '30px', marginRight:'20px'}}/>Items</MenuItem>
        </Link>
        <Link to="/allchallenges" style={styles.link}>
          <MenuItem style={getStyle("/allchallenges")}><img src={icon.trophy} style={{width: '30px', marginRight:'20px'}}/>Challenges</MenuItem>
        </Link>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
