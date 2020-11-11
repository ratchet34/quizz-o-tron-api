'use strict';

const
    express = require('express'),
    itemService = require('../../services/items/index');

let router = express.Router();

router.get('/', itemService.getItems);
router.get('/:itemId', itemService.getItemWithId);
router.post('/', itemService.createItem);

module.exports = router;