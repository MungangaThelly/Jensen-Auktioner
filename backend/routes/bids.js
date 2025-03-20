const express = require('express');
const Bid = require('../models/Bid');
const Auction = require('../models/Auction');
const authMiddleware = require('../middleware/auth'); // Middleware för autentisering
const router = express.Router();

// Lägg ett bud (kräver autentisering)
router.post('/', authMiddleware, async (req, res) => {
  const { auctionId, amount } = req.body;

  try {
    // Hitta auktionen
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: 'Auktionen hittades inte.' });
    }

    // Kontrollera om auktionen är öppen
    if (auction.endDate < new Date()) {
      return res.status(400).json({ message: 'Auktionen är avslutad.' });
    }

    // Kontrollera om budet är högre än det nuvarande priset
    if (amount <= auction.price) {
      return res.status(400).json({ message: 'Budet måste vara högre än det nuvarande priset.' });
    }

    // Skapa ett nytt bud
    const bid = new Bid({
      auctionId,
      amount,
      userId: req.user.id, // Användarens ID från JWT-token
    });
    await bid.save();

    // Uppdatera auktionens pris
    auction.price = amount;
    await auction.save();

    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: 'Något gick fel. Försök igen senare.' });
  }
});

module.exports = router;