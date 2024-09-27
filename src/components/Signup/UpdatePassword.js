import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/updatePassword.css'; // Ensure you have the styles here
import Footer from '../footer/Footer';
import '../styles/profile.css'

const UpdatePassword = ({ user }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
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
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await axios.patch(`https://mysite-jr5y.onrender.com/users/${user.id}/update_password`, {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Password updated successfully!');
      // Clear form after success
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({});
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error('Failed to update password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container-xl px-4 mt-4">
        <div className="card mb-4">
          <div className="card-header">Update Password</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="small mb-1" htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
                {errors.currentPassword && <span className="text-danger">{errors.currentPassword}</span>}
              </div>

              <div className="mb-3">
                <label className="small mb-1" htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
                {errors.newPassword && <span className="text-danger">{errors.newPassword}</span>}
              </div>

              <div className="mb-3">
                <label className="small mb-1" htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
                {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Password'}
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

export default UpdatePassword;
