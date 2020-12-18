'use strict';
const getItem = require('./get');
const putItem = require('./put');
const { itemTypes } = require('../../../libs/vars');

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
  if(Array.isArray(req.body) && req.body.length> 1) {
    req.body.forEach(async item => {
      const result = await putItem.putItem(item);
      return res.json(result);
    });
    return res.json('Batch Import OK');
  } else {  
    const result = await putItem.putItem(req.body);
    return res.json(result);
  }
}

module.exports = {
    getItems: getItems, 
    getItemWithId: getItemWithId,
    createItem: createItem
}