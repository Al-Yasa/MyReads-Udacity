import React from 'react';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom';

class Search extends React.PureComponent {
    state = {
        query: '',
        searchedBooks: [],
        noResult: false
    }

    updateShelf = (book, shelf) =>  {
        this.props.onUpdateShelf(book, shelf);
        book.shelf = shelf;
    }

    updateQuery = (query) => {
        this.setState({ query: query }, () => {
            this.searchBooks(this.state.query.trim());
        });
    }

    searchBooks = (query) => {
        if (this.state.query) {
            BooksAPI.search(query).then(books => {
                if (books.length > 0) {
                    let trimmedBooks = books.map(book => {
                        this.props.ownedBooks.map(ownedBook => {
                            if (book.id === ownedBook.id) {
                                book.shelf = ownedBook.shelf;
                            }
                            if (!book.shelf) {
                                book.shelf = 'none';
                            }
                        })
                        return book;
                    })
                    this.setState({ searchedBooks: trimmedBooks, noResult: false })
                } else {
                    this.setState({ searchedBooks: [], noResult: true })
                }
            })
        } else {
            this.setState({ query: '', searchedBooks: [], noResult: false });
        }
    }

  render() {
    return (
        <React.Fragment>
            <div className="searchHeader">
                <h2>Search</h2>
                <input
                    type="text"
                    placeholder="Search all books"
                    value={this.state.query}
                    onChange={(e) => this.updateQuery(e.target.value)}
                />
            </div>
            <div className="bookShelf">
                {(this.state.searchedBooks && this.state.query) &&
                    this.state.searchedBooks.map(book => (<Book book={book} key={book.id} onUpdateShelf={this.updateShelf} />))
                }
                {this.state.noResult && (
                    <React.Fragment>
                        <div className="warning">Your search did not match any books.</div>
                        <div className="suggestions">Suggestions:
                            <ul>
                                <li>Make sure all words are spelled correctly.</li>
                                <li>Try more general keywords.</li>
                                <li>Try different keywords.</li>
                            </ul>
                        </div>
                    </React.Fragment>
                )}
                {!this.state.query && (
                    <React.Fragment>
                        <p className="empty">You have {this.props.ownedBooks.length} book{this.props.ownedBooks.length === 1 ? '' : 's'} in your bookshelf</p>
                        <p className="empty">Get more by searching above! or check your bookshelf <Link to="/">here</Link></p>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    )
  }
}

export default Search
