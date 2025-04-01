// src/pages/SearchPage.jsx

import React, { useState } from 'react';

const SearchPage = ({ searchAuctions, searchResults }) => {
  // State för att hålla koll på användarens sökfråga
  const [query, setQuery] = useState('');

  // Funktion som uppdaterar sökfrågan när användaren skriver
  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Uppdatera sökfrågan
  };

  // Funktion som anropas när användaren klickar på "Sök"
  const handleSearchSubmit = () => {
    searchAuctions(query); // Anropa searchAuctions med sökfrågan
  };

  return (
    <div>
      <h1>Sök Auktioner</h1>
      <input
        type="text"
        placeholder="Sök efter titel"
        value={query}
        onChange={handleSearchChange} // Uppdatera sökfrågan vid varje teckeninmatning
      />
      <button onClick={handleSearchSubmit}>Sök</button>

      {/* Visa sökresultaten */}
      <h2>Sökresultat</h2>
      <ul>
        {searchResults.length > 0 ? (
          searchResults.map((auction, index) => (
            <li key={index}>
              <h3>{auction.title}</h3>
              <p>{auction.description}</p>
            </li>
          ))
        ) : (
          <p>Inga resultat funna</p> // Om inga resultat hittas, visa ett meddelande
        )}
      </ul>
    </div>
  );
};

export default SearchPage;
