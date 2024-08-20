import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
const Login = ({ updateUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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
    try {
        const response = await fetch('https://mysite-vqs1.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await response.json();

        if (response.ok) {
            toast.success('Login successful!');
            localStorage.setItem('user', JSON.stringify(result.user));
            await updateUser();
            navigate('/');
        } else if (response.status === 401) {
            toast.error('Invalid email or password');
            console.error('Error logging in:', result);
        } else {
            // Redirect to Error500Page for any other error
            navigate('/error500');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        // Redirect to Error500Page in case of network/server errors
        navigate('/error500');
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
