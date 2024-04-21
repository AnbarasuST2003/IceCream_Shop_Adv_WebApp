'use strict';

let express = require('express');
let controller = require('./icecream');
let router = express.Router();

router.get('/get', controller.get);

module.exports = router;