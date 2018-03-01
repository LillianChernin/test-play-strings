const express = require('express');
const router = express.Router();
const users = require('./users');
const songsApi = require('./song-api');
const songs = require('./songs');
const indexController = require('../controllers/index');


router.use('/api/v1/users', users);
router.use('/api/v1/songs', songsApi);
router.use('/songs', songs);
router.get('/', indexController.index);
router.post('/signup', indexController.signup);
router.post('/login', indexController.login);
router.get('*', (req, res) => {
  res.render('./four-zero-four', {
    documentTitle: "404 Error"
  });
})

module.exports = router;
