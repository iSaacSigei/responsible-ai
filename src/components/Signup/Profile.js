import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/profile.css'; // Import the new CSS file

const Profile = () => {
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    name: '',
    email: '',
    contact: '',
    address: '',
    city: '',
    state_province: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile data from the backend when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://mysite-jr5y.onrender.com/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data.user);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        toast.error('Failed to load profile data. Please try again.');
      }
    };

    fetchProfileData();
  }, []);

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
    const token = localStorage.getItem('token');

    try {
      await axios.put('https://mysite-jr5y.onrender.com/users/update_profile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = () => {
    navigate('/profile/update-password');
  };

  return (
    <div className="profile-page-container">
      <h2>Your Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-row row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profileData.first_name}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={profileData.last_name}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={profileData.contact}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-row row">
          <div className="col-md-6 mb-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={profileData.city}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="stateProvince">State/Province</label>
            <input
              type="text"
              id="stateProvince"
              name="stateProvince"
              value={profileData.state_province}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn-1 w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Updating Profile...' : 'Update Profile'}
        </button>
      </form>

      <div className="mt-3">
        <button onClick={handleChangePassword} className="btn btn-primary">
          Change Password
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Profile;
