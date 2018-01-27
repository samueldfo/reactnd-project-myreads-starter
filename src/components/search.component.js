import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import { Book } from './'

// possible API searchable terms https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

export class Search extends Component {

  state = {
    books: []
  }

  searchTerm = (term) => {
    BooksAPI.search(term).then((books) =>
      this.setState({
        books
      })
    )
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
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleOnChange(event)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => <li key={book.id}> <Book book={book} onUpdateBookCategory={this.updateBookCategory} /></li>)}
          </ol>
        </div>
      </div>
    )
  }

}
