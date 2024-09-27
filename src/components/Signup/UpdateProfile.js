import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ user }) => {
    const [profileData, setProfileData] = useState({
      firstName: '',
      lastName: '',
      name: '',
      email: '',
      contact: '',
      address: '',
      city: '',
      stateProvince: '',
    });
  
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
      if (user) {
        setProfileData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          name: user.name || '',
          email: user.email || '',
          contact: user.contact || '',
          address: user.address || '',
          city: user.city || '',
          stateProvince: user.stateProvince || '',
        });
      }
    }, [user]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfileData({
        ...profileData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        const token = localStorage.getItem('token');
        await axios.patch(`https://mysite-jr5y.onrender.com/users/${user.id}/update_profile`, profileData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        toast.success('Profile updated successfully!');
      } catch (error) {
        toast.error('Failed to update profile. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
            className="form-control"
          />
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
        </div>

        <div className="form-group">
          <label htmlFor="stateProvince">State/Province</label>
          <input
            type="text"
            id="stateProvince"
            name="stateProvince"
            value={formData.stateProvince}
            onChange={handleInputChange}
            required
            className="form-control"
          />
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
