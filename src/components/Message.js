import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class EmptyMessage extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        ownedBooks: PropTypes.arrayOf(PropTypes.object)
    }

    render() {
        if (this.props.title === 'noResults') {
            return  (
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
            )
        } else if (this.props.title === 'search') {
            return (
                <React.Fragment>
                    <p className="empty">You have {this.props.ownedBooks.length} book{this.props.ownedBooks.length === 1 ? '' : 's'} in your bookshelf</p>
                    <p className="empty">Get more by searching above! or check your bookshelf <Link to="/">here</Link></p>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <h2>{this.props.title}</h2>
                    <div className="bookShelf">
                        <p className="empty">Your bookshelf is empty</p>
                        <p className="empty">Get started by searching for books <Link to="/search">online!</Link></p>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default EmptyMessage;
