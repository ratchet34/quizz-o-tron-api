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

  if (!result.Attributes) {
    throw new Error('Game not found.');
  } else {
    console.log(`Game found : ${JSON.stringify(result.Attributes)}`);
  }
  
  return { id: gameId, host: result.Attributes.host, seed: result.Attributes.seed, currentItem: result.Attributes.currentItem, players: result.Attributes.players, state: result.Attributes.state };
})

const updatePlayerStatus = han.handler(async ({gameId, username, status}) => {
  var params = {
    TableName: 'quizz-o-tron-games',
    Key:{
        'id': gameId
    },
    UpdateExpression: `SET #pl.#user.#status = :status`,
    ConditionExpression: `attribute_exists(#pl.#user)`,
    ExpressionAttributeNames: {
      '#pl': 'players',
      '#user': username,
      '#status': 'status'
    },
    ExpressionAttributeValues: {
      ':status': status
    },
    ReturnValues:"ALL_NEW"
  };

  console.log(`inside updatePlayer, params: ${JSON.stringify(params)}`);

  const result = await dynamoDb.update(params);

  if (!result.Attributes) {
    throw new Error('Update failed');
  } else {
    console.log(`Update successful : ${JSON.stringify(result.Attributes.players)}`);
  }

  console.log('end of updatePlayer');
  
  return { id: gameId, players: result.Attributes.players };
})

const updateStatus = han.handler(async ({gameId, username, state}) => {
  var params = {
    TableName: 'quizz-o-tron-games',
    Key:{
        'id': gameId
    },
    UpdateExpression: `SET state = ${state}`,
    ConditionExpression: `host=:host`,
    ExpressionAttributeValues: {
      ':host' : username
    },
    ReturnValues:"ALL_NEW"
  };

  const result = await dynamoDb.update(params);

  if (!result.Attributes) {
    throw new Error('Update failed');
  } else {
    console.log(`Update successful : ${result.Attributes}`);
  }
  
  return { id: gameId, state: result.Attributes.state };
})

module.exports = { joinGameWithId, updatePlayerStatus, updateStatus };
