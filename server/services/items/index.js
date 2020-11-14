'use strict';
const getItem = require('./get');
const putItem = require('./put');
const { itemTypes } = require('../../../libs/enums');

const getItems = async (req, res) => {
    if (req.query.itemType && itemTypes.includes(req.query.itemType)) {
      const result = await getItem.getItemByType(req.query.itemType);
      if (!result) res.status(404).json({});
      res.json(result);
    }
    else {
      res.status(404).send("NOT_FOUND");
    }
}

const getItemWithId = async (req, res) => {
    const result = await getItem.getItem(req.params.itemId);
    if (!result) return res.status(404).json({});

    return res.json(result);
}

const createItem = async (req, res) => {
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
}

module.exports = {
    getItems: getItems, 
    getItemWithId: getItemWithId,
    createItem: createItem
}