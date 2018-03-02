const express = require('express');
const router = express.Router();
const songApiController = require('../controllers/song-api');

router.get('/', songApiController.index);
router.get('/:id', songApiController.show);
router.post('/', songApiController.post);
router.delete('/:id', songApiController.destroy);

module.exports = router;
