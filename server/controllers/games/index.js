'use strict';

const
    express = require('express'),
    gameService = require('../../services/games/index');

let router = express.Router();

router.get('/:gameId', gameService.getGames);
router.post('/', gameService.createGame);
router.patch('/', gameService.updateGame)

module.exports = router;