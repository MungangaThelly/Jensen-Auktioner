import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAuctionById } from '../services/api';

const AuctionDetail = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuctionDetail = async () => {
      try {
        const data = await fetchAuctionById(id);
        
        if (!data) {
          throw new Error('Auktionen hittades inte');
        }
        
        setAuction(data);
      } catch (error) {
        console.error('Fel vid hämtning:', error);
        setError(error.message || 'Kunde inte hämta auktionens detaljer');
      } finally {
        setLoading(false);
      }
    };

    getAuctionDetail();
  }, [id]);

  if (loading) return <div className="loading">Laddar auktionens detaljer...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!auction) return <div>Ingen auktion hittades</div>;

  // Hjälpfunktion för datumformatering
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="auction-detail">
      <h1>{auction.title}</h1>
      <p className="description">{auction.description}</p>
      
      <div className="price-info">
        <h2>Prisinformation</h2>
        <p>Startpris: {auction.startingPrice} SEK</p>
        {auction.currentPrice && <p>Nuvarande bud: {auction.currentPrice} SEK</p>}
      </div>
      
      <div className="time-info">
        <h2>Tidsinformation</h2>
        <p>Start: {formatDate(auction.startDate)}</p>
        <p>Slut: {formatDate(auction.endDate)}</p>
        <p className={new Date(auction.endDate) > new Date() ? 'active' : 'ended'}>
          {new Date(auction.endDate) > new Date() ? 'Auktionen är aktiv' : 'Auktionen är avslutad'}
        </p>
      </div>
      
      <div className="creator-info">
        <p>Skapad av: {auction.createdBy?.username || 'Okänd användare'}</p>
      </div>
    </div>
  );
};

export default AuctionDetail;