const express = require('express');
const get = require('./get');

const cors = require('cors');

const app = express();
const router = express.Router();

router.use(cors());

router.get('/test', (req, res) => {
  res.send('Hello World!');
});

router.get('/item/:itemId', async (req, res) => {
  const item = await get.getItem(req.params.itemId);
  if (!item) return res.status(404).json({});

  return res.json(item.body);
});

app.use('/', router);

module.exports = app;
