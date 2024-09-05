import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styles/JobOpeningsPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../footer/Footer';

const JobOpeningsPage = () => {
  const [jobs, setJobs] = useState([]);
  const location = useLocation(); // To get the current URL
  const [selectedCategory, setSelectedCategory] = useState('job opening');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // Extract category from query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || 'job opening'; // Default to 'job opening' if no category is set
    setSelectedCategory(category);
  }, [location.search]);

  // Fetch jobs based on the selected category
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/jobs?category=${selectedCategory}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [selectedCategory]);

  return (
    <>
      <div className="job-openings bg-light" data-aos="fade-up">
        <section className="intro bg-light">
          <p>
            At WoMall, we believe in fostering a vibrant and dynamic work environment where your contributions make a real impact. Join us in shaping the future of exportation and importation, and be part of a team that values innovation, collaboration, and growth.
          </p>
        </section>
        <section className="job-content">
          {jobs.length > 0 ? (
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
                  <a href={`/jobs/${job.id}`} className="read-more">View More</a>
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
