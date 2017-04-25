const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  description: { type: String, trim: true },
  image: { type: String, trim: true},
  comics: { type: String, trim: true }
});

module.exports = mongoose.model('Character', characterSchema);
