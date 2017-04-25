const User = require('../models/user');


function usersShow(req, res) {
  User
  .findById(req.params.id)
  .populate('character')
  .exec()
  .then(user => {
    console.log(user);
    res.render('users/show', { user });
  });
}

function usersUpdateCharacter(req, res) {
  User
  .findById(res.locals.user.id)
  .exec()
  .then(user => {
    user.character.push(req.params.id);
    return user.save();
  })
  .then(user => res.redirect(`/users/${user._id}`))
  .catch(err => {
    console.log(err);
  });
}

function usersDeleteCharacter(req, res) {
  User
  .findById(res.locals.user.id)
  .exec()
  .then(user => {
    user.character.pop(req.params.character);
    return user.save();
  })
  .then(user => res.redirect(`/users/${user._id}`))
  .catch(err => {
    console.log(err);
  });
}


// function usersUpdateComic(req, res) {
//   User
//   .findById(res.locals.user.id)
//   .exec()
//   .then(user => {
//     user.comic = req.params.id;
//     return user.save();
//   })
//   .then(user => res.redirect(`/users{user._id}`))
//   .catch(err => {
//     console.log(err);
//   });
// }

// function accountsShow(req, res) {
//   Account
//   .findById(req.params.id)
//   .exec()
//   .then(account => {
//     if (!account) {
//       return res.render('error', { error: 'No account found.'});
//     }
//     return res.render('accounts/show', { account });
//   })
//   .catch(err => {
//     return res.render('error', { error: err });
//   });
// }

// function charactersFavourite(req, res) {
//   return res.render('characters/favourite');
// }

module.exports = {
  show: usersShow,
  updateCharacter: usersUpdateCharacter,
  deleteCharacter: usersDeleteCharacter
  // updateComic: usersUpdateComic
  // index: accountsIndex
  // show: accountsShow
  //favourite: charactersFavourite
};
