import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookFinder from './components/BookFinder';
import BookDetails from './components/BookDetails'; 
import TopHeader from './components/TopHeader';
import Footer1 from './components/Footer1';
import Footer2 from './components/Footer2';
import ContactUs from './components/ContactUs';
import Faqs from './components/Faqs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Header from './components/Header'; 
import Cart from './components/Cart'; 
import Admin from './components/Admin';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addNewBook = (book) => {
    const existingItem = cartItems.find(item => item.id === book.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      const newBook = { ...book, quantity: 1 };
      setCartItems(prevItems => [...prevItems, newBook]);  
    }
  };

  const handleIncreaseQuantity = (book) => {
    setCartItems(cartItems.map(item =>
      item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (book) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === book.id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    setCartItems(updatedCartItems);
  };

  return (
    <Router>
      <TopHeader />
      <Header 
        cartItems={cartItems}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
      <Routes>
        <Route path="/" element={<BookFinder />} />
        <Route 
          path="/books/:id" 
          element={<BookDetails onAddToCart={addNewBook} />} 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
      <Cart
        cartItems={cartItems}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
      <Footer1 />
      <Footer2 />
    </Router>
  );
};


export default App;
