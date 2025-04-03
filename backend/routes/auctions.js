const express = require('express');
const Auction = require('../models/Auction');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Sök auktioner
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ 
        message: 'Sökfrågan måste vara minst 2 tecken lång' 
      });
    }

    const results = await Auction.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ],
      endDate: { $gt: new Date() } // Endast aktiva auktioner
    }).populate('createdBy', 'username');

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ 
      error: 'Internt serverfel vid sökning',
      details: err.message 
    });
  }
});


// Hämta alla auktioner (med paginering)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const auctions = await Auction.find({ endDate: { $gt: new Date() } })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    const total = await Auction.countDocuments({ endDate: { $gt: new Date() } });

    res.json({
      auctions,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Något gick fel vid hämtning av auktioner',
      error: err.message 
    });
  }
});

// Hämta en specifik auktion
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('bids.user', 'username');

    if (!auction) {
      return res.status(404).json({ message: 'Auktionen hittades inte' });
    }

    res.json(auction);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Ogiltigt auktions-ID' });
    }
    res.status(500).json({ 
      message: 'Internt serverfel vid hämtning av auktion',
      error: err.message 
    });
  }
});

// Skapa en ny auktion (kräver autentisering)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, startingPrice, endDate } = req.body;

  try {
    // Validera endDate
    if (new Date(endDate) <= new Date()) {
      return res.status(400).json({ 
        message: 'Slutdatum måste vara i framtiden' 
      });
    }

    const auction = new Auction({
      title,
      description,
      startingPrice,
      currentPrice: startingPrice,
      endDate,
      createdBy: req.user.id,
    });

    await auction.save();
    res.status(201).json(auction);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Ogiltig auktionsdata',
        errors: err.errors 
      });
    }
    res.status(500).json({ 
      message: 'Internt serverfel vid skapande av auktion',
      error: err.message 
    });
  }
});

module.exports = router;