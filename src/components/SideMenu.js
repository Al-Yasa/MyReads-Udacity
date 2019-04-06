import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => (
    <div className="side-content">
    <div className="logo">
      <h1>B</h1>
    </div>
    <div className="menu">
      <h3>BROWSE</h3>
      <ul>
        <li><Link to="/">All Books</Link></li>
        <li><Link to="/reading">Currently Reading</Link></li>
        <li><Link to="/toread">Want to Read</Link></li>
        <li><Link to="/read">Read</Link></li>
        <li><Link to="/search">Search</Link></li>
      </ul>
    </div>
  </div>
)

export default SideMenu;
