import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Landing from '../LandingPage/Landing';
import WhyUs from '../whyus/WhyUs';
import Services from '../Services/Services';
const Home = () => (
  <div>
    <Navbar />
    <Landing />
    <Services/>
    <WhyUs/>
    <Footer />
  </div>
);

export default Home;
