import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import * as image from '../Images';
import './HomePage.css';


const HomeP = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return <img src={image.dif1} alt="Beginner Icon" style={styles.difficultyIcon} />;
      case 'intermediate':
        return <img src={image.dif2} alt="Intermediate Icon" style={styles.difficultyIcon} />;
      case 'advanced':
        return <img src={image.dif3} alt="Advanced Icon" style={styles.difficultyIcon} />;
      default:
        return null;
    }
  };

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);

  const navigateToCourses = () => {
    navigate('/AllCourses');
  };

  const navigateToHomePage = () => {
    navigate('./HomePage');
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/course');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/review');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchCourses();
    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={i} src={image.fullstar} alt="Full Star" className="star" />);
    }
    // Add empty stars
    while (stars.length < 5) {
      stars.push(<img key={stars.length} src={image.star} alt="Empty Star" className="star" />);
    }

    return stars;
  };

  return (
    
    <div>
      {/* HeroSection */}
      <div className="heroSection">
        <div className="textContainer">
          <h1 className="title">Welcome to{" "}
            <span className="cs-quest">
              CS Quest
            </span>
          </h1>
          <div style={{width: '80%'}}>
          <p className="subtitle">Discover engaging interactive courses. Dive into engaging learning experiences that combine 
          play with educational content. Elevate your skills today!</p>
          </div>
          <div className="buttonContainer">
            <button className="button getStarted" onClick={navigateToCourses}>Get Started</button>
            <button className="button exploreCourses" onClick={navigateToCourses}>Explore Courses</button>
          </div>
        </div>
        <div className="imageContainer">
          <img
            src={image.img1}
            alt="Gamified Learning"
            className="image"
          />
        </div>
      </div>

      {/* FeaturedSection */}
      <div className="featuresSection">
        <h2 className="featuresTitle">Featured courses</h2>
        <div style={styles.flex}>
          <div style={styles.sliderContainer}>
            <Slider {...sliderSettings}>
              {Array.isArray(courses) && courses.map(course => (
                <div key={course.id}>
                  <Card style={styles.courseCard}>
                    <Card.Img variant="top" src={course.photo} style={styles.cardImage} />
                    <Card.Body style={styles.cardContent}>
                      <Card.Title style={{
                        fontFamily: 'Orbitron", sans-serif',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '30px',
                      }}>
                        {course.name}
                      </Card.Title>
                      <Card.Text style={styles.cardText}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {getDifficultyIcon(course.difficulty)}
                          <span>{course.difficulty}</span>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="aboutUsSection">
  <div className="imageContainer">
    <img src={image.img2} alt="About Us Image" className="aboutUsImage" />
  </div>
  <div className="textContainer" style={{width: '50%'}}>
    <h2 className="aboutUsTitle">Who We Are</h2>
    
    <div >
    <p className="aboutUsText">
      We are a team passionate about making education interactive and accessible to everyone. Our mission is to provide engaging courses and learning experiences that empower individuals to reach their full potential.
    </p>
    <p className="aboutUsText">
      Our platform is designed specifically for university students. We offer a blend of educational courses and interactive games to keep students engaged and foster a competitive spirit among them.
    </p>
    </div>
  </div>
</div>


      {/* Review Section */}
      <div className="review-section">
        <h2 className="review-section-title">Reviews</h2>
        <div className="reviews-container">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-image-container">
                <img src={review.student.image} alt={review.student.name} className="review-image" />
                <div className="review-image-bg"></div>
              </div>
              <div className="review-content">
                <h3 className="review-name">{review.student.name}</h3>
                <p className="review-job">{review.student.job}</p>
                <FaQuoteLeft className="quote-icon left" />
                <p className="review-text">{review.comment}</p>
                <FaQuoteRight className="quote-icon right" />
              </div>
              <div className="review-stars">
                {renderStars(review.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <section className="faqSection">
        <h2 className="faqTitle">Frequently Asked Questions</h2>
        <div className="faqContainer">
          <div className="faqItem">
            <div className="questionWrapper">
              <h3 className="faqQuestion">How do I register for a course?</h3>
            </div>
            <p className="faqAnswer">You can register for a course by clicking on the "Sign up" button and following the registration process.</p>
          </div>
          <div className="faqItem">
            <h3 className="faqQuestion">Are there any free courses available?</h3>
            <p className="faqAnswer">Yes, we offer a selection of free courses. You can explore them by visiting our course catalog.</p>
          </div>
          <div className="faqItem">
            <h3 className="faqQuestion">Can I register with my academic email?</h3>
            <p className="faqAnswer">Yes, you can register using your academic email. Simply choose the "Register with Email" option during the registration process and follow the instructions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footerContainer">
        <div className="footerColumn">
          <div className='contact'>
            <h4>Contact Us</h4>
            <div>
              <p>Email: contact@example.com</p>
              <p>Phone: +1234567890</p>
            </div>
          </div>
        </div>
        <div className="footerColumn">
          <h4 className="aboutText">About Us</h4>
          <div className="aboutText">
            <p>Gamified learning for university students to enhance performance, with engaging daily challenges. It helps professors assess student levels and weaknesses for focused teaching preparation.</p>
          </div>
          <img src={image.manetteF} alt="Footer Image" className="footerImage" />
        </div>
        <div className="footerColumn">
          <h4>Register Now</h4>
          <button onClick={navigateToHomePage}>Sign up</button>
        </div>
      </footer>
      <div className="footerBottom">
        © 2024 Copyright
      </div>
    </div>
  );
};

const styles = {

  flex: {
    display: 'flex',
    justifyContent: 'center',
  },
  courseTitle: {
    color: 'white',
    marginLeft: '50px',
    marginTop: '50px',
  },
  sliderContainer: {
    width: 'calc(90vw - 250px)',
    padding: '20px',
  },
  ImageStyled: {
    width: '100%',
    height: '20px',
    objectFit: 'cover',
  },
  card: {
    backgroundColor: '#2e2171',
    color: 'white',
  },
  cardTitle: {
    color: '#ffffff',
  },
  // cardText: {
  //     color: '#dcdcdc',
  // },
  cardButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#551e91',
    borderColor: '#551e91',
    color: 'white',
  },
  title: {
    color: '#27aeef',
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: '1.1em',
  },
  courseCard: {
    borderRadius: '0%',
    textAlign: 'left',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '20px',
    maxWidth: '250px',
    height: '300px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundImage: 'linear-gradient(rgb(15, 152, 189), rgb(9, 6, 75))',
    boxShadow: 'rgb(77, 121, 164) 6px 4px 6px, rgb(33 90 123 / 66%) -6px -3px 5px, rgb(15, 149, 187) 0px 4px 5px, rgba(17, 26, 55, 0.44) 4px -3px 5px',
    backdropFilter: 'blur(4.9px)',
    WebkitBackdropFilter: 'blur(4.9px)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0px 0px 15px 5px rgba(148, 0, 211, 0.9)',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.3s ease',
    },
  },
  cardImage: {
    width: '100%',
    height: '50%',
    objectFit: 'cover',
    display: 'block',
    padding: '5px',
  },
  ImageStyled: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '8px',
    color: '#fff',
  },
  difficultyIcon: {
    marginRight: '10px',
    width: '20px',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    display: 'flex',
    gap: '10px'
  },
  viewbtn: {
    padding: '3px 10px',
    fontSize: '14px',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    backgroundColor: '#ffffff',
    color: '#1babcb',
    border: '2px solid #1babcb',
    transform: 'translateY(0)',
  },
  addbtn: {
    padding: '3px 10px',
    fontSize: '15px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    backgroundColor: '#1babcb',
    border: '2px solid #1babcb',
    transform: 'translateY(0)',
  },
  viewbtnHover: {
    backgroundColor: '#1babcb',
    color: '#fff',
    transform: 'translateY(-5px)',
  },
  addbtnHover: {
    backgroundColor: '#ffffff',
    border: '2px solid #1babcb',
    color: '#1babcb',
    transform: 'translateY(-5px)',
  },
};

export default HomeP;
