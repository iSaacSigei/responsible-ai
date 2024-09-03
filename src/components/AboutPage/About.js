import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../src/images/png/logo-color.png'; // Adjust the path as needed
import '../styles/About.css'; // Ensure this CSS file is created and styled

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  const handleScroll = () => {
    const rect = aboutRef.current.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`about-page ${isVisible ? 'in-view' : ''}`}
      ref={aboutRef}
    >
      {/* Logo Section */}
      <div className="about-logo">
        <img src={Logo} alt="Eigoll Logo" />
      </div>
      {/* Mission */}
      <div className="about-section">
        <h2 className="about-subheader">Our Mission</h2>
        <p className="about-paragraph">
          Our mission is to transform global B2B interactions, making international trade accessible to all.
        </p>
      </div>

      {/* Vision */}
      <div className="about-section">
        <h2 className="about-subheader">Our Vision</h2>
        <p className="about-paragraph">
          To create a seamless international B2B trade environment where businesses of all sizes can maximize the global value of their products and services. By connecting producers and manufacturers with global distributors through innovative technology and dedicated support, we aim to build an efficient, transparent, and empowering trade ecosystem that drives growth and success for all stakeholders.
        </p>
      </div>

      {/* Learn More Link */}
      <div className="about-learn-more">
        <Link to="/about">Learn more about us</Link>
      </div>
    </div>
  );
};

export default About;
