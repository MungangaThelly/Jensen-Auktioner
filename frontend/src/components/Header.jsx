import React from 'react';
import "./Header.module.css"
import '../pages/SearchPage';
import '../pages/Login';
import '../pages/Register';
import './AuctionList';


const Header = () => {
  return (
    <header>
      <div className="Logo"><h1><strong>j:aK</strong></h1></div>
      <nav>
        <ul>
          <li><a href="/">Hem</a></li>
          <li><a href="/AuctionList">Auktioner</a></li>
          <li><a href="/create">Skapa:auktion</a></li>
          <li><a href='/search'>Sök</a></li>
          <li><a href="/login">Logga:in</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header