import React from "react";
import "./App.css";
import PropTypes from "prop-types";

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    bookSelected: PropTypes.func.isRequired,
  };

  changeBookStatus = (e) => {
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
              width: book.width,
              height: book.height,
              backgroundImage: `url("${book.backgroundImage}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select defaultValue={book.status} onChange={this.changeBookStatus}>
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
          {book.authors &&
            book.authors.map((author) => <span key={author}>{author} </span>)}
        </div>
      </div>
    );
  }
}

export default Book;
