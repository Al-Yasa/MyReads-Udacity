import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Link, Route } from "react-router-dom";
import './App.css'

class BooksApp extends React.Component {
  state = {
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

                <div className="book">

                  <div className="book-top">
                    <div className="book-cover" style={{ backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">To Kill a Mockingbird</div>
                  <div className="book-authors">Harper Lee</div>
                </div>

              </div>
            </React.Fragment>
          )} />

          <Route path="/reading" render={() => (
            <h2>Currently Reading</h2>
            // <BookList books={} />
          )} />

          <Route path="/toread" render={() => (
            <h2>Want to Read</h2>
            // <BookList books={} />
          )} />

          <Route path="/read" render={() => (
            <h2>Read</h2>
            // <BookList books={} />
          )} />

          <Route path="/search" render={() => (
            <h2>Search</h2>
            // <BookList books={} />
          )} />
        </div>

      </div>
    )
  }
}

export default BooksApp
