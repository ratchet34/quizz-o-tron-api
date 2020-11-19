const han = require('../../../libs/handler-lib');
const dynamoDb = require('../../../libs/dynamodb-lib');

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
        console.log(`Items found : ${result.Item}`);
        }

        return { items: result.Item.items }
    } else {
        throw new Error('Not Authorized');
    }
})

module.exports = { getLogin, getReported };
