const dyn = require('./helper/dynamo.js');

console.log('got in get.js');
const dynamoDb = dyn.dynamoClient;

const getItem = (id) => {
  console.log('got in getItem function');
  const params = {
    TableName: 'quizz-o-tron-items',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      id
    }
  };

  const result = dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  // Return the retrieved item
  return result.Item;
};

export default getItem;
