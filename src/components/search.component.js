import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import { Book } from './'
import { Debounce } from 'react-throttle'
import PropTypes from 'prop-types'

// possible API searchable terms https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

export class Search extends Component {

  state = {
    books: []
  }

  searchTerm = (term) => {
    BooksAPI.search(term).then((booksResult) => {
      if (!booksResult.error && booksResult.length > 0) {
        this.setState({
          books: booksResult.map(bookResult => {
            const bk = this.props.books.find(book => bookResult.id === book.id)
            bookResult.shelf = bk ? bk.shelf : 'none'
            return bookResult
          })
        })
      } else {
        this.setState({ books: [] })
      }
    })
  }

  handleOnChange = (event) => {
    event.target.value ? this.searchTerm(event.target.value) : this.setState({ books: [] })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleOnChange(event)} />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id}> <Book book={book} updateBookShelf={this.props.updateBookShelf} /></li>
            )}
          </ol>
        </div>
      </div>
    )
  }

}

Search.propTypes = {
  books: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
}
