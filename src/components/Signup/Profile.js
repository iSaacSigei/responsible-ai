import React, { useState } from 'react'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/profile.css'; // Import the new CSS file
import Footer from '../footer/Footer';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    name: user?.name || '',
    email: user?.email || '',
    contact: user?.contact || '',
    address: user?.address || '',
    city: user?.city || '',
    state_province: user?.state_province || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  if (!user) {
    return (
      <div className="container-xl px-4 mt-4">
        <div className="alert alert-warning" role="alert">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

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
    <>
      <div className="container-xl px-4 mt-4">
        {/* Account page navigation */}
        <nav className="nav nav-borders">
          <a className="nav-link active ms-0" href="#" onClick={() => navigate('/profile')}>Profile</a>
          <a className="nav-link" href="#" onClick={() => navigate('/billing')}>Billing</a>
          <a className="nav-link" href="#" onClick={() => navigate('/security')}>Security</a>
          <a className="nav-link" href="#" onClick={() => navigate('/notifications')}>Notifications</a>
        </nav>
        <hr className="mt-0 mb-5" />
        <div className="row">
          <div className="col-xl-4">
            {/* Profile picture card */}
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                {/* Profile picture image */}
                <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                {/* Profile picture help block */}
                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                {/* Profile picture upload button */}
                <button className="btn btn-primary" type="button">Upload new image</button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            {/* Account details card */}
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Form Group (username) */}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">Username</label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      name="name"
                      placeholder={profileData.name || "Enter your username"}
                      value={profileData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* Form Row */}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (first name) */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        name="first_name"
                        placeholder={profileData.first_name || "Enter your first name"}
                        value={profileData.first_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {/* Form Group (last name) */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        name="last_name"
                        placeholder={profileData.last_name || "Enter your last name"}
                        value={profileData.last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  {/* Form Group (email address) */}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      name="email"
                      placeholder={profileData.email || "Enter your email address"}
                      value={profileData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* Form Group (contact) */}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputContact">Contact</label>
                    <input
                      className="form-control"
                      id="inputContact"
                      type="text"
                      name="contact"
                      placeholder={profileData.contact || "Enter your contact number"}
                      value={profileData.contact}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* Form Group (address) */}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputAddress">Address</label>
                    <input
                      className="form-control"
                      id="inputAddress"
                      type="text"
                      name="address"
                      placeholder={profileData.address || "Enter your address"}
                      value={profileData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* Form Row for City and State */}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (city) */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputCity">City</label>
                      <input
                        className="form-control"
                        id="inputCity"
                        type="text"
                        name="city"
                        placeholder={profileData.city || "Enter your city"}
                        value={profileData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {/* Form Group (state) */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputStateProvince">State/Province</label>
                      <input
                        className="form-control"
                        id="inputStateProvince"
                        type="text"
                        name="state_province"
                        placeholder={profileData.state_province || "Enter your state or province"}
                        value={profileData.state_province}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  {/* Save changes button */}
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save changes'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" />
      </div>
      <Footer/>
    </>
  );
};

export default Profile;
