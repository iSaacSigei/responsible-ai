import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'reactstrap'; // Import Spinner from reactstrap
import '../../components/styles/Admin.css';
import Logo from "../../images/png/logo-color.png"
import { ThreeCircles } from 'react-loader-spinner';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { GrAdd } from "react-icons/gr";
const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [exportOrderCount, setExportOrderCount] = useState(0);
  const [importOrderCount, setImportOrderCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderType, setSelectedOrderType] = useState(null); // New state to track order type
  const [quotationFormData, setQuotationFormData] = useState({
    price_per_unit: '',
    custom_clearance_fee: '',
    logistics_fee: '',
    warehouse_fee: '',
  });
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [responseMessage, setResponseMessage] = useState(null); // New state for response message
  const [quotationDetails, setQuotationDetails] = useState(null); // New state for quotation details
  const [orderDetails, setOrderDetails] = useState(null); // New state for order details
  const [showOrderDetails, setShowOrderDetails] = useState(false); // State to control visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [userToDelete, setUserToDelete] = useState(null); // State to track the user to be deleted
  const [userToUpdate, setUserToUpdate] = useState(null); // New state for user update

  const handleCloseQuotation = () => {
    setQuotationDetails(null); // Hide the quotation details
  };

  // Ref to scroll to the form
  const formRef = useRef(null);
  const updateFormRef = useRef(null); // Ref for scrolling to update form

  const ConfirmDeleteModal = ({ isOpen, toggle, confirmDelete }) => (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className="modal-header-custom">Confirm Deletion</ModalHeader>
      <ModalBody className="modal-body-custom">
        Are you sure you want to delete the user?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDelete}>OK</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setOrderDetails(null); // Optionally clear order details when closing
  };
