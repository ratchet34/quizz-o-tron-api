import express from 'express';
import { dynamoClient, dynamoDocumentClient } from './helper/dynamo';

const dynamoDb = dynamoClient;

const getItem = (itemId) => {
  console.log(`getItem: ${itemId}`);
  const params = {
    TableName: 'quizz-o-tron-items',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      id: itemId
    }
  };

  const result = dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  // Return the retrieved item
  return result.Item;
};

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/id/:id', (req, res) => {
  const item = getItem(req.params.id);

  if (!item) return res.status(404).json({});

  return res.json(item);
});

app.listen(3000, () => {
  console.log('Ready');
});
