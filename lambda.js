const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

console.log('got in lambda.js');
console.log(app);
const server = awsServerlessExpress.createServer(app);
console.log(server);

exports.handler = (event, context, callback) => {
  awsServerlessExpress.proxy(server, event, context).on('error', (e) => {
    callback(Error(e));
  });
};
