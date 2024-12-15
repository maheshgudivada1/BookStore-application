import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './index.css';
import Cart from '../Cart'; 

const Header = ({ cartItems = [], onIncreaseQuantity, onDecreaseQuantity }) => { 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 
  const [showCart, setShowCart] = useState(false); 
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCartClick = () => {
    setShowCart(!showCart); 
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    console.log("Search query: ", e.target.value);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img 
              src="https://images-platform.99static.com//X1qlArSqZKzOCllam27j7U6AaHA=/67x1137:930x2000/fit-in/500x500/99designs-contests-attachments/150/150226/attachment_150226770" 
              alt="Website Logo" 
            />
          </Link>
        </div>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for books..." 
            className="search-input"
            value={searchInput}
            onChange={handleSearchChange} 
          />
        </div>

        <div className="cart-icon-container" onClick={handleCartClick}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{cartItems.length}</span>
        </div>

        {showCart && <Cart cartItems={cartItems} onIncreaseQuantity={onIncreaseQuantity} onDecreaseQuantity={onDecreaseQuantity} />}
      </div>
    </header>
  );
};

export default Header;
