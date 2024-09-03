import React from 'react';
import Footer from '../footer/Footer';
import Landing from '../LandingPage/Landing';
import WhyUs from '../whyus/WhyUs';
import Services from '../Services/Services';
import OurPartners from '../OurPartners/OurPartners';
import About from '../AboutPage/About';
const Home = () => (
  <div>
    <Landing />
    <About/>
    <Services/>
    <OurPartners/>
    <WhyUs/>
    <Footer />
  </div>
);

export default Home;
