// src/components/CourseCard.js

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/courseCard.css';
import IntroductionToAIImage from '../../images/what_is_ai.webp';
import AIEthicsImage from '../../images/AI_Ethics.png';
import WhyLimitAIImage from '../../images/ai_limitation.png';

const CourseCard = ({ course }) => {
    const { title, description, link, image } = course;

    let imagePath;
    switch (image) {
        case 'introduction-to-ai':
            imagePath = IntroductionToAIImage;
            break;
        case 'ai-ethics':
            imagePath = AIEthicsImage;
            break;
        case 'why-limit-ai':
            imagePath = WhyLimitAIImage;
            break;
        default:
            imagePath = IntroductionToAIImage; // Default image path
            break;
    }

    return (
        <div className="course-card">
            <div className="course-image">
                <img src={imagePath} alt={title} className='w-100' />
            </div>
            <div className="course-details">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={link} className="course-link">Learn more</Link>
            </div>
        </div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default CourseCard;
