const AWS = require('aws-sdk');
const https = require('https');

const sslAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 50,
  rejectUnauthorized: true
});
sslAgent.setMaxListeners(0);

AWS.config.update({
  region: process.env.AWS_REGION || 'eu-west-3',
  httpOptions: {
    agent: sslAgent
  }
});

module.exports = {
  dynamoClient: new AWS.DynamoDB(),
  dynamoDocumentClient: new AWS.DynamoDB.DocumentClient()
};
