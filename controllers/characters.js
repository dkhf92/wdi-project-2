const Character = require('../models/character');
const api = require('marvel-api');
var marvel = api.createClient({
  publicKey: '20d83b857dd7975d3714f224fb445b28',
  privateKey: '55029630f5701122fec81d07d7045d8bf4464694'
  // publicKey: process.env.MARVEL_API_PUBLIC,
  // privateKey: process.env.MARVEL_API_PRIVATE
});


// render "characters on statics/index page "
function charactersIndex(req, res) {
  Character
  .find()
  .exec()
  .then(characters => {
    // console.log(characters);
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

function charactersSearch(req, res) {
  marvel.characters.findNameStartsWith(req.body.searchResults)
  .then(results => {
    console.log(req.body);
    // Character
    // .find()
    // .exec()
    // .then(characters => {
    console.log(results);
    res.render('characters/searchresults', { results });
  });
}

module.exports = {
  index: charactersIndex,
  show: charactersShow,
  search: charactersSearch
};
