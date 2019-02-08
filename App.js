import React, { Component } from 'react'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  updateShelf = (book, shelfName) => {
    const bookFromState = this.state.books.find(b => b.id === book.id);
    if (bookFromState) {
      // update existing
      bookFromState.shelf = shelfName;
      BooksAPI.update(book, shelfName)
      .then(this.setState(currentState => ({
        books: currentState.books
      })))
    } else {
      // add new one
        book.shelf = shelfName;
        BooksAPI.update(book, shelfName)
        .then(this.setState(prevState => ({
          books: prevState.books.concat(book)
      })))
    }
  };

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks
          books={this.state.books}
          onUpdateShelf={this.updateShelf}
          />
        )} />
        <Route exact path='/search' render={() => (
          <SearchBooks
          books={this.state.books}
          onUpdateShelf={this.updateShelf}
          />
        )} />
      </div>
    )
  }
}
export default BooksApp
