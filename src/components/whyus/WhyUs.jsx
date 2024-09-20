import React, { useEffect, useRef } from 'react';
import '../styles/whyus.css';
import { FaShippingFast, FaHandshake, FaDollarSign, FaUsers } from 'react-icons/fa';

const reasons = [
  {
    icon: <FaShippingFast />,
    header: 'Seamless Importation',
    text: 'We streamline the importation process, ensuring that your goods are brought in efficiently and hassle-free.'
  },
  {
    icon: <FaHandshake />,
    header: 'Trusted Exportation',
    text: 'Our network guarantees secure and reliable exportation, connecting you with trustworthy partners globally.'
  },
  {
    icon: <FaDollarSign />,
    header: 'Reliable Transactions',
    text: 'Our platform facilitates transparent and secure transactions, providing peace of mind for all parties involved.'
  },
  {
    icon: <FaUsers />,
    header: 'Connecting Buyers and Partners',
    text: 'We bridge the gap between buyers and trusted partners, fostering strong business relationships and growth opportunities.'
  }
];

const WhyUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    const section = sectionRef.current;
    const cards = section.querySelectorAll('.whyus-card');

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="whyus-section">
      <h1 className="whyus-title my-4 text-center text-light">Why Choose Us?</h1>
      <h3 className="whyus-subtitle text-center mb-5 text-capitalize">
        Discover how we simplify importation, exportation, and more
      </h3>
      <div className="whyus-grid">
        {reasons.map((reason, index) => (
          <div key={index} className="whyus-card-container">
            <div className="whyus-card">
              <div className="whyus-icon">{reason.icon}</div>
              <h2 className="whyus-card-header">{reason.header}</h2>
              <p className="whyus-card-text">{reason.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
