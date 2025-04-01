import React, { useEffect, useState } from 'react';
import { fetchAuctions } from '../services/api';  // Justera sökvägen beroende på var din funktion finns
import { Link } from 'react-router-dom';  // Importera Link från React Router för navigering

const AuctionList = () => {
  // Skapa tillstånd för att hålla auktioner
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);  // Tillstånd för att visa laddningsindikator
  const [error, setError] = useState(null); // Tillstånd för att hantera fel

  // Hämta auktioner när komponenten laddas
  useEffect(() => {
    const getAuctions = async () => {
      try {
        const data = await fetchAuctions();  // Hämta auktioner från API
        setAuctions(data);  // Sätt auktioner i tillståndet
      } catch (error) {
        setError('Kunde inte hämta auktioner.');  // Hantera eventuella fel
      } finally {
        setLoading(false);  // Sätt loading till false när hämningen är klar
      }
    };

    getAuctions();  // Anropa den asynkrona funktionen för att hämta auktioner
  }, []);  // Tom array gör att useEffect bara körs när komponenten laddas för första gången

  if (loading) return <div>Laddar...</div>;  // Visa laddningstext medan data hämtas
  if (error) return <div>{error}</div>;  // Visa felmeddelande om det finns ett fel

  return (
    <div>
      <h1>Auktionslista</h1>
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id}>
            <h2>{auction.title}</h2>
            <p>{auction.description}</p>
            <p>Startpris: ${auction.startingPrice}</p>
            
            {/* Lägg till en länk till detaljsidan för varje auktion */}
            <Link to={`http://localhost:5000/api/auctions`}>Visa detaljer</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
