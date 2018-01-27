import React from 'react'
import { Link } from 'react-router-dom'
import { BookShelf } from './'

export const Home = () => {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div/><BookShelf />
        </div>
        <div className='open-search'>
          <Link to='/search' className='open-search'> Add a book </Link>
        </div>
      </div>
    </div>
  )
}
