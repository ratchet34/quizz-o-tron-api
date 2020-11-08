const express = require('express');
const get = require('./get');

console.log('got in app.js main');

const cors = require('cors');

const app = express();
const router = express.Router();

router.use(cors());

router.get('/test', (req, res) => {
  res.send('Hello World!');
});

router.get('/item/:id', (req, res) => {
  const item = get.getItem(req.params.id);
  console.log('got in app.js get /item');
  if (!item) return res.status(404).json({});

  return res.json(item);
});

app.use('/', router);

module.exports = app;
