const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');

const getItem = han.handler(async (itemId) => {
  const params = {
    TableName: 'quizz-o-tron-items',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    KeyConditionExpression: '#id = :itemId',
    ExpressionAttributeNames: {
      '#id': 'id'
    },
    ExpressionAttributeValues: {
      ':itemId': itemId
    }
  };

  const result = await dynamoDb.query(params);

  if (result.Items.length === 0) {
    throw new Error('Item not found.');
  } else {
    console.log(`Item found : ${result.Items.length}`);
  }
  // Return the retrieved item
  return result.Items;
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
    FilterExpression: '#itemType = :itemType',
    ExpressionAttributeNames: { '#itemType': 'itemType' },
    ExpressionAttributeValues: { ':itemType': itemType }
  };

  const result = await dynamoDb.scan(params);

  if (!result.Items) {
    console.log(result);
    throw new Error('Item not found.');
  } else {
    console.log(`Items found : ${result.Items.length}`);
  }
  // Return the retrieved item
  return result.Items;
});

const getAllItemIds = han.handler(async () => {
  const params = {
    TableName: 'quizz-o-tron-items',
    AttributesToGet: ['id']
  }

  const result = await dynamoDb.scan(params);

  if (!result.Items) {
    console.log(result);
    throw new Error('Items not found.');
  } else {
    console.log(`Items found`);
  }
  // Return the retrieved item
  return result.Items;
})

module.exports = { getItem, getItemByType, getAllItemIds };
