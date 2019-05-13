var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  driver: String,
  destination: String,
  amount: String,
  description: String,
  meeting: String,
  time: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema);
