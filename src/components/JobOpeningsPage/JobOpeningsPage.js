import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import '../styles/JobOpeningsPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../footer/Footer';
import { Helmet } from 'react-helmet-async';

const JobOpeningsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [faqs, setFaqs] = useState([]); // State for FAQs
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('job opening');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

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

  return (
    <>
      <Helmet>
      <title>WoMall - Careers</title>
        <meta name="description" content="Find the latest job openings, internships, and trainee programs at WoMall. Apply today!"/>
        <meta name="keywords" content="WoMall, Careers, Jobs, Internships, Trainee Programs"/>
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Find Vacancies",
          "description": "Jobs Opening, Internships, Graduate Trainee",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "WoMall",
            "sameAs": "https://womall.africa",
            "logo": "URL_to_logo"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kenya and Abroad",
              "addressCountry": "Country"
            }
          }
        }
        `}
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
                  <h2>{job.job_title}</h2>
                  <div className="job-details">
                    <span><strong>Category:</strong> {job.category}</span>
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
      <Footer />
    </>
  );
};

export default JobOpeningsPage;
