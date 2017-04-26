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

module.exports = {
  show: usersShow,
  updateCharacter: usersUpdateCharacter,
  deleteCharacter: usersDeleteCharacter
};
