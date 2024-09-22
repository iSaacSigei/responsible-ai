import React from 'react';

const Footer = () => (
  <footer className="footer custom-navbar-bg">
    <div className="container py-4">
      <div className="row">
        <div className="col-md-3">
          <h5 className="mb-3">WoMall</h5>
          <p>Contact Us: info@womall.africa</p>
          <p>Our Office: Thika Road Mall, Nairobi</p>
          <p>P.O. BOX 43801 – 00500</p>
        </div>
        <div className="col-md-3">
          <h5 className="mb-2">Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="/about" style={{ color: '#5a5959' }}>About Us</a></li>
            <li><a href="/services" style={{ color: '#5a5959' }}>Our Services</a></li>
            <li><a href="/contact" style={{ color: '#5a5959' }}>Contact</a></li>
            <li><a href="/faq" style={{ color: '#5a5959' }}>FAQ</a></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="mb-2">Follow Us</h5>
          <ul className="list-unstyled">
            <li className="pr-2"><a href="https://twitter.com/womall" style={{ color: '#5a5959' }}>Twitter</a></li>
            <li className="pr-2"><a href="https://linkedin.com/company/womall" style={{ color: '#5a5959' }}>LinkedIn</a></li>
            <li className="pr-2"><a href="https://facebook.com/womall" style={{ color: '#5a5959' }}>Facebook</a></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="mb-2">Policies</h5>
          <ul className="list-unstyled">
            <li><a href="/privacy-policy" style={{ color: '#5a5959' }}>Privacy Policy</a></li>
            <li><a href="/terms-of-service" style={{ color: '#5a5959' }}>Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="container-fluid text-center custom-navbar-bg text-white py-3">
      <p className="navbar-brand">&copy; 2024 WoMall. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
