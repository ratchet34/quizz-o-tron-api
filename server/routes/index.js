'use strict';

const express = require('express'),
    itemController = require('../controllers/items/index'),
    gameController = require('../controllers/games/index'),
    adminController = require('../controllers/admin/index')
let router = express.Router();

router.use('/item', itemController);
router.use('/game', gameController);
router.use('/admin', adminController);

module.exports = router;