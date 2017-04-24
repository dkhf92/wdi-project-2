const Character = require('../models/character');

// render "characters on statics/index page "
function charactersIndex(req, res) {
  Character
  .find()
  .exec()
  .then(characters => {
    console.log(characters);
    res.render('statics/index', { characters });
  });
}

function charactersShow(req, res) {
  Character
  .findById(req.params.id)
  .exec()
  .then(character => {
    if (!character) {
      return res.render('error', { error: 'No character found.'});
    }
    return res.render('characters/show', { character });
  })
  .catch(err => {
    return res.render('error', { error: err });
  });
}

function charactersFavourite(req, res) {
  return res.render('characters/favourite');
}

module.exports = {
  index: charactersIndex,
  show: charactersShow,
  favourite: charactersFavourite
};
