import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import * as image from '../Images';
import { PieChart, Pie, Tooltip, Legend, Cell, BarChart, CartesianGrid, XAxis, YAxis, Bar, Sector, ResponsiveContainer } from 'recharts';
import SidebarComponent from './Sidebar';
import './Style.css';
import './AdminHomeStyle.css'


const AdminHome = () => {
  const [items, setItems] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [instructorCount, setInstructorCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [specialistCount, setSpecialistCount] = useState(0);
  const [malecount, setmalecount] = useState(0);
  const [femalecount, setfemalecount] = useState(0);

  const [L1, setL1] = useState(0);
  const [L2, setL2] = useState(0);
  const [L3, setL3] = useState(0);
  const [M1, setM1] = useState(0);
  const [M2, setM2] = useState(0);

  const [refreshKey, setRefreshKey] = useState(0);

  const data = [
    { name: 'Students', value: studentCount },
    { name: 'Instructors', value: instructorCount },
    { name: 'Specialists', value: specialistCount },
  ];
  const COLORS = ['rgba(27, 171, 203, 1)', '#fdc005', '#b22e37'];
  const colors2 = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5"];
  const COLORS3 = ["#b22e37", "#fdc005"];

  // const renderLegend = (props) => {
  //   const { payload } = props;

  //   return (
  //     <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
  //       {payload.map((entry, index) => (
  //         <li key={`item-${index}`} style={{ color: entry.color, fontSize: '14px' }}>
  //           {entry.value}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  const data2 = [
    { name: 'L1', Students: L1 },
    { name: 'L2', Students: L2 },
    { name: 'L3', Students: L3 },
    { name: 'M1', Students: M1 },
    { name: 'M2', Students: M2 },
  ];
  const renderCustomLegend = (props) => {
    const { payload } = props;

    return (
      <ul style={{ listStyleType: 'none', padding: '4px', margin: 0 , background: 'rgba(255,255,255,0.3)', borderRadius:'4px'}}>
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: 'bold',
              textShadow: '-1px 0 #351546, 0 1px #351546, 1px 0 #351546, 0 -1px #351546',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                marginRight: '8px',
              }}
            ></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const data3 = [
    { name: 'Male', value: malecount },
    { name: 'Female', value: femalecount },
  ];

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  useEffect(() => {
    loadItems();
    loadChallenges();
    refresh();
    fetch('http://localhost:8080/instructor/count')
      .then(response => response.json())
      .then(data => setInstructorCount(data));
    fetch('http://localhost:8080/student/count')
      .then(response => response.json())
      .then(data => setStudentCount(data));
    fetch('http://localhost:8080/specialist/count')
      .then(response => response.json())
      .then(data => setSpecialistCount(data));

    fetch(`http://localhost:8080/student/countstdlvl/L1`)
      .then(response => response.json())
      .then(data2 => setL1(data2));
    fetch(`http://localhost:8080/student/countstdlvl/L2`)
      .then(response => response.json())
      .then(data2 => setL2(data2));
    fetch(`http://localhost:8080/student/countstdlvl/L3`)
      .then(response => response.json())
      .then(data2 => setL3(data2));
    fetch(`http://localhost:8080/student/countstdlvl/M1`)
      .then(response => response.json())
      .then(data2 => setM1(data2));
    fetch(`http://localhost:8080/student/countstdlvl/M2`)
      .then(response => response.json())
      .then(data2 => setM2(data2));

    fetch(`http://localhost:8080/auth/countgender/Male`)
      .then(response => response.json())
      .then(data3 => setmalecount(data3));
    fetch(`http://localhost:8080/auth/countgender/Female`)
      .then(response => response.json())
      .then(data3 => setfemalecount(data3));
    console.log("male");
    console.log(malecount);
    console.log("female");
    console.log(femalecount);
  }, []);

  const loadItems = async () => {
    const result = await axios.get('http://localhost:8080/item');
    setItems(result.data.slice(0, 3));
  };

  const loadChallenges = async () => {
    const result = await axios.get('http://localhost:8080/challenge');
    setChallenges(result.data);
  };

  const dailyChallenges = challenges.filter(challenge => challenge.type === 'DAILY').slice(0, 3);
  const achievementChallenges = challenges.filter(challenge => challenge.type === 'ACHIEVEMENT').slice(0, 3);

  return (
      <div style={{ display: 'flex' }}>
        <SidebarComponent />
        <div className="contentCont" style={ styles.container}>
          <div style={styles.content}>
            <div style={styles.welcome} className='welcome'>
              <h1 className="mb-4">
                Welcome, dear Administrator!
              </h1>
              <p style={styles.welcomeText}>
                Here, you have the power to manage users, items, challenges, and more. Take control of your platform and make impactful decisions to drive success. Whether it's overseeing user interactions or creating new challenges, this dashboard puts the tools you need right at your fingertips. Let's get started and make a difference together!
              </p>

            </div>

              <h2 style={styles.statTitle}>Statistics</h2>
              <div style={styles.statscont}>
                <div style={styles.stats}>
                  <div style={styles.chartContainer}>
                    <h4 style={styles.chartTitle}>Number of users</h4>
                    <PieChart width={400} height={120} key={refreshKey} style={styles.pieChart}>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        isAnimationActive={true}
                        animationDuration={2000}
                        animationEasing="ease"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        align="left"
                        verticalAlign="middle"
                        layout="vertical"
                        content={renderCustomLegend}
                      />
                    </PieChart>
                  </div>
                  <div style={styles.chartContainer}>
                    <h4 style={styles.chartTitle}>Number of users based on their gender</h4>
                    <ResponsiveContainer width={400} height={120} key={refreshKey}>
                      <PieChart width={400} height={400}>
                        <Pie
                          data={data3}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={55}
                          fill="#8884d8"
                          dataKey="value"
                          isAnimationActive={true}
                          animationDuration={2000}
                          animationEasing="ease"
                        >
                          {data3.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS3[index % COLORS3.length]} />
                          ))}
                        </Pie>
                        <Legend
                          content={renderCustomLegend}
                          align="left"
                          verticalAlign="middle"
                          layout="vertical" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                </div>
                <div style={styles.stats2}>
                  <div style={styles.chartContainer}>
                    <h4 style={styles.chartTitle}>Number of students based on their study level</h4>
                    <BarChart
                      width={420}
                      height={320}
                      data={data2}
                      key={refreshKey}
                      margin={{left: -40}}
                    >
                      <XAxis dataKey="name" tick={{ fill: "white" }} axisLine={{ stroke: 'white' }} />
                      <YAxis tick={{ fill: "white" }} axisLine={{ stroke: 'white' }} />
                      <Bar dataKey="Students" fill="rgba(27, 171, 203, 1)" barSize={40} />
                    </BarChart>
                  </div>
                </div>
              </div>
          </div>
          <div style={styles.right}>
            <div style={styles.flex}>
              <h4 style={styles.sectionTitle}>Items</h4>
              <div>
                <a href="/AddItem" className="icon" style={styles.addIcon}>
                  <img src={image.whiteplus} alt="Add Item" className="icon" style={styles.icon} />
                </a>
                <a href="/allitems" className="icon" style={styles.addIcon}>
                  <img src={image.more} alt="Add Item" className="icon" style={styles.icon} />
                </a>
              </div>
            </div>
            <div style={styles.items}>
              {items.map((item, index) => (
                <div key={index} style={styles.item}>
                  <img src={image.item} alt="Add Daily Challenge" className="icon" style={styles.icon} />
                  <h5 style={styles.itemTitle}>{item.name}</h5>
                </div>
              ))}
            </div>
            <div style={styles.flex}>
              <h4 style={styles.sectionTitle}>Daily Challenges</h4>
              <div>
                <a href="/AddChallenge/DAILY" className="icon" style={styles.addIcon}>
                  <img src={image.whiteplus} alt="Add Daily Challenge" className="icon" style={styles.icon} />
                </a>
                <a href="/allChallenges" className="icon" style={styles.addIcon}>
                  <img src={image.more} alt="Add Item" className="icon" style={styles.icon} />
                </a>
              </div>
            </div>
            <div style={styles.items}>
              {dailyChallenges.map((challenge, index) => (
                <div key={index} style={styles.item}>
                  <img src={image.dailychallenge} alt="Add Achievement Challenge" className="icon" style={styles.icon} />
                  <h5 style={styles.itemTitle}>{challenge.title}</h5>
                </div>
              ))}
            </div>
            <div style={styles.flex}>
              <h4 style={styles.sectionTitle}>Achievements</h4>
              <div>
                <a href="/AddChallenge/ACHIEVEMENT" className="icon" style={styles.addIcon}>
                  <img src={image.whiteplus} alt="Add Achievement Challenge" className="icon" style={styles.icon} />
                </a>
                <a href="/allChallenges" className="icon" style={styles.addIcon}>
                  <img src={image.more} alt="Add Item" className="icon" style={styles.icon} />
                </a>
              </div>
            </div>
            <div style={styles.items}>
              {achievementChallenges.map((challenge, index) => (
                <div key={index} style={styles.item}>
                  <img src={image.achivement} alt="Add Achievement Challenge" className="icon" style={styles.icon} />
                  <h5 style={styles.itemTitle}>{challenge.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

  );
};

const styles = {
  bg: {
    backgroundImage: 'linear-gradient(to right bottom, #042142, #03224c, #092356, #15235f, #232167, #2e2171, #3a207a, #471d83, #551e91, #631d9f, #731bac, #8316b9)',
    paddingTop: '20px',
    // backgroundImage: 'linear-gradient(to right top, rgba(11, 255, 255, 0.72), rgba(11, 255, 255, 0.33), rgba(109, 81, 206, 0.7), rgba(109, 81, 206, 0.37), rgba(255, 51, 118, 0.48))',
  },
  container: {
    display: 'flex',
    paddingTop: '20px',
    width: '100%',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    marginLeft: '2vw',
    marginRight: '2vw',
    width:'58vw',
    marginTop: '1vw',
    width: '61.8vw',
  },
  welcome: {
    color: '#ffffff',
    textShadow: '-2px 0 #721740, 0 2px #721740, 2px 0 #721740, 0 -2px #721740',
    // backgroundColor:'rgba(195, 177, 225)',
    // boxShadow: '5px 5px 5px rgba(195, 177, 225, 0.5)',
    padding: '0.5vw 1vw 0.5vw 1vw',
    borderRadius: '30px',
    marginBottom: '2vh',
    height: '20vh'
  },
  title: {
    fontWeight: '700',
    textShadow: '-2px 0 #721740, 0 2px #721740, 2px 0 #721740, 0 -2px #721740',
  },
  welcomeText: {
    marginTop: '-3vh',
  },
  sectionTitle: {
    color: 'white',
    width:'5vw',
    fontWeight: 'bold',
    margin: '1.5vh',
    textShadow: '-2px 0 #721740, 0 2px #721740, 2px 0 #721740, 0 -2px #721740',
  },
  statTitle: {
    color: 'white',
    fontWeight: 'bold',
    margin: '10px 0',
    textShadow: '-2px 0 #721740, 0 2px #721740, 2px 0 #721740, 0 -2px #721740',
  },
  statscont: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  stats: {
    width: '25vw',
    justifyContent: 'space-between',
  },
  stats2: {
    width: '30vw',
  },
  chartContainer: {
    textAlign: 'center',
    background: 'rgba(255, 100, 100, 0.3)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(9.2px)',
    WebkitBackdropFilter: 'blur(9.2px)',
    border: '1px solid rgba(104, 13, 167, 0.3)',
    padding: '1vw',
    marginBottom: '20px',
  },
  chartTitle: {
    color: 'white',
    textShadow: '-2px 0 #351546, 0 2px #351546, 1px 0 #351546, 0 -1px #351546',
    fontSize: '1.35vw',
    marginBottom: '10px',
  },

  right: {
    width: '20vw',
    padding: '0 1vw 0 1vw',
    //backgroundColor: 'rgba(109, 81, 206, 0.3)'
  },
  addIcon: {
    display: 'inline-block',
    marginLeft: '10px',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  items: {
    // marginBottom: '20px',
    // borderRadius: '10px',
    // background: '#282842',
    //   background: '-webkit-linear-gradient(90deg, hsla(280, 79%, 41%, 1) 0%, hsla(247, 61%, 33%, 1) 100%)',
    //   filter: 'progid: DXImageTransform.Microsoft.gradient( startColorstr="#C7B3CC", endColorstr="#268AB2", GradientType=1 )'
  },
  item: {
    color: '#351546',
    padding: '1vh 0',
    display: 'flex',
    backgroundColor: 'rgba(109, 81, 206, 0.6)',
    boxShadow: '0 0 15px 1px rgba(100, 180, 100, 0.4)',
    marginBottom: '1vh',
    borderRadius: '10px',
    textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
    //textShadow: '-2px 0 #351546, 0 2px #351546, 1px 0 #351546, 0 -1px #351546',
    //backgroundColor: 'rgba(255, 51, 118, 0.4)',
  },
  itemTitle: {
    margin: '0',
    fontWeight: 'bolder'
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default AdminHome;
