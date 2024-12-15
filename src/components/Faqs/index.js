import React, { useState } from 'react';
import './index.css';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What types of books do you offer?",
      answer: "We offer a wide variety of books, including fiction, non-fiction, academic textbooks, children's books, and much more."
    },
    {
      question: "How do I search for a book?",
      answer: "You can use our search bar at the top of the page to find books by title, author, or ISBN. You can also browse through different categories."
    },
    {
      question: "Do you offer e-books or audiobooks?",
      answer: "Yes, we offer a selection of e-books and audiobooks in addition to physical copies. You can find them in the digital books section."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location, but most orders are delivered within 5-7 business days. Expedited shipping options are also available."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase for unused and undamaged books. Please visit our Returns & Refunds page for more details."
    },
    {
      question: "Do you sell rare or out-of-print books?",
      answer: "Yes, we have a collection of rare, out-of-print, and antique books. You can explore them in the 'Rare Books' section of our website."
    },
    {
      question: "Can I pre-order upcoming releases?",
      answer: "Yes, we offer pre-orders for upcoming book releases. Check out the 'Coming Soon' section to see what’s available for pre-order."
    },
    {
      question: "Do you offer gift cards?",
      answer: "Yes, we offer both physical and digital gift cards. You can purchase them directly from our website for any amount."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your order on our website."
    },
    {
      question: "Can I sell my used books to the store?",
      answer: "Yes, we accept used books for resale. Please visit our 'Sell Books' page for more information on how to sell your books to us."
    },
  ];
  

  return (
    <div className="faq-section">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button 
              className={`faq-question ${activeIndex === index ? 'active' : ''}`} 
              onClick={() => toggleAnswer(index)}>
              {faq.question}
              <span className={`icon ${activeIndex === index ? 'rotate' : ''}`}>▼</span>
            </button>
            <div 
              className={`faq-answer ${activeIndex === index ? 'open' : ''}`}
              style={activeIndex === index ? {maxHeight: "200px"} : {maxHeight: "0"}}>
              <h3>{faq.answer}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
