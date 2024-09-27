import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match!' });
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
    } catch (error) {
      toast.error('Failed to update password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="update-password-container">
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="form-control"
          />
          {errors.confirmPassword && (
            <span className="text-danger">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="btn-1 w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Password'}
        </button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default UpdatePassword;
