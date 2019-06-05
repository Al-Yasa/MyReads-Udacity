import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => (
    <div className="book">
        <div className="book-top">
            {props.book.imageLinks ? (
                <div className="book-cover" style={{ backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
            ) : ( // if book has no image then give it a missing thumbnail image
                <div className="book-cover" style={{ backgroundImage: 'url(missingThumbnail.jpg)' }}></div>
            )}
            <div className="book-shelf-changer">
                <select
                    onChange={e => {
                        props.onUpdateShelf(props.book, e.target.value)
                    }}
                    value={props.book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        {props.book.authors &&
            props.book.authors.map((author, index) => (
                <div key={index} className="book-authors">{author}</div>
        ))}
    </div>
)

Book.propTypes= {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
}

export default Book;
