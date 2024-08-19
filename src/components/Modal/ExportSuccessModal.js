import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function ExportSuccessModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  return (
    <div
      className={`modal fade ${isOpen ? 'show d-block' : 'd-none'}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title text-danger">Request Received</h5>
            <button type="button" className="btn-close-custom" onClick={onClose} aria-label="Close">
              <span className='text-danger' aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body text-center">
            <div className="mb-3">
              <p className="mt-3">
                Your request has been successfully received. We will review it and get back to you shortly.
              </p>
            </div>
          </div>
          <div className="modal-footer flex justify-content-between">
            <button
              type="button"
              className="btn-1"
              onClick={() => navigate('/my_orders')} // Navigate to View My Orders
            >
              View My Orders
            </button>
            <button
              type="button"
              className="btn-1"
              onClick={onClose}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
