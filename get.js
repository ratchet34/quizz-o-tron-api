const handler = require('./libs/handler-lib');
const { get } = require('./libs/dynamo-lib');

console.log('got in get.js');

const getItem = handler(async (item) => {
  console.log('got in getItem function');
  const params = {
    TableName: 'quizz-o-tron-items',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      id: item
    }
  };

  const result = await get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  // Return the retrieved item
  return result.Item;
});

export default getItem;
