import React from 'react';

const Footer = () => (
  <footer className="footer mt-5 custom-navbar-bg text-white">
    <div className="container py-4">
      <div className="row">
        <div className="col-md-3">
          <h5 className="mb-3">WoMall</h5>
          <p>Contact Us: support@womall.com</p>
          <p>Our Office: 123 Mall Street, City, Country</p>
        </div>
        <div className="col-md-3">
          <h5 className="mb-2">Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="/about" className="text-white">About Us</a></li>
            <li><a href="/services" className="text-white">Our Services</a></li>
            <li><a href="/contact" className="text-white">Contact</a></li>
            <li><a href="/faq" className="text-white">FAQ</a></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="mb-2">Follow Us</h5>
          <ul className="list-unstyled">
            <li className="pr-2"><a href="https://twitter.com/womall" className="text-white">Twitter</a></li>
            <li className="pr-2"><a href="https://linkedin.com/company/womall" className="text-white">LinkedIn</a></li>
            <li className="pr-2"><a href="https://facebook.com/womall" className="text-white">Facebook</a></li>
            <li className="pr-2"><a href="https://github.com/womall" className="text-white">GitHub</a></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="mb-2">Policies</h5>
          <ul className="list-unstyled">
            <li><a href="/privacy-policy" className="text-white">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="text-white">Terms of Service</a></li>
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
