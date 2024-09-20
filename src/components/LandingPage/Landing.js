import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

// Import images from src/images directory
import background1 from '../../images/expo-import.jpeg';
import background2 from '../../images/exports.jpg';
import background3 from '../../images/Customer-Service-Script.jpg';
import background4 from '../../images/avocado.jpg';
import Logo from '../../images/womall-logo.png';

const backgrounds = [
    {
        img: background1,
        title: 'Welcome to WoMall',
        description: 'Your Trusted Global B2B Hub',
    },
    {
        img: background2,
        title: 'End-to-End International Trade Management',
        description: 'WoMall’s comprehensive approach ensures a smooth and efficient trade process, reducing the operational burden on businesses.',
    },
    {
        img: background3,
        title: 'Expert Support',
        description: 'Personalized assistance and expert guidance help businesses navigate the complexities of international trade, making global commerce more accessible.',
    },
    {
        img: background4,
        title: 'High-Quality Partner Network',
        description: 'Our curated list of reputable international partners fosters trust and reliability, enhancing business confidence in global transactions.',
    },
];

const Landing = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
        });

        const intervalId = setInterval(() => {
            setIsAnimating(false);

            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
                setIsAnimating(true);
            }, 500);
        }, 6000);

        return () => clearInterval(intervalId);
    }, []);

    const { img, title, description } = backgrounds[currentIndex];

    return (
        <>
           <Helmet>
                <title>WoMall – Revolutionizing Global Trade | B2B Trade</title>
                <meta name="description" content="WoMall is the leading platform connecting manufacturers, suppliers, and retailers globally. Discover the future of global trade with WoMall." />
                <meta name="keywords" content="WoMall, B2B platform, international trade, manufacturers, suppliers, global trade, job openings, internships, retail business" />
                <meta property="og:title" content="WoMall – Revolutionizing Global B2B Trade" />
                <meta property="og:description" content="WoMall connects manufacturers, suppliers, and retailers worldwide, offering innovative solutions to simplify global trade." />
                <meta property="og:image" content={Logo} />  {/* Replace with actual image URL */}
                <meta property="og:url" content="https://www.womall.africa" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="WoMall – Revolutionizing Global Trade" />
                <meta name="twitter:description" content="Discover how WoMall connects manufacturers and retailers for seamless international trade." />
                <meta name="twitter:image" content="URL_to_image" />  {/* Replace with actual image URL */}
                <link rel="canonical" href="https://www.womall.africa" />
            </Helmet>

            <div
                className="landing mt-3"
                style={{ backgroundImage: `url(${img})` }}
            >
                {/* Row 1: Message Section */}
                <div className={`custom-width mt-5 text-center ${isAnimating ? 'animate' : 'hidden'}`}>
                    <div className="message-container">
                        <div className="message">
                            <h1>{title}</h1>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>

                {/* Row 2: Export/Import Links */}
                <div className="pt-4 mt-4 text-white custom-width-1 text-center">
                    <p>Partner with WoMall and take your business across borders with ease.</p>
                    <div className="d-flex justify-content-center mt-4 align-items-center w-100">
                        <Link to="/exports" className="slanted-button">Export Now</Link>
                        <Link to="/imports" className="slanted-button">Import Now</Link>
                    </div>
                    <p className="text-center mt-5">
                        <small>Sign up <Link to="/signup">here</Link> to get updates and exclusive offers</small>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Landing;
