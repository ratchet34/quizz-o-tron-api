const express = require('express');
const getItem = require('./items/get');
const putItem = require('./items/put');
const getGame = require('./games/get');
const putGame = require('./games/put');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs.js');

router.use(cors());
router.use(bodyParser.json());
router.use((req, res, next) => {
  console.log('received method:' + req.method);
  console.log('received body:' + JSON.stringify(req.body));
  console.log('received params:' + JSON.stringify(req.params));
  console.log('received query:' + JSON.stringify(req.query));
  next();
})

router.get('/up', (req, res) => {
  res.send('Hello World!');
});

router.get('/item/:itemId', async (req, res) => {
  const item = await getItem.getItem(req.params.itemId);
  if (!item) return res.status(404).json({});

  return res.json(item.body);
});

router.get('/item', async (req, res) => {
  if (req.query.itemType === 'audio') {
    const item = await getItem.getItemByType(req.query.itemType);
    if (!item) return res.status(404).json({});

    return res.json(item.body);
  }
});

router.post('/item', async (req, res) => {
  const item = {
    id: req.body.id,
    type: req.body.type,
    time: req.body.time,
    answerTime: req.body.answerTime,
    from: req.body.from
  };

  if ('title' in req.body) {
    item.title = req.body.title;
  }
  if ('artist' in req.body) {
    item.artist = req.body.artist;
  }
  if ('origin' in req.body) {
    item.origin = req.body.origin;
  }

  const result = await putItem.putItem(item);
  return res.json(result);
});

router.get('/game/:gameId', async (req, res) => {
  const game = await getGame.getGame(req.params.gameId);
  if (!game) return res.status(404).json({});

  return res.json(game.body);
});

router.post('/game', async (req, res) => {
  var game = {};
  if(req.body && req.body.host && req.body.gameType) {
    game.host = req.body.host;
    game.gameType = req.body.gameType;
    const result = await putGame.putGame(game);
    return res.json(result);
  }
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);

module.exports = app;
