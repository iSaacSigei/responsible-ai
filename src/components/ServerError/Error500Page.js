import React from 'react';
import '../styles/Error500Page.css'; // Import the CSS file if you use an external stylesheet

const Error500Page = () => {
  return (
    <div className="page-500 mt-5">
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div className="inner-circle">
              <i className="fa fa-cogs"></i>
              <span>500</span>
            </div>
            <span className="inner-status">Oops! Internal Server Error!</span>
            <span className="inner-detail">
              Unfortunately we're having trouble loading the page you are looking for. Please come back in a while.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error500Page;
