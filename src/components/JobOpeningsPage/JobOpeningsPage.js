import React, { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import '../styles/JobOpeningsPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';
import Logo from '../../images/womall-logo.png';

// Lazy load Footer component
const Footer = lazy(() => import('../footer/Footer'));

const JobOpeningsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [faqs, setFaqs] = useState([]); // State for FAQs
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('job opening');

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true, // Run animations once
    });
  }, []);

  // Set category from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || 'job opening';
    setSelectedCategory(category);
  }, [location.search]);

  // Fetch jobs or FAQs based on the selected category
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        if (selectedCategory === 'faqs') {
          // Fetch FAQs when category is FAQs
          const response = await axios.get('https://mysite-jr5y.onrender.com/faqs');
          setFaqs(response.data);
        } else {
          // Fetch jobs for other categories
          const response = await axios.get(`https://mysite-jr5y.onrender.com/jobs?category=${selectedCategory}`);
          setJobs(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchData();
  }, [selectedCategory]);

  const currentUrl = `https://www.womall.africa/jobs?category=${selectedCategory}`;

// Create schema data for Job Openings
const schemaData = jobs.map((job) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": job.job_title,
  "description": job.job_description,
  "identifier": {
    "@type": "PropertyValue",
    "name": "WoMall",
    "value": job.id
  },
  "datePosted": new Date(job.created_at).toISOString(),
  "validThrough": new Date(job.application_deadline).toISOString(), // Add validThrough field
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "WoMall",
    "sameAs": "https://www.womall.africa",
    "logo": "https://www.womall.africa/apple-touch-icon.png" // Replace with actual logo URL
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Thika Road Mall",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00500",
      "addressCountry": "KE"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "KES",
    "value": {
      "@type": "QuantitativeValue",
      "value": 50000, // Example salary, you can replace with actual salary details
      "unitText": "MONTH"
    }
  }
}));


  // Updated function to handle special category cases
  const capitalizeCategory = (category) => {
    if (category === 'graduate_trainee') {
      return 'Graduate Trainee';
    }
    if (category === 'job openings') {
      return 'Job Opening';
    }
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <Helmet>
        <title>Careers</title>
        <meta name="description" content="Find the latest job openings, internships, and trainee programs at WoMall. Apply today!" />
        <meta name="keywords" content="WoMall, Careers, Jobs, Internships, Trainee Programs" />
        <meta property="og:title" content="WoMall - Careers" />
        <meta property="og:description" content="Explore job openings, internships, and trainee programs at WoMall. Join our innovative team and make an impact in the world of import and export." />
        <meta property="og:image" content={Logo} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WoMall - Careers" />
        <meta name="twitter:description" content="Discover exciting career opportunities at WoMall. Apply now for jobs, internships, and trainee programs." />
        <meta name="twitter:image" content="URL_to_image_for_careers_page" />
        <link rel="canonical" href={currentUrl} />
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="job-openings bg-light" data-aos="fade-up">
        <div className="intro bg-light">
          <p>
            At WoMall, we believe in fostering a vibrant and dynamic work environment where your contributions make a real impact. Join us in shaping the future of exportation and importation, and be part of a team that values innovation, collaboration, and growth.
          </p>
        </div>
        
        <section className="job-content">
          {isLoading ? (
            <div className="loading-container">
              <h2>Loading...</h2>
              <p>Please wait while we fetch the latest job openings.</p>
            </div>
          ) : selectedCategory === 'faqs' ? (
            faqs.length > 0 ? (
              faqs.map((faq) => (
                <div className="no-jobs-container" key={faq.id}>
                  <h2>{faq.question}</h2>
                  <p>{faq.answer}</p>
                </div>
              ))
            ) : (
              <div className="no-faqs-container">
                <h2>No FAQs available right now</h2>
                <p>Please check back later for more FAQs.</p>
              </div>
            )
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <div className="job-row" key={job.id}>
                <div className="job-column job-description-column">
                <h2>{capitalizeCategory(job.job_title)}</h2>
                <div className="job-details">
                    <span><strong>Category:</strong> {capitalizeCategory(job.category)}</span>
                    <span><strong>Date Posted:</strong> {new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="description">{job.job_description}</p>
                  <p><strong>Application Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</p>
                  <Link to={`/jobs/${job.id}`} className="read-more">View More</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-jobs-container">
              <h2>No Advertised Jobs Right Now</h2>
              <p>Please check back later for new job opportunities.</p>
            </div>
          )}
        </section>
      </div>

      {/* Lazy loaded Footer */}
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </>
  );
};

export default JobOpeningsPage;
