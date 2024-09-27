import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/updateProfile.css'; // Import the new CSS file

const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    contact: user.contact || '',
    address: user.address || '',
    city: user.city || '',
    state: user.state || '',
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
    if (!formData.state) {
      newErrors.state = 'State is required';
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
        state: formData.state,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Profile updated successfully!');
      // Clear form after success
      setFormData({ contact: '', address: '', city: '', state: '' });
      setErrors({});
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
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

        <div className="form-group">
          <label htmlFor="address">Address</label>
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

        <div className="form-group">
          <label htmlFor="city">City</label>
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

        <div className="form-group">
          <label htmlFor="state">State/Province</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="form-control"
          />
          {errors.state && <span className="text-danger">{errors.state}</span>}
        </div>

        <button type="submit" className="btn-1 w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default UpdateProfile;
