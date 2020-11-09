const { dynamoDocumentClient } = require('../helper/dynamo.js');

const client = dynamoDocumentClient;

module.exports = {
  get: params => client.get(params).promise(),
  put: params => client.put(params).promise(),
  query: params => client.query(params).promise(),
  update: params => client.update(params).promise(),
  delete: params => client.delete(params).promise(),
  scan: params => client.scan(params).promise(),
};
