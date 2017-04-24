const Comic = require('../models/comic');

function comicsIndex(req, res) {
  Comic
  .find()
  .exec()
  .then(comics => {
    res.render('comics/index', { comics });
  });
}

function comicsShow(req, res) {
  Comic
  .findById(req.params.id)
  .exec()
  .then(comic => {
    if (!comic) {
      return res.render('error', { error: 'No comic found.'});
    }
    return res.render('comics/show', { comic });
  })
  .catch(err => {
    return res.render('error', { error: err });
  });
}



module.exports = {
  index: comicsIndex,
  show: comicsShow
};
