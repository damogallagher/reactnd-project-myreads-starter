import React from "react";
import "./App.css";
import PropTypes from "prop-types";

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    bookSelected: PropTypes.func.isRequired,
  };

  changeBookShelf = (e) => {
    e.preventDefault();
    const newStatus = e.target.value;
    this.props.bookSelected(newStatus, this.props.book);
  };

  render() {
    // destructure the required props
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          />

          <div className="book-shelf-changer">
            <select defaultValue={book.shelf} onChange={this.changeBookShelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {Array.isArray(book.authors) ? book.authors.join(", ") : ""}
        </div>
      </div>
    );
  }
}

export default Book;
