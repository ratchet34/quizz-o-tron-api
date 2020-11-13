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
  
  return { id: result.Item.id, host: result.Item.host, seed: result.Item.seed, currentItem: result.Item.currentItem, players: result.Item.players, state: result.Item.state };
});

const getPlayers = han.handler(async (gameId) => {
  const params = {
    TableName: 'quizz-o-tron-games',
    KeyConditionExpression: '#id = :gameId',
    ExpressionAttributeNames: {
      '#id': 'id'
    },
    ExpressionAttributeValues: {
      ':gameId': gameId
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
    KeyConditionExpression: '#id = :gameId',
    ExpressionAttributeNames: {
      '#id': 'id'
    },
    ExpressionAttributeValues: {
      ':gameId': gameId
    },
    AttributesToGet: ['state']
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Game not found.');
  } else {
    console.log(`State found : ${result.Item}`);
  }

  return { id: gameId, state: result.Item.state };
});


module.exports = { getGame, getPlayers, getGameState };
