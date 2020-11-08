import handler from './libs/handler-lib';
import { dynamoClient, dynamoDocumentClient } from './helper/dynamo';

const dynamoDb = dynamoClient();

const getItem = handler(async (id, context) => {
  const params = {
    TableName: 'quizz-o-tron-items',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      id
    }
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  // Return the retrieved item
  return result.Item;
});

export default getItem;
