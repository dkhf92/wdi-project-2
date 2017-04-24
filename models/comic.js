const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  issueNumber: { type: Number, trim: true },
  description: { type: String, trim: true },
  image: { type: String, trim: true}
});

module.exports = mongoose.model('Comic', comicSchema);
