const Account = require('../models/account');


function accountsIndex(req, res) {
  Account
  .find()
  .exec()
  .then(accounts => {
    console.log(accounts);
    res.render('accounts/show', { accounts });
  });
}

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
  index: accountsIndex
  // show: accountsShow
  //favourite: charactersFavourite
};
