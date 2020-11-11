'use strict';

const express = require('express'),
    itemController = require('../controllers/items/index')
let router = express.Router();

router.use('/item', itemController);

module.exports = router;