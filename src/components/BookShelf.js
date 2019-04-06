import React from 'react';
import Book from './Book';
import EmptyMessage from './EmptyMessage';

class BookShelf extends React.PureComponent {

  updateShelf = (book, shelf) =>  {
    this.props.onUpdateShelf(book, shelf);
  }

  render() {
    if (this.props.books.length) {
      if (this.props.books.filter(book => book.shelf === this.props.shelf).length) {
        return (
          <React.Fragment>
            <h2>{this.props.title}</h2>
            <div className="bookShelf">
              { this.props.books
                  .filter(book => book.shelf === this.props.shelf)
                  .map((book, index) => (<Book book={book} key={index} onUpdateShelf={this.updateShelf} />))
              }
            </div>
          </React.Fragment>
        )
      } else {
        return (<EmptyMessage title={this.props.title} />)
      }
    } else {
      return (<EmptyMessage title={this.props.title} />)
    }
  }
}

export default BookShelf