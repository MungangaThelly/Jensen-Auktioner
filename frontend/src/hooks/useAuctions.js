import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api'; // Lägg till bas-URL

// Förbättrad fetchJson-funktion
const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    // Kontrollera content-type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Fick icke-JSON-svar: ${text.substring(0, 100)}`);
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const useAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hämta alla auktioner
  useEffect(() => {
    const fetchAuctions = async () => {
      setIsLoading(true);
      try {
        const data = await fetchJson('/auctions');
        setAuctions(data);
      } catch (error) {
        console.error('Fel vid hämtning av auktioner:', error);
        setSearchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  // Sök auktioner
  const searchAuctions = async (query) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      if (!query || query.trim() === '') {
        setSearchResults(auctions);
        return;
      }

      const data = await fetchJson(`/auctions/search?query=${encodeURIComponent(query)}`);
      setSearchResults(data);
    } catch (error) {
      setSearchError(error.message);
      console.error('Sökfel:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    auctions,
    searchResults,
    isSearching,
    isLoading,
    searchError,
    searchAuctions,
  };
};

export default useAuctions;