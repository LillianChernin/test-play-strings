const mongoose = require('mongoose');
const db = require('../models');

const princessZeldaTheme = [
  ['b3', 2],
  ['d4', 1],
  ['a3', 2],
  ['g3', .5],
  ['a3', .5],
  ['b3', 2],
  ['d4', 1],
  ['a3', 3],
  ['b3', 2],
  ['d4', 1],
  ['a4', 2],
  ['g4', 1],
  ['d4', 2],
  ['c4', .5],
  ['b3', .5],
  ['a3', 3],
  ['b3', 2],
  ['d4', 1],
  ['a3', 2],
  ['g3', .5],
  ['a3', .5],
  ['b3', 2],
  ['d4', 1],
  ['a3', 3],
  ['b3', 2],
  ['d4', 1],
  ['a4', 2],
  ['g4', 1],
  ['d5', 6],
  ['d5', 2],
  ['c5', .5],
  ['b4', .5],
  ['c5', .5],
  ['b4', .5],
  ['g4', 2],
  ['c5', 2],
  ['b4', .5],
  ['a4', .5],
  ['b4', .5],
  ['a4', .5],
  ['e4', 2],
  ['d5', 2],
  ['c5', .5],
  ['b4', .5],
  ['c5', .5],
  ['b4', .5],
  ['g4', 1],
  ['c5', 1],
  ['g5', 3],
  ['b3', 2],
  ['d4', 1],
  ['a3', 2],
  ['g3', .5],
  ['a3', .5],
  ['b3', 2],
  ['d4', 1],
  ['a3', 3],
  ['b3', 2],
  ['d4', 1],
  ['a4', 2],
  ['g4', 1],
  ['d4', 2],
  ['c4', .5],
  ['b3', .5],
  ['a3', 3],
  ['b3', 2],
  ['d4', 1],
  ['a3', 2],
  ['g3', .5],
  ['a3', .5],
  ['b3', 2],
  ['d4', 1],
  ['a3', 3],
  ['b3', 2],
  ['d4', 1],
  ['a4', 2],
  ['g4', 1],
  ['d5', 6],
  ['d5', 2],
  ['c5', .5],
  ['b4', .5],
  ['c5', .5],
  ['b4', .5],
  ['g4', 2],
  ['c5', 2],
  ['b4', .5],
  ['a4', .5],
  ['b4', .5],
  ['a4', .5],
  ['e4', 2],
  ['d5', 2],
  ['c5', .5],
  ['b4', .5],
  ['c5', .5],
  ['b4', .5],
  ['g4', 1],
  ['c5', 1],
  ['g5', 3]
]

const zeldaTheme = {
  name: "Princess Zelda's Theme",
  difficulty: 3,
  songData: []
}
for (let i = 0; i < princessZeldaTheme.length; i++) {
  let currentNote = {};
  currentNote.pitch = princessZeldaTheme[i][0];
  currentNote.length = princessZeldaTheme[i][1];
  zeldaTheme.songData.push(currentNote);
}

const twinkleTwinkleSongData = [
  {
    'length': 1,
    'pitch': 'a4'
  },{
    'length': 1,
    'pitch': 'a4'
  },{
    'length': 1,
    'pitch':'e5'
  },{
    'length': 1,
    'pitch':'e5'
  },{
    'length': 1,
    'pitch':'gb5'
  },{
    'length': 1,
    'pitch':'gb5'
  },{
    'length': 2,
    'pitch':'e5'
  },{
    'length': 1,
    'pitch': 'd5'
  },{
    'length': 1,
    'pitch': 'd5'
  },{
    'length':1,
    'pitch':'db5'
  },{
    'length':1,
    'pitch':'db5'
  },{
    'length':1,
    'pitch':'b4'
  },{
    'length':1,
    'pitch':'b4'
  },{
    'length':2,
    'pitch':'a4'
  },{
    'length':1,
    'pitch':'e5'
  },{
    'length':1,
    'pitch':'e5'
  },{
    'length':1,
    'pitch':'d5'
  },{
    'length':1,
    'pitch':'d5'
  },{
    'length':1,
    'pitch':'db5'
  },{
    'length':1,
    'pitch':'db5'
  },{
    'length':2,
    'pitch':'b4'
  },{
    'length':1,
    'pitch':'e5'
  },{
    'length':1,
    'pitch':'e5'
  },{
    'length':1,
    'pitch':'d5'
  },{
    'length':1,
    'pitch':'d5'
  },{
    'length':1,
    'pitch':'db5'
  },{
    'length':1,
    'pitch':'db5'
  },{
    'length':2,
    'pitch':'b4'
  },{
    'length': 1,
    'pitch':'a4'
  },{
    'length': 1,
    'pitch':'a4'
  },{
    'length': 1,
    'pitch':'e5'
  },{
    'length': 1,
    'pitch':'e5'
  },{
    'length': 1,
    'pitch':'gb5'
  },{
    'length': 1,
    'pitch':'gb5'
  },{
    'length': 2,
    'pitch':'e5'
  },{
    'length': 1,
    'pitch':'d5'
  },{
    'length': 1,
    'pitch':'d5'
  },{
    'length':1,
    'pitch':'db5'
  },{
    'length':1,
    'pitch':'db5'
  },{
    'length':1,
    'pitch':'b4'
  },{
    'length':1,
    'pitch':'b4'
  },{
    'length':2,
    'pitch':'a4'
  }
]

const twinkleTwinkle = {
  name: "Twinkle Twinkle Little Star",
  difficulty: 1,
  songData: twinkleTwinkleSongData
}

const songList = [zeldaTheme, twinkleTwinkle];

db.Song.create(songList, (err, songs) => {
  if (err) {
    return console.log('ERROR ' + err);
  }
  console.log('created ' + songs.length);
  process.exit();
})
