import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer/Footer';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ updateUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData);
      toast.success('Login successful!');
      console.log('Login successful:', response.data);
      // Update user state and redirect to the homepage after successful login
      await updateUser();
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className="auth-page-container mt-5">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn-1 w-100">Login</button>
        </form>
        <div className="signup-link-container text-center mt-4">
          <p className='text-light'>Or don't have an account? <Link to="/signup" className="signup-link ">Sign up here</Link></p>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} />
      <Footer />
    </>
  );
};

export default Login;
