import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import '../styles/JobDetailsPage.css';
import Footer from '../footer/Footer';

const JobDetailsPage = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true); // Show a loading state initially
  const [error, setError] = useState(false); // Track if there's an error fetching job data

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true, // Animations run only once
    });
  }, []);

  // Fetch job details based on the ID from the URL
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://mysite-jr5y.onrender.com/jobs/${id}`);
        setJob(response.data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError(true); // Set error state if fetching fails
        setLoading(false); // Stop loading in case of an error
      }
    };

    fetchJobDetails();
  }, [id]);

  // Utility function to capitalize categories with underscores
  const capitalizeCategory = (category) => {
    return category
      ? category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
      : '';
  };

  // Render the loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Render error state if the job is not found or fetching fails
  if (error || !job) {
    return (
      <div className="error">
        <h2>Job not found</h2>
        <p>Sorry, the job you're looking for does not exist or may have been removed.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-light job-details-page">
        <div className="job-details" data-aos="fade-up">
          <h1>{job.job_title}</h1>

          <div className="job-details-container">
            {/* Job Overview */}
            <div className="job-overview">
              <h2 className="text-dark">Job Overview</h2>
              <p><strong>Category:</strong> {capitalizeCategory(job.category)}</p>
              <p><strong>Date Posted:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
              <p><strong>Application Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</p>
            </div>

            {/* Job Description */}
            <div className="job-description">
              <h2 className="text-dark">Job Description</h2>
              <p>{job.job_description}</p>
            </div>

            {/* Job Requirements */}
            <div className="job-requirements">
              <h2 className="text-dark">Job Requirements</h2>
              <ul>
                {job.requirements && job.requirements.length > 0 ? (
                  job.requirements.map((requirement, index) => <li key={index}>{requirement}</li>)
                ) : (
                  <li>No specific requirements listed.</li>
                )}
              </ul>
            </div>

            {/* Job Benefits */}
            <div className="job-benefits">
              <h2 className="text-dark">Benefits</h2>
              <ul>
                {job.benefits && job.benefits.length > 0 ? (
                  job.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)
                ) : (
                  <li>No benefits listed.</li>
                )}
              </ul>
            </div>

            {/* How to Apply */}
            <div className="how-to-apply">
              <h2 className="text-dark">How to Apply</h2>
              <p>{job.how_to_apply || 'No application instructions provided.'}</p>
            </div>

            {/* Contact Information */}
            <div className="contact-information">
              <h2 className="text-dark">Contact Information</h2>
              <p>Please submit your applications and resumes to the contact email below for further consideration.</p>
              {job.contact_email ? (
                <p><strong>Email:</strong> <a href={`mailto:${job.contact_email}`}>{job.contact_email}</a></p>
              ) : (
                <p>No contact information available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default JobDetailsPage;
