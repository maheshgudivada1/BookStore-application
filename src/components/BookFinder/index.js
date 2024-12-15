import React, { Component } from 'react';
import Header from '../Header';
import BookItem from '../BookItem';
import './index.css';
import ControlledCarousel from '../ControlledCarousel';

class BookFinder extends Component {
  state = {
    booksList: [],
    filteredBooks: [],
    isbnInput: 'harp',
    isLoading: false,
    error: null,
    authorsFilter: [],
    yearsFilter: [],
    genresFilter: [],
    languagesFilter: [],
    selectedAuthor: '',
    selectedYear: '',
    selectedGenre: '',
    selectedLanguage: '',
    showHeader: false, 
  };

  componentDidMount() {
    this.fetchBooks('harp');
  }

  fetchBooks = async (searchTerm = '') => {
    this.setState({ isLoading: true, error: null });

    try {
      const query = searchTerm ? `title=${searchTerm}` : '';
      const response = await fetch(`https://openlibrary.org/search.json?${query}`);
      const data = await response.json();

      if (data && data.docs && Array.isArray(data.docs)) {
        const booksList = data.docs.filter(book => book.title);
        this.setState({
          booksList,
          filteredBooks: booksList,
          isLoading: false,
        });
        this.initializeFilters(booksList);
      } else {
        this.setState({ error: 'No books found.', isLoading: false });
      }
    } catch (error) {
      this.setState({ error: 'Failed to fetch books.', isLoading: false });
    }
  };

  handleSearch = (searchInput) => {
    if (searchInput.trim() === '') {
      this.setState({ isbnInput: '', booksList: [], filteredBooks: [] });
    } else {
      this.setState({ isbnInput: searchInput }, () => {
        this.fetchBooks(searchInput);
      });
    }
  };

  onChangeIsbnInput = async (event) => {
    const isbnInput = event.target.value;
    this.setState({ isbnInput, isLoading: true });

    if (isbnInput.trim() === '') {
      this.setState({ booksList: [], filteredBooks: [], isLoading: false });
      return;
    }

    try {
      const response = await fetch(`https://openlibrary.org/search.json?isbn=${isbnInput}`);
      const data = await response.json();
      const booksList = data.docs.filter(book => book.title);

      this.setState({ booksList, filteredBooks: booksList, isLoading: false });
      this.initializeFilters(booksList);
    } catch (error) {
      this.setState({ error: 'Failed to fetch books.', isLoading: false });
    }
  };

  initializeFilters = (booksList) => {
    const authors = [...new Set(booksList.flatMap(book => book.author_name || []))];
    const years = [...new Set(booksList.map(book => book.first_publish_year))];
    const genres = [...new Set(booksList.flatMap(book => book.subject || []))];
    const languages = [...new Set(booksList.map(book => book.language ? book.language[0] : 'Unknown'))];

    this.setState({
      authorsFilter: authors,
      yearsFilter: years,
      genresFilter: genres,
      languagesFilter: languages
    });
  };

  applyFilters = () => {
    const { booksList, selectedAuthor, selectedYear, selectedGenre, selectedLanguage } = this.state;
    let filteredBooks = booksList;

    if (selectedAuthor) filteredBooks = filteredBooks.filter(book => book.author_name?.includes(selectedAuthor));
    if (selectedYear) filteredBooks = filteredBooks.filter(book => book.first_publish_year === parseInt(selectedYear));
    if (selectedGenre) filteredBooks = filteredBooks.filter(book => book.subject?.includes(selectedGenre));
    if (selectedLanguage) filteredBooks = filteredBooks.filter(book => book.language?.includes(selectedLanguage));

    this.setState({ filteredBooks });
  };

  handleFilterChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.applyFilters);
  };

  render() {
    const { filteredBooks, isbnInput, isLoading, error, authorsFilter, yearsFilter, genresFilter, languagesFilter, showHeader } = this.state;

    return (
      <>
        {/* Conditionally render the Header based on showHeader */}
        {showHeader && <Header onSearch={this.handleSearch} />}
        
        <ControlledCarousel />
        <div className="book-finder-container">
          <div className="filters-container">
            <select name="selectedAuthor" onChange={this.handleFilterChange}>
              <option value="">Select Author</option>
              {authorsFilter.map((author, index) => (
                <option key={index} value={author}>{author}</option>
              ))}
            </select>

            <select name="selectedYear" onChange={this.handleFilterChange}>
              <option value="">Select Year</option>
              {yearsFilter.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>

            <select name="selectedGenre" onChange={this.handleFilterChange}>
              <option value="">Select Genre</option>
              {genresFilter.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>

            <select name="selectedLanguage" onChange={this.handleFilterChange}>
              <option value="">Select Language</option>
              {languagesFilter.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul className="books-list">
              {filteredBooks.map(book => (
                <BookItem key={book.key} book={book} />
              ))}
            </ul>
          )}
        </div>
      </>
    );
  }
}

export default BookFinder;
