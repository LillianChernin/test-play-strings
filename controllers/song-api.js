const db = require('../models');

const index = (req, res) => {
  db.Song.find((err, songs) => {
    res.json(songs);
  })
}

const show = (req, res) => {
  let currentSongId = req.params.id;
  db.Song.findById(currentSongId, (err, song) => {
    res.json(song);
  })
}

const post = (req, res) => {
  let newSong = new db.Song(req.body);
  newSong.save((err, song) => {
    if (err) {
      res.status(500).send(err);
    }
  });
}

const destroy = (req, res) => {
  db.Song.remove({_id: req.params.id}, (err, removedSong) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(removedSong);
  })
}

module.exports.index = index;
module.exports.show = show;
module.exports.post = post;
module.exports.destroy = destroy;
