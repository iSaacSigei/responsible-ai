import React, { useState } from 'react';
import '../styles/whyus.css';

const TypingText = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    React.useEffect(() => {
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

const WhyUs = () => {
    const [currentReasonIndex, setCurrentReasonIndex] = useState(0);

    const reasons = [
        {
            header: 'Ethical Considerations',
            text: 'AI systems should be designed with ethical considerations in mind to prevent potential harm or discrimination.'
        },
        {
            header: 'Transparency and Accountability',
            text: 'There should be transparency and accountability in AI systems to understand how decisions are made and to address errors or biases.'
        },
        {
            header: 'Human Oversight',
            text: 'Human oversight is necessary to ensure that AI systems are used responsibly and to intervene when necessary.'
        },
        {
            header: 'Regulation and Governance',
            text: 'There should be regulations and governance frameworks in place to guide the development and deployment of AI technologies.'
        }
    ];

    const handleTypingComplete = () => {
        if (currentReasonIndex < reasons.length - 1) {
            setTimeout(() => {
                setCurrentReasonIndex(currentReasonIndex + 1);
            }, 1000); // Adjust the delay before showing the next message
        }
    };

    return (
        <div className="why-us-container">
            <hr />
            <h1 className='my-4 text-center text-light'>Why Limit AI?</h1>
            <h4 className='text-center mb-3 text-capitalize'>Understanding the importance of limiting AI and using it responsibly</h4>
            <div className="row reasons-row">
                {reasons.map((reason, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="reason-card">
                            <h2>{reason.header}</h2>
                            {index === currentReasonIndex && (
                                <TypingText
                                    text={reason.text}
                                    onComplete={handleTypingComplete}
                                />
                            )}
                            {index < currentReasonIndex && <p>{reason.text}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyUs;
