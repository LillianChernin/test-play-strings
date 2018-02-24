const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: String,
  difficulty: Number,
  songData: Array
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
