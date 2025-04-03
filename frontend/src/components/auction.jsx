import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAuction } from '../services/api';
import BidForm from './BidForm';

const Auction = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuction = async () => {
      try {
        const data = await fetchAuction(id);
        
        if (!data || !data._id) {
          throw new Error('Auktionen hittades inte');
        }
        
        setAuction(data);
      } catch (err) {
        console.error('Fel vid hämtning av auktion:', err);
        setError(err.message || 'Kunde inte hämta auktionsinformation');
      } finally {
        setLoading(false);
      }
    };

    getAuction();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="text-center py-8">Laddar auktionsinformation...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!auction) return <div className="text-center py-8">Ingen auktion hittades</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800">{auction.title}</h1>
          <p className="text-gray-600 mt-2">Skapad av: {auction.createdBy?.username || 'Okänd'}</p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Beskrivning</h2>
            <p className="text-gray-700 whitespace-pre-line">{auction.description}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">Prisinformation</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {auction.currentPrice || auction.startingPrice} SEK
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Startpris: {auction.startingPrice} SEK
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">Tidsinformation</h3>
              <p className="text-gray-700">
                Start: {formatDate(auction.createdAt)}
              </p>
              <p className="text-gray-700">
                Slut: {formatDate(auction.endDate)}
              </p>
              <p className={`mt-2 font-medium ${
                new Date(auction.endDate) > new Date() 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {new Date(auction.endDate) > new Date() 
                  ? 'Auktionen är öppen' 
                  : 'Auktionen är avslutad'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Bud ({auction.bids?.length || 0})</h2>
          
          {auction.bids?.length > 0 ? (
            <ul className="space-y-3">
              {auction.bids.map(bid => (
                <li key={bid._id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{bid.user?.username || 'Anonym'}</p>
                    <p className="text-sm text-gray-500">{formatDate(bid.createdAt)}</p>
                  </div>
                  <p className="text-lg font-bold">{bid.amount} SEK</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Inga bud ännu</p>
          )}

          {new Date(auction.endDate) > new Date() && (
            <div className="mt-6">
              <BidForm auctionId={auction._id} currentPrice={auction.currentPrice || auction.startingPrice} />
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 text-center">
          <Link 
            to="/auctions" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            &larr; Tillbaka till auktionslistan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auction;