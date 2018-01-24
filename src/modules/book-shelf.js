import React, { Component } from 'react'
import { Book } from './'
import * as Constants from '../constants'
import * as BooksAPI from '../utils/BooksAPI'

export class BookShelf extends Component {

  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) =>
      this.setState({
        books: {
          currentlyReading: books.filter(book => book.shelf === Constants.shelfCategory.currentlyReading),
          wantToRead: books.filter(book => book.shelf === Constants.shelfCategory.wantToRead),
          read: books.filter(book => book.shelf === Constants.shelfCategory.read),
        }
      })
    )
  }

  updateBookCategory = (book, category) => {
    BooksAPI.update(book, category).then((updatedShelves) => {
      // implemet logic to update
    })
  }

  render() {

    const { books } = this.state

    const mountBooks = (book) => <li key={book.id}> <Book book={book} onUpdateBookCategory={this.updateBookCategory} /></li>

    const showBooks = (title) => {
      switch (title) {
        case Constants.shelfCategory.currentlyReading:
          return books.currentlyReading.map(book => mountBooks(book))
        case Constants.shelfCategory.wantToRead:
          return books.wantToRead.map(book => mountBooks(book))
        case Constants.shelfCategory.read:
          return books.read.map(book => mountBooks(book))
        default:
          return
      }
    }

    return (
      <div>
        {Object.entries(Constants.shelfTitle).map(([title, key]) =>
          <div key={key} className="bookshelf">
            <h2 className="bookshelf-title">{key}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {showBooks(title)}
              </ol>
            </div>
          </div>
        )}
      </div>
    )
  }

}
