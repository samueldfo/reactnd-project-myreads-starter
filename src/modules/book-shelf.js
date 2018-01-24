import React, { Component } from 'react'
import { Book } from './'
import * as Constants from '../constants'

export class BookShelf extends Component {

  render() {

    const { books } = this.props

    const mountBooks = (book) => <li key={book.id}><Book book={book} /></li>

    const showBooks = (title) => {
      switch (title) {
        case Constants.shelfState.currentlyReading:
          return books.currentlyReading.map(book => mountBooks(book))
        case Constants.shelfState.wantToRead:
          return books.wantToRead.map(book => mountBooks(book))
        case Constants.shelfState.read:
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
