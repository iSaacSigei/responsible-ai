import React, { useState } from 'react';
import '../styles/Signup.css';
import Footer from '../footer/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        name: '',
        email: '',
        contact: '',
        address: '',
        city: '',
        stateProvince: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match!" });
            return;
        }

        try {
            // POST request to the Rails backend
            await axios.post('/users', {
                user: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    name: formData.name,
                    email: formData.email,
                    contact: formData.contact,
                    address: formData.address,
                    city: formData.city,
                    state_province: formData.stateProvince,
                    password: formData.password,  
                    password_confirmation: formData.confirmPassword 
                }
            });
            toast.success("Signup successful!");
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000); // Redirect after 3 seconds
        } catch (error) {
            const errorMessages = {};
            if (error.response && error.response.data.errors) {
                error.response.data.errors.forEach((err) => {
                    if (err.includes("Email")) {
                        errorMessages.email = err;
                    } else if (err.includes("Password")) {
                        errorMessages.password = err;
                    }
                });
            }
            setErrors(errorMessages);
        }
    };

    return (
        <>
            <div className="signup-page-container">
                <hr className='text-light'></hr>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-row row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="form-control" />
                            {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="form-control" />
                            {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="name">Username</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="contact">Contact</label>
                            <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required className="form-control" />
                            {errors.contact && <span className="text-danger">{errors.contact}</span>}
                        </div>
                    </div>

                    <div className="form-row row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="form-control" />
                            {errors.address && <span className="text-danger">{errors.address}</span>}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="form-control" />
                            {errors.city && <span className="text-danger">{errors.city}</span>}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="stateProvince">State/Province</label>
                            <input type="text" id="stateProvince" name="stateProvince" value={formData.stateProvince} onChange={handleChange} required className="form-control" />
                            {errors.stateProvince && <span className="text-danger">{errors.stateProvince}</span>}
                        </div>
                    </div>

                    <div className="form-row row">
                        <div className="col-md-6 mb-3">
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
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                            {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    <button type="submit" className="btn-1 w-100">Sign Up</button>
                </form>
            </div>
            <hr className='text-light'></hr>
            <Footer />
            <ToastContainer position="top-center" />
        </>
    );
};

export default SignupPage;
