const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  title: String,
  type: String,
  brand: String,
  price: Number,
  image: String, // Can be a URL or file path
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);

