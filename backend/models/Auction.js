// models/Auction.js
const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  amount: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Referens till User-modellen
  createdAt: { type: Date, default: Date.now }
});

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingPrice: Number,
  currentPrice: Number,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bids: [bidSchema] // Använd det nya bidSchema
});

module.exports = mongoose.model('Auction', auctionSchema);