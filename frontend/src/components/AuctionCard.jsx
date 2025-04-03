import React from 'react';
import { Link } from 'react-router-dom';

const AuctionCard = ({ auction, variant = 'small' }) => {
  // Gemensam datumformaterare
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Small Card Variant (default)
  if (variant === 'small') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <h3 className="font-semibold truncate">{auction.title}</h3>
        <p className="text-gray-600 text-sm my-2 line-clamp-2">{auction.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-blue-600">
            {auction.currentPrice || auction.startingPrice} SEK
          </span>
          <Link 
            to={`/auctions/${auction._id}`}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Visa
          </Link>
        </div>
      </div>
    );
  }

  // Large Card Variant (bord)
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Bildsektion (lägg till om du har bilder) */}
        <div className="md:w-1/3 bg-gray-100 rounded-lg">
          {/* Platzhållare för bild */}
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
        </div>
        
        {/* Innehållssektion */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-bold mb-2">{auction.title}</h2>
          <p className="text-gray-700 mb-4">{auction.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Startpris</p>
              <p className="font-semibold">{auction.startingPrice} SEK</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nuvarande bud</p>
              <p className="font-bold text-blue-600">
                {auction.currentPrice || 'Inga bud än'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Slutar</p>
              <p>{formatDate(auction.endDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bud</p>
              <p>{auction.bids?.length || 0} st</p>
            </div>
          </div>
          
          <Link
            to={`/auctions/${auction._id}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Se auktionsdetaljer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;