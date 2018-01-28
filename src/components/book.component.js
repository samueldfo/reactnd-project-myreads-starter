import React from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'

export const Book = ({ book, updateBookShelf }) => {
  const { title, authors, imageLinks, shelf } = book
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : ''})` }}></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={(event) => updateBookShelf(book, event.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{!isEmpty(authors) ? authors[0] : ''}</div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string.isRequired,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string
    })
  }),
  updateBookShelf: PropTypes.func.isRequired
}
