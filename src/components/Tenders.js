import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async'; // For SEO meta tags
import '../components/styles/Tenders.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './footer/Footer';

// Import the PDF file
import tenderPDF from '../images/tender.pdf';

const Tenders = () => {
  const [tenders, setTenders] = useState([]);
  const [groupedTenders, setGroupedTenders] = useState({});
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get('https://mysite-jr5y.onrender.com/tenders');
        const tendersData = response.data;

        const tendersByCategory = tendersData.reduce((acc, tender) => {
          const category = tender.category || 'Uncategorized';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(tender);
          return acc;
        }, {});

        if (tendersData.length > 0) {
          setCompanyName(tendersData[0].company);
        }

        setTenders(tendersData);
        setGroupedTenders(tendersByCategory);
      } catch (error) {
        console.error('Error fetching tenders:', error);
      }
    };

    fetchTenders();
  }, []);

  const getCategoryLabel = (index) => {
    return String.fromCharCode(65 + index);
  };

  const currentUrl = `https://www.womall.africa/tenders`;

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{companyName} - Tenders and Supplier Prequalification 2024-2027</title>
        <meta
          name="description"
          content={`${companyName} invites applications for registration of suppliers and contractors for the financial year 2024-2027. Explore prequalification categories and apply now.`}
        />
        <meta
          name="keywords"
          content="tenders, prequalification, supplier registration, procurement, 2024-2027, {companyName}, tender opportunities"
        />
        <meta property="og:title" content={`${companyName} - Supplier Prequalification and Tenders`} />
        <meta
          property="og:description"
          content="Explore prequalification of suppliers for goods and services at {companyName}. Apply to be part of the procurement process for the financial year 2024-2027."
        />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={currentUrl} />
      </Helmet>

      <div className="tenders-page" data-aos="fade-up">
        {/* Header */}
        <div className="tenders-intro">
          <h1>{companyName} - Prequalification of Suppliers 2024-2027</h1>
          <p>
            {companyName} invites applications for registration of suppliers, service providers, and contractors for the financial year 2024 – 2027.
          </p>
          <p>
            Interested suppliers are invited to apply for prequalification, indicating the category of the goods, works, and services they wish to supply/provide.
          </p>
          <p>
            The completed pre-qualification documents are to be addressed to:
          </p>
          <p className="address">
            Finance Director <br />
            {companyName} <br />
            P.O BOX 43903- 00100 Nairobi, Kenya.
          </p>
          <p>
            Any queries regarding pre-qualification must be sent in writing to{' '}
            <a href="mailto:procurement@eigoll.com">procurement@eigoll.com</a>.
          </p>
          <p>
            Completed pre-qualification documents should be submitted electronically as PDF documents clearly indicating the PREQ NO. and DESCRIPTION of the item being applied for, through email{' '}
            <a href="mailto:tenders@eigoll.com">tenders@eigoll.com</a> not later than 5:00pm, 30th August 2024.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="tenders-buttons">
          <a href={tenderPDF} target="_blank" rel="noopener noreferrer">
            <button className="apply-button">APPLY HERE</button>
          </a>
          <button className="tier-button">TENDER PRE-QUALIFICATION TIER 1 - GENERAL SUPPLIERS</button>
          <button className="tier-button">TENDER PRE-QUALIFICATION TIER 2 - AGRIBUSINESS SMEs</button>
        </div>

        {Object.keys(groupedTenders).map((category, index) => (
          <div key={index} className="tenders-table">
            <h2>Category {getCategoryLabel(index)} – {category}</h2>
            
            {/* Table Wrapper for responsive scrolling */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>S. NO.</th>
                    <th>TENDER NO.</th>
                    <th>TENDER DESCRIPTION</th>
                    <th>NON-REFUNDABLE TENDER FEE</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedTenders[category].map((tender, i) => (
                    <tr key={tender.id}>
                      <td style={{ width: '50px', textAlign: 'center' }}>{i + 1}</td>
                      <td style={{ maxWidth: '100px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{tender.tender_number}</td>
                      <td style={{ maxWidth: '300px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{tender.tender_description}</td>
                      <td style={{ width: '90px', wordWrap: 'break-word', whiteSpace: 'normal' }}>KSH {tender.tender_fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

      </div>

      <Footer />
    </>
  );
};

export default Tenders;
