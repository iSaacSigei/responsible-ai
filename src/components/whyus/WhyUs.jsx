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
            header: 'Seamless Importation',
            text: 'We streamline the importation process, ensuring that your goods are brought in efficiently and hassle-free.'
        },
        {
            header: 'Trusted Exportation',
            text: 'Our network guarantees secure and reliable exportation, connecting you with trustworthy partners globally.'
        },
        {
            header: 'Reliable Transactions',
            text: 'Our platform facilitates transparent and secure transactions, providing peace of mind for all parties involved.'
        },
        {
            header: 'Connecting Buyers and Partners',
            text: 'We bridge the gap between buyers and trusted partners, fostering strong business relationships and growth opportunities.'
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
            <h1 className='my-4 text-center text-light'>Why Choose Us?</h1>
            <h4 className='text-center mb-3 text-capitalize'>Discover how we simplify importation, exportation, and more</h4>
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
