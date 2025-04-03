import React, { useEffect, useState } from 'react';
import { fetchAuctions } from '../services/api';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';



function Home() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data);
        setLoading(false);
      } catch (err) {
        setError('Kunde inte hämta auktioner. Försök igen senare.');
        setLoading(false);
      }
    };
    getAuctions();
  }, []);

  if (loading) {
    return <p>Laddar auktioner...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.home}>
      <h1>Välkommen till Jensen Auktioner</h1>

      <h5>Börja sälja online <br /> 
      Anslut dig till över 700 000 butiker över hela världen. Börja gratis utan begränsad testperiod.
      </h5>
      
      <h3>Din kompletta e-handelslösning</h3>
    </div>
  );
}

export default Home;