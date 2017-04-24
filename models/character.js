const mongoose = require('mongoose');



const characterSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  description: { type: String, trim: true },
  image: { type: String, trim: true}
  // comic: [{ type: mongoose.comicSchema, ref: 'comic'}]
});

// const comicSchema = new mongoose.Schema({
//   name: { type: String, trim: true },
//   description: { type: String, trim: true },
//   image: { type: String, trim: true}
// });


module.exports = mongoose.model('Character', characterSchema);
