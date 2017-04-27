const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  description: { type: String, trim: true },
  image: { type: String, trim: true},
  comics: { type: String, trim: true }
});

characterSchema.statics.findOneOrCreate = function(name, data) {
  const Character = this;
  return new Promise((resolve, reject) => {
    Character.findOne({ name }, function(err, character) {
      if (err) return reject(err);
      if (character) return resolve(character);
      Character.create(data, function(err, character) {
        if (err) return reject(err);
        if (character) return resolve(character);
      });
    });
  });
};

module.exports = mongoose.model('Character', characterSchema);
