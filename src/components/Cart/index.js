import React, { useState } from 'react';
import './index.css';

const Cart = ({ cartItems, onIncreaseQuantity, onDecreaseQuantity, onAddNewBook }) => {
  const handleAddNewBook = (book) => {
    const existingBook = cartItems.find((item) => item.id === book.id);
    if (existingBook) {
      onIncreaseQuantity(book);
    } else {
      onAddNewBook(book);
    }
  };

  return (
    <div className="cart-dropdown">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <h4>{item.title}</h4>
              <h6 className='name'><strong>Author:</strong> {item.authors ? item.authors[0].name : 'Unknown'}</h6>
              <h6 className='published'><strong>Published By:</strong> {item.publishers ? item.publishers.join(', ') : 'N/A'}</h6>
              <div className="cart-item-controls">
                <button onClick={() => onDecreaseQuantity(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleAddNewBook(item)}>+</button> 
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
