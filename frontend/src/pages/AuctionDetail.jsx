import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Använd för att få access till URL-parametrar
import { fetchAuctionById } from '../services/api';  // API-funktion för att hämta specifik auktion

const AuctionDetail = () => {
  const { id } = useParams();  // Hämtar auktionens ID från URL
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuctionDetail = async () => {
      try {
        const data = await fetchAuctionById(id);  // Hämta auktionens detaljer
        setAuction(data);  // Sätt auktionen i tillståndet
      } catch (error) {
        setError('Kunde inte hämta auktionens detaljer.');
      } finally {
        setLoading(false);
      }
    };

    getAuctionDetail();
  }, [id]);  // Kör om när auktionens ID ändras

  if (loading) return <div>Laddar auktionens detaljer...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{auction?.title}</h1>
      <p>{auction.description}</p>
      <p>Startpris: ${auction.startingPrice}</p>
      <P>{auction.startDate}</P>
      <P>{auction.endDate}</P>
      <P>{auction.createdBy}</P>
    </div>
  );
};

export default AuctionDetail;
