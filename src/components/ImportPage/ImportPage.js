import React, { useState } from 'react';
import '../styles/Import.css';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';

const ImportPage = ({ user, setReloadPage }) => {
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please log in to submit the form.');
            navigate('/login');
            return;
        }

        setLoading(true);
        setError(null);

        const data = {
            import_order: {
                import_from: formData.importFrom,
                product: formData.product,
                units: formData.units,
                product_description: formData.productDescription,
                product_link: formData.productLink,
                company_name: formData.companyName,
                address: formData.address,
                city: formData.city,
                state_province: formData.stateProvince,
                contact: formData.contact,
                request_quotation: formData.requestQuotation
            }
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://mysite-jr5y.onrender.com/import_orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                setReloadPage(true);
                navigate('/order_received');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.errors || 'An error occurred while submitting the form.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            navigate('/error500');  // Navigate to the Error500 page if a server error occurs
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="import-page-container">
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="import-form">
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="importFrom" style={{ fontSize: "24px", paddingBottom: "14px" }}>Import From</label>
                            <select id="importFrom" name="importFrom" value={formData.importFrom} onChange={handleChange} required className="form-control">
                                <option value="">Select Country</option>
                                <option value="China">China</option>
                                <option value="Israel">Israel</option>
                                <option value="Europe">Europe</option>
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
                            <label htmlFor="units">How Many Units</label>
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
                            <h5>Already have a product in mind?</h5>
                            <label htmlFor="productLink">Product Link</label>
                            <input type="url" id="productLink" name="productLink" value={formData.productLink} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="col-md-12 mb-3">
                            <h5>Or Get products from our reputable partners</h5>
                            <div className="checkbox-container mt-3">
                                <input type="checkbox" id="requestQuotation" name="requestQuotation" checked={formData.requestQuotation} onChange={handleChange} />
                                <label htmlFor="requestQuotation">Request Quotations from our partners</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn-1" disabled={loading}>
                        {loading ? 'Submitting...' : 'Request Now'}
                    </button>
                </form>
            </div>
            <hr className='text-light' />
            <Footer />
        </>
    );
};

export default ImportPage;
