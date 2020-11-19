const seedrandom = require('seedrandom');
const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');
const getGames = require('./get');
const getItem = require('../items/get');
const { gameStates, itemTypes, stateStartItem, stateNextItem } = require('../../../libs/vars');
const { _ } = require('underscore');


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

  const result = await dynamoDb.update(params);

  if (!result.Attributes) {
    throw new Error('Update failed');
  } else {
    var countPlayerByStatus = _.countBy(Object.entries(result.Attributes.players).map(x => x[1].status), (i) => i);
    var playerCount = Object.entries(result.Attributes.players).length;
    var currGameStateRes = await getGames.getGameState(gameId);
    var currGameState = JSON.parse(currGameStateRes.body).state;
    if ( countPlayerByStatus.player_ready === playerCount && currGameState === gameStates[1] ) {
      await updateStatus({gameId: gameId, username: 'admin_user', state: 'next'});
    } else if ( countPlayerByStatus.item_running === playerCount && currGameState === gameStates[3] ) {
      await updateStatus({gameId: gameId, username: 'admin_user', state: 'next'});
    } else if ( countPlayerByStatus.player_ready === playerCount && currGameState === gameStates[4] ) {
      await updateStatus({gameId: gameId, username: 'admin_user', state: 'next'});
    }
  }

  console.log('end of updatePlayer');
  
  return { id: gameId, players: result.Attributes.players };
})

const updateStatus = han.handler(async ({gameId, username, state}) => {

  var currGameStateRes = await getGames.getGameState(gameId);
  var currGameState = JSON.parse(currGameStateRes.body).state;
  var newState = '';

  if(state === 'next' && currGameState === gameStates[stateNextItem]) {
    newState = gameStates[stateStartItem];
  }
  else if(state === 'next' && currGameState !== gameStates[stateNextItem]) {
    newState = gameStates[gameStates.indexOf(currGameState)+1];
  }
  else if(state === 'end') {
    newState = gameStates[gameStates.length - 1];
  }
  else {
    throw new Error('Impossible State Case');
  }

  var params = {
    TableName: 'quizz-o-tron-games',
    Key:{
        'id': gameId
    },
    UpdateExpression: `SET #state = :ns`,
    ExpressionAttributeNames: {
      '#state': 'state'
    },
    ExpressionAttributeValues: {
      ':ns': newState
    },
    ReturnValues:"ALL_NEW"
  };

  const result = await dynamoDb.update(params);

  if (!result.Attributes) {
    console.log('Update failed');
    throw new Error('Update failed');
  } else {
    //if(newState === gameStates[2] || newState === gameStates[stateNextItem]) {
    if(newState === gameStates[stateStartItem]) {
      console.log('go next item');
      await nextItem({gameId: gameId, username: username, itemType: result.Attributes.itemType});
    }
    console.log(`Update successful : ${result.Attributes}`);
  }
  
  return { id: gameId, state: result.Attributes.state };
});

const updateItemType = han.handler(async ({gameId, username, itemType}) => {
  console.log(itemType);
  var params = {
    TableName: 'quizz-o-tron-games',
    Key:{
        'id': gameId
    },
    UpdateExpression: `SET #it = :it`,
    ConditionExpression: `host=:host`,
    ExpressionAttributeNames: {
      '#it': 'itemType'
    },
    ExpressionAttributeValues: {
      ':it': itemType,
      ':host': username
    },
    ReturnValues:"ALL_NEW"
  };

  const result = await dynamoDb.update(params);

  if (!result.Attributes) {
    throw new Error('Update failed');
  } else {
    console.log(`Update successful : ${result.Attributes}`);
  }
  
  return { id: gameId, itemType: result.Attributes.itemType };
});

const removePlayer = han.handler(async ({gameId, username}) => {
  var params = {
    TableName: 'quizz-o-tron-games',
    Key:{
        'id': gameId
    },
    UpdateExpression: `REMOVE #pl.#user`,
    ConditionExpression: `attribute_exists(#pl.#user)`,
    ExpressionAttributeNames: {
      '#pl': 'players',
      '#user': username
    },
    ReturnValues:"ALL_NEW"
  };

  const result = await dynamoDb.update(params);

  if (!result.Attributes) {
    throw new Error('Update failed');
  } else {
    console.log(`Update successful : ${result.Attributes}`);
  }
  
  return { id: gameId, players: result.Attributes.players };
});

