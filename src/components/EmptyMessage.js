import React from 'react';
import { Link } from 'react-router-dom';

const EmptyMessage = (props) => (
    <React.Fragment>
        <h2>{props.title}</h2>
        <div className="bookShelf">
            <p className="empty">Your bookshelf is empty</p>
            <p className="empty">Get started by searching for books <Link to="/search">online!</Link></p>
        </div>
    </React.Fragment>
)

export default EmptyMessage;
