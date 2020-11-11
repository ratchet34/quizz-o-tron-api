const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');
const getItem = require('../items/get');
const seedrandom = require('seedrandom');
const { v4: uuidv4 } = require('uuid');

const putGame = han.handler(async (game) => {

  const seed = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
  const saveable = seedrandom(seed, {state: true});
  const items = await getItem.getAllItemIds();

  game.id = uuidv4();
  game.seed = seed;
  game.currentItem = items.body[Math.floor(saveable() * items.body.length)].id;
  game.players = [{name: game.host, points: 0, status: 'ready'}];
  game.doneItems = [game.currentItem];
  game.state = 'init';
  game.randomState = saveable.state();
  // Expire in 7 days
  game.expdate = Math.floor((new Date().getTime()/ 1000) + 7 * 24 * 3600)

  const params = {
    TableName: 'quizz-o-tron-games',
    Item: game
  };

  const result = await dynamoDb.put(params);

  return { host: game.host, seed: game.seed, currentItem: game.currentItem, players: game.players, state: game.state };
});

module.exports = { putGame };
