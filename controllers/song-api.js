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

module.exports.index = index;
module.exports.show = show;
