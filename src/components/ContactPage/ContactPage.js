import React, {useEffect} from 'react';
import '../styles/ContactPage.css'; // Ensure this CSS file is created and styled
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../footer/Footer'
const ContactPage = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
        });
      }, []);
  return (
    <>
    <div className="contact-page bg-light" data-aos="fade-up">
      <h1 className="contact-header">Inquiries</h1>
      <p className="contact-intro">
        If you still can't find what you're looking for, then you've come to the right place. Contact our team by filling out this simple form, or through our alternative contact details.
      </p>

      <div className="contact-container">
        {/* First Column - Our Contacts */}
        <div className="contact-info">
          <h2>Our Contacts</h2>
          <div className="contact-section">
            <h3>Call us</h3>
            <p>+254 20 8642000</p>
            <p>+254 722 204 424</p>
            <p>+254 722 204 423</p>
            <p>+254 709 042 000</p>
            <p>+254 733 606 011</p>
          </div>
          <div className="contact-section">
            <h3>Email us</h3>
            <p>For inquiries email us via <a href="mailto:customercare@womall.com">customercare@womall.com</a></p>
          </div>
          <div className="contact-section">
            <h3>Find us here</h3>
            <p>womall Enterprises</p>
            <p>Kasarani Rd, P.O Box 43903 – 00100, Nairobi</p>
          </div>
        </div>

        {/* Second Column - Contact Form */}
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="number">Number *</label>
              <input type="text" id="number" name="number" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Comment or Message *</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;
