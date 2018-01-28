import React from 'react'
import { Route } from 'react-router-dom'
import { Home, Search } from './components'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

export class App extends React.Component {

  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      !books.error &&
        this.setState({ books })
    })
  }

  updateBookShelf = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then((result) => {
      !result.error &&
        this.setState(state => {
          const existingBook = state.books.find(b => b.id === book.id)
          if (existingBook) {
            existingBook.shelf = shelf
          } else {
            state.books.push(book)
          }
          return state.books
        })
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Home
            books={books}
            updateBookShelf={this.updateBookShelf}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <Search
            books={books}
            updateBookShelf={this.updateBookShelf}
          />
        )} />
      </div>
    )
  }

}
