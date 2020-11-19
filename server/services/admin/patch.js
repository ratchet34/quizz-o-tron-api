const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');

const addReportedItem = han.handler(async ({itemId}) => {

    var params = {
      TableName: 'quizz-o-tron-admin',
      Key:{
          'id': 'reportedItems'
      },
      UpdateExpression: `SET #i = list_append(if_not_exists(#i, :empty_list), :item)`,
      ExpressionAttributeNames: {
        '#i': 'items',
      },
      ExpressionAttributeValues: {
        ':empty_list': [],
        ':item': [itemId]
      },
      ReturnValues:"ALL_NEW"
    };
  
    const result = await dynamoDb.update(params);
  
    if (!result.Attributes) {
      throw new Error('Update reported failed');
    } else {
      console.log(`Update reported successful : ${result.Attributes}`);
    }
    
    return { items: result.Attributes.items };
  
  });

  const deleteReportedItem = han.handler(async ({itemIndex, itemId}) => {

    var params = {
        TableName: 'quizz-o-tron-items',
        Key:{
            'id': itemId
        },
        ReturnValues:"ALL_NEW"
      };

    const resultDel = await dynamoDb.delete(params);

    var params2 = {
      TableName: 'quizz-o-tron-admin',
      Key:{
          'id': 'reportedItems'
      },
      UpdateExpression: `REMOVE #i[${itemIndex}]`,
      ExpressionAttributeNames: {
        '#i': 'items',
      },
      ReturnValues:"ALL_NEW"
    };
  
    const result = await dynamoDb.update(params2);
  
    if (!result.Attributes) {
      throw new Error('Delete reported failed');
    } else {
      console.log(`Delete reported successful : ${result.Attributes}`);
    }
    
    return { items: result.Attributes.items };
  
  });

  const keepReportedItem = han.handler(async ({itemIndex, itemId}) => {

    var params = {
      TableName: 'quizz-o-tron-admin',
      Key:{
          'id': 'reportedItems'
      },
      UpdateExpression: `REMOVE #i[${itemIndex}]`,
      ExpressionAttributeNames: {
        '#i': 'items',
      },
      ReturnValues:"ALL_NEW"
    };
  
    const result = await dynamoDb.update(params);
  
    if (!result.Attributes) {
      throw new Error('Delete reported failed');
    } else {
      console.log(`Delete reported successful : ${result.Attributes}`);
    }
    
    return { items: result.Attributes.items };
  
  });

  module.exports = { addReportedItem, deleteReportedItem, keepReportedItem };
