import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const BookItem = ({ book }) => {
  if (!book) return null;

  const { title, author_name, cover_i, seed, isbn } = book;
  const bookKey = seed ? seed.find(s => s.includes('/books/')) : '';
  const bookId = bookKey ? bookKey.split('/books/')[1] : '';
  const coverUrl = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : 'https://via.placeholder.com/150';

  return (
    <li className="book-item">
      <Link to={`books/${bookId}`}>
        <img src={coverUrl} alt={title} className="book-cover" />
        <div className="book-details">
          <h3>{title}</h3>
          <p>{author_name ? author_name.join(', ') : 'Unknown Author'}</p>
          <p>ISBN: {isbn}</p>
        </div>
        <button>VIEW DETAILS</button>
      </Link>
    </li>
  );
};

export default BookItem;
