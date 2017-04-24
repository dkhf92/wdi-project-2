const express = require('express');
const router  = express.Router();

const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const characters = require('../controllers/characters');
const comics = require('../controllers/comics');
const accounts = require('../controllers/accounts');

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

router.route('/characters/:id')
  .get(characters.show);


router.route('/favourite')
  .get(secureRoute, characters.favourite);
// router.route('/characters/favourites')
//   .get(characters.favourites);
// router.route('/characters/:id/btn btn-primary')
//    .get(characters.favourite);

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

router.route('/account/:id')
    .get(secureRoute, accounts.index);



module.exports = router;
