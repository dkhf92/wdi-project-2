const Character = require('../models/character');
const User      = require('../models/user');
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
    return res.render('statics/error', { error: err });
  });
}

function charactersSearch(req, res) {
  marvel.characters.findNameStartsWith(req.body.searchResults)
  .then(results => {
    if(!results) {
      console.log('no results');
      return res.render('characters');
      // return res.render('error', { error: 'No character found.'});
    }
    console.log('results');

    res.render('characters/searchresults', { results });
  })
  .catch(err => {
    return res.render('statics/error', { error: err });
  });
}

function charactersCreate(req, res) {
  console.log(req.body);
  Character
  .create({
    name: req.body.characterObj.name,
    description: req.body.characterObj.description,
    image: req.body.characterObj.image
  })
  .then(character => {
    User.findById(res.locals.user._id)
    .exec()
    .then(user => {
      console.log(user);
      user.character.push(character);
      return user.save();
    }).then(user => {
      if(!character) return res.render('error', { error: 'No character was created'});
      // return res.redirect(`/users/${res.locals.user._id}`);
    })
    .catch(err => {
      return res.render('statics/error', { error: err });
    });
  });
}

module.exports = {
  index: charactersIndex,
  show: charactersShow,
  search: charactersSearch,
  create: charactersCreate
};
