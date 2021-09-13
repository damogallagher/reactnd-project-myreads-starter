import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";
import BookShelfStatus from "./models/BookShelfStatus";
import isEmpty from "lodash/isEmpty";

class SearchPage extends React.Component {
  static propTypes = {
    bookSelected: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
  };

  state = {
    titleOrAuthor: "",
    books: [],
  };

  componentDidMount() {
    const savedTitleOrAuthor = localStorage.getItem("titleOrAuthor");
    if (!isEmpty(savedTitleOrAuthor)) {
      this.setState(() => ({
        titleOrAuthor: savedTitleOrAuthor,
      }));
      this.updateQuery(savedTitleOrAuthor);
    }
  }

  getCurrentShelf = (argBook) => {
    const bookArray = this.props.books.filter((book) => {
      return book.id === argBook.id;
    });

    if (isEmpty(bookArray)) {
      return BookShelfStatus.NONE;
    }

    const shelf = bookArray[0].shelf;
    if (isEmpty(shelf)) {
      return BookShelfStatus.NONE;
    }
    return shelf;
  };

  updateQuery = (titleOrAuthor) => {
    this.setState(() => ({
      titleOrAuthor: titleOrAuthor,
    }));
    localStorage.setItem("titleOrAuthor", titleOrAuthor);

    let booksArray = [];
    if (!isEmpty(titleOrAuthor)) {
      search(titleOrAuthor)
        .then((books) => {
          if (!isEmpty(books) && isEmpty(books.error)) {
            books.forEach((book) => {
              //Only include books with image links
              if (book.imageLinks) {
                const currentBookShelf = this.getCurrentShelf(book);
                book.shelf = currentBookShelf;
                booksArray.push(book);
              }
            });
          } else {
            booksArray = [];
          }
          this.setState(() => ({
            books: booksArray,
          }));
        })
        .catch(() => {
          this.setState(() => ({
            books: [],
          }));
        });
    } else {
      this.setState(() => ({
        books: [],
      }));
    }
  };

  render() {
    // destructure titleOrAuthor from the state
    const { titleOrAuthor, books } = this.state;
    // destructure titleOrAuthor from the props
    const { bookSelected } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={titleOrAuthor}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <p>
            <Link to="/">Go to home</Link>
          </p>
          <ol className="books-grid">
            {books &&
              books.map((book) => (
                <li key={book.id}>
                  <Book book={book} bookSelected={bookSelected} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
