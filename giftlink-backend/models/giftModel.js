const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  condition: String,
  posted_by: String,
  zipcode: String,
  date_added: Number,
  age_days: Number,
  age_years: Number,
  description: String,
  image: String,
}, { collection: 'gifts' });

module.exports = mongoose.model('Gift', giftSchema);
