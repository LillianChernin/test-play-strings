const express = require('express');
const router = express.Router();
const songsController = require('../controllers/song');

router.get('/', songsController.index);
router.get('/:id', songsController.show);

module.exports = router;
