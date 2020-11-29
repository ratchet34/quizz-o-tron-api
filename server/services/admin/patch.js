const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');
const getAdmin = require('./get');
const getItem = require('../items/get');

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

  const deleteReportedItem = han.handler(async ({username, password, itemIndex, itemId, itemType}) => {
    var getLoginRes = await getAdmin.getLogin({username: username, password: password});
    var login = JSON.parse(getLoginRes.body);

    if(login) {
      var params = {
          TableName: 'quizz-o-tron-items',
          Key:{
              'id': itemId,
              'itemType': itemType,
          },
          ReturnValues:"NONE"
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
    
      if (!result) {
        throw new Error('Delete reported failed');
      } else {
        console.log(`Delete reported successful : ${result.Attributes}`);
      }
      
      var itemsToSend = [];
      for (let i = 0; i < result.Attributes.items.length; i++) {
          var fullItemRes = await getItem.getItem(result.Attributes.items[i]);
          var fullItem = JSON.parse(fullItemRes.body);
          console.log(fullItem);
          itemsToSend.push(fullItem[0]);
      }
      return { items: itemsToSend }
    } else {
      throw new Error('Not Authorized');
    }
  });

  const keepReportedItem = han.handler(async ({username, password, itemIndex, itemId, itemType}) => {
    var getLoginRes = await getAdmin.getLogin({username: username, password: password});
    var login = JSON.parse(getLoginRes.body);

    if(login) {
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
        throw new Error('Keep reported failed');
      } else {
        console.log(`Keep reported successful : ${result.Attributes}`);
      }
      
      var itemsToSend = [];
      for (let i = 0; i < result.Attributes.items.length; i++) {
          var fullItemRes = await getItem.getItem(result.Attributes.items[i]);
          var fullItem = JSON.parse(fullItemRes.body);
          console.log(fullItem);
          itemsToSend.push(fullItem[0]);
      }
      return { items: itemsToSend }
    } else {
      throw new Error('Not Authorized');
    }
  });

  module.exports = { addReportedItem, deleteReportedItem, keepReportedItem };
