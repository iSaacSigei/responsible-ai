import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg fixed-top custom-navbar-bg">
    <div className="container text-light">
      <Link className="navbar-brand" to="/">WoMall</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
        aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">
          <div></div>
          <div></div>
          <div></div>
        </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services">Services</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="nav-item d-flex justify-content-end align-items-center">
          <Link className="nav-link mr-3 text-light" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
