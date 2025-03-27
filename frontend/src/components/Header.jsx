import React from 'react';
import "./Header.module.css"
import './Search'

const Header = () => {
  return (
    <header>
      <div className="Logo"><h1>Jensen Auktion</h1></div>
      <nav>
        <ul>
          <li><a href="/">Hem</a></li>
          <li><a href="/auctions">Auktioner</a></li>
          <li><a href="/create">Skapa auktion</a></li>
          <li><a href="/account">Konto</a></li>
          <li><a href='/search'>Sök</a></li>
        </ul>
      </nav>
      <button className="login-btn">Logga in</button>
    </header>
  )
}

export default Header