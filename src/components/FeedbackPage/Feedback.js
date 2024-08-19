import React,{useEffect} from 'react';
import '../styles/importFeedback.css';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
const ImportFeedback = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }, []);
      const handleCheckOrders = () => {
        navigate('/my_orders'); // Replace with the actual path to view orders
      };
    
      const handleOrderAnother = () => {
        navigate('/imports'); // Replace with the actual path to the import page
      };
    return (
        <>
  <div className="import-feedback-container d-flex flex-column align-items-center min-vh-100">
      <div className="message-section bg text-center py-4 px-3">
        <h2>Your order has been received!</h2>
        <p>We are currently reviewing your order and will provide you with a price quotation via email.</p>
      </div>

      {/* New Buttons */}
      <div className="button-container mt-5">
        <button className="btn btn-primary me-3" onClick={handleCheckOrders}>Check My Orders</button>
        <button className="btn btn-secondary" onClick={handleOrderAnother}>Order Another Product</button>
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
