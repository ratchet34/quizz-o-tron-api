'use strict';
const getGame = require('./get');
const putGame = require('./put');
const patchGame = require('./patch');

const joinGame = async (req, res) => {
  if( req.body.gameId && req.body.username) {
    const result = await patchGame.joinGameWithId( {gameId: req.body.gameId, username: req.body.username} )
    return res.json(result);
  }
}

const getGameWithId = async (req, res) => {
  const game = await getGame.getGame(req.params.gameId);
  if (!game) return res.status(404).json({});

  return res.json(game.body);
}

const putGameWithHostAndId = async (req, res) => {
  var game = {};
  if(req.body && req.body.host && req.body.gameType) {
    game.host = req.body.host;
    game.gameType = req.body.gameType;
    const result = await putGame.putGame(game);
    return res.json(result);
  }
}

module.exports = {
  getGameWithId: getGameWithId,
  putGameWithHostAndId: putGameWithHostAndId,
  joinGame: joinGame
}