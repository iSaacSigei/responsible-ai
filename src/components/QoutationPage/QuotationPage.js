import React from 'react';
import '../styles/quotationPage.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const QuotationPage = () => {
    return (
        <>
        <Navbar/>
        <div className="quotation-page-container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="quotation-summary custom-width text-center mt-3 py-4 px-3 text-light">
                <h2>Quotation Summary</h2>
                <p>Thank you for your request! Below is a detailed quotation for your order.</p>
            </div>

            <div className="quotation-details mx-4 mt-5">
                <div className="quotation-item">
                    <h5>Product:</h5>
                    <p>High-Quality Electronics</p>
                </div>
                    <hr className='text-light'></hr>
                <div className="quotation-item">
                    <h5>Company:</h5>
                    <p>WoMall Inc.</p>
                </div>
                <hr className='text-light'></hr>

                <div className="quotation-item">
                    <h5>Units:</h5>
                    <p>1000 Units</p>
                </div>
                <hr className='text-light'></hr>

                <div className="quotation-item">
                    <h5>Price per Unit:</h5>
                    <p>$50</p>
                </div>
                <hr className='text-light'></hr>

                <div className="quotation-item">
                    <h5>Custom Clearance Fee:</h5>
                    <p>$2000</p>
                </div>
                <hr className='text-light'></hr>

                <div className="quotation-item">
                    <h5>Logistics Fee:</h5>
                    <p>$3000</p>
                </div>
                <hr className='text-light'></hr>

                <div className="quotation-item">
                    <h5>Warehouse Fee for 3 Days:</h5>
                    <p>$500 (Exceeding days will be charged to the client)</p>
                </div>
                <hr className='text-light'></hr>

                <div className="quotation-item">
                    <h5>Company Commission:</h5>
                    <p>$5000</p>
                </div>
                
                <hr className="quotation-divider" />
                
                <div className="quotation-total">
                    <h5>Total:</h5>
                    <p>$60,500</p>
                </div>

                <div className="my-5 text-right">
                    <button className="btn-1 w-100">Proceed to Checkout</button>
                </div>
            </div>
        </div>
        <hr className="text-light" />
        <Footer/>
        </>
    );
};

export default QuotationPage;
