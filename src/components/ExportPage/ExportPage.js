import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Import.css';
import Footer from '../footer/Footer';
import ExportSuccessModal from '../Modal/ExportSuccessModal'; // Import the modal component

const ExportPage = ({ user }) => {
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            const updatedImages = [...formData.images];
            updatedImages[+name] = files[0]; // Store file in the corresponding index
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please log in to submit the form.');
            navigate('/login');
            return;
        }

        setLoading(true);
        setError(null);

        const data = new FormData();
        data.append('export_order[export_to]', formData.exportTo);
        data.append('export_order[product]', formData.product);
        data.append('export_order[units]', formData.units);
        data.append('export_order[product_description]', formData.productDescription);
        data.append('export_order[company_name]', formData.companyName);
        data.append('export_order[address]', formData.address);
        data.append('export_order[city]', formData.city);
        data.append('export_order[state_province]', formData.stateProvince);
        data.append('export_order[contact]', formData.contact);
        data.append('export_order[request_quotation]', formData.requestQuotation);

        formData.images.forEach((image) => {
            if (image) {
                data.append('export_order[images][]', image);
            }
        });

        // Retrieve the token from local storage (adjust if necessary)
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://mysite-jr5y.onrender.com/export_orders', {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`, // Add Authorization header
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                setModalOpen(true);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.errors || 'An error occurred while submitting the form.');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.message === 'Failed to fetch' || error.message.includes('500')) {
                navigate('/error500');
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ExportSuccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            <div className="import-page-container mt-1">
                <hr className='text-light'></hr>
                {error && <div className="error-message text-danger text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="import-form">
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="exportTo" style={{ fontSize: "24px", paddingBottom: "14px" }}>Export To</label>
                            <select id="exportTo" name="exportTo" value={formData.exportTo} onChange={handleChange} required className="form-control">
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
                            <input type="file" id="image2" name="2" onChange={handleChange} className="form-control bg" />
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

                    <button type="submit" className="btn-1 text-end" disabled={loading}>
                        {loading ? 'Submitting...' : 'Request Now'}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ExportPage;
