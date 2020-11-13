'use strict';
const getGame = require('./get');
const putGame = require('./put');
const patchGame = require('./patch');

const updateGame = async (req, res) => {
  if( req.body.status && req.body.gameId && req.body.username ) {
    const result = await patchGame.updatePlayerStatus( {gameId: req.body.gameId, username: req.body.username, status: req.body.status} );
    return res.json(result);
  } else if( req.body.state && req.body.gameId && req.body.username ) {
    const result = await patchGame.updateStatus( {gameId: req.body.gameId, username: req.body.username} );
    return res.json(result);
  } else if( req.body.gameId && req.body.username) {
    const result = await patchGame.joinGameWithId( {gameId: req.body.gameId, username: req.body.username} );
    return res.json(result);
  } else {
    res.status(400).send('No match for your request');
    return res;
  }
}

const getGames = async (req, res) => {
  if ( req.params.gameId && req.query.a) {
    if ( req.query.a === 'players' ) {
      const result = await getGame.getPlayers(req.params.gameId);
      if (!result) return res.status(404).json({});
      return res.json(result);
    } else if ( req.query.a === 'state' ) {
      const result = await getGame.getGameState(req.params.gameId);
      if (!result) return res.status(404).json({});
      return res.json(result);
    } else {
      res.status(400).send('No match for your request');
      return res;
    }
  } else if ( req.params.gameId ) {
    const result = await getGame.getGame(req.params.gameId);
    if (!result) return res.status(404).json({});
    return res.json(result);
  } else {
    res.status(400).send('No match for your request');
    return res;
  }
}

const createGame = async (req, res) => {
  var game = {};
  if(req.body && req.body.host && req.body.gameType) {
    const result = await putGame.createGameWithHostAndId( {host: req.body.host, gameType: req.body.gameType} );
    return res.json(result);
  }
}

module.exports = {
  getGames: getGames,
  createGame: createGame,
  updateGame: updateGame
} 