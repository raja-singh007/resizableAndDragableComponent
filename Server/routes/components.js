const express = require('express');
const router = express.Router();
const compCtrl = require('../controllers/components')

router
    .route('/')
    .get(compCtrl.dataGet)
    .post(compCtrl.dataAdd)
    .put(compCtrl.dataUpdate)
    .delete(compCtrl.dataDel)

module.exports= router;