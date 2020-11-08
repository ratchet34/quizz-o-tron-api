import express from 'express';
import getItem from './get';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/id/:id', (req, res) => {
  const item = getItem(req.params.id);

  if (!item) return res.status(404).json({});

  return res.json(item);
});
