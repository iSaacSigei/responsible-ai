import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

const Landing = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
        });
      }, []);
    return (
        <>
         <Helmet>
        <title>WoMall - Your Trusted B2B Hub</title>
        <meta name="description" content="Welcome to WoMall, your one-stop platform for global trade solutions. Connect with manufacturers, importers, and exporters worldwide." />
        <meta name="keywords" content="WoMall, B2B, global trade, import, export, manufacturers" />
      </Helmet>
        
        <div className="landing mt-3" data-aos="fade-up">
            <div className="mt-4">
                <div className='custom-width mt-5'>
                <div className="message-container">
                    <div className="message">
                        <h1>Welcome to WoMall</h1>
                        <p className=''>Your Trusted Global B2B Hub</p>
                    </div>
                    <div className="message">
                        <h1>End-to-End International Trade Management </h1>
                        <p>WoMall’s comprehensive approach ensures a smooth and efficient trade process, reducing the operational burden on businesses.</p>
                    </div>
                    <div className="message">
                        <h1>Expert Support </h1>
                        <p>Personalized assistance and expert guidance help businesses navigate the complexities of international trade, making global commerce more accessible.</p>
                    </div>
                    <div className="message">
                        <h1>High-Quality Partner Network</h1>
                        <p>Our curated list of reputable international partners fosters trust and reliability, enhancing business confidence in global transactions</p>
                    </div>
                </div>
                </div>
                <div className="pt-4 mt-4 text-white custom-width-1">
                    <p>Partner with WoMall and take your business across borders with ease.</p>
                    <div className="d-flex justify-content-between mt-4 align-items-center w-100">
                        <Link to="/exports" className="slanted-button">Export Now</Link>
                        <Link to="/imports" className="slanted-button">Import Now</Link>
                    </div>

                    <p className="text-center mt-5">
                        <small>Sign up <Link to="/signup">here</Link> to get updates and exclusive offers</small>
                    </p>
                </div>
                {/* Quick Question Section */}
                <div className="custom-width quiz col pt-4  mt-4 text-white">
                    <h3>Quick Question</h3>
                    <p>Do you want to import Bulk goods and you don't know how??</p>
                </div>
                {/* End of Quick Question Section */}
            </div>
        </div>
        </>
    );
};

export default Landing;
