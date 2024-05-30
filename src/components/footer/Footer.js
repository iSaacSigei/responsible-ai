import React from 'react';

const Footer = () => (
  <footer className="footer mt-5 custom-navbar-bg text-white">
    <div className="container py-4">
      <div className="row">
        <div className="col-md-3">
          <h5 className="mb-3">Responsible AI</h5>
          <p>Contact us</p>
          <p>Our office</p>
        </div>
        <div className="col-md-3">
          <h5 className="mb-2">Get in Touch</h5>
          <form>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter your message" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-3">
          <h5 className="mb-2">Follow us on</h5>
          <ul className="list-unstyled">
            <li className="pr-2">Twitter <i className="bi bi-twitter"></i></li>
            <li className="pr-2">LinkedIn <i className="bi bi-linkedin"></i></li>
            <li className="pr-2">Facebook <i className="bi bi-facebook"></i></li>
            <li className="pr-2">GitHub <i className="bi bi-github"></i></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="mb-2">Policies</h5>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </div>
    <div className="container-fluid text-center custom-navbar-bg text-white py-3">
      <p className="navbar-brand">&copy; 2024 Responsible AI. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
