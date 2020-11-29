'use strict';
const getAdminMod = require('./get');
const putAdminMod = require('./put');
const patchAdminMod = require('./patch');

const postAdmin = async (req, res) => {
    if(req.query.a) {
        if(req.query.a === 'login') {
            const result = await getAdminMod.getLogin({username: req.body.username, password: req.body.password});
            if (!result) return res.status(404).json({});
            return res.json(result);
        } else if (req.query.a === 'report') {
            const result = await patchAdminMod.addReportedItem({itemId: req.body.itemId});
            if (!result) return res.status(404).json({});
            return res.json(result);
        } else if(req.query.a === 'reported') {
            const result = await getAdminMod.getReported({username: req.body.username, password: req.body.password});
            if (!result) return res.status(404).json({});
            return res.json(result);
        } else if(req.query.a === 'keep') {
            if(req.params.itemId && req.body.itemType) {
                const result = await patchAdminMod.keepReportedItem({username: req.body.username, password: req.body.password, itemIndex: req.body.itemIndex, itemId: req.params.itemId, itemType: req.body.itemType});
                if (!result) return res.status(404).json({});
                return res.json(result);
            }
            else return res.status(404).json({});
        } else if(req.query.a === 'delete') {
            if(req.params.itemId && req.body.itemType) {
                const result = await patchAdminMod.deleteReportedItem({username: req.body.username, password: req.body.password, itemIndex: req.body.itemIndex, itemId: req.params.itemId, itemType: req.body.itemType});
                if (!result) return res.status(404).json({});
                return res.json(result);
            }
            else return res.status(404).json({});
        }
    }
}

const getAdmin = async (req, res) => {
    if(req.query.a) {

    }
}

module.exports = {
  getAdmin: getAdmin,
  postAdmin: postAdmin
} 