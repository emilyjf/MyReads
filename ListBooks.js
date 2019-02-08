import React from 'react';
import PropTypes from 'prop-types'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './Book'

const shelves = [
  {
    key: 'currentlyReading',
    name: 'Currently Reading'
  },
  {
    key: 'wantToRead',
    name: 'Want To Read'
  },
  {
    key: 'read',
    name: 'Read'
  }
];

//class ListBooks extends Component {
const ListBooks = (props) => {
    
        const { books, onUpdateShelf } = props

        function getBooksForShelf(shelfKey) {
          return books.filter(book => book.shelf === shelfKey);
        }

        return(
            <div className="app">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    { shelves.map((shelf) => (
                      <div key={shelf.key} className="bookshelf">
                        <h2 className="bookshelf-title">{shelf.name}</h2>
                        { getBooksForShelf(shelf.key).length === 0 ? (
                          <div>
                            <h4>No books in this shelf</h4>
                          </div>
                        ) : (
                          <div className="bookshelf-books">
                            <ol className="books-grid">
                              <li>
                                { getBooksForShelf(shelf.key).map((book) => (
                                 <Book key={book.id}
                                     book={book}
                                     updateShelf={onUpdateShelf}/>
                                  ))}
                              </li>
                            </ol>
                          </div> 
                        )}
                      </div>
                    )) }
                  </div>
                </div>
                  <Link
                      to='/search'
                      className="open-search">
                  </Link>
              </div>
              
            </div>
        )
    
}

ListBooks.propTypes = {
       books: PropTypes.array.isRequired,
       onUpdateShelf: PropTypes.func.isRequired
}

export default ListBooks