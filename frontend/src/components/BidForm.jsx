import React, { useState } from 'react';

const BidForm = ({ auctionId, currentPrice }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validering
    if (!bidAmount || isNaN(bidAmount)) {
      setError('Ange ett giltigt belopp');
      setIsSubmitting(false);
      return;
    }

    const amount = parseFloat(bidAmount);
    if (amount <= currentPrice) {
      setError(`Budet måste vara högre än ${currentPrice} SEK`);
      setIsSubmitting(false);
      return;
    }

    try {
      // Skicka budet till servern
      const response = await fetch(`http://localhost:5000/api/auctions/${auctionId}/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kunde inte lägga bud');
      }

      setSuccess(true);
      setBidAmount('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Budfel:', err);
      setError(err.message || 'Något gick fel vid budgivning');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-6">
      <h3 className="text-lg font-medium mb-4">Lägg ett bud</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Ditt bud har lagts fram!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label htmlFor="bidAmount" className="sr-only">Budbelopp</label>
            <input
              type="number"
              id="bidAmount"
              min={currentPrice + 1}
              step="1"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Minst ${currentPrice + 1} SEK`}
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Skickar...' : 'Lägg bud'}
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Ditt bud måste vara högre än nuvarande högsta bud ({currentPrice} SEK)
        </p>
      </form>
    </div>
  );
};

export default BidForm;