'use strict';

const
    express = require('express'),
    adminService = require('../../services/admin/index');

let router = express.Router();

router.get('/', adminService.getAdmin);
router.post('/', adminService.postAdmin);
router.patch('/', adminService.postAdmin);
router.patch('/:itemId', adminService.postAdmin);

module.exports = router;