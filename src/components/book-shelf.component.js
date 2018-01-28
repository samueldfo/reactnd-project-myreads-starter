import React from 'react'
import { Book } from './'
import PropTypes from 'prop-types'

export const BookShelf = ({ title, books, updateBookShelf }) => {
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book =>
              <li key={book.id}> <Book book={book} updateBookShelf={updateBookShelf} /></li>
            )}
          </ol>
        </div>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
}
