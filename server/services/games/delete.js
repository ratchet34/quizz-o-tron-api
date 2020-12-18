const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');

const cancelGame = han.handler(async ({gameId, username}) => {
    var params = {
      TableName: 'quizz-o-tron-games',
      Key:{
          'id': gameId
      },
      ConditionExpression: '#h = :u',
      ExpressionAttributeNames: {
        '#h': 'host'
      },
      ExpressionAttributeValues: {
        ':u': username
      }
    };
  
    const result = await dynamoDb.delete(params);
  
    return {gameId, username};
  });

  module.exports = {
    cancelGame,
  };
  