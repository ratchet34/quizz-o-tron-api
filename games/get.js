const han = require('../libs/handler-lib');
const dynamoDb = require('../libs/dynamodb-lib');

const getGame = han.handler(async (gameId) => {
  const params = {
    TableName: 'quizz-o-tron-games',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    KeyConditionExpression: '#id = :gameId',
    ExpressionAttributeNames: {
      '#id': 'id'
    },
    ExpressionAttributeValues: {
      ':gameId': gameId
    }
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Game not found.');
  } else {
    console.log(`Game found : ${result.Item}`);
  }
  // Return the retrieved item
  return { host: result.Item.host, seed: result.Item.seed, currentItem: result.Item.currentItem, players: result.Item.players, state: result.Item.state };
});

module.exports = { getGame };
