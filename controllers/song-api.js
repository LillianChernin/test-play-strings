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
  console.log(req.body);
  let newSong = new db.Song();
  newSong.name = req.body.name;
  newSong.difficulty = req.body.difficulty;
  newSong.songData = [];
  for (let i = 0; i < req.body.arrayLength; i++) {
    let noteObject = {};
    let currentPitchKey = 'songData[' + i + '][pitch]';
    let currentLengthKey = 'songData[' + i + '][length]';
    noteObject.pitch = req.body[currentPitchKey];
    noteObject.length = req.body[currentLengthKey];
    newSong.songData.push(noteObject);
  }
  newSong.save((err, song) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(newSong);
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
