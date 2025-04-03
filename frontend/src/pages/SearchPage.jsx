import React, { useState } from 'react';
import './SearchPage.module.css';

const SearchPage = ({ searchAuctions, searchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchAuctions = (e) => {
    setQuery(e.target.value);  // Uppdatera sökfrågan
  };

  const handleSearchSubmit = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      await searchAuctions(query);  //Anropa funktionen searchAuctions som skickats som prop
    } catch (err) {
      setError('Det gick inte att hämta sökresultat.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sök Auktioner</h1>
      <input
        type="text"
        placeholder="Sök efter titel"
        value={query}
        onChange={handleSearchAuctions}  // Korrigerad hanterare här
      />
      <button onClick={handleSearchSubmit} disabled={loading}>Sök</button>

      {loading && <p>Laddar...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Sökresultat</h2>
      <ul>
        {searchResults.length > 0 ? (
          searchResults.map((auction) => (
            <li key={auction._id}>
              <h3>{auction.title}</h3>
              <p>{auction.description}</p>
            </li>
          ))
        ) : (
          <p>Inga resultat hittades</p>
        )}
      </ul>
    </div>
  );
};

export default SearchPage;
