import React, { useState } from 'react';
import '../styles/Import.css'; // Assuming you're using the same styles
import Footer from '../footer/Footer';

const ExportPage = () => {
    const [formData, setFormData] = useState({
        exportTo: '',
        product: '',
        units: '',
        productDescription: '',
        companyName: '',
        address: '',
        city: '',
        stateProvince: '',
        contact: '',
        requestQuotation: false,
        images: ['', '', ''] // Array to store three images
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            const updatedImages = [...formData.images];
            updatedImages[+name] = files[0]; // store file in the corresponding index
            setFormData({
                ...formData,
                images: updatedImages
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form Data:', formData);
    };

    return (
      <>
        <div className="import-page-container mt-1">
        <hr className='text-light'></hr>
            <form onSubmit={handleSubmit} className="import-form">
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="exportTo" style={{fontSize:"24px", paddingBottom:"14px"}}>Export To</label>
                        <select id="exportTo" name="exportTo" value={formData.exportTo} onChange={handleChange} required className="form-control">
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
                        <label htmlFor="units">Quantity</label>
                        <input type="number" id="units" name="units" value={formData.units} onChange={handleChange} required className="form-control" />
                    </div>
                </div>

                {/* Image upload row */}
                <div className="form-row row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="image0">Upload Image 1</label>
                        <input type="file" id="image0" name="0" onChange={handleChange} className="form-control bg" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="image1">Upload Image 2</label>
                        <input type="file" id="image1" name="1" onChange={handleChange} className="form-control bg" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="image2">Upload Image 3</label>
                        <input type="file" id="image2" name="2" onChange={handleChange} className="form-control px-2 bg" />
                    </div>
                </div>


                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="productDescription">Product Description</label>
                        <textarea id="productDescription" name="productDescription" value={formData.productDescription} onChange={handleChange} required className="form-control" />
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

export default ExportPage;
