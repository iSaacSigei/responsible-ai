import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => (
  <nav className="navbar navbar-expand-lg custom-navbar-bg">
    <div className="container text-light">
      <Link className="navbar-brand" style={{color:"#18453"}} to="/">WoMall</Link>
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
          {user ? (
            <>
              <span className="nav-link mr-3 text-light">
                Welcome, {user.first_name}!
              </span>
              <div className="dropdown">
                <span className="nav-link text-light dropdown-toggle" id="settingsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-cog"></i>
                </span>
                <ul className="dropdown-menu" aria-labelledby="settingsDropdown">
                  <li><Link className="dropdown-item" to="/update-profile">Update Profile</Link></li>
                  <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                  <li><button className="dropdown-item" onClick={onLogout}>Logout</button></li>
                </ul>
              </div>
            </>
          ) : (
            <Link className="nav-link mr-3 text-light" to="/login">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
