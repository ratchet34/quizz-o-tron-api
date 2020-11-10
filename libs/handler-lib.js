const handler = (lambda) => {
  return async function (event) {
    let body; let
      statusCode;

    try {
      // Run the Lambda
      body = await lambda(event);
      statusCode = 200;
    } catch (e) {
      body = { error: e.message };
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      /*headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE"
      },*/
    };
  };
};

module.exports = { handler };
