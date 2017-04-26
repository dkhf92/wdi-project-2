const Video = require('../models/video');

function videosIndex(req, res) {
  Video
  .find()
  .exec()
  .then(videos => {
    return res.render('videos', { videos });
  })
  .catch(err => {
    return res.render('statics/error', { error: err });
  });
}

function videosShow(req, res) {
  Video
  .findById(req.params.id)
  .exec()
  .then(video => {
    if(!video) {
      return res.render('error', { error: 'No video found.' });
    }
    return res.render('videos/show', { video });
  })
  .catch(err => {
    return res.render('statics/error', { error: err });

  });
}

module.exports = {
  index: videosIndex,
  show: videosShow
};
