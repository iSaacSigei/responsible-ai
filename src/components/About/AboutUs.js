import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/AboutUs.css';
import Background from '../../images/importexport1.jpg';
import { FaUsers, FaHandshake, FaClock, FaStar } from 'react-icons/fa'; // Added FaStar for Quality Service
import Footer from '../footer/Footer'
const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <>
    <div className="about-us">
      <section className="about-us-first-page" data-aos="fade-up">
        <img src={Background} alt="Background" className="responsive-bg-image" />
        <div className="about-us-content">
          <h1 className="about-us-header">About Wo<span className='text-danger'>Mall</span> Expo</h1>
          <p>The region’s leading...</p>
          <h2 className="underline">Mission</h2>
          <p>Our mission is to transform global B2B interactions, making international trade accessible to all.</p>
          <h3 className="underline">Our Vision</h3>
          <p>To create a seamless international B2B trade environment where businesses of all sizes can maximize the global value of their products and services. By connecting producers and manufacturers with global distributors through innovative technology and dedicated support, we aim to build an efficient, transparent, and empowering trade ecosystem that drives growth and success for all stakeholders.</p>
        </div>
      </section>

      <section className="about-main" data-aos="zoom-in">
        <h1 className='text-center text-dark'>Our Values</h1>
        <div className='about-us-second-page'>
        <div className="value-item">
          <FaUsers className="value-item-icon" />
          <h2 className="value-item-header">Teamwork</h2>
          <p className="value-item-text">We believe that no individual can win a game by themselves. We have confidence in each others' capabilities and intentions.</p>
        </div>
        <div className="value-item">
          <FaHandshake className="value-item-icon" />
          <h2 className="value-item-header">Integrity</h2>
          <p className="value-item-text">We hold ourselves to the highest ethical standards, ensuring honesty and transparency in all our dealings.</p>
        </div>
        <div className="value-item">
          <FaClock className="value-item-icon" />
          <h2 className="value-item-header">Timely Delivery</h2>
          <p className="value-item-text">We understand the importance of time and are committed to delivering our services on schedule.</p>
        </div>
        <div className="value-item">
          <FaStar className="value-item-icon" />
          <h2 className="value-item-header">Quality Service</h2>
          <p className="value-item-text">We strive to exceed expectations by providing top-notch services that meet the highest standards of quality.</p>
        </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
