import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import '../styles/JobDetailsPage.css'; // You can create a separate CSS file for styling
import Footer from '../footer/Footer';

const JobDetailsPage = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true); // Show a loading state initially
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);
  useEffect(() => {
    // Fetch the job details based on the ID
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://mysite-jr5y.onrender.com/jobs/${id}`);
        setJob(response.data);
        setLoading(false); // Data is loaded, so stop the loading state
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false); // In case of an error, stop the loading state
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!job) {
    return (
      <div className="error">
        <h2>Job not found</h2>
        <p>Sorry, the job you're looking for does not exist or may have been removed.</p>
      </div>
    );
  }

  return (
    <>
      <div className='bg-light job-details-page'>
        <div className="job-details" data-aos="fade-up">
          <h1>{job.job_title}</h1>
          <div className="job-details-container">
            <div className="job-overview">
              <h2 className='text-dark'>Job Overview</h2>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Date Posted:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
              <p><strong>Application Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</p>
            </div>

            <div className="job-description">
              <h2 className='text-dark'>Job Description</h2>
              <p>{job.job_description}</p>
            </div>

            <div className="job-requirements">
              <h2 className='text-dark'>Job Requirements</h2>
              <ul>
                {job.requirements && job.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            <div className="job-benefits">
              <h2 className='text-dark'>Benefits</h2>
              <ul>
                {job.benefits && job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="how-to-apply">
              <h2 className='text-dark'>How to Apply</h2>
              <p>{job.how_to_apply}</p>
            </div>

            <div className="contact-information">
              <h2 className='text-dark'>Contact Information</h2>
              <p>All applications and resumes should be submitted to contact email below for further consideration. Please ensure that your documents are in the appropriate format and include all required information.</p>
              <p><strong>Email:</strong> <a href={`mailto:${job.contact_email}`}>{job.contact_email}</a></p>
              {/* <p><strong>Phone:</strong> {job.contact_phone}</p> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetailsPage;
