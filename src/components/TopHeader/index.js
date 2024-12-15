import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';  // Use the solid version
import '@fortawesome/fontawesome-free/css/all.min.css';


function TopHeader() {
    const leftOptions = [
        { label: '+123-456-7890', link: 'tel:+1234567890', icon: 'fa fa-phone' },
        { label: 'dcbookstore.com', link: 'https://dcbookstore.com/', icon: 'fa fa-globe' },
      ];
    
      const rightOptions = [
        { label: 'Login/SignUp', link: '/login', icon: '' },
        { label: 'Blog', link: 'https://www.dcbooks.com/', icon: 'fa fa-blog' },
        {label:"Admin",link:"/admin",icon:'fa fa-user'},
        { label: 'Contact', link: 'https://dcbookstore.com/contactus', icon: 'fa fa-envelope' },
        { label: '', link: 'https://facebook.com', icon: 'fab fa-facebook' },
        { label: '', link: 'https://linkedin.com', icon: 'fab fa-linkedin' },
        { label: '', link: 'https://twitter.com', icon: 'fab fa-twitter' },
        
      ];
    

  return (
    <div className="top-header-container">
      <div className="left-options">
        {leftOptions.map((option, index) => (
          <a href={option.link} key={index} className="icon-link" target="_blank" rel="noopener noreferrer">
            <span className="icon-label">
              <i className={option.icon}></i> {option.label}
            </span>
          </a>
        ))}
      </div>

      <div className="right-options">
        {rightOptions.map((option, index) => (
          <Link to={option.link} key={index} className="icon-link">
            <span className="icon-label">
              <i className={option.icon}></i> {option.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopHeader;