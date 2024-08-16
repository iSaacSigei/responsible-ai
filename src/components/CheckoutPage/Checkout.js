import React, { useState } from 'react';
import '../styles/checkoutPage.css'; // Ensure to create this CSS file for styling
import Footer from '../footer/Footer';
import CreditCard from '../CreditCard/CreditCard'; // Ensure the path is correct
import LipaNaMpesa from '../LipaNaMpesa/LipaNaMpesa'; // Ensure the path is correct

const Checkout = () => {
    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    return (
        <>
            <div className="checkout-page-container d-flex flex-column align-items-center justify-content-center min-vh-100">
                <div className="checkout-summary custom-width text-center mt-3 py-4 px-3 text-light">
                    <h2>Checkout</h2>
                    <p>Review your order and proceed with payment.</p>
                </div>

                <div className="checkout-details mt-5">
                    <div className="checkout-item">
                        <h5>Product Name:</h5>
                        <p>High-Quality Electronics</p>
                    </div>
                    <div className="checkout-item">
                        <h5>Price:</h5>
                        <p>$50</p>
                    </div>
                    <div className="checkout-item">
                        <h5>Expected Delivery Time:</h5>
                        <p>3-5 Business Days</p>
                    </div>

                    <div className="payment-options mt-5">
                        <h4>Payment Options:</h4>
                        <div className="payment-option">
                            <input 
                                type="radio" 
                                id="card" 
                                name="payment" 
                                value="card" 
                                checked={selectedPayment === 'card'}
                                onChange={handlePaymentChange} 
                            />
                            <label htmlFor="card">Credit/Debit Card</label>
                        </div>
                        <div className="payment-option">
                            <input 
                                type="radio" 
                                id="mpesa" 
                                name="payment" 
                                value="mpesa" 
                                checked={selectedPayment === 'mpesa'}
                                onChange={handlePaymentChange} 
                            />
                            <label htmlFor="mpesa">Lipa na M-Pesa</label>
                        </div>
                        <div className="payment-option">
                            <input 
                                type="radio" 
                                id="paypal" 
                                name="payment" 
                                value="paypal" 
                                checked={selectedPayment === 'paypal'}
                                onChange={handlePaymentChange} 
                            />
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                    </div>

                    {selectedPayment === 'card' && (
                        <div className="card-details mt-5">
                            <CreditCard />
                        </div>
                    )}

                    {selectedPayment === 'mpesa' && (
                        <div className="mpesa-details mt-5">
                            <LipaNaMpesa />
                        </div>
                    )}

                    <div className="mt-5 text-center">
                        <button className="btn-1 w-100">Complete Purchase</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
