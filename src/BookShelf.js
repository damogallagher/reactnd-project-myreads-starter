import React from "react";
import "./App.css";
import Book from "./Book";
import PropTypes from "prop-types";

class BookShelf extends React.Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    bookSelected: PropTypes.func.isRequired,
  };

  render() {
    // destructure the required props
    const { shelfTitle, books, bookSelected } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
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

export default BookShelf;
