const db = require('../models');

const index = (req, res) => {
  res.render('./index', {
    documentTitle: "Play Strings",
  })
}

module.exports.index = index;
