'use strict';

const
    express = require('express'),
    gameService = require('../../services/games/index');

let router = express.Router();

router.get('/:gameId', gameService.getGameWithId);
router.post('/', gameService.createGame);
router.patch('/', gameService.updateGame)

module.exports = router;