// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './pages/SearchPage';
import AuctionList from './components/AuctionList';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateAuction from './pages/CreateAuction';


function App() {
  // Definiera searchAuctions-funktionen
  const searchAuctions = (title) => {
    console.log('Söker efter auktioner med titel:', title);
    // Här kan du lägga till logik för att filtrera eller hämta auktioner baserat på titeln
  };

  return (
    <Router>
      <Header />
      
      <Register />
      
      <Routes>
        {/* Här definieras alla rutter */}
        <Route path="/" element={<Home />} />
        <Route path='/auction/:id' element={<AuctionList />} />
        <Route path="/login" element={<Login />} />
        {/* Skicka funktionen searchAuctions som en prop till Search-komponenten */}
        <Route path="/search" element={<Search searchAuctions={searchAuctions} />} />
        <Route path="/create-auction" element={<CreateAuction />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
