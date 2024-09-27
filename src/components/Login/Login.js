import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/Signup.css';
import Logo from '../../images/womall-logo.png';

const Login = ({ updateUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch('https://mysite-jr5y.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        if (response.status === 401) {
          toast.error('Invalid email or password');
        } else {
          toast.error('An error occurred');
          navigate('/error500');
        }
        return;
      }
  
      const result = await response.json();
      toast.success('Login successful!');
      localStorage.setItem('token', result.token);  // Store the token
      
      // Update user data
      await updateUser();      
      // Check user role
      if (result.user.role === 'admin') {
        navigate('/admin_panel');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      navigate('/error500');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Helmet for page-specific meta tags */}
      <Helmet>
        <title>Login - WoMall</title>
        <meta property="og:title" content="Login - WoMall" />
        <meta name="description" content="Login to access your WoMall account and start connecting with global manufacturers and suppliers." />
        <link rel="canonical" href="https://www.womall.africa/login" />
        <meta property="og:image" content={Logo} />
        <meta name="keywords" content="Login WoMall, B2B platform, international trade, manufacturers, suppliers, retailers, global trade, business values" />

      </Helmet>

      <div className="signup-page-container mt-5">
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
          <button type="submit" className="btn-1 w-100" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="signup-link-container text-center mt-4">
          <p className='text-light'>Or don't have an account? <Link to="/signup" className="signup-link">Sign up here</Link></p>
        </div>
      </div>
      <ToastContainer 
        className="custom-toast-container" 
        position="top-center" 
        autoClose={4000} 
      />
      <Footer />
    </>
  );
};

export default Login;
