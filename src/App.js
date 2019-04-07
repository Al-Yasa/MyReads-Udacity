import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SideMenu from './components/SideMenu'
import Loader from './components/Loader'
import BookShelf from './components/BookShelf'
import Search from './components/Search'

class BooksApp extends React.PureComponent {
  state = {
    books: []
  }

  componentWillMount() {
    this.fetchBooks();
  }

  showLoader = () => {
    document.querySelector('.loader').style.display = 'flex';
  }

  hideLoader = () => {
    document.querySelector('.loader').style.display = 'none';
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      this.hideLoader();
      // console.log(this.state.books);
    });
  }

  updateShelf = (book, shelf) =>  {
    this.showLoader();
    BooksAPI.update(book, shelf).then(() => {
      this.fetchBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <SideMenu />
        <div className="main-content">
          <Route exact path="/" render={() => (
            <React.Fragment>
              <BookShelf title='Currently Reading' shelf='currentlyReading' books={this.state.books} onUpdateShelf={this.updateShelf} />
              <BookShelf title='Want to Read' shelf='wantToRead' books={this.state.books} onUpdateShelf={this.updateShelf} />
              <BookShelf title='Read' shelf='read' books={this.state.books} onUpdateShelf={this.updateShelf} />
            </React.Fragment>
          )} />
          <Route path="/reading" render={() => (
            <BookShelf title='Currently Reading' shelf='currentlyReading' books={this.state.books} onUpdateShelf={this.updateShelf} />
          )} />
          <Route path="/toread" render={() => (
            <BookShelf title='Want to Read' shelf='wantToRead' books={this.state.books} onUpdateShelf={this.updateShelf} />
          )} />
          <Route path="/read" render={() => (
            <BookShelf title='Read' shelf='read' books={this.state.books} onUpdateShelf={this.updateShelf} />
          )} />
          <Route path="/search" render={() => (
            <Search ownedBooks={this.state.books} onUpdateShelf={this.updateShelf} />
          )} />
          <Loader />
        </div>
      </div>
    )
  }
}

export default BooksApp
