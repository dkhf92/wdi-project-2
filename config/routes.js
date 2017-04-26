const express = require('express');
const router  = express.Router();

const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const characters = require('../controllers/characters');
const comics = require('../controllers/comics');
const users = require('../controllers/users');

router.get('/', (req, res) => res.render('statics/home'));

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }
  return next();
}

router.route('/characters')
  .get(secureRoute, characters.index);

router.route('/characters/searchresults')
  .post(characters.search);

router.route('/characters/:id')
  .get(characters.show);
  // .post(characters.create);

// route a character from search results page to user profile by clicking add to team button
// router.route('/users/:id')
//     .post(characters.create);

router.route('/favourites/:id')
  .get(users.updateCharacter)
  .post(characters.create);
  
// router.route('/users/:id/:character')
//   .post(characters.create);


router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/comics')
  .get(comics.index);

router.route('/comics/:id')
  .get(comics.show);

router.route('/users/:id/:character')
  .delete(users.deleteCharacter);

router.route('/users/:id')
  .get(secureRoute, users.show);

router.route('/favourites/:id')
  .get(secureRoute, users.updateCharacter);

module.exports = router;
