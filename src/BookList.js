import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import BookStatus from "./models/BookStatus";
import PropTypes from "prop-types";

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    bookSelected: PropTypes.func.isRequired,
  };

  render() {
    // destructure the required values from the props
    const { bookSelected } = this.props;

    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    this.props.books.forEach((book) => {
      if (book.status === BookStatus.CURRENTLY_READING) {
        currentlyReading.push(book);
      } else if (book.status === BookStatus.WANT_TO_READ) {
        wantToRead.push(book);
      } else if (book.status === BookStatus.READ) {
        read.push(book);
      }
    });

    const shelves = [
      { title: "Currently Reading", data: currentlyReading },
      { title: "Want to Read", data: wantToRead },
      { title: "Read", data: read },
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <p>
            <Link to="/search">Go to search</Link>
          </p>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <BookShelf
                key={shelf.title}
                shelfTitle={shelf.title}
                books={shelf.data}
                bookSelected={bookSelected}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BookList;
