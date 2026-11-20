import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import SidebarComponent from './Sidebar';
import { jwtDecode } from 'jwt-decode';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { LinearProgress, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const CoursestatisticsI = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const data = jwtDecode(jwt);
        const emaildomain = data.sub.split('@')[1];

        // Fetch students
        const studentsResponse = await axios.get(`http://localhost:8080/enrollement/course/${courseId}/${emaildomain}`);
        const studentsData = studentsResponse.data;


        // Fetch progress for each student
        const progressPromises = studentsData.map(async (student) => {
          const progressResponse = await axios.get(`http://localhost:8080/enrollement/progress/${student.student.id}/${courseId}`);
          return { ...student, progress: progressResponse.data };
        });

        const studentsWithProgress = await Promise.all(progressPromises);
        setStudents(studentsWithProgress);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courseId]);

  const columns = [
    {
      name: 'firstname',
      label: 'First Name',
      options: {
        setCellProps: () => ({ style: { paddingLeft: '50px' } }),
      }
    },
    {
      name: 'lastname',
      label: 'Last Name',
      options: {
        setCellProps: () => ({ style: { paddingLeft: '30px' } }),
      }
    },
    {
      name: 'email',
      label: 'Email',
    },
    {
      name: 'studylvl',
      label: 'Study Level',
      options: {
        setCellProps: () => ({ style: { paddingLeft: '50px' } }),
      }
    },
    {
      name: 'progress',
      label: 'Progress',
      options: {
        customBodyRender: (value) => {
          return (
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={value} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
              </Box>
            </Box>
          );
        },
      },
    },
    {
      name: 'performance',
      label: 'Performance',
      options: {
        setCellProps: () => ({ style: { paddingLeft: '50px' } }),
        customBodyRender: (value) => {
          const data = [
            { name: 'Correct', value: value.correct },
            { name: 'Wrong', value: value.wrong },
          ];
          const COLORS = ['#fdc005', '#b22e37'];

          return (
            <PieChart width={60} height={60}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={29}
                fill="#8884d8"
                paddingAngle={10}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: 'none',
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: 'Poppins',
      },
      palette: {
        background: {
          paper: 'rgba(128, 128, 128, 0.3)', // Light gray background
          default: 'rgba(128, 128, 128, 0.3)', // Change default background color
        },
        mode: 'dark', // Enable dark mode
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(7, 54, 130, 0.87)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(7, 54, 130, 0.87)',
              backdropFilter: 'blur(9.2px)',
              WebkitBackdropFilter: 'blur(9.2px)',
              border: '1px solid rgba(11, 66, 154, 0.7)', // Darker gray border
              padding: '1vw',
              marginBottom: '20px',
              width: '90%', // Smaller width for the container
              margin: '0 auto',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '10px 1em',
              color: '#fff',
              backgroundColor: 'rgba(169, 169, 169, 0.4)', // Slightly darker gray for header
            },
            body: {
              padding: '1.5em 2em',
              color: 'white', // Adjusted text color
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: 'rgba(128, 128, 128, 0.3)',
              },
              '&:nth-of-type(even)': {
                backgroundColor: 'rgba(128, 128, 128, 0.15)',
              },
            },
          },
        },
      },
    });

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <div style={{ display: 'flex' }}>
        <SidebarComponent />
        <div className="admincontainer contentContainer">
          <MUIDataTable
            title={<h4>Course Statistics</h4>}
            data={students.map(enrollment => ({
              firstname: enrollment.student.firstname,
              lastname: enrollment.student.lastname,
              email: enrollment.student.email,
              studylvl: enrollment.student.studylvl,
              progress: enrollment.progress, // Use progress directly
              performance: {
                correct: enrollment.correctanswers,
                wrong: enrollment.wronganswers,
              },
            }))}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </ThemeProvider>

  );
};

export default CoursestatisticsI;