const nextItem = han.handler(async ({gameId, username}) => {
  var gameRes = await getGames.getGame(gameId);
  var game = JSON.parse(gameRes.body);

  const saveable = seedrandom('', {state: game.randomState});

  if (username === game.host || username === 'admin_user') {
    //const items = game.customItems[game.itemType]?game.customItems[game.itemType]:await getItem.getItemByType(game.itemType).body;
    var items = [];
    if (game.itemType in game.customItems) {
      items = game.customItems;
    }
    else {
      var itemsRes = await getItem.getItemByType(game.itemType);
      items = JSON.parse(itemsRes.body);
    }
    var doneItemsRes = await getGames.getDoneItems(gameId);
    var doneItems = JSON.parse(doneItemsRes.body).doneItems;

    //Ajouter vérif item déjà fait
    var randomIndex = Math.floor(saveable() * items.length);
    
    while (doneItems.includes(items[randomIndex].id)) {
      randomIndex = Math.floor(saveable() * items.length);
    }
    
    game.currentItem = items[randomIndex];

    addToDoneItems({gameId: gameId, itemId: game.currentItem.id});

    var newRandomState = saveable.state();
    var params = {
      TableName: 'quizz-o-tron-games',
      Key:{
          'id': gameId
      },
      UpdateExpression: `SET #ci = :ci, #rs = :rs`,
      ExpressionAttributeNames: {
        '#ci': 'currentItem',
        '#rs': 'randomState'
      },
      ExpressionAttributeValues: {
        ':ci': game.currentItem,
        ':rs': newRandomState
      },
      ReturnValues:"ALL_NEW"
    };

    const result = await dynamoDb.update(params);

    if (!result.Attributes) {
      throw new Error('Next item failed');
    } else {
      console.log(`Next item successful : ${result.Attributes}`);
    }
    
    return { id: gameId, currentItem: result.Attributes.currentItem, randomState: result.Attributes.randomState };
  } else {
    throw new Error('You are not the host of the game');
  }
});

const addToDoneItems = han.handler(async ({gameId, itemId}) => {
  console.log('doneItemId: ' + itemId);
  var params = {
    TableName: 'quizz-o-tron-games',
    Key:{
        'id': gameId
    },
    UpdateExpression: `SET #di = list_append(if_not_exists(#di, :empty_list), :item)`,
    ExpressionAttributeNames: {
      '#di': 'doneItems',
    },
    ExpressionAttributeValues: {
      ':empty_list': [],
      ':item': itemId
    },
    ReturnValues:"ALL_NEW"
  };

  const result = await dynamoDb.update(params);

  if (!result.Attributes) {
    throw new Error('Add to done failed');
  } else {
    console.log(`Add to done successful : ${result.Attributes}`);
  }
  
  return { id: gameId, doneItems: result.Attributes.doneItems };

})

const setCustomItems = han.handler(async ({gameId, username, customItems, itemType}) => {
  
  if (itemTypes.includes(itemType)) {

    var params = {
      TableName: 'quizz-o-tron-games',
      Key:{
          'id': gameId
      },
      UpdateExpression: `SET #ci.#it = :ci`,
      ConditionExpression: `#h = :u`,
      ExpressionAttributeNames: {
        '#ci': 'customItems',
        '#it': itemType,
        '#h': 'host',
      },
      ExpressionAttributeValues: {
        ':ci': customItems,
        ':u': username,
      },
      ReturnValues:"ALL_NEW"
    };

    const result = await dynamoDb.update(params);

    if (!result.Attributes) {
      throw new Error('Update failed');
    } else {
      console.log(`Update successful : ${result.Attributes}`);
    }
    
    return { id: gameId, customItems: result.Attributes.customItems };
  } else {
    throw new Error('ItemType does not exists');
  }
});

module.exports = {
  joinGameWithId,
  updatePlayerStatus,
  updateStatus,
  removePlayer,
  nextItem,
  setCustomItems,
  updateItemType
};
