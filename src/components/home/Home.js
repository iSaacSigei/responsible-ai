import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Landing from '../LandingPage/Landing';
import WhyUs from '../whyus/WhyUs';
const Home = () => (
  <div>
    <Navbar />
    <Landing />
    <WhyUs/>
    <Footer />
  </div>
);

export default Home;
