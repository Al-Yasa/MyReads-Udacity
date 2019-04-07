import React from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import Message from './Message'
import PropTypes from 'prop-types'

class Search extends React.PureComponent {
    static propTypes = {
        query: PropTypes.number,
        searchedBooks: PropTypes.array,
        noResult: PropTypes.bool,

        ownedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

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
                        this.props.ownedBooks.forEach((ownedBook) => {
                            if (book.id === ownedBook.id) {
                                book.shelf = ownedBook.shelf;
                            }
                            if (!book.shelf) {
                                book.shelf = 'none';
                            }
                        });
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
                {this.state.noResult && (<Message title="noResults" />)}
                {!this.state.query && (<Message title="search" ownedBooks={this.props.ownedBooks} />)}
            </div>
        </React.Fragment>
    )
  }
}

export default Search
