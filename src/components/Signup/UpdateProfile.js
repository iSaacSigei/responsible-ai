import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/updateProfile.css'; // Ensure you have the styles here
import '../styles/profile.css'
import Footer from '../footer/Footer';

const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    contact: user.contact || '',
    address: user.address || '',
    city: user.city || '',
    state_province: user.state_province || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.contact) {
      newErrors.contact = 'Contact number is required';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    if (!formData.state_province) {
      newErrors.state_province = 'State/Province is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`https://mysite-jr5y.onrender.com/users/${user.id}/update_profile`, {
        contact: formData.contact,
        address: formData.address,
        city: formData.city,
        state_province: formData.state_province,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Profile updated successfully!');
      // Clear form after success
      setFormData({ contact: '', address: '', city: '', state_province: '' });
      setErrors({});
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container-xl px-4 mt-4">
        <div className="card mb-4">
          <div className="card-header">Update Profile</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="small mb-1" htmlFor="contact">Contact Number</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
                {errors.contact && <span className="text-danger">{errors.contact}</span>}
              </div>

              <div className="mb-3">
                <label className="small mb-1" htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
                {errors.address && <span className="text-danger">{errors.address}</span>}
              </div>

              <div className="mb-3">
                <label className="small mb-1" htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
                {errors.city && <span className="text-danger">{errors.city}</span>}
              </div>

              <div className="mb-3">
                <label className="small mb-1" htmlFor="state">State/Province</label>
                <input
                  type="text"
                  id="state"
                  name="state_province"
                  value={formData.state_province}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
                {errors.state_province && <span className="text-danger">{errors.state_province}</span>}
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer position="top-center" />
      </div>
      <Footer />
    </>
  );
};

export default UpdateProfile;
