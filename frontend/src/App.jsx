import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import AuctionList from './components/AuctionList';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateAuction from './pages/CreateAuction';
import AuctionDetail from './pages/AuctionDetail';  // Importera för detaljer
import './App.css';

function App() {
  // State för att lagra alla auktioner
  const [auctions, setAuctions] = useState([]);
  // State för att lagra sökresultaten
  const [searchResults, setSearchResults] = useState([]);
  // Laddnings- och felhantering för sökning
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Hämta auktioner vid komponentladdning
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('/api/auctions');
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error('Fel vid hämtning av auktioner:', error);
      }
    };
    fetchAuctions();
  }, []);  // Endast en gång när komponenten laddas

  // Funktion för att söka auktioner
  const searchAuctions = async (title) => {
    setIsSearching(true);  // Sätt att sökning pågår
    setSearchError(null);   // Rensa tidigare fel
    console.log('Söker auktioner med titel:', title);
    try {
      const response = await fetch(`/api/auctions/search?query=${title}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data);  // Uppdatera med sökresultat
      } else {
        console.log('Fel vid hämtning av auktioner:', data.message);
        setSearchError('Inga resultat hittades.');
      }
    } catch (error) {
      setSearchError('Ett fel inträffade vid nätverksanrop.');
      console.error('Fel vid nätverksanrop:', error);
    } finally {
      setIsSearching(false);  // Sätt att sökningen är klar
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Länka auktioner till AuctionList-komponenten */}
        <Route path="/auctionlist" element={<AuctionList />} />
        {/* Routen för att visa detaljer om en specifik auktion */}
        <Route path="/auction/:id" element={<AuctionDetail />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Routen för söksidan, skickar sökfunktion och resultat till SearchPage */}
        <Route
          path="/search"
          element={<SearchPage searchAuctions={searchAuctions} searchResults={searchResults} />}
        />

        {/* Routen för att skapa en ny auktion */}
        <Route path="/create" element={<CreateAuction />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
