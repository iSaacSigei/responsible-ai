import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const Landing = () => {
    return (
        <div className="container landing d-flex align-items-center justify-content-center min-vh-100">
            <div className="col-12 col-md-6">
                <div className='bg'>
                <div className="message-container">
                    <div className="message">
                        <h2>Welcome to WoMall</h2>
                        <p>Your trusted partner in global export and import services.</p>
                    </div>
                    <div className="message">
                        <h2>Comprehensive Trade Solutions</h2>
                        <p>Explore our services designed to simplify your international trade operations.</p>
                    </div>
                    <div className="message">
                        <h2>Exclusive Resources</h2>
                        <p>Access tools and resources to streamline your import/export processes.</p>
                    </div>
                    <div className="message">
                        <h2>Stay Updated</h2>
                        <p>Join our community and stay informed about the latest in global trade.</p>
                    </div>
                </div>
                </div>
                <div className="col pt-4 mt-4 text-white">
                    <p>Partner with WoMall and take your business across borders with ease.</p>
                    <div className="d-flex justify-content-between mt-4 align-items-center w-100">
                        <Link to="/exports" className="slanted-button">Export Now</Link>
                        <Link to="/imports" className="slanted-button">Import Now</Link>
                    </div>

                    <p className="text-center mt-5">
                        <small>Sign up <Link to="/signup">here</Link> to get updates and exclusive offers</small>
                    </p>
                </div>
                {/* Quick Question Section */}
                <div className="quiz col pt-4 mb-4 mt-4 text-white">
                    <h3>Quick Question</h3>
                    <p>Do you want to import Bulk goods and you don't know how??</p>
                </div>
                {/* End of Quick Question Section */}
            </div>
        </div>
    );
};

export default Landing;
