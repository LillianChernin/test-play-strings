const express = require('express');
const router = express.Router();
const users = require('./users');
const indexController = require('../controllers/index');


router.use('/api/v1/users', users);
router.get('/', indexController);

module.exports = router;
