import React from 'react'
import { Link } from 'react-router-dom'
import { BookShelf } from './'
import PropTypes from 'prop-types'

const shelves = [
  { title: 'Currently Reading', id: 'currentlyReading' },
  { title: 'Want to Read', id: 'wantToRead' },
  { title: 'Read', id: 'read' }
]

export const Home = ({ books, updateBookShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map(shelf =>
          <BookShelf
            key={shelf.id}
            title={shelf.title}
            books={books.filter(book => book.shelf === shelf.id)}
            updateBookShelf={updateBookShelf}
          />)}
      </div>
      <div className='open-search'>
        <Link to='/search' className='open-search'> Add a book </Link>
      </div>
    </div>
  )
}

Home.propTypes = {
  books: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
}

