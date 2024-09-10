import React, { useEffect } from 'react';
import '../styles/ServicePage.css';
import Image1 from '../../images/importexport1.jpg'; // Update paths as needed
import Image2 from '../../images/manufacturer.png';
import Image3 from '../../images/transaction.png';
import Image4 from '../../images/logistics.png';
import Footer from '../footer/Footer';
import { Helmet } from 'react-helmet-async';
const content = [
  {
    image: Image1,
    header: 'Exportation and Importation',
    description: 'WoMall streamlines the exportation and importation processes by connecting businesses with international markets efficiently. Our platform ensures that all transactions are smooth and compliant with global trade regulations.',
  },
  {
    image: Image2,
    header: 'Connection of Manufacturers to Buyers',
    description: 'We bridge the gap between manufacturers and buyers worldwide. WoMall provides a comprehensive network that facilitates connections and partnerships, enhancing trade opportunities and expanding market reach.',
  },
  {
    image: Image3,
    header: 'Enhancing Seamless Transactions',
    description: 'Our platform is designed to enhance the efficiency of transactions through cutting-edge technology and user-friendly interfaces. WoMall ensures seamless transactions, reducing the complexity of international trade.',
  },
  {
    image: Image4,
    header: 'Easing Customs and Logistics Burden',
    description: 'WoMall simplifies customs and logistics by providing expert guidance and support. We help businesses navigate through regulatory requirements and manage logistics efficiently, ensuring timely delivery of goods.',
  },
];

const Service = () => {
    useEffect(() => {
      const handleScroll = () => {
        const rows = document.querySelectorAll('.service-row');
        rows.forEach(row => {
          const rect = row.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            row.classList.add('in-view');
          } else {
            row.classList.remove('in-view');
          }
        });
      };
  
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Trigger check on initial load
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
    <>
    <Helmet>
      <title>WoMall - Our Services</title>
      <meta name="description" content="Discover WoMall's range of services including global trade facilitation, manufacturer-buyer connections, and seamless transactions." />
      <meta name="keywords" content="WoMall services, global trade, logistics, manufacturers, import, export" />
      <meta property="og:title" content="WoMall - Our Services" />
      <meta property="og:description" content="Explore WoMall's comprehensive services designed to streamline global trade, connect manufacturers to buyers, and ensure seamless transactions. Learn more about our expertise in import, export, and logistics." />
      {/* <meta property="og:image" content="URL_to_image_of_service_page" /> */}
      <meta property="og:url" content="https://www.womall.africa/services" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="WoMall - Our Services" />
      <meta name="twitter:description" content="Explore WoMall's services for efficient global trade, connecting manufacturers to buyers, and enhancing transaction processes." />
      <meta name="twitter:image" content="URL_to_image_of_service_page" />
    </Helmet>
      <div className="service-page bg-light">
        {content.map((item, index) => (
          <div className={`service-row ${index % 2 === 0 ? 'left-image' : 'right-image'}`} key={index}>
            {index % 2 === 0 ? (
              <>
                <div className="service-column service-image-column">
                  <img src={item.image} alt={`Service ${index + 1}`} />
                </div>
                <div className="service-column service-description-column">
                  <h2>{item.header}</h2>
                  <p>{item.description}</p>
                </div>
              </>
            ) : (
              <>
                <div className="service-column service-description-column">
                  <h2>{item.header}</h2>
                  <p>{item.description}</p>
                </div>
                <div className="service-column service-image-column">
                  <img src={item.image} alt={`Service ${index + 1}`} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Footer/>
    </>
    );
  };
  

export default Service;
