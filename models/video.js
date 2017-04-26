const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  video: { type: String, trime: true } 
}, {
  timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);
