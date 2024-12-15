import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import { Rings } from 'react-loader-spinner';

const BookDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const response = await fetch(`https://openlibrary.org/books/${id}.json`);
      const data = await response.json();
      setBook(data);
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return (
      <div className="loading-container">
        <Rings
          height="80"
          width="80"
          color="#4fa94d"
          radius="6"
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }

  const getDescription = (description) => {
    if (typeof description === 'string') {
      return description;
    } else if (typeof description === 'object' && description.value) {
      return description.value;
    } else {
      return 'No description available.';
    }
  };

  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/${id}/${book.cover_i}-L.jpg` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR824cWY60_5KxvR09RnwNBpj7fRKA6iqrBdQ&s';

  return (
    <>
 
      <div className="book-details">
        <div className="book-cover-container">
          <img src={coverUrl} alt={book.title} className="book-cover" />
        </div>
        <h1>{book.title}</h1>
        <p><strong>Category:</strong> {book.subjects ? book.subjects.join(', ') : 'N/A'}</p>
        <p><strong>Binding:</strong> {book.binding ? book.binding : 'N/A'}</p>
        <p><strong>Publishing Date:</strong> {book.publish_date ? book.publish_date : 'N/A'}</p>
        <p><strong>Publisher:</strong> {book.publishers ? book.publishers.join(', ') : 'MAMBAZHAM'}</p>
        <p><strong>Number of Pages:</strong> {book.number_of_pages ? book.number_of_pages : 'N/A'}</p>
        <p><strong>Description:</strong> {getDescription(book.description)}</p>

        <div className="add-to-cart">
          <button className="add-to-cart-btn" onClick={() => onAddToCart(book)}>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
