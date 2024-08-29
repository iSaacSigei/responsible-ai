import React from 'react';
import Footer from '../footer/Footer';
import Landing from '../LandingPage/Landing';
import WhyUs from '../whyus/WhyUs';
import Services from '../Services/Services';
import OurPartners from '../OurPartners/OurPartners';
const Home = () => (
  <div>
    <Landing />
    <Services/>
    <OurPartners/>
    <WhyUs/>
    <Footer />
  </div>
);

export default Home;
