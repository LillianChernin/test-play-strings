const express = require('express');
const router = express.Router();
const songsController = require('../controllers/song');

router.get('/', songsController.index);
router.get('/create-song', songsController.createSong);
router.get('/:id', songsController.show);

module.exports = router;
