const express = require('express');
const Auction = require('../models/Auction');
const authMiddleware = require('../middleware/auth'); // Middleware för autentisering
const router = express.Router();

// Hämta alla auktioner
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find().populate('createdBy', 'username');
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: 'Något gick fel. Försök igen senare.' });
  }
});

// Hämta en specifik auktion
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate('createdBy', 'username');
    if (!auction) {
      return res.status(404).json({ message: 'Auktionen hittades inte.' });
    }
    res.json(auction);
  } catch (err) {
    res.status(500).json({ message: 'Något gick fel. Försök igen senare.' });
  }
});

// Skapa en ny auktion (kräver autentisering)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, price, endDate } = req.body;

  try {
    const auction = new Auction({
      title,
      description,
      price,
      endDate,
      createdBy: req.user.id, // Användarens ID från JWT-token
    });
    await auction.save();
    res.status(201).json(auction);
  } catch (err) {
    res.status(500).json({ message: 'Något gick fel. Försök igen senare.' });
  }
});

// Sök auktioner baserat på titel eller beskrivning
router.get('/search', async (req, res) => {
  const query = req.query.query || ''; // Hämta sökterm från query-parametern (ex. ?query=telefon)
  
  try {
    // Använd MongoDB:s regex för att matcha sökordet (case insensitive)
    const auctions = await Auction.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Matcha titel
        { description: { $regex: query, $options: 'i' } } // Matcha beskrivning
      ]
    }).populate('createdBy', 'username'); // Hämta skapad av användarens namn

    if (auctions.length > 0) {
      res.json(auctions); // Skicka tillbaka de auktioner som matchade sökningen
    } else {
      res.status(404).json({ message: 'Inga auktioner hittades.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Något gick fel vid sökningen.' });
  }
});

module.exports = router;
