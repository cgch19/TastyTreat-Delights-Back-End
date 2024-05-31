const mongoose = require('mongoose');

const YourTreatsSchema = new mongoose.Schema({
  Product: String,
  Image: String,
  Description: String,
  Price: Number,
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

 const Treats = mongoose.model('YourTreats', YourTreatsSchema);
 module.exports = Treats