const [loaders, setLoaders]=useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch('https://mysite-jr5y.onrender.com/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setUserCount(data.length));

    fetch('https://mysite-jr5y.onrender.com/export_orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setExportOrderCount(data.length));

    fetch('https://mysite-jr5y.onrender.com/import_orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setImportOrderCount(data.length));
  }, [loaders]);

  const handleStatClick = (type) => {
    const token = localStorage.getItem('token');
    let url = '';
    
    switch(type) {
      case 'users':
        url = 'https://mysite-jr5y.onrender.com/users';
        break;
      case 'exportOrders':
        url = 'https://mysite-jr5y.onrender.com/export_orders';
        break;
      case 'importOrders':
        url = 'https://mysite-jr5y.onrender.com/import_orders';
        break;
      case 'contact_messages':
        url = 'https://mysite-jr5y.onrender.com/contact_messages';
        break;
      case 'tenders':
        url = 'https://mysite-jr5y.onrender.com/tenders';
        break;
      case 'jobs':
        url = 'https://mysite-jr5y.onrender.com/jobs';
        break;
      case 'postCareer':
        setSelectedData({ type: 'postCareer' });
        return;
      case 'postTender':
        setSelectedData({ type: 'postTender' });
        return;
      default:
        return;
    }

    fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => response.json())
      .then(data => setSelectedData({ type, data }));
  };

  const handleGiveQuotation = (orderId, orderType) => {
    setSelectedOrderId(orderId); // Set the selected order ID
    setSelectedOrderType(orderType); // Set the selected order type ('import' or 'export')

    // Scroll to the form when an order is selected
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure DOM updates
  };

  const handleQuotationChange = (e) => {
    setQuotationFormData({ ...quotationFormData, [e.target.name]: e.target.value });
  };

  const handleQuotationSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    setLoading(true); // Show spinner
  
    const body = {
      quotation: {
        ...quotationFormData,
        ...(selectedOrderType === 'import'
          ? { import_order_id: selectedOrderId }
          : { export_order_id: selectedOrderId }),
      },
    };
  
    fetch('https://mysite-jr5y.onrender.com/quotations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false); // Hide spinner
        setSelectedOrderId(null); // Clear the selected order after submission
        setSelectedOrderType(null); // Clear the selected order type
        setQuotationFormData({ // Reset form data
          price_per_unit: '',
          custom_clearance_fee: '',
          logistics_fee: '',
          warehouse_fee: '',
        });
        setResponseMessage(data.message); // Set the response message
        setQuotationDetails(data); // Set the quotation details including subtotal and total
      })
      .catch(error => {
        setLoading(false); // Hide spinner
        console.error('Error:', error);
        alert('Failed to create quotation');
      });
  };
  const handleSidebarClick = (type) => {
    handleStatClick(type); // Reuse handleStatClick for sidebar clicks
  };
  const handleViewMore = (orderId) => {
    const token = localStorage.getItem('token');
    const url = selectedData.type === 'importOrders'
      ? `https://mysite-jr5y.onrender.com/import_orders/${orderId}`
      : `https://mysite-jr5y.onrender.com/export_orders/${orderId}`;
  
    fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => response.json())
      .then(data => {
        setOrderDetails(data);
  
        // Scroll to the order details section
        setTimeout(() => {
          const detailsSection = document.getElementById('order-details');
          if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); // Delay to ensure DOM updates
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user); // Set the user to be deleted
    setIsModalOpen(true); // Open the modal
  };
  
  const handleConfirmDelete = () => {
    const token = localStorage.getItem('token');
    
    fetch(`https://mysite-jr5y.onrender.com/users/${userToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.ok) {
        // Remove the deleted user from the state
        setSelectedData(prevData => ({
          ...prevData,
          data: prevData.data.filter(user => user.id !== userToDelete.id)
        }));
      }
      setIsModalOpen(false); // Close the modal
      setLoaders(true)
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to delete user');
      setIsModalOpen(false); // Close the modal even if there's an error
    });
  };
  
  const handleUpdateClick = (user) => {
    setUserToUpdate(user);
    setTimeout(() => {
      if (updateFormRef.current) {
        updateFormRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
// Initial state for the job posting form
const [postCareerFormData, setPostCareerFormData] = useState({
  job_title: '',
  category: 'job opening', // Default value
  job_description: '',
  requirements: [''], // Initialize as an array
  benefits: [''], // Initialize as an array
  how_to_apply: '',
  contact_email: '',
  contact_phone: '',
  application_deadline: '',
  years_of_experience: '',
  job_level: '',
  location: '',
});

// Handler to manage changes for array fields like requirements and benefits
const handleArrayChange = (e, index, field) => {
  const updatedArray = [...postCareerFormData[field]];
  updatedArray[index] = e.target.value;
  setPostCareerFormData({ ...postCareerFormData, [field]: updatedArray });
};

// Handler to add a new empty item to the array (requirements or benefits)
const handleAddItem = (field) => {
  setPostCareerFormData({
    ...postCareerFormData,
    [field]: [...postCareerFormData[field], '']
  });
};

// Handler to remove an item from the array (requirements or benefits)
const handleRemoveItem = (index, field) => {
  const updatedArray = postCareerFormData[field].filter((_, i) => i !== index);
  setPostCareerFormData({ ...postCareerFormData, [field]: updatedArray });
};


const [postTenderFormData, setPostTenderFormData] = useState({
  company: '',
  tender_fee: '',
  application_deadline: '',
  category: '',
  tender_description: '',
  tender_number:''
});

// Handler for form input changes
const handlePostCareerChange = (e) => {
  setPostCareerFormData({ ...postCareerFormData, [e.target.name]: e.target.value });
};

const handlePostCareerSubmit = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  fetch('https://mysite-jr5y.onrender.com/jobs', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      job: {
        ...postCareerFormData,
        requirements: postCareerFormData.requirements || [], // Ensure it's an array
        benefits: postCareerFormData.benefits || [] // Ensure it's an array
      }
    }),
  })
    .then(response => response.json())
    .then(data => {
      setResponseMessage('Job posted successfully');
      setPostCareerFormData({
        job_title: '',
        job_description: '',
        requirements: [], // Reset to empty array
        benefits: [], // Reset to empty array
        application_deadline: '',
        years_of_experience: '',
        job_level: '',
        location: '',
        category: 'job opening',
        how_to_apply: '',
        contact_email: '',
        contact_phone: ''
      });

      fetch('https://mysite-jr5y.onrender.com/jobs', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(jobsData => setSelectedData({ type: 'jobs', data: jobsData }));
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to post job');
    });
};


// Handler for form input changes
const handlePostTenderChange = (e) => {
  setPostTenderFormData({ ...postTenderFormData, [e.target.name]: e.target.value });
};

// Handler for form submission
const handlePostTenderSubmit = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  fetch('https://mysite-jr5y.onrender.com/tenders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tender: postTenderFormData }),
  })
    .then(response => response.json())
    .then(data => {
      setResponseMessage('Tender posted successfully');
      alert('Tender posted successfully!')
      setPostTenderFormData({
        company: '',
        tender_fee: '',
        application_deadline: '',
        category: '',
        tender_description: '',
        tender_number:'',
      });
      // Fetch the updated tenders list and show the table
      fetch('https://mysite-jr5y.onrender.com/tenders', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(tendersData => setSelectedData({ type: 'tenders', data: tendersData }));
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to post tender');
    });
};

// Handler for deleting a job
const handleDeleteJob = (job) => {
  const token = localStorage.getItem('token');

  fetch(`https://mysite-jr5y.onrender.com/jobs/${job.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.ok) {
        // Update the state to remove the deleted job
        setSelectedData(prevData => ({
          ...prevData,
          data: prevData.data.filter(item => item.id !== job.id),
        }));
        setResponseMessage('Job deleted successfully');
      } else {
        alert('Failed to delete job');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to delete job');
    });
};

