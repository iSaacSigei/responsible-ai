import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [exportResponse, importResponse] = await Promise.all([
          fetch('https://mysite-vqs1.onrender.com/export_orders'),
          fetch('https://mysite-vqs1.onrender.com/import_orders')
        ]);

        if (!exportResponse.ok || !importResponse.ok) {
          throw new Error('Failed to fetch orders');
        }

        const exportData = await exportResponse.json();
        const importData = await importResponse.json();

        // Process export orders
        const processedExportOrders = exportData.map(order => ({
          product: order.product,
          type: 'Export',
          status: 'Pending Review', // Placeholder status, update as needed
          company: order.company_name,
          image: order.images[1] || '', // Use image at index 1 or fallback to empty string
        }));

        // Process import orders
        const processedImportOrders = importData.map(order => ({
          product: order.product,
          type: 'Import',
          status: 'Pending Review', // Placeholder status, update as needed
          company: order.company_name,
          image: '', // No image for import orders
        }));

        // Combine both types of orders
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
      <div className="container bg-light mt-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center p-4">
          <div>
            <h1 className="">My Orders</h1>
            <p className='fs-5'>
              A list of all your import and export orders including their status and associated company.
            </p>
          </div>
          <div className="mt-3 mt-md-0">
            <button type="button" className="btn btn-primary me-2" onClick={() => navigate('/imports')}>
              Import Now
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/exports')}>
              Export Now
            </button>
          </div>
        </div>

        <div className="table-responsive mt-4">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Company</th>
                <th scope="col" className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      {order.image && <img src={order.image} alt="" className="rounded-circle me-2" style={{ width: '44px', height: '44px' }} />}
                      <div>
                        <div>{order.product}</div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">{order.type}</td>
                  <td className="align-middle">
                    <span className={`badge ${order.status === 'Pending Review' ? 'bg-warning' : order.status === 'In Progress' ? 'bg-primary' : 'bg-success'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="align-middle">{order.company}</td>
                  <td className="align-middle text-end">
                    <a href="#" className="text-danger">Cancel</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
