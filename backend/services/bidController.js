// Hantera bud

const Bid = require('../models/Bid');
const Auction = require('../models/Auction');

// Lägg ett bud
exports.createBid = async (req, res) => {
  const { auctionId, amount, userId } = req.body;
  try {
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: 'Auktionen hittades inte' });
    }
    if (auction.createdBy.toString() === userId) {
      return res.status(400).json({ message: 'Du kan inte lägga bud på din egen auktion' });
    }
    if (auction.endDate < new Date()) {
      return res.status(400).json({ message: 'Auktionen är avslutad' });
    }
    if (amount <= auction.price) {
      return res.status(400).json({ message: 'Budet måste vara högre än det nuvarande priset' });
    }
    const bid = new Bid({ auctionId, amount, userId });
    await bid.save();
    auction.price = amount;
    await auction.save();
    res.status(201).json(auction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};