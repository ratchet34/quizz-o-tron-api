const allpaths = () => {
  let paths = {}
  Object.values(require('require-glob').sync('./docs/*.json')).forEach(path => {
    paths = {...paths, ...path}
  });
  return paths
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
