import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import './App.css'
import SideMenu from './components/SideMenu';
import BookShelf from './components/BookShelf';

class BooksApp extends React.PureComponent {
  state = {
    books: []
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      console.log(this.state.books);
    });
  }

  updateShelf = (book, shelf) =>  {
    BooksAPI.update(book, shelf).then(() => this.fetchBooks());
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
