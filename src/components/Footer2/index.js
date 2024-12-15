import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Footer2() {
  const options = [
    { label: 'Home /', link: '/' },
    { label: 'About Us /', link: '/about-us' },
    { label: 'FAQs /', link: '/faqs' },
    { label: 'Contacts /', link: '/contact-us' },
    { label: 'Privacy & Policy /', link: '/privacy-policy' },
    { label: 'Terms & Conditions', link: '/terms-conditions' }
  ];

  return (
    <div className="teasing-component">
      <div>
        <p>@ 2024 copyright:dcBookStore.com</p>
      </div>
      <div>
        {options.map((option, index) => (
          <Link to={option.link} key={index}>
            <span>{option.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Footer2;
