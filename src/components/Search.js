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
        noResult: false,
        timeId: null
    }

    updateShelf = (book, shelf) =>  {
        this.props.onUpdateShelf(book, shelf);
        book.shelf = shelf;
    };

    updateQuery = (e) => {
        this.setState({ query: e.target.value }, this.debounce(() => {
            this.searchBooks(this.state.query.trim());
        }, 500));
    };

    searchBooks = (query) => {
        if (this.state.query) {
            BooksAPI.search(query).then(books => {
                if (books.length > 0) {
                    let trimmedBooks = books.map(book => { // we need to modify the books we get from the API
                        this.props.ownedBooks.forEach((ownedBook) => { // loop through our already owned books
                            if (book.id === ownedBook.id) { // if we own the book we searched for then give it the same shelf as our owned book
                                book.shelf = ownedBook.shelf;
                            }
                            if (!book.shelf) { // if we don't own the book we searched for then give it a shelf of 'none'
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
    };

    debounce = (func, wait) => {
        return (...args) => {
            if (this.state.timeId) {clearTimeout(this.state.timeId);}
            this.setState(state => {
                state.timeId = setTimeout(() => {
                    func(...args);
                }, wait)
            })
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="searchHeader">
                    <h2>Search</h2>
                    <input
                        type="text"
                        placeholder="Search all books"
                        value={this.state.query}
                        onChange={(e) => this.updateQuery(e)}
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
