const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
  name: { type: String, trim: true }
  // issueNumber: { type: Number, trim: true },
  // description: { type: String, trim: true },
  // image: { type: String, trim: true}
});

module.exports = mongoose.model('Account', accountsSchema);
