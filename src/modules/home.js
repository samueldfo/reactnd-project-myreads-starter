import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BookShelf } from './'
import * as BooksAPI from '../utils/BooksAPI'
import * as Constants from '../constants'

export class Home extends Component {

  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: [],
    }
  }

  componentDidMount() {
    
    BooksAPI.getAll().then((books) =>
      this.setState({
        books: {
          currentlyReading: books.filter(book => book.shelf === Constants.shelfState.currentlyReading),
          wantToRead: books.filter(book => book.shelf === Constants.shelfState.wantToRead),
          read: books.filter(book => book.shelf === Constants.shelfState.read),
          none: books.filter(book => book.shelf === Constants.shelfState.none),
        }
      })
    )
  }

  render() {

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf titles={Constants.shelfTitle} books={this.state.books} />
            </div>
          </div>
          <div className='open-search'>
            <Link to='/search' className='open-search'> Add a book </Link>
          </div>
        </div>
      </div>
    )
  }

}
