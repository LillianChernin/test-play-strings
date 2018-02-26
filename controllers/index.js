const twinkleTwinkleViolin = []


const index = (req, res) => {
  res.render('./index', {
    documentTitle: "play strings",
  })
}

module.exports = index;
