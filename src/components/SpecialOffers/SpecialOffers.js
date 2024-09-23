import React, { useEffect } from 'react';
import '../styles/SpecialOffers.css';

const offers = [
  {
    header: '10% Off on All Exports',
    description: 'Take advantage of our special offer and enjoy 10% on all exports. Click "Show More" to learn how you can benefit from this exclusive deal.',
  },
  {
    header: 'Free Logistics Support',
    description: 'For a limited time, get free logistics support for all orders above $5,000. Streamline your trade with zero logistics fees. Click "Show More" for more details.',
  },
  {
    header: 'Referral Program Bonus',
    description: 'Earn up to $500 for every referral that successfully completes an order. Share the benefits of WoMall with your network and get rewarded. Click "Show More" for the terms.',
  },
  {
    header: 'Early Access to New Markets',
    description: 'Be among the first to access new international markets with our exclusive early access program. Click "Show More" to see the available regions and benefits.',
  },
];

const SpecialOffers = () => {
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.offer-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          card.classList.add('in-view');
        } else {
          card.classList.remove('in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger check on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="special-offers">
      <h1 className="offers-header">Special Offers</h1>
      <div className="offers-container">
        {offers.map((offer, index) => (
          <div className="offer-card" key={index}>
            <h2>{offer.header}</h2>
            <p>{offer.description}</p>
            <a href="#" className="show-more-link">Show More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
