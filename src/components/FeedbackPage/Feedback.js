import React from 'react';
import '../styles/importFeedback.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
const ImportFeedback = () => {
    return (
        <>
        <Navbar/>
        <div className="import-feedback-container d-flex flex-column align-items-center  min-vh-100">
            <div className="message-section bg text-center py-4 px-3">
                <h2>Your order has been received!</h2>
                <p>We are currently reviewing your order and will provide you with a price quotation via email.</p>
            </div>
            <div className="suggested-partners-section mt-5">
                <h3>Suggested Partners</h3>
                <div className="partners-grid">
                    <div className="partner-card">
                        <h5>Partner A</h5>
                        <p>Specializes in the importation of electronics and gadgets.</p>
                    </div>
                    <div className="partner-card">
                        <h5>Partner B</h5>
                        <p>Known for high-quality furniture imports.</p>
                    </div>
                    <div className="partner-card">
                        <h5>Partner C</h5>
                        <p>Offers reliable importation services for clothing and textiles.</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default ImportFeedback;
