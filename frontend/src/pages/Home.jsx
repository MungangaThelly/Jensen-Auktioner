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
      <h2>Aktiva auktioner</h2>
      <div className={styles.auctionList}>
        {auctions.length > 0 ? (
          auctions.map((auction) => (
            <div key={auction._id} className={styles.auction}>
              <Link to={`/auction/${auction._id}`}>
                <h3>{auction.title}</h3>
                <p>{auction.description}</p>
                <p>Startpris: {auction.price} SEK</p>
                <p>Slutdatum: {new Date(auction.endDate).toLocaleDateString()}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Inga aktiva auktioner för tillfället.</p>
        )}
      </div>
    </div>
  );
}

export default Home;