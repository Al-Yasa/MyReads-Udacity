import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom';
import './App.css'
import Book from './components/Book';

class BooksApp extends React.PureComponent {
  state = {
    books: []
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      // console.log(books);
      this.setState({ books: books });
    });
  }

  updateShelf = (book, shelf) =>  {
    BooksAPI.update(book, shelf).then(() => {
      this.fetchBooks();
    });
  }

  render() {
    return (
      <div className="app">

        <div className="side-content">
          <div className="logo">
            <h1>B</h1>
          </div>
          <div className="menu">
            <h3>BROWSE</h3>
            <ul>
              <li><Link to="/">All Books</Link></li>
              <li><Link to="/reading">Currently Reading</Link></li>
              <li><Link to="/toread">Want to Read</Link></li>
              <li><Link to="/read">Read</Link></li>
              <li><Link to="/search">Search</Link></li>
            </ul>
          </div>
        </div>

        <div className="main-content">
          <Route exact path="/" render={() => (
            <React.Fragment>
              <h2>All Books</h2>
              <div className="bookShelf">
                {
                  this.state.books
                    .map((book, index) => (<Book book={book} key={index} onUpdateShelf={this.updateShelf} />))
                }
              </div>
            </React.Fragment>
          )} />
          <Route path="/reading" render={() => (
            <React.Fragment>
              <h2>Currently Reading</h2>
              <div className="bookShelf">
                {
                  this.state.books
                    .filter(book => book.shelf === 'currentlyReading')
                    .map((book, index) => (<Book book={book} key={index} onUpdateShelf={this.updateShelf} />))
                }
              </div>
            </React.Fragment>
          )} />
          <Route path="/toread" render={() => (
            <React.Fragment>
              <h2>Want to Read</h2>
              <div className="bookShelf">
                {
                  this.state.books
                    .filter(book => book.shelf === 'wantToRead')
                    .map((book, index) => (<Book book={book} key={index} onUpdateShelf={this.updateShelf} />))
                }
              </div>
            </React.Fragment>
          )} />
          <Route path="/read" render={() => (
            <React.Fragment>
              <h2>Read</h2>
              <div className="bookShelf">
                {
                  this.state.books
                    .filter(book => book.shelf === 'read')
                    .map((book, index) => (<Book book={book} key={index} onUpdateShelf={this.updateShelf} />))
                }
              </div>
            </React.Fragment>
          )} />
          <Route path="/search" render={() => (
            <React.Fragment>
              <h2>Search</h2>
            </React.Fragment>
          )} />
        </div>

      </div>
    )
  }
}

export default BooksApp
