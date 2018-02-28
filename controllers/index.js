const twinkleTwinkleViolin = []
// const Tone = require('tone');

//create a synth and connect it to the master output (your speakers)
// var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");

const index = (req, res) => {
  res.render('./index', {
    documentTitle: "play strings",
    // synth: synth
  })
}

module.exports = index;
