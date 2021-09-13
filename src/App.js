import React from "react";
import "./App.css";
import BookList from "./BookList";
import SearchPage from "./SearchPage";
import { Route } from "react-router-dom";
import { getAll, update } from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    getAll()
      .then((books) => {
        this.setState(() => ({
          books: books,
        }));
      })
      .catch(() => {
        this.setState(() => ({
          books: [],
        }));
      });
  }

  changeBookShelf = (newShelf, argBook) => {
    const booksArray = [...this.state.books];
    const indexToUpdate = booksArray.findIndex((book) => {
      return book.id === argBook.id;
    });

    let updatedBooksArray = booksArray;
    if (indexToUpdate !== -1) {
      updatedBooksArray = booksArray
        .slice(0, indexToUpdate)
        .concat(booksArray.slice(indexToUpdate + 1, booksArray.length));
    }
    argBook.shelf = newShelf;
    updatedBooksArray.push(argBook);

    update(argBook, newShelf).then((book) => {
      this.setState(() => ({
        books: updatedBooksArray,
      }));
    });
  };

  render() {
    // destructure the required values from the state
    const { books } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList books={books} bookSelected={this.changeBookShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage bookSelected={this.changeBookShelf} books={books} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
