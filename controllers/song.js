const db = require('../models');

const index = (req, res) => {
  db.Song.find((err, songs) => {
    res.render('./song-views/song-list', {
      documentTitle: "Song List",
      data: songs
    })
  })
}

const show = (req, res) => {
  let currentSongId = req.params.id;
  db.Song.findById(currentSongId, (err, song) => {
    res.render('./song-views/single-song', {
      documentTitle: song.name,
      song: song
    })
  })
}

const createSong = (req, res) => {
  res.render('./song-views/create-song', {
    documentTitle: "Create New Song"
  })
}

module.exports.index = index;
module.exports.show = show;
module.exports.createSong = createSong;
