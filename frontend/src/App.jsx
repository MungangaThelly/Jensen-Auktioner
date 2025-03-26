// Här använder vi React Router för navigering

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
//import Search from './components/Search';
//import CreateAuction from './pages/CreateAuction';
//import Login from './pages/Login';
//import Register from './pages/Register';
//import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;