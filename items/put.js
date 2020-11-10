const han = require('../libs/handler-lib');
const dynamoDb = require('../libs/dynamodb-lib');

const putItem = han.handler(async (item) => {
  const params = {
    TableName: 'quizz-o-tron-items',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Item: item
  };

  const result = await dynamoDb.put(params);

  return result;
});

module.exports = { putItem };
