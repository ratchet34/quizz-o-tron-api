const blob = require('require-glob');

const allpaths = () => {
  const paths = blob.sync('./docs/*.json');
  const returnPaths = {};
  Object.keys(paths).forEach((key) => {
    returnPaths[`/${key}`] = { ...paths[key] };
  });
  console.log('returnPaths', returnPaths);
  return returnPaths;
};

const getServer = () => {
  return (process.env.NODE_ENV === 'local') ? 'http://localhost:3000/' : process.env.APIG_URL;
};
module.exports = {
  openapi: '3.0.0',

  info: {
    title: 'WIP quizz o tron api',
    version: '0.0.1'
  },
  servers: [{
    url: getServer()
  }],
  components: {
    securitySchemes: {},
    schemas: {}
  },
  paths: allpaths(),
};
