import React from 'react';
import '../styles/Error404.css';
const Error404 = () => {
    const navigations = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F588E3" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
            ),
            title: "Explore WoMall",
            desc: "Discover various resources to enhance your import and export experience with WoMall.",
            href: "#"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F588E3" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            ),
            title: "WoMall Guides",
            desc: "Access detailed guides to streamline your import and export processes.",
            href: "#"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F588E3" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
            ),
            title: "Contact WoMall",
            desc: "Reach out to our support team for assistance with transactions and partnerships.",
            href: "#"
        }
    ];

    return (
        <main className="error-container">
            <div className="error-content">
                <div className="text-section">
                    <div className="text-center">
                        <h3 className="error-header">404 Error</h3>
                        <p className="error-title">Page Not Found</p>
                        <p className="error-description">
                            Sorry, the page you are looking for could not be found. It may have been moved or removed.
                        </p>
                    </div>
                    <div className="error-links">
                        <ul>
                            {navigations.map((item, idx) => (
                                <li key={idx} className="navigation-item">
                                    <div className="navigation-icon">{item.icon}</div>
                                    <div className="navigation-details">
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                        <a href={item.href} className="navigation-link">Learn more</a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Error404;
