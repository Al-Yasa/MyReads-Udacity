import React from 'react';
import { NavLink } from 'react-router-dom';

const SideMenu = () => (
    <div className="side-content">
    <div className="logo">
      <div className="overlay">
        <h1>MyReads</h1>
      </div>
    </div>
    <div className="menu">
      <h3>BROWSE</h3>
      <ul>
        <li><NavLink to="/" exact activeClassName="current" >All Books</NavLink></li>
        <li><NavLink to="/reading" activeClassName="current" >Currently Reading</NavLink></li>
        <li><NavLink to="/toread" activeClassName="current" >Want to Read</NavLink></li>
        <li><NavLink to="/read" activeClassName="current" >Read</NavLink></li>
        <li><NavLink to="/search" activeClassName="current" >Search</NavLink></li>
      </ul>
    </div>
  </div>
)

export default SideMenu;
