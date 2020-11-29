const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');
const getItem = require('../items/get');

const getLogin = han.handler(async ({username, password}) => {
    const params = {
        TableName: 'quizz-o-tron-admin',
        Key: {
          "id" : 'adminId'
        }
    };

    const result = await dynamoDb.get(params);

    if (!result.Item) {
    throw new Error('Ids not found.');
    } else {
    console.log(`Ids found : ${result.Item}`);
    }

    if(username === result.Item.username && password === result.Item.password) {
        return true;
    }
    else {
        return false;
    }
})

const getReported = han.handler(async ({username, password}) => {
    var getLoginRes = await getLogin({username: username, password: password});
    var login = JSON.parse(getLoginRes.body);

    if(login) {
        const params = {
            TableName: 'quizz-o-tron-admin',
            Key: {
            "id" : 'reportedItems'
            }
        };

        const result = await dynamoDb.get(params);

        if (!result.Item) {
        throw new Error('Items not found.');
        } else {
        console.log(`Items found : ${JSON.stringify(result.Item)}`);
        }

        var itemsToSend = [];
        for (let i = 0; i < result.Item.items.length; i++) {
            var fullItemRes = await getItem.getItem(result.Item.items[i]);
            var fullItem = JSON.parse(fullItemRes.body);
            console.log(fullItem);
            itemsToSend.push(fullItem[0]);
        }
        return { items: itemsToSend }
    } else {
        throw new Error('Not Authorized');
    }
})

module.exports = { getLogin, getReported };
