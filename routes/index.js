const express = require('express');
const router = express.Router();
const users = require('./users');
const songsApi = require('./song-api');
const songs = require('./songs');
const indexController = require('../controllers/index');
const authController = require('../controllers/auth');


router.use('/api/v1/users', users);
router.use('/api/v1/songs', songsApi);
router.use('/songs', songs);
router.get('/login-signup', authController.showLoginSignup);
router.post('/login', authController.login);
router.post('/signup', authController.createNewUser);
router.get('/', indexController.index);
router.get('*', (req, res) => {
  res.render('./four-zero-four', {
    documentTitle: "404 Error"
  });
});

module.exports = router;
