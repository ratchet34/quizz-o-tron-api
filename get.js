const { dynamoDocumentClient } = require('./helper/dynamo.js');
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

  console.log('running getItem');

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error('Item not found.');
  } else {
    console.log(`Item found : ${result.Item}`);
  }
  console.log('after await get');
  // Return the retrieved item
  return result.Item;
});

module.exports = { getItem };
