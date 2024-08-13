import React from 'react';
import '../styles/services.css'; // Ensure to create this CSS file for styling
import importImage from '../../images/Importing_From_China.jpeg';
import exportImage from '../../images/avocado.jpg';
import partnersImage from '../../images/partners.png';

const Services = () => {
    return (
        <div className="services-container">
            <h2 className="text-center">Our Services</h2>
            <div className="row">
                {/* Exportation Card */}
                <div className="col-lg-4 col-md-6">
                    <div className="card service-card">
                        <img src={exportImage} className="card-img-top" alt="Exportation" />
                        <div className="card-body">
                            <h5 className="card-title">Exportation</h5>
                            <p className="card-text">
                                Expand your business globally with our seamless exportation services. We handle all logistics to ensure your products reach international markets efficiently.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Importation Card */}
                <div className="col-lg-4 col-md-6">
                    <div className="card service-card">
                        <img src={importImage} className="card-img-top" alt="Importation" />
                        <div className="card-body">
                            <h5 className="card-title">Importation</h5>
                            <p className="card-text">
                                Source products from across the world with confidence. Our importation services provide you with access to global suppliers, ensuring quality and reliability.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Connecting with Partners Card */}
                <div className="col-lg-4 col-md-12">
                    <div className="card service-card">
                        <img src={partnersImage} className="card-img-top" alt="Connecting with Partners" />
                        <div className="card-body">
                            <h5 className="card-title">Connecting with Partners</h5>
                            <p className="card-text">
                                Build strong international partnerships with trusted companies. We connect you with reliable partners for mutually beneficial trade opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
