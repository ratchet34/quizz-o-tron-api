
const { LexModelBuildingService } = require('aws-sdk');
const getGame = require('./get');
const putGame = require('./put');

const getGameWithId = async (req, res) => {
  const game = await getGame.getGame(req.params.gameId);
  if (!game) return res.status(404).json({});

  return res.json(game.body);
};

const createGame = async (req, res) => {
  var game = {};
  if(req.body && req.body.host && req.body.gameType) {
    game.host = req.body.host;
    game.gameType = req.body.gameType;
    const result = await putGame.putGame(game);
    return res.json(result);
  }
}

module.exports = {
    getGameWithId,
    createGame
}