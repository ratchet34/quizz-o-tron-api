'use strict';

const express = require('express'),
    itemController = require('../controllers/items/index'),
    gameController = require('../controllers/games/index')
let router = express.Router();

router.use('/item', itemController);
router.use('/game', gameController);

module.exports = router;