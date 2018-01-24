import React, { Component } from 'react'

export class Book extends Component {

  state = {
    selected: this.props.book.shelf
  };

  handleChange = (event) => {
    this.setState({ selected: event.target.value })
    this.props.onUpdateBookCategory(this.props.book, event.target.value)
  }

  render() {
    const { book } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.selected} onChange={(event) => this.handleChange(event)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    )
  }
}
