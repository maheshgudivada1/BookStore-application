import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import styled from 'styled-components'

const Admin = () => {
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        category: '',
        isbn: '',
        binding: '',
        publishingDate: '',
        publisher: '',
        edition: '',
        numberOfPages: '',
        language: '',
        image: null,
        price: '', // New field for price
    });
    const totalBooks = 1200;
    const totalUsers = 850;
    const totalOrders = 430;
    const revenue = 24500;
    const [postedBooks, setPostedBooks] = useState([]);

    // Load posted books from local storage on component mount
    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem('postedBooks')) || [];
        setPostedBooks(savedBooks);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookDetails({ ...bookDetails, [name]: value });
    };

    const handleImageChange = (e) => {
        setBookDetails({ ...bookDetails, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bookDetails.title || !bookDetails.price) {
            alert('Please provide both a book title and price.');
            return;
        }

        // Simulating API call to Open Library
        const bookTitle = bookDetails.title;
        const apiUrl = `https://openlibrary.org/search.json?title=${bookTitle}`;

        try {
            const response = await axios.get(apiUrl);

            if (response.data && response.data.docs.length > 0) {
                // Handle image as base64 data URL
                let imageUrl = '';
                if (bookDetails.image) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        imageUrl = reader.result;
                        const newBook = { ...bookDetails, image: imageUrl };
                        // Add the new book to the postedBooks list
                        const updatedBooks = [...postedBooks, newBook];
                        setPostedBooks(updatedBooks);
                        localStorage.setItem('postedBooks', JSON.stringify(updatedBooks));

                        // Reset form after posting
                        setBookDetails({
                            title: '',
                            author: '',
                            category: '',
                            isbn: '',
                            binding: '',
                            publishingDate: '',
                            publisher: '',
                            edition: '',
                            numberOfPages: '',
                            language: '',
                            image: null,
                            price: '', // Reset price
                        });
                    };
                    reader.readAsDataURL(bookDetails.image); // Convert image to base64
                }
            } else {
                alert('Book not found in the library database.');
            }
        } catch (error) {
            console.error('Error posting the book:', error);
        }
    };

    const handleDeleteBook = (bookIndex) => {
        const updatedBooks = postedBooks.filter((_, index) => index !== bookIndex);
        setPostedBooks(updatedBooks);
        localStorage.setItem('postedBooks', JSON.stringify(updatedBooks));
    };

    return (
        <>
            <div className='top-container'>
                <header className="headers1">
                    <div className="title">Bookstore Admin Dashboard</div>
                    <div className="user-info">
                        <img src="/assets/profile.png" alt="Admin" className='adminimage' style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                            border: '2px solid #000'
                        }} />
                        <span>Welcome, Admin</span>
                    </div>
                </header>
                <div className='profile-container'>
                    <BgImageContainer>

                    </BgImageContainer>

                    <ProfileInfo>
                        <div>
                            <ProfileImage src="/assets/profile.png" alt="Profile Image" />
                        </div>
                        <ProfileDetails>
                            <Name>
                                Mahesh <br />
                                Gudivada
                            </Name>
                        </ProfileDetails>
                        <Buttons>
                            <ButtonEditProfile>Edit Profile</ButtonEditProfile>
                            <ButtonMessage>Message</ButtonMessage>
                        </Buttons>
                    </ProfileInfo>
                    <hr />

                    {/* Navigation Buttons */}
                    <Row>
                        <ProfileOptions>
                            <ProfileButton>
                                <i className="fa fa-user-circle" aria-hidden="true"></i> Overview
                            </ProfileButton>
                            <ProfileButton>
                                <i className="fa fa-wifi" aria-hidden="true"></i> Activity
                            </ProfileButton>
                            <ProfileButton>
                                <i className="fa fa-users" aria-hidden="true"></i> Followers
                            </ProfileButton>
                            <ProfileButton>
                                <i className="fa fa-user-plus" aria-hidden="true"></i> Contacts
                            </ProfileButton>
                            <ProfileButton>
                                <i className="fa fa-th-large" aria-hidden="true"></i> Projects
                            </ProfileButton>
                            <ProfileButton>
                                <i className="fa fa-picture-o" aria-hidden="true"></i> 
                            </ProfileButton>
                        </ProfileOptions>
                    </Row>
                </div>
            </div>

            {/* Content Cards */}
            <div className="content-cards">
                <div className="card">
                    <h3>Total Books</h3>
                    <h4 className='price'>{totalBooks}</h4>
                    <div className="info">Books in Stock</div>
                </div>

                <div className="card">
                    <h3>Total Users</h3>
                    <h4>{totalUsers}</h4>
                    <div className="info">Active Users</div>
                </div>

                <div className="card">
                    <h3>Total Orders</h3>
                    <h4>{totalOrders}</h4>
                    <div className="info">Orders Processed</div>
                </div>

                <div className="card">
                    <h3>Revenue</h3>
                    <h4>${revenue}</h4>
                    <div className="info">Total Revenue</div>
                </div>
            </div>
        
            <div className="admin-panel">
                <h2>Add New Book to Bookstore</h2>
                <h5 className="admin-description">
                    Welcome to the Admin panel of the Bookstore Application. Here, you can manage the inventory of books.
                    Add new books, update existing ones, and delete books that are no longer available in the store.
                </h5>
                <form onSubmit={handleSubmit} className="book-form">
                    <div className="form-group">
                        <label>Book Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={bookDetails.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={bookDetails.author}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={bookDetails.category}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>ISBN:</label>
                        <input
                            type="text"
                            name="isbn"
                            value={bookDetails.isbn}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Binding:</label>
                        <input
                            type="text"
                            name="binding"
                            value={bookDetails.binding}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Publishing Date:</label>
                        <input
                            type="date"
                            name="publishingDate"
                            value={bookDetails.publishingDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Publisher:</label>
                        <input
                            type="text"
                            name="publisher"
                            value={bookDetails.publisher}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edition:</label>
                        <input
                            type="text"
                            name="edition"
                            value={bookDetails.edition}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of Pages:</label>
                        <input
                            type="number"
                            name="numberOfPages"
                            value={bookDetails.numberOfPages}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Language:</label>
                        <input
                            type="text"
                            name="language"
                            value={bookDetails.language}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={bookDetails.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Book Cover Image:</label>
                        <input type="file" onChange={handleImageChange} required />
                    </div>

                    <button type="submit" className="submit-btn">
                        Add Book
                    </button>
                </form>

                <h3>Posted Books in the Store</h3>
                <ul className="posted-books-list">
                    {postedBooks.length > 0 ? (
                        postedBooks.map((book, index) => (
                            <div key={index} className="book-details">
                                <div className="book-item">
                                    <img
                                        src={book.image || 'https://via.placeholder.com/150'}
                                        alt={book.title}
                                        className="book-cover"
                                    />
                                    <h4>Book: {book.title}</h4>
                                    <p style={{ color: "#fff" }}>Author: {book.author}</p>  {/* Author with white color */}
                                    <p style={{ color: "#fff" }}>Category: {book.category}</p>  {/* Category with white color */}
                                    <p style={{ color: "#fff" }}>ISBN: {book.isbn}</p>  {/* ISBN with white color */}
                                    <p style={{ color: "#fff" }}>Binding: {book.binding}</p>  {/* Binding with white color */}
                                    <p style={{ color: "#fff" }}>Publishing Date: {book.publishingDate}</p>  {/* Publishing Date with white color */}
                                    <p style={{ color: "#fff" }}>Publisher: {book.publisher}</p>  {/* Publisher with white color */}
                                    <p style={{ color: "#fff" }}>Edition: {book.edition}</p>  {/* Edition with white color */}
                                    <p style={{ color: "#fff" }}>Number of Pages: {book.numberOfPages}</p>  {/* Number of Pages with white color */}
                                    <p style={{ color: "#fff" }}>Language: {book.language}</p>  {/* Language with white color */}
                                    <p style={{ color: "#fff" }}>Price: ${book.price}</p>  {/* Price with white color */}
                                </div>
                                <button
                                    onClick={() => handleDeleteBook(index)}
                                    className="delete-btn"
                                >
                                    Delete Book
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No books added yet!</p>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Admin;


const Container = styled.div`
  padding: 20px;
  height:100%;
  background-color:#f7f7f7;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
export const ProfileOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row !important;
`;

export const ProfileButton = styled.button`
  margin: 5px;
  font-size: 16px;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  background-color: #fff;
  border: none;
  color: black;
  max-width: 130px;
  transition: color 0.3s, background-color 0.3s;

  i {
    margin-right: 8px;
  }

  &:hover {
    color: white; /* Change text color to white */
    background-color: #007bff; /* Optionally, change background color on hover */
  }
`;


export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const SectionTitle = styled.h6`
  font-size: 1.125rem;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InterestsContainer = styled.div`
  margin-top: 20px;
  background-color:#fff;
  border-radius:10px;
  padding:20px;
  .intrestsub {
    margin-bottom: 20px;
    display:flex;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button1 = styled.a`
  background-color: #fff;
  border: 1px solid gray;  /* Added border color */
  color: rgb(75, 68, 68);;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 768px) {
    padding: 4px 8px;
  }
`;

const BgImageContainer = styled.div`
  background-image: url('/assets/userProfileBGImage.png');
  background-size: cover;
  height: 300px;
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
 
  margin-top: -50px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: -30px;
  }
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border: 5px solid white;
  margin-left: 45px;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-left: 0;
  }
`;

const ProfileDetails = styled.div`
  margin-top: 15px;
  @media (max-width: 768px) {
    text-align: center;
    margin-top: 10px;
  }
`;

const Name = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: gray !important;
  padding-left: 10px;
  padding-top: 30px;
  font-size: 17px;
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding-top: 20px;
    padding-left: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  margin-left: 56%;
  @media (max-width: 768px) {
    margin-left: 0;
    justify-content: center;
  }
`;

const ButtonEditProfile = styled.button`
  padding: 7px 20px;
  margin-right: 10px;
  background-color: #007bff;
  border: none;
  width:190px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 5px 15px;
  }
`;

const ButtonMessage = styled.button`
  padding: 7px 20px;
  background-color: #28a745;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 5px 15px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button2 = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  width: 130px;
  font-size: 14px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }
`;

const OverviewContainer = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;