// Handler for viewing a job (you can implement modal or detailed view)
const handleViewJob = (job) => {
  // Implement your logic to view job details
  alert(`Viewing job: ${job.title}`);
};

// Similar handlers for tenders
const handleDeleteTender = (tender) => {
  const token = localStorage.getItem('token');

  fetch(`https://mysite-jr5y.onrender.com/tenders/${tender.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.ok) {
        setSelectedData(prevData => ({
          ...prevData,
          data: prevData.data.filter(item => item.id !== tender.id),
        }));
        setResponseMessage('Tender deleted successfully');
      } else {
        alert('Failed to delete tender');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to delete tender');
    });
};

const [tenderToUpdate, setTenderToUpdate] = useState(null);

  // Function to handle update click
  const handleUpdateTenderClick = (tender) => {
    setTenderToUpdate(tender);

    // Scroll to the update form
    setTimeout(() => {
      if (updateFormRef.current) {
        updateFormRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Ensure a slight delay for DOM updates
  };
  
const handleTenderUpdateChange = (e) => {
  setTenderToUpdate({ ...tenderToUpdate, [e.target.name]: e.target.value });
};

const handleTenderUpdateSubmit = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  
  fetch(`https://mysite-jr5y.onrender.com/tenders/${tenderToUpdate.id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tender: tenderToUpdate }),
  })
    .then(response => response.json())
    .then(data => {
      setTenderToUpdate(null); // Close the form
      setResponseMessage('Tender updated successfully');
      // Fetch updated tenders list
      fetch('https://mysite-jr5y.onrender.com/tenders', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(tendersData => setSelectedData({ type: 'tenders', data: tendersData }));
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to update tender');
    });
};

  const handleUserUpdateChange = (e) => {
    setUserToUpdate({ ...userToUpdate, [e.target.name]: e.target.value });
  };

  const handleUserUpdateSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { id, ...updatedUser } = userToUpdate;
  
    fetch(`https://mysite-jr5y.onrender.com/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: updatedUser }),
    })
    .then(response => response.json())
    .then(data => {
      setUserToUpdate(null);
      setLoaders(true);
      setResponseMessage(data.message);
      // Refetch user data to get the updated list
      fetch('https://mysite-jr5y.onrender.com/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(fetchedData => {
        setSelectedData({ type: 'users', data: fetchedData });
        setLoaders(false); // Stop the loader after data is fetched
      })
      .catch(error => {
        console.error('Error fetching updated user data:', error);
        setLoaders(false); // Stop the loader in case of error
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to update user');
      setLoaders(false); // Stop the loader in case of error
    });
  };
  

  const renderTable = () => {
    if (!selectedData) return null;

    if (selectedData.type === 'users') {
      return (
        <>
          <h4>Data Table</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.data.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{`${user.first_name} ${user.last_name}`}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.role}</td>
                  <td>
                  <button className='mx-4 btn py-2 btn-success' onClick={() => handleUpdateClick(user)}>Update</button>
                  <button className='btn py-2 btn-danger' onClick={() => handleDeleteClick(user)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (selectedData.type === 'exportOrders' || selectedData.type === 'importOrders') {
      return (
        <>
          <h4>Data Table</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Product Name</th>
                <th>Units</th>
                <th>Company Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.data.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user_name}</td>
                  <td>{order.product}</td>
                  <td>{order.units}</td>
                  <td>{order.company_name}</td>
                  <td>
                    <button
                      className='mx-4'
                      onClick={() => handleGiveQuotation(order.id, selectedData.type === 'importOrders' ? 'import' : 'export')}
                    >
                      Give Quotation
                    </button>
                    <button
                      className='mx-4'
                      onClick={() => handleViewMore(order.id)}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
    if (selectedData.type === 'contact_messages') {
      return (
        <>
          <h4>Data Table</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Message</th>

              </tr>
            </thead>
            <tbody>
              {selectedData.data.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>{user.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
    if (selectedData.type === 'tenders') {
      return (
        <>
          <h4>Tenders Table</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {selectedData.data.map(tender => (
              <tr key={tender.id}>
                <td>{tender.id}</td>
                <td>{tender.tender_number}</td>
                <td>{tender.tender_description}</td>
                <td>Ksh {tender.tender_fee}</td>
                <td>
                  {/* Replace "View" button with "Update" */}
                  <button className='btn btn-success' onClick={() => handleUpdateTenderClick(tender)}>Update</button>
                  <button onClick={() => handleDeleteTender(tender)} className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </>
      );
    }
    if (selectedData.type === 'jobs') {
      return (
        <>
          <h4>Available Jobs</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.data.map(job => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.job_title}</td>
                  <td>{job.job_description}</td>
                  <td>{job.category}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleViewJob(job)}>View</button>
                    <button className='btn btn-danger' onClick={() => handleDeleteJob(job)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  
    if (selectedData.type === 'postCareer') {
      return (
        <>
          <h4>Post Career Form</h4>
          <form onSubmit={handlePostCareerSubmit}>
            {/* Job Title */}
            <div className="form-group">
              <label>Job Title:</label>
              <input
                type="text"
                name="job_title"
                value={postCareerFormData.job_title}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={postCareerFormData.category}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              >
                <option value="job_openings">Job Openings</option>
                <option value="graduate_trainee">Graduate Trainee</option>
                <option value="internships">Internships</option>
              </select>
            </div>

            {/* Job Description */}
            <div className="form-group">
              <label>Job Description:</label>
              <textarea
                name="job_description"
                value={postCareerFormData.job_description}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              ></textarea>
            </div>
            {/* Requirements */}
            <div className="form-group">
            <label>Job Requirements:</label>
            {Array.isArray(postCareerFormData.requirements) && postCareerFormData.requirements.map((requirement, index) => (
              <div key={index} className="array-input-group">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleArrayChange(e, index, 'requirements')}
                  className="form-input"
                  required
                />
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem(index, 'requirements')}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={() => handleAddItem('requirements')}>Add Requirement</button>
          </div>

            {/* Benefits */}
            <div className="form-group">
            <label>Benefits:</label>
            {Array.isArray(postCareerFormData.benefits) && postCareerFormData.benefits.map((benefit, index) => (
              <div key={index} className="array-input-group">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange(e, index, 'benefits')}
                  className="form-input"
                  required
                />
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem(index, 'benefits')}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={() => handleAddItem('benefits')}>Add Benefit</button>
          </div>

            {/* How to Apply */}
            <div className="form-group">
              <label>How to Apply:</label>
              <textarea
                name="how_to_apply"
                value={postCareerFormData.how_to_apply}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              ></textarea>
            </div>

            {/* Contact Email */}
            <div className="form-group">
              <label>Contact Email:</label>
              <input
                type="email"
                name="contact_email"
                value={postCareerFormData.contact_email}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              />
            </div>

            {/* Contact Phone */}
            <div className="form-group">
              <label>Contact Phone:</label>
              <input
                type="tel"
                name="contact_phone"
                value={postCareerFormData.contact_phone}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              />
            </div>

            {/* Application Deadline */}
            <div className="form-group">
              <label>Application Deadline:</label>
              <input
                type="date"
                name="application_deadline"
                value={postCareerFormData.application_deadline}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              />
            </div>

            {/* Years of Experience */}
            <div className="form-group">
              <label>Years of Experience:</label>
              <input
                type="number"
                name="years_of_experience"
                value={postCareerFormData.years_of_experience}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              />
            </div>

            {/* Job Level */}
            <div className="form-group">
              <label>Job Level:</label>
              <input
                type="text"
                name="job_level"
                value={postCareerFormData.job_level}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={postCareerFormData.location}
                onChange={handlePostCareerChange}
                className="form-input"
                required
              />
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary" type="submit">Post Job</button>
          </form>


        </>
      );
    }
  
    if (selectedData.type === 'postTender') {
      return (
        <>
          <h4>Post Tender Form</h4>
          <form onSubmit={handlePostTenderSubmit}>
            <div className="form-group">
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={postTenderFormData.company}
                onChange={handlePostTenderChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Tender Number</label>
              <input
                type="text"
                name="tender_number"
                value={postTenderFormData.tender_number}
                onChange={handlePostTenderChange}
                placeholder='EIG/PREG/1992/2024-2027'
                className="form-input"
                required
              />
            </div>
          
            <div className="form-group">
              <label>Tender Fee:</label>
              <input
                type="number"
                name="tender_fee"
                value={postTenderFormData.tender_fee}
                onChange={handlePostTenderChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Application Deadline:</label>
              <input
                type="date"
                name="application_deadline"
                value={postTenderFormData.application_deadline}
                onChange={handlePostTenderChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={postTenderFormData.category}
                onChange={handlePostTenderChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Tender Description:</label>
              <textarea
                name="tender_description"
                value={postTenderFormData.tender_description}
                onChange={handlePostTenderChange}
                className="form-input"
                required
              ></textarea>
            </div>

            <button className="btn btn-primary" type="submit">Post Tender</button>
          </form>

        </>
      );
    }
  
    return null;
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar-dash">
        <div className="logo">
          <img src={Logo} alt="Company Logo" />
        </div>
        <nav className="menu-dash">
          <ul>
            <li><a href="#" onClick={() => handleSidebarClick('users')} className="active">Dashboard</a></li>
            <li><a href="#"onClick={() => handleSidebarClick('users')}>Users</a></li>
            <li><a href="#"onClick={() => handleSidebarClick('importOrders')}>Imports</a></li>
            <li><a href="#" onClick={() => handleSidebarClick('exportOrders')}>Exports</a></li>
            <li><a href="#" onClick={() => handleSidebarClick('contact_messages')}>Messages</a></li>
            <li><a href="#">In Transit</a></li>
            <li><a href="#">Pending Approval</a></li>
            <li><a href="#" onClick={() => handleSidebarClick('tenders')}>Tenders</a></li>
            <li><a href="#" onClick={() => handleSidebarClick('jobs')}>Jobs</a></li> {/* New Jobs Section */}
            <li>
              <a href="#" onClick={() => handleSidebarClick('postTender')} className="btn btn-primary"> {/* New Post Tender */}
                <span className="icon-wrapper"><GrAdd /></span>
                <span className="text">Post Tender</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleSidebarClick('postCareer')} className="btn btn-primary">
                <span className="icon-wrapper"><GrAdd /></span>
                <span className="text">Post Careers</span>
              </a>
            </li>

          </ul>
        </nav>
      </aside>
      <main className="content">
        <h1>Welcome to the Admin Dashboard</h1>
        <div className="stats-row">
          <div className="stat-box stat-users" onClick={() => handleStatClick('users')}>
            <h2>{userCount}</h2>
            <p>Users</p>
          </div>
          <div className="stat-box stat-exports" onClick={() => handleStatClick('exportOrders')}>
            <h2>{exportOrderCount}</h2>
            <p>Export Orders</p>
          </div>
          <div className="stat-box stat-imports" onClick={() => handleStatClick('importOrders')}>
            <h2>{importOrderCount}</h2>
            <p>Import Orders</p>
          </div>
          <div className="stat-box stat-pending">
            <h2>{pendingOrderCount}</h2>
            <p>Pending Orders</p>
          </div>
        </div>

        {/* Render the data table if there is selected data */}
        {renderTable()}
        {userToUpdate && (
            <div ref={updateFormRef} className='quotation-form'>
              <h4>Update User</h4>
              <form onSubmit={handleUserUpdateSubmit}>
              <div className="form-group">
              <label>
                  First Name:
                </label>
                <input
                    type="text"
                    name="first_name"
                    className="form-input"
                    value={userToUpdate.first_name || ''}
                    onChange={handleUserUpdateChange}
                  />
              </div>
              <div className="form-group">
                <label>
                  Last Name: 
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    className="form-input"
                    value={userToUpdate.last_name || ''}
                    onChange={handleUserUpdateChange}
                  />
               </div>
               <div className="form-group">
                <label>
                  Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={userToUpdate.email || ''}
                    onChange={handleUserUpdateChange}
                  />
                  </div>
                <div className="form-group">
                <label>
                  Contact:
                  </label>
                  <input
                    type="text"
                    name="contact"
                    className="form-input"
                    value={userToUpdate.contact || ''}
                    onChange={handleUserUpdateChange}
                  />
                  </div>
                <div className="form-group">
                <label>
                  Role:
                  </label>
                  <input
                    type="text"
                    name="role"
                    className="form-input"
                    value={userToUpdate.role || ''}
                    onChange={handleUserUpdateChange}
                  />
                  </div>
                <button className="btn btn-primary"type="submit">Submit</button>
                <button onClick={handleCloseQuotation} className="btn btn-secondary ">Cancel</button>
              </form>
            </div>
          )}
          {tenderToUpdate && (
            <div ref={updateFormRef} className="update-tender-form">
              <h4>Update Tender</h4>
              <form onSubmit={handleTenderUpdateSubmit}>
                <div className="form-group">
                  <label>Tender Number:</label>
                  <input
                    type="text"
                    name="tender_number"
                    value={tenderToUpdate.tender_number}
                    onChange={handleTenderUpdateChange}
                    placeholder={tenderToUpdate.tender_number}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tender Fee:</label>
                  <input
                    type="number"
                    name="tender_fee"
                    value={tenderToUpdate.tender_fee}
                    onChange={handleTenderUpdateChange}
                    placeholder={tenderToUpdate.tender_fee}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Application Deadline:</label>
                  <input
                    type="date"
                    name="application_deadline"
                    value={tenderToUpdate.application_deadline}
                    onChange={handleTenderUpdateChange}
                    placeholder={tenderToUpdate.application_deadline}
                    className="form-input"
                    required
                  />
                </div>
                {/* Add the category field */}
                <div className="form-group">
                  <label>Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={tenderToUpdate.category}
                    onChange={handleTenderUpdateChange}
                    placeholder={tenderToUpdate.category}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="tender_description"
                    value={tenderToUpdate.tender_description}
                    onChange={handleTenderUpdateChange}
                    placeholder={tenderToUpdate.tender_description}
                    className="form-input"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-secondary" onClick={() => setTenderToUpdate(null)}>Close</button>
              </form>
            </div>
          )}

        <ConfirmDeleteModal
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
          confirmDelete={handleConfirmDelete}
        />
        {/* Render the response message if available */}
        {responseMessage && (
          <div className="response-message">
            <p>{responseMessage}</p>
          </div>
        )}
        
        {/* Display Quotation Details */}
        {quotationDetails && (
          <>
          <div className="quotation-details">
            <h4 className="quotation-title">Quotation Summary</h4>
            <div className="quotation-item">
              <span className="label">Price per Unit:</span>
              <span className="value">{quotationDetails.quotation.price_per_unit} ({quotationDetails.quotation.units} units)</span>
            </div>
            <div className="quotation-item">
              <span className="label">Units Ordered:</span>
              <span className="value">{quotationDetails.units}</span>
            </div>
            <div className="quotation-item">
              <span className="label">Total Price for Units:</span>
              <span className="value">{(quotationDetails.quotation.price_per_unit * quotationDetails.units).toFixed(2)}</span>
            </div>
            <div className="quotation-item">
              <span className="label">Custom Clearance Fee:</span>
              <span className="value">{quotationDetails.quotation.custom_clearance_fee}</span>
            </div>
            <div className="quotation-item">
              <span className="label">Logistics Fee:</span>
              <span className="value">{quotationDetails.quotation.logistics_fee}</span>
            </div>
            <div className="quotation-item">
              <span className="label">Warehouse Fee:</span>
              <span className="value">{quotationDetails.quotation.warehouse_fee}</span>
            </div>
            <hr className="quotation-divider" />
            <div className="quotation-item">
              <span className="label">Subtotal:</span>
              <span className="value">{quotationDetails.subtotal.toFixed(2)}</span>
            </div>
            <hr className="quotation-divider" />
            <div className="quotation-item">
              <span className="label">Company Commission (5% of Subtotal):</span>
              <span className="value">{quotationDetails.quotation.company_commission}</span>
            </div>
            <hr className="quotation-divider" />
            <div className="quotation-item">
              <span className="label">Total Fee:</span>
              <span className="value">{quotationDetails.total.toFixed(2)}</span>
            </div>
            <button onClick={handleCloseQuotation} className="btn btn-danger text-right">Close</button>
          </div>
          </>
        )}
        {orderDetails && (
          <div className="order-details" id="order-details">
            <h4>Order Details</h4>

            {/* Display Images in Grid */}
            {orderDetails.images && orderDetails.images.length > 0 && (
              <div className="order-images">
                {orderDetails.images.map((image, index) => (
                  <img key={index} src={image} alt={`Order Image ${index + 1}`} className="order-image" />
                ))}
              </div>
            )}

            {/* Order Details in Table Format */}
            <div className="order-details-content">
              <table className="data-table">
                <tbody>
                  <tr>
                    <td><strong>ID:</strong></td>
                    <td>{orderDetails.id}</td>
                  </tr>
                  <tr>
                    <td><strong>{selectedOrderType === 'import' ? 'Import From' : 'Export To'}:</strong></td>
                    <td>{orderDetails.import_from || orderDetails.export_to}</td>
                  </tr>
                  <tr>
                    <td><strong>Product Name:</strong></td>
                    <td>{orderDetails.product}</td>
                  </tr>
                  <tr>
                    <td><strong>Units:</strong></td>
                    <td>{orderDetails.units}</td>
                  </tr>
                  <tr>
                    <td><strong>Product Description:</strong></td>
                    <td>{orderDetails.product_description}</td>
                  </tr>
                  {selectedOrderType === 'import' && (
                    <tr>
                      <td><strong>Product Link:</strong></td>
                      <td><a href={orderDetails.product_link} target="_blank" rel="noopener noreferrer">{orderDetails.product_link}</a></td>
                    </tr>
                  )}
                  <tr>
                    <td><strong>Company Name:</strong></td>
                    <td>{orderDetails.company_name}</td>
                  </tr>
                  <tr>
                    <td><strong>Address:</strong></td>
                    <td>{orderDetails.address}</td>
                  </tr>
                  <tr>
                    <td><strong>City:</strong></td>
                    <td>{orderDetails.city}</td>
                  </tr>
                  <tr>
                    <td><strong>State/Province:</strong></td>
                    <td>{orderDetails.state_province}</td>
                  </tr>
                  <tr>
                    <td><strong>Contact:</strong></td>
                    <td>{orderDetails.contact}</td>
                  </tr>
                  {selectedOrderType === 'import' && (
                    <tr>
                      <td><strong>Request Quotation:</strong></td>
                      <td>{orderDetails.request_quotation ? 'Yes' : 'No'}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Add Give Quotation Button */}
            <button
              className="btn btn-primary"
              onClick={() => handleGiveQuotation(orderDetails.id, selectedOrderType)}
            >
              Give Quotation
            </button>

            {/* Add Close Button */}
            <button
              className="btn btn-secondary close-order-details-button"
              onClick={handleCloseOrderDetails}
            >
              Close
            </button>
            
          </div>
        )}


        {/* Quotation form */}
        {selectedOrderId && (
          <div ref={formRef} className="quotation-form pb-5">
            <h4>Quotation Form</h4>
            <form onSubmit={handleQuotationSubmit}>
              <div className="form-group">
                <label>Price per Unit:</label>
                <input
                  type="number"
                  name="price_per_unit"
                  value={quotationFormData.price_per_unit}
                  onChange={handleQuotationChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Custom Clearance Fee:</label>
                <input
                  type="number"
                  name="custom_clearance_fee"
                  value={quotationFormData.custom_clearance_fee}
                  onChange={handleQuotationChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Logistics Fee:</label>
                <input
                  type="number"
                  name="logistics_fee"
                  value={quotationFormData.logistics_fee}
                  onChange={handleQuotationChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Warehouse Fee:</label>
                <input
                  type="number"
                  name="warehouse_fee"
                  value={quotationFormData.warehouse_fee}
                  onChange={handleQuotationChange}
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
              {loading ? (
                <ThreeCircles
                  visible={true}
                  height="100"
                  width="100"
                  color="white"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : 'Submit Quotation'}
            </button>
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedOrderId(null)}>Cancel</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
