import React, { useEffect, useState } from 'react';
import { fetchAuctions } from '../services/api';
import AuctionCard from './AuctionCard.jsx';  // Se till att denna matchar exporten

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuctions = async () => {
      try {
        const data = await fetchAuctions();
        
        if (!Array.isArray(data)) {
          throw new Error('API returnerade inte en array av auktioner');
        }
        
        setAuctions(data);
      } catch (error) {
        console.error('Fel vid hämtning av auktioner:', error);
        setError(error.message || 'Kunde inte hämta auktioner.');
      } finally {
        setLoading(false);
      }
    };

    getAuctions();
  }, []);

  if (loading) return <div className="text-center py-8">Laddar auktioner...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Fel: {error}</div>;
  if (!auctions.length) return <div className="text-center py-8">Inga auktioner tillgängliga</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Auktionslista</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <AuctionCard 
            key={auction._id || auction.id}
            auction={auction}
          />
        ))}
      </div>
    </div>
  );
};

export default AuctionList;