import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import '../../components/styles/myOrders.css'
export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        });

        const [exportResponse, importResponse] = await Promise.all([
          fetch('/export_orders', { headers }),
          fetch('/import_orders', { headers }),
        ]);

        if (!exportResponse.ok || !importResponse.ok) {
          throw new Error('Failed to fetch orders');
        }

        const exportData = await exportResponse.json();
        const importData = await importResponse.json();

        const processedExportOrders = exportData.map(order => ({
          product: order.product,
          type: 'Export',
          status: 'Pending Review',
          company: order.company_name,
          image: order.images[1] || '',
        }));

        const processedImportOrders = importData.map(order => ({
          product: order.product,
          type: 'Import',
          status: 'Pending Review',
          company: order.company_name,
          image: '',
        }));

        setOrders([...processedExportOrders, ...processedImportOrders]);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="myorders-container bg-light">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center p-4">
          <div>
            <h1>My Orders</h1>
            <p className="fs-5">
              A list of all your import and export orders including their status and associated company.
            </p>
          </div>
          <div className="mt-3 mt-md-0">
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={() => navigate('/imports')}
            >
              Import Now
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/exports')}
            >
              Export Now
            </button>
          </div>
        </div>

        <div className="row mt-4">
          {orders.map((order, index) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    {order.image && (
                      <img
                        src={order.image}
                        alt=""
                        className="rounded-circle me-2"
                        style={{ width: '44px', height: '44px' }}
                      />
                    )}
                    <div>
                      <h5 className="card-title mb-0">{order.product}</h5>
                    </div>
                  </div>
                  <p className="card-text">
                    <strong>Type:</strong> {order.type}
                  </p>
                  <p className="card-text">
                    <strong>Company:</strong> {order.company}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>{' '}
                    <span
                      className={`badge ${
                        order.status === 'Pending Review'
                          ? 'bg-warning'
                          : order.status === 'In Progress'
                          ? 'bg-primary'
                          : 'bg-success'
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
                <div className="card-footer text-end">
                  <a href="#" className="text-danger">
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
