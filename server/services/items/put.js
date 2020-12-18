const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');

const putItem = han.handler(async (item) => {
  const newItem = {
    id: req.body.id,
    itemType: req.body.itemType,
    time: req.body.to,
    answerTime: req.body.answer,
    from: req.body.from
  };

  if ('title' in req.body && req.body.title !== '') {
    newItem.title = req.body.title;
  }
  if ('artist' in req.body && req.body.artist !== '') {
    newItem.artist = req.body.artist;
  }
  if ('origin' in req.body && req.body.origin !== '') {
    newItem.origin = req.body.origin;
  }
  const params = {
    TableName: 'quizz-o-tron-items',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Item: newItem
  };

  const result = await dynamoDb.put(params);
  if (!result) {
    console.log(result);
    throw new Error('Items not found.');
  } else {
    console.log(`Item add`);
  }

  return result;
});

module.exports = { putItem };
