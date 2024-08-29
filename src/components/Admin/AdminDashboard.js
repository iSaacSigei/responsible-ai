import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'reactstrap'; // Import Spinner from reactstrap
import '../../components/styles/Admin.css';

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

  // Ref to scroll to the form
  const formRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch('http://127.0.0.1:3000/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setUserCount(data.length));

    fetch('http://127.0.0.1:3000/export_orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setExportOrderCount(data.length));

    fetch('http://127.0.0.1:3000/import_orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setImportOrderCount(data.length));
  }, []);

  const handleStatClick = (type) => {
    const token = localStorage.getItem('token');
    let url = '';
    
    switch(type) {
      case 'users':
        url = 'http://127.0.0.1:3000/users';
        break;
      case 'exportOrders':
        url = 'http://127.0.0.1:3000/export_orders';
        break;
      case 'importOrders':
        url = 'http://127.0.0.1:3000/import_orders';
        break;
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
    
    setLoading(true); // Show spinners

    // Determine the correct body format based on the selected order type
    const body = {
      quotation: {
        ...quotationFormData,
        ...(selectedOrderType === 'import'
          ? { import_order_id: selectedOrderId }
          : { export_order_id: selectedOrderId }),
      },
    };

    fetch('http://127.0.0.1:3000/quotations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false); // Hide spinners
        setSelectedOrderId(null); // Clear the selected order after submission
        setSelectedOrderType(null); // Clear the selected order type
        setQuotationFormData({ // Reset form data
          price_per_unit: '',
          custom_clearance_fee: '',
          logistics_fee: '',
          warehouse_fee: '',
        });
      })
      .catch(error => {
        setLoading(false); // Hide spinners
        console.error('Error:', error);
        alert('Failed to create quotation');
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
                    <button className='mx-4 btn py-2 btn-success'>Update</button>
                    <button className='btn py-2 btn-danger'>Remove</button>
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
                    <button className=''>View More</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    return null;
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <img src="logo.png" alt="Company Logo" />
        </div>
        <nav className="menu">
          <ul>
            <li><a href="#" className="active">Dashboard</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Imports</a></li>
            <li><a href="#">Exports</a></li>
            <li><a href="#">In Transit</a></li>
            <li><a href="#">Pending Approval</a></li>
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

        {/* Quotation form */}
        {selectedOrderId && (
          <div ref={formRef} className="quotation-form">
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
                {loading ? <Spinner size="m" /> : 'Submit Quotation'}
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
