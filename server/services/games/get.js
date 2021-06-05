const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');

const getGame = han.handler(async (gameId) => {
  const params = {
    TableName: 'quizz-o-tron-games',
    Key: {
      "id" : gameId
    }
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Game not found.');
  } else {
    console.log(`Game found : ${result.Item}`);
  }
  
  return { id: result.Item.id, host: result.Item.host, seed: result.Item.seed, currentItem: result.Item.currentItem, customItems: result.Item.customItems, players: result.Item.players, state: result.Item.state, itemType: result.Item.itemType, randomState: result.Item.randomState, gameType: result.Item.gameType };
});

const getPlayers = han.handler(async (gameId) => {
  const params = {
    TableName: 'quizz-o-tron-games',
    Key: {
      'id': gameId
    },
    AttributesToGet: ['players']
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Game not found.');
  } else {
    console.log(`Players found : ${result.Item}`);
  }
  
  return { id: gameId, players: result.Item.players };
});

const getGameState = han.handler(async (gameId) => {
  const params = {
    TableName: 'quizz-o-tron-games',
    Key: {
      'id': gameId
    },
    AttributesToGet: ['state']
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Game state not found.');
  } else {
    console.log(`Game state found : ${result.Item.state}`);
  }

  return { id: gameId, state: result.Item.state };
});

const getDoneItems = han.handler(async (gameId) => {
  const params = {
    TableName: 'quizz-o-tron-games',
    Key: {
      'id': gameId
    },
    AttributesToGet: ['doneItems']
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Done items not found.');
  } else {
    console.log(`Done items found : ${JSON.stringify(result.Item.doneItems)}`);
  }

  return { id: gameId, doneItems: result.Item.doneItems };
})

const getIsSomeoneBuzzing = han.handler(async (gameId) => {
  const params = {
    TableName: 'quizz-o-tron-games',
    Key: {
      'id': gameId
    },
    AttributesToGet: ['players']
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Players not found.');
  } else {
    console.log(`Players found : ${JSON.stringify(result.Item.players)}`);
  }

  let players = result.Item.players
  let buzzPlayer = null
  for(let [key, value] of Object.entries(players)) {
    if (value.status === 'buzz') buzzPlayer = key
  }
  return {bool: Object.values(players).some(p => p.status === 'buzz'), player: buzzPlayer}

})


module.exports = { getGame, getPlayers, getGameState, getDoneItems, getIsSomeoneBuzzing };
