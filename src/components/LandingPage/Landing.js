// src/components/Landing.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../styles/landing.css';
import CourseCard from '../courseCard/courseCard'; // Import the updated CourseCard component

const twoSumCodeString = `
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; nums.length > i; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
`;

const loadDataset = `
import pandas as pd
data = pd.read_csv('file.csv')

print("First 5 rows of the data:")
print(data.head())

# Step 4: Get a Summary of the Data
print("\\nSummary of the data:")
print(data.info())

# Step 5: Calculate Basic Statistics
print("\\nBasic statistics of the data:")
print(data.describe())
`;

const TypingEffect = ({ code, onComplete }) => {
    const [displayedCode, setDisplayedCode] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < code.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedCode(code.substring(0, index + 1));
                setIndex(index + 1);
            }, 50);
            return () => clearTimeout(timeoutId);
        } else {
            if (onComplete) {
                onComplete();
            }
        }
    }, [index, code, onComplete]);

    useEffect(() => {
        // Reset index and displayedCode when code changes
        setDisplayedCode('');
        setIndex(0);
    }, [code]);

    return (
        <SyntaxHighlighter language="javascript" style={docco}>
            {displayedCode}
        </SyntaxHighlighter>
    );
};

const TypingText = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText(text.substring(0, index + 1));
                setIndex(index + 1);
            }, 30);
            return () => clearTimeout(timeoutId);
        } else {
            onComplete(); // Notify parent component when typing completes
        }
    }, [index, text, onComplete]);

    return <p>{displayedText}</p>;
};

const Landing = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = useState(0);
    const [algorithmKey, setAlgorithmKey] = useState(0); // Key to force re-render

    const aiResearchMessages = [
        {
            header: 'Importance of AI',
            text: 'Artificial Intelligence (AI) has become increasingly important in today\'s world, revolutionizing various industries such as healthcare, finance, and transportation. Its ability to analyze large amounts of data and make predictions or decisions based on patterns has led to significant advancements and efficiencies. However, with this power comes responsibility. It\'s crucial to ensure that AI systems are developed and used ethically to avoid potential biases and negative impacts on society.'
        },
        {
            header: 'AI in Healthcare',
            text: 'AI is transforming healthcare by enabling faster and more accurate diagnoses, personalized treatment plans, and advanced research in drug discovery. Its ability to analyze medical data helps in predicting patient outcomes and improving overall patient care.'
        },
        {
            header: 'AI in Finance',
            text: 'In the finance industry, AI is used for fraud detection, risk management, and automated trading. It helps in analyzing market trends, making investment decisions, and providing customer support through chatbots and virtual assistants.'
        }
    ];

    const algorithms = [
        {
            code: twoSumCodeString,
            description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to the target.'
        },
        {
            code: loadDataset,
            description: 'Perform Data Analysis.'
        }
    ];

    const courses = [
        {
            title: 'Introduction to AI',
            description: 'Learn the basics of artificial intelligence and its applications.',
            link: '/courses/introduction-to-ai',
            image: 'introduction-to-ai' // Adjusted image filename without extension
        },
        {
            title: 'AI Ethics',
            description: 'Understand the ethical considerations in the development and deployment of AI systems.',
            link: '/courses/ai-ethics',
            image: 'ai-ethics' // Adjusted image filename without extension
        },
        {
            title: 'Why Limit AI',
            description: 'Explore the reasons and methods for limiting AI capabilities to ensure safety and ethical use.',
            link: '/courses/why-limit-ai',
            image: 'why-limit-ai' // Adjusted image filename without extension
        }
    ];

    const handleAlgorithmTypingComplete = () => {
        if (currentAlgorithmIndex < algorithms.length - 1) {
            setCurrentAlgorithmIndex(currentAlgorithmIndex + 1);
        } else {
            setCurrentAlgorithmIndex(0); // Reset to first algorithm
        }
        setAlgorithmKey(prevKey => prevKey + 1); // Force re-render by changing key
    };

    const handleMessageTypingComplete = () => {
        if (currentMessageIndex < aiResearchMessages.length - 1) {
            setTimeout(() => {
                setCurrentMessageIndex(currentMessageIndex + 1);
            }, 1000); // Adjust the delay before showing the next message
        } else {
            setTimeout(() => {
                setCurrentMessageIndex(0); // Reset to first message
            }, 1000);
        }
    };

    return (
        <div className="container landing">
            <div className="row">
                <div className="col-12 mt-4 col-md-6">
                    <div className="message-container">
                        <div className="message">
                            <h2>Welcome to Responsible AI</h2>
                            <p>Learn how to use AI responsibly and ethically.</p>
                        </div>
                        <div className="message">
                            <h2>Comprehensive AI Courses</h2>
                            <p>Explore our courses designed to teach responsible AI practices.</p>
                        </div>
                        <div className="message">
                            <h2>Exclusive Resources</h2>
                            <p>Access a variety of resources to enhance your learning.</p>
                        </div>
                        <div className="message">
                            <h2>Stay Updated</h2>
                            <p>Join our community and stay informed about the latest in AI ethics.</p>
                        </div>
                    </div>
                    <div className="col pt-4 mt-4 text-white">
                        <p>Join our mission to promote responsible AI usage and ensure a positive impact on society.</p>
                        <div className="d-flex justify-content-end mt-4 align-items-center w-100">
                            <Link to="/courses" className="slanted-button">Explore Courses</Link>
                        </div>
                        <p className="text-center mt-5"><small>Sign up <Link to="/signup">here</Link> to get updates and exclusive offers</small></p>
                    </div>
                    {/* Quick Question Section */}
                    <div className="quiz col pt-4 mb-4 mt-4 text-white">
                        <h3>Quick Question</h3>
                        <p>How can we regulate a technology that is developing exponentially and whose potential is almost impossible to gauge?</p>
                    </div>
                    {/* End of Quick Question Section */}
                </div>
                <div className="col-12 col-md-6">
                    <h2 className="text-center text-white">What Can AI Do?</h2>
                    <div className="ai-example">
                        <h3>Write Algorithms</h3>
                        <p>{algorithms[currentAlgorithmIndex].description}</p>
                        <div className="code-block">
                            <TypingEffect
                                key={algorithmKey} // Key to force re-render
                                code={algorithms[currentAlgorithmIndex].code}
                                onComplete={handleAlgorithmTypingComplete}
                            />
                        </div>
                    </div>
                    {/* Importance of AI section */}
                    <div className="mt-2">
                        {aiResearchMessages.map((message, index) => (
                            index === currentMessageIndex && (
                                <div key={index} className="importance-ai">
                                    <h2 className='text-left'>AI can do Research</h2>
                                    <h5>{message.header}</h5>
                                    <div className='code-block'>
                                        <TypingText
                                            text={message.text}
                                            onComplete={handleMessageTypingComplete}
                                        />
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
            {/* Popular Courses Section */}
            <div className="popular-courses mt-5">
                <h2 className="text-center">Popular Courses</h2>
                <div className="course-cards-container">
                    <div className="course-cards-row">
                        {courses.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
