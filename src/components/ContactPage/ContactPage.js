import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ContactPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../footer/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://mysite-jr5y.onrender.com/contact_messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact_message: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.success('Message sent successfully!');
          setFormData({
            name: '',
            number: '',
            email: '',
            message: ''
          });
        } else {
          toast.error('Failed to send message.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error sending message.');
      });
  };

  return (
    <>
      <div className="contact-page bg-light" data-aos="fade-up">
        <h1 className="contact-header">Inquiries</h1>
        <p className="contact-intro">
          If you still can't find what you're looking for, then you've come to the right place. Contact our team by filling out this simple form, or through our alternative contact details.
        </p>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Our Contacts</h2>
            <div className="contact-section">
              <h3>Call us</h3>
              <p>+254 711 398 749</p>
              <p>+254 710 143 379</p>
            </div>
            <div className="contact-section">
              <h3>Email us</h3>
              <p>For inquiries email us via <a href="mailto:customercare@womall.com">customercare@womall.com</a></p>
            </div>
            <div className="contact-section">
              <h3>Find us here</h3>
              <p>womall Enterprises</p>
              <p>Kasarani Rd, P.O Box 00791 – 00100, Nairobi</p>
            </div>
          </div>

          <div className="contact-form">
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="number">Number *</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Comment or Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />

      {/* Add ToastContainer to render toast notifications */}
      <ToastContainer
        position="top-center"  // Change to "top-center" or "bottom-center"
        autoClose={5000}       // Time in milliseconds (5 seconds)
        hideProgressBar={false} // Show or hide progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ContactPage;