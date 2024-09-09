import React, { useEffect, useState } from 'react';
import '../styles/quotationPage.css';
import Footer from '../footer/Footer';

const QuotationPage = () => {
    const [quotation, setQuotation] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuotation = async () => {
            const token = localStorage.getItem('token');
            try {
                // Fetch quotations
                const response = await fetch('https://mysite-jr5y.onrender.com/quotations', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch quotation');
                const data = await response.json();
                
                // Assuming you want to use the first quotation in the list
                const quotationData = data[0];
                setQuotation(quotationData);

                // Determine which endpoint to fetch order details from
                const orderId = quotationData.import_order_id || quotationData.export_order_id;
                const orderEndpoint = quotationData.import_order_id ? `https://mysite-jr5y.onrender.com/import_orders/${orderId}` : `https://mysite-jr5y.onrender.com/export_orders/${orderId}`;

                // Fetch order details
                const orderResponse = await fetch(orderEndpoint, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                if (!orderResponse.ok) throw new Error('Failed to fetch order details');
                const orderData = await orderResponse.json();
                setOrderDetails(orderData);

            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            }
        };

        fetchQuotation();
    }, []);

    if (error) return <div>Error: {error}</div>;

    if (!quotation || !orderDetails) return <div>Loading...</div>;

    return (
        <>
        <div className="quotation-page-wrapper d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="custom-width text-center mt-3 py-4 px-3">
                <h2>Quotation Summary</h2>
                <p>Thank you for your request! Below is a detailed quotation for your order.</p>
            </div>

            <div className="quotation-details-box mx-4 mt-5">
                <div className="quotation-item">
                    <h5>Product:</h5>
                    <p>{orderDetails.product}</p>
                </div>
                <hr className='text-light' />
                <div className="quotation-item">
                    <h5>Company:</h5>
                    <p>{orderDetails.company_name}</p>
                </div>
                <hr className='text-light' />
                <div className="quotation-item">
                    <h5>Units:</h5>
                    <p>{orderDetails.units} Units</p>
                </div>
                <hr className='text-light' />
                <div className="quotation-item">
                    <h5>Price per Unit:</h5>
                    <p>${quotation.price_per_unit}</p>
                </div>
                <hr className='text-light' />
                <div className="quotation-item">
                    <h5>Custom Clearance Fee:</h5>
                    <p>${quotation.custom_clearance_fee}</p>
                </div>
                <hr className='text-light' />
                <div className="quotation-item">
                    <h5>Logistics Fee:</h5>
                    <p>${quotation.logistics_fee}</p>
                </div>
                <hr className='text-light' />
                <div className="quotation-item">
                    <h5>Warehouse Fee for 3 Days:</h5>
                    <p>${quotation.warehouse_fee} (Exceeding days will be charged to the client)</p>
                </div>
                <hr className='text-light' />
                <div className="quotation-item">
                    <h5>Company Commission:</h5>
                    <p>${quotation.company_commission}</p>
                </div>
                
                <hr className="quotation-divider" />
                
                <div className="quotation-total-box">
                    <h5>Total:</h5>
                    <p>${quotation.total}</p>
                </div>

                <div className="my-5 text-right">
                    <button className="btn-1 w-100">Proceed to Checkout</button>
                </div>
            </div>
        </div>
        <hr className="text-light" />
        <Footer />
        </>
    );
};

export default QuotationPage;
