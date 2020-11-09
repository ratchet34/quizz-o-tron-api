const han = require('./libs/handler-lib');
const dynamoDb = require('./libs/dynamodb-lib');

const getItem = han.handler(async (itemId) => {
  const params = {
    TableName: 'quizz-o-tron-items',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      id: itemId
    }
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Item not found.');
  } else {
    console.log(`Item found : ${result.Item}`);
  }
  // Return the retrieved item
  return result.Item;
});

const getItemByType = han.handler(async (itemType) => {
  const params = {
    TableName: 'quizz-o-tron-items',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: 'type = :itemType',
    ExpressionAttributeValues: {
      ':itemType': itemType
    }
  };

  const result = await dynamoDb.query(params);

  if (!result.Items) {
    throw new Error('Item not found.');
  } else {
    console.log(`Items found : ${result.Items}`);
  }
  // Return the retrieved item
  return result.Items;
});

module.exports = { getItem, getItemByType };
