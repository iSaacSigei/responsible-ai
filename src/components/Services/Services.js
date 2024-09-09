import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/services.css'; // Ensure to create this CSS file for styling
import importImage from '../../images/Importing_From_China.jpeg';
import exportImage from '../../images/avocado.jpg';
import partnersImage from '../../images/partners.png';

const Services = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
        });
      }, []);
    return (
        <div className="services-container"data-aos="fade-up">
            <h1 className="introduction text-center mb-4">Our Services</h1>
            <p className='m-auto col-lg-8 col-md-6 mb-5 text-center text-light'>At WoMall Expo, we are committed to providing seamless and efficient solutions to support global trade and business growth. Our comprehensive range of services is designed to connect manufacturers and buyers, simplify logistics, and enhance business-to-business interactions across borders.</p>
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
                <div id='service-3' className="col-lg-4 col-md-12">
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
