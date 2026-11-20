import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Avatar, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import SidebarComponent from './Sidebar';

const ProfileContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#f5f5f5', // Text color
    minHeight: '100vh', // Ensure it covers the full viewport height
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    color: '#f5f5f5',
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center',
    background: 'rgba(11, 255, 255, 0.405)',
    borderRadius: '16px',
    boxShadow: '0 0 15px -2px rgba(11, 255, 255, 0.72)',
    backdropFilter: 'blur(9.2px)',
    WebkitBackdropFilter: 'blur(9.2px)',
    border: '1px solid rgba(104, 13, 167, 0.3)',
    padding: '1vw',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: theme.spacing(2),
}));

const ProfileTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    
}));

const BackgroundImage = styled('div')(({ theme }) => ({
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    filter: 'brightness(0.5)',
}));

const TimelineItem = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: '#f5f5f5',
}));

const AchievementList = styled('ul')(({ theme }) => ({
    listStyle: 'none',
    padding: 0,
    color: '#f5f5f5',
}));

const AchievementListItem = styled('li')(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

const Quote = styled(Typography)(({ theme }) => ({
    fontStyle: 'italic',
    marginTop: theme.spacing(2),
    color: '#f5f5f5',
    textShadow: '-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red',

}));

const InstructorProfile = () => {
    const jwt = localStorage.getItem("jwt");
    const data = jwtDecode(jwt);

    // Extracting instructorId from the decoded JWT data
    const instructorId = data.userId;
    const [instructor, setInstructor] = useState(null);

    useEffect(() => {
        const fetchInstructor = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/instructor/${instructorId}`);
                setInstructor(response.data);
            } catch (error) {
                console.error('Error fetching instructor data:', error);
            }
        };

        fetchInstructor();
    }, [instructorId]);

    if (!instructor) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', position: 'relative' }}>
            <SidebarComponent />
            <div className='contentContainer'>
                <ProfileContainer >
                    <BackgroundImage />
                    <ProfilePaper elevation={3} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <ProfileAvatar alt={instructor.firstname} src={instructor.image} />
                        <ProfileTypography variant="h4">
                            {instructor.firstname} {instructor.lastname}
                        </ProfileTypography>
                        <ProfileTypography variant="h6">{instructor.email}</ProfileTypography>
                        <ProfileTypography variant="body1">Gender: {instructor.gender}</ProfileTypography>
                        <ProfileTypography variant="body1">Birthdate: {instructor.birthdate}</ProfileTypography>

                        {/* <TimelineItem>
                            <Typography variant="h6" style={{ color: '#f5f5f5' }}>Career Timeline</Typography>
                            <Typography variant="body2" style={{ color: '#f5f5f5' }}>2008 - Joined ABC University as a Lecturer</Typography>
                            <Typography variant="body2" style={{ color: '#f5f5f5' }}>2012 - Promoted to Associate Professor</Typography>
                            <Typography variant="body2" style={{ color: '#f5f5f5' }}>2017 - Became Head of Computer Science Department</Typography>
                            <Typography variant="body2" style={{ color: '#f5f5f5' }}>2022 - Published groundbreaking research on Artificial Intelligence</Typography>
                        </TimelineItem> */}

                        {/* <AchievementList>
                            <Typography variant="h6" style={{ color: '#f5f5f5' }}>Achievements</Typography>
                            <AchievementListItem>
                                <Typography variant="body2" style={{ color: '#f5f5f5' }}>Recipient of the Best Educator Award 2018</Typography>
                            </AchievementListItem>
                            <AchievementListItem>
                                <Typography variant="body2" style={{ color: '#f5f5f5' }}>Keynote Speaker at International Technology Conference 2019</Typography>
                            </AchievementListItem>
                            <AchievementListItem>
                                <Typography variant="body2" style={{ color: '#f5f5f5' }}>Over 60 published research papers</Typography>
                            </AchievementListItem>
                        </AchievementList> */}

                        <Quote variant="body1">
                            "Education is not the filling of a pail, but the lighting of a fire."
                        </Quote>
                    </ProfilePaper>
                </ProfileContainer>
            </div>
        </div>
    );
};

export default InstructorProfile;
