import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import SidebarComponent from '../Sidebar';
import { BiSolidDetail, BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine as Delete } from 'react-icons/ri';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as image from '../../Images';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const result = await axios.get('http://localhost:8080/student');
      setStudents(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/student/${id}`);
      loadStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const columns = [
    {
      name: 'id',
      label: 'ID',
    },
    {
      name: 'firstname',
      label: 'First Name',
    },
    {
      name: 'lastname',
      label: 'Last Name',
    },
    {
      name: 'birthdate',
      label: 'Birth Date',
    },
    {
      name: 'studylvl',
      label: 'Study Level',
    },
    {
      name: 'gender',
      label: 'Gender',
    },
    {
      name: 'email',
      label: 'Email',
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        customBodyRenderLite: (index) => (
          <div style={{ display: 'flex' }}>
            <Link style={{color:'rgba(27, 171, 203, 1)',borderColor:'rgba(27, 171, 203, 1)'}} to={`/ViewStudent/${students[index].id}`} className="btn btn-outline-primary btn-sm me-2">
              <BiSolidDetail className="icon" />
            </Link>
            <Link style={{color:'#fdc005',borderColor:'#fdc005'}} to={`/EditStudent/${students[index].id}`} className="btn btn-outline-warning btn-sm me-2">
              <BiEdit  className="icon" />
            </Link>
            <button style={{color:'#b22e37',borderColor:'#b22e37'}} className="btn btn-outline-danger btn-sm" onClick={() => deleteStudent(students[index].id)}>
              <Delete className="icon" />
            </button>
          </div>
        ),
      },
    },
  ];

  const options = {
    selectableRows: 'none',
  };

  // Define the custom theme
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
      <div className="contentCont" style={{ display: 'flex' }}>
        <SidebarComponent />
        <div className="admincontainer" style={{ flex: 1 }}>
          <div className="py-4">
            <MUIDataTable
              title={<div className="challenge-title">
              <h4>All Students</h4>
              <a href="/AddStudent" className="icon">
                  <img style={{marginBottom:'5px'}} src={image.whiteplus} alt="Add Daily Challenge" className="icon" />
              </a>
          </div>}
              data={students}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AllStudents;
