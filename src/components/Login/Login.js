import React, { useState } from 'react';
import '../styles/Auth.css'; // Create this CSS file for styling
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login submission
        console.log('Login Data:', formData);
    };

    return (
        <>
            <Navbar />
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
                    <button type="submit" className="btn-1">Login</button>
                </form>
                <div className="signup-link-container mt-4">
                <p>Or don't have an account? <Link to="/signup" className="signup-link">Sign up here</Link></p>
            </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
