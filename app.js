const express = require('express');
// const getItem = require('./items/get');
// const putItem = require('./items/put');
// const getGame = require('./games/get');
// const putGame = require('./games/put');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
// const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs.js');
const routes = require('./server/routes')

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`received method: ${req.method}, body : ${JSON.stringify(req.body)}, params : ${JSON.stringify(req.params)}, query : ${JSON.stringify(req.query)}`);
  next();
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

module.exports = app;