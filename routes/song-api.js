const express = require('express');
const router = express.Router();
const songApiController = require('../controllers/song-api');

router.get('/', songApiController.index);
router.get('/:id', songApiController.show);

module.exports = router;
