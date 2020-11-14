const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');
const seedrandom = require('seedrandom');
const { v4: uuidv4 } = require('uuid');
const { gameStates } = require('../../../libs/enums');

const createGameWithHostAndId = han.handler(async ( {host, gameType} ) => {

  var game = {};
  const seed = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
  const saveable = seedrandom(seed, {state: true});

  game.id = uuidv4();
  game.seed = seed;
  game.host = host;
  game.gameType = gameType;
  game.customItems = {};
  game.players = { [game.host]: { points: 0, status: 'ready' } };
  game.doneItems = [game.currentItem];
  game.state = gameStates.init;
  game.randomState = saveable.state();
  // Expire in 7 days
  game.expdate = Math.floor((new Date().getTime()/ 1000) + 7 * 24 * 3600)

  const params = {
    TableName: 'quizz-o-tron-games',
    Item: game
  };

  const result = await dynamoDb.put(params);

  return { id: game.id, host: game.host, seed: game.seed, currentItem: game.currentItem, players: game.players, state: game.state };
});

module.exports = { createGameWithHostAndId };
