import React from 'react'
import Book from './Book'
import Message from './Message'
import PropTypes from 'prop-types'

class BookShelf extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    shelf: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read']).isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  updateShelf = (book, shelf) =>  {
    this.props.onUpdateShelf(book, shelf);
  };

  render() {
    if (this.props.books.length) {
      if (this.props.books.filter(book => book.shelf === this.props.shelf).length) {
        return (
          <React.Fragment>
            <h2>{this.props.title}</h2>
            <div className="bookShelf">
              {this.props.books
                  .filter(book => book.shelf === this.props.shelf)
                  .map((book) => (<Book book={book} key={book.id} onUpdateShelf={this.updateShelf} />))
              }
            </div>
          </React.Fragment>
        )
      } else {
        return (<Message title={this.props.title} />)
      }
    } else {
      return (<Message title={this.props.title} />)
    }
  }
}

export default BookShelf