import React from 'react';
import './index.css';

function AboutUs() {
    return (
        <div className="about-us-container">
          

            <section className="mission-section">
                <div className="content">
                    <h2 className="section-title">Our Mission</h2>
                    <h6 className="section-text">Our mission is to make books more accessible to everyone, encouraging lifelong learning and personal growth. We aim to create an inclusive community for readers of all ages, offering a wide range of books that spark imagination, creativity, and critical thinking.</h6>
                </div>
            </section>

            <section className="vision-section">
                <div className="content">
                    <h2 className="section-title">What We Offer</h2>
                    <h6 className="section-text">We offer an extensive collection of books, from bestsellers to hidden gems, catering to all genres, including fiction, non-fiction, fantasy, mystery, self-help, and educational resources. Our goal is to provide every reader with a tailored reading experience, whether in-store or through our online platform.</h6>
                </div>
            </section>

            <section className="team-section">
                <div className="content">
                    <h2 className="section-title">Get in Touch</h2>
                    <h6 className="section-text">Have any questions or need book recommendations? Reach out to us today! Our knowledgeable team is always happy to help you find your next great read, offer personalized recommendations, or assist with any inquiries you may have.</h6>
                    <h6 className="contact-info">Call Us: +91 12345 67890 | Email: contact@bookstore.com</h6>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
