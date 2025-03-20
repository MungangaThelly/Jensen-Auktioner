// Hantera auktioner

const Auction = require('../models/Auction');

// Hämta alla auktioner
exports.getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate('createdBy', 'username');
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Skapa en ny auktion
exports.createAuction = async (req, res) => {
  const { title, description, price, endDate, createdBy } = req.body;
  const auction = new Auction({
    title,
    description,
    price,
    endDate,
    createdBy,
  });
  try {
    const newAuction = await auction.save();
    res.status(201).json(newAuction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Hämta en specifik auktion
exports.getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate('createdBy', 'username');
    if (!auction) {
      return res.status(404).json({ message: 'Auktionen hittades inte' });
    }
    res.json(auction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};