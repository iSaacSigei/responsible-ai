import React, { useState } from 'react';
import '../styles/Signup.css'; // Make sure to create this CSS file for styling
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        name: '',
        email:'',
        contact: '',
        address: '',
        city: '',
        stateProvince: '',
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
        // Handle form submission
        console.log('Form Data:', formData);
    };

    return (
      <>
        <Navbar/>
        <div className="signup-page-container">
            <hr className='text-light'></hr>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-row row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="name">Username</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="contact">Contact</label>
                        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                <div className="form-row row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="stateProvince">State/Province</label>
                        <input type="text" id="stateProvince" name="stateProvince" value={formData.stateProvince} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                <button type="submit" className="btn-1">Sign Up</button>
            </form>
        </div>
        <hr className='text-light'></hr>
        <Footer/>
      </>
    );
};

export default SignupPage;
