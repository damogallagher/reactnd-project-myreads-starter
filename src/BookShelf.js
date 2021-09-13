import React from "react";
import "./App.css";
import Book from "./Book";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

class BookShelf extends React.Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    bookSelected: PropTypes.func.isRequired,
  };

  render() {
    // destructure the required props
    const { shelfTitle, books, bookSelected } = this.props;

    let booksDisplay = "";
    if (!isEmpty(books)) {
      booksDisplay = (
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} bookSelected={bookSelected} />
            </li>
          ))}
        </ol>
      );
    } else {
      booksDisplay = (
        <div className="bookshelf-no-books">No books exist for this shelf</div>
      );
    }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">{booksDisplay}</div>
      </div>
    );
  }
}

export default BookShelf;
