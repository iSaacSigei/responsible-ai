import React, { useEffect } from 'react';
import AOS from 'aos';
import { Helmet } from 'react-helmet-async';
import 'aos/dist/aos.css';
import '../styles/AboutUs.css';
import Background from '../../images/importexport1.jpg';
import { FaShieldAlt, FaHandshake, FaClock, FaStar } from 'react-icons/fa'; // Added FaStar for Quality Service
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
      <Helmet>
        <title>About Us - WoMall</title>
        <meta name="description" content="Learn about WoMall, a revolutionary B2B platform that simplifies international trade by connecting manufacturers and suppliers globally. Discover our mission, vision, and values." />
        <meta name="keywords" content="WoMall, B2B platform, international trade, manufacturers, suppliers, retailers, global trade, business values" />
        <meta property="og:title" content="About Us - WoMall" />
        <meta property="og:description" content="Discover WoMall's mission to transform global B2B interactions, our vision for seamless international trade, and our core values of reliability, integrity, timely delivery, and quality service." />
        {/* <meta property="og:image" content="URL_to_image_for_about_us_page" /> */}
        <meta property="og:url" content="https://www.womall.africa/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - WoMall" />
        <meta name="twitter:description" content="Learn about WoMall's role in revolutionizing B2B trade, our commitment to excellence, and our core values." />
        <meta name="twitter:image" content="URL_to_image_for_about_us_page" />
        <link rel="canonical" href="https://www.womall.africa/about" />
      </Helmet>

    <div className="about-us">
      <section className="about-us-first-page" data-aos="fade-up">
        <img src={Background} alt="Background" className="responsive-bg-image" />
        <div className="about-us-content">
          <h1 className="about-us-header">About Wo<span className='text-danger'>Mall</span> Expo</h1>
          <p>WoMall is a revolutionary B2B platform designed to simplify international trade by connecting producers and manufacturers with global suppliers and retailers. We manage every stage of the global trade process.</p>
          <h2 className="underline">Mission</h2>
          <p>Our mission is to transform global B2B interactions, making international trade accessible to all.</p>
          <h3 className="underline">Our Vision</h3>
          <p>To create a seamless international B2B trade environment where businesses of all sizes can maximize the global value of their products and services.</p>
        </div>
      </section>

      <section className="about-main" data-aos="zoom-in">
        <h1 className='text-center text-dark py-3'>Our Values</h1>
        <div className='about-us-second-page'>
        <div className="value-item">
        <FaShieldAlt className="value-item-icon" />
        <h2 className="value-item-header">Reliability</h2>
          <p className="value-item-text">At WoMall, reliability is at the core of everything we do. We pride ourselves on being a dependable partner in your shopping journey, ensuring that you can trust us to deliver high-quality products and services consistently</p>
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
