import React from 'react';
import '../styles/EventsPage.css';

const EventCard = ({ image, tag, profiles, date, title, location, price, categories, link }) => {
  return (
    <div className="card-media">
      <div className="card-media-object-container">
        <div className="card-media-object" style={{ backgroundImage: `url(${image})` }}></div>
        {tag && <span className="card-media-object-tag subtle">{tag}</span>}
        <ul className="card-media-object-social-list">
          {profiles.map((profile, index) => (
            <li key={index}>
              <img src={profile} alt="profile" className="" />
            </li>
          ))}
          {profiles.length > 2 && (
            <li className="card-media-object-social-list-item-additional">
              <span>+{profiles.length - 2}</span>
            </li>
          )}
        </ul>
      </div>

      <div className="card-media-body">
        <div className="card-media-body-top">
          <span className="subtle">{date}</span>
          <div className="card-media-body-top-icons u-float-right">
            {/* SVG icons here */}
          </div>
        </div>
        <span className="card-media-body-heading">{title}</span>
        <div className="card-media-body-supporting-bottom">
          <span className="card-media-body-supporting-bottom-text subtle">{location}</span>
          <span className="card-media-body-supporting-bottom-text subtle u-float-right">{price}</span>
        </div>
        <div className="card-media-body-supporting-bottom card-media-body-supporting-bottom-reveal">
          <span className="card-media-body-supporting-bottom-text subtle">{categories}</span>
          <a href={link} className="card-media-body-supporting-bottom-text card-media-link u-float-right">
            VIEW TICKETS
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
