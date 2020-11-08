import AWS from 'aws-sdk';
import https from 'https';

const sslAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 50,
  rejectUnauthorized: true
});
sslAgent.setMaxListeners(0);

/* AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:2d6dbc9e-b332-4633-894d-e2f35450677d',
}); */

AWS.config.update({
  region: process.env.AWS_REGION || 'eu-west-3',
  httpOptions: {
    agent: sslAgent
  }
});

export const dynamoClient = new AWS.DynamoDB();
export const dynamoDocumentClient = new AWS.DynamoDB.DocumentClient();
