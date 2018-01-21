import React from 'react'
import { Route } from 'react-router-dom'
import { BooksAPI } from './datasources'
import { Home, Search } from './modules'
import './App.css'

export class App extends React.Component {
  
  render() {

    return (
      <div>
        <Route exact path='/' render={() => (
          <Home />
        )} />
        <Route path='/search' render={({ history }) => (
          <Search
            onSearchBook={(book) => {
              this.searchBook(book)
              history.push('/')
            }} />
        )} />
      </div>
    )
  }
}
