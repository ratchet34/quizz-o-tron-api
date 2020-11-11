const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');


const joinGameWithId = han.handler(async ({gameId, username}) => {
  var params = {
    TableName: 'quizz-o-tron-games',
    Key:{
        'id': gameId
    },
    UpdateExpression: `SET players.${username} = if_not_exists(players.${username}, :p)`,
    ExpressionAttributeValues: {
      ':p' : {points: 0, status: "joining"}
    },
    ReturnValues:"ALL_NEW"
  };

  const result = await dynamoDb.update(params);

  console.log(JSON.stringify(result));
  if (!result.Attributes) {
    throw new Error('Game not found.');
  } else {
    console.log(`Game found : ${result.Attributes}`);
  }
  // Return the retrieved item
  return { id: gameId, host: result.Attributes.host, seed: result.Attributes.seed, currentItem: result.Attributes.currentItem, players: result.Attributes.players, state: result.Attributes.state };
})

module.exports = { joinGameWithId };
