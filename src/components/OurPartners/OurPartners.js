import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/OurPartners.css'; // Ensure this CSS file is created and styled

const partnerLogos = [
  'https://via.placeholder.com/150?text=Partner+1',
  'https://via.placeholder.com/150?text=Partner+2',
  'https://via.placeholder.com/150?text=Partner+3',
  'https://via.placeholder.com/150?text=Partner+4',
  'https://via.placeholder.com/150?text=Partner+5',
  'https://via.placeholder.com/150?text=Partner+6',
  'https://via.placeholder.com/150?text=Partner+7',
  'https://via.placeholder.com/150?text=Partner+8',
  'https://via.placeholder.com/150?text=Partner+9',
  'https://via.placeholder.com/150?text=Partner+10',
];

const OurPartners = () => {
  const { ref: introRef, inView: introInView } = useInView({ triggerOnce: false });
  const { ref: partnersRef, inView: partnersInView } = useInView({ triggerOnce: false });

  return (
    <div className="our-partners-page">
      {/* Introduction Section */}
      <motion.section
        ref={introRef}
        className="introduction"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: introInView ? 1 : 0, scale: introInView ? 1 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Our Partners</h1>
        <p>
          At WoMall, we are proud to work with a diverse range of partners who share our commitment to excellence. Our partners contribute to our mission by providing top-notch services and support.
        </p>
      </motion.section>

      {/* Partners Section */}
      <motion.section
        ref={partnersRef}
        className="partners"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: partnersInView ? 1 : 0, scale: partnersInView ? 1 : 0.9 }}
        transition={{ duration: 0.6 }}
      >
        <div className="partners-list">
          {partnerLogos.map((logo, index) => (
            <div key={index} className="partner-item">
              <img src={logo} alt={`Partner ${index + 1}`} />
              <p>Partner {index + 1} Description</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default OurPartners;
