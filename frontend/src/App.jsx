import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import AuctionList from './components/AuctionList';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateAuction from './pages/CreateAuction';
import AuctionDetail from './pages/AuctionDetail';
import useAuctions from './hooks/useAuctions';  // Import the custom hook
import './App.css';

function App() {
  // Using the custom hook to manage auction data
  const {
    auctions,
    searchResults,
    isSearching,
    searchError,
    searchAuctions
  } = useAuctions();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<AuctionList />} />
        <Route path="/auctionlist" element={<AuctionList auctions={auctions} />} />
        <Route path="/auctions/:id" element={<AuctionDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/search"
          element={
            <SearchPage
              searchAuctions={searchAuctions}
              searchResults={searchResults}
              isSearching={isSearching}
              searchError={searchError}
            />
          }
        />
        <Route path="/create" element={<CreateAuction />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
