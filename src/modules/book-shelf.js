import React, { Component } from 'react'
import { Book } from './'
import * as Constants from '../constants'
import * as BooksAPI from '../utils/BooksAPI'

export class BookShelf extends Component {

  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none:[],
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) =>
      this.setState({
        books: {
          currentlyReading: books.filter(book => book.shelf === Constants.shelfCategory.currentlyReading),
          wantToRead: books.filter(book => book.shelf === Constants.shelfCategory.wantToRead),
          read: books.filter(book => book.shelf === Constants.shelfCategory.read),
          none: books.filter(book => book.shelf === Constants.shelfCategory.none),
        }
      })
    )
  }

  updateBookCategory = (book, category) => {
    BooksAPI.update(book, category).then(() => {
      const prevCategory = book.shelf
      book.shelf = category
      this.setState(state => ({
        books: {
          currentlyReading: prevCategory === Constants.shelfCategory.currentlyReading ? state.books.currentlyReading.filter(b => b.id !== book.id) : category === Constants.shelfCategory.currentlyReading ? state.books.currentlyReading.concat(book) : this.state.books.currentlyReading,
          wantToRead: prevCategory === Constants.shelfCategory.wantToRead ? state.books.wantToRead.filter(b => b.id !== book.id) : category === Constants.shelfCategory.wantToRead ? state.books.wantToRead.concat(book) : this.state.books.wantToRead,
          read: prevCategory === Constants.shelfCategory.read ? state.books.read.filter(b => b.id !== book.id) : category === Constants.shelfCategory.read ? state.books.read.concat(book) : this.state.books.read,
          none: prevCategory === Constants.shelfCategory.none ? state.books.none.filter(b => b.id !== book.id) : category === Constants.shelfCategory.none ? state.books.none.concat(book) : this.state.books.none,
        }
      }))
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
        case Constants.shelfCategory.none:
          return books.none.map(book => mountBooks(book))
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
