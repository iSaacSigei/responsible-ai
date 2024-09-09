import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/OurPartners.css'; // Ensure this CSS file is created and styled

// Importing the partner logos from the /src/images folder
import partner1 from '../../images/eigoll.png';
import partner2 from '../../images/unilever.png';
import partner3 from '../../images/haco-brands-gold-bck.png';
import partner4 from '../../images/starlite.png';
import partner5 from '../../images/hapag.png';
import partner6 from '../../images/Dl-cargo-Feight-400-2.png';
import partner7 from '../../images/intracen.png';



const partnerLogos = [
  { logo: partner1},
  { logo: partner2},
  { logo: partner3},
  { logo: partner4},
  { logo: partner5},
  { logo: partner6},
  { logo: partner7},
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
        <p className='intro'>
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
          {partnerLogos.map((partner, index) => (
            <div key={index} className="partner-item">
              <img src={partner.logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default OurPartners;
