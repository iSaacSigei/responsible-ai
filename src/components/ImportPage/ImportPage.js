import React, { useState } from 'react';
import '../styles/Import.css'; // Make sure to create this CSS file for styling
import Footer from '../footer/Footer';

const ImportPage = () => {
    const [formData, setFormData] = useState({
        importFrom: '',
        product: '',
        units: '',
        productDescription: '',
        productLink: '',
        companyName: '',
        address: '',
        city: '',
        stateProvince: '',
        contact: '',
        requestQuotation: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form Data:', formData);
    };

    return (
      <>
        <div className="import-page-container mt-5">
        <hr className='text-light'></hr>
            <form onSubmit={handleSubmit} className="import-form">
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="importFrom" style={{fontSize:"24px", paddingBottom:"14px"}}>Import From</label>
                        <select id="importFrom" name="importFrom" value={formData.importFrom} onChange={handleChange} required className="form-control">
                            <option value="">Select Country</option>
                            {/* Add country options here */}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                <div className="form-row row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="stateProvince">State/Province</label>
                        <input type="text" id="stateProvince" name="stateProvince" value={formData.stateProvince} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="contact">Contact</label>
                        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="product">Product</label>
                        <input type="text" id="product" name="product" value={formData.product} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="units">How Units</label>
                        <input type="number" id="units" name="units" value={formData.units} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="productDescription">Product Description</label>
                        <textarea id="productDescription" name="productDescription" value={formData.productDescription} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <h5>Already have product in mind?</h5>
                        <label htmlFor="productLink">Product Link</label>
                        <input type="url" id="productLink" name="productLink" value={formData.productLink} onChange={handleChange} className="form-control" />
                    </div>
                </div>

                <div className="mt-5">
                    <div className="col-md-12 mb-3">
                        <h5>Or Get products from our reputable partners</h5>
                        <div className="checkbox-container mt-3">
                            <input type="checkbox" id="requestQuotation" name="requestQuotation" checked={formData.requestQuotation} onChange={handleChange} />
                            <label htmlFor="requestQuotation">Request our Quotations from our partners</label>
                        </div>
                    </div>
                </div>


                <button type="submit" className="slanted-button">Request Now</button>
            </form>
        </div>
        <hr className='text-light'></hr>
        <Footer/>
        </>
    );
};

export default ImportPage;
