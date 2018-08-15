const express = require('express');
const router = express.Router();
const FoodsController = require('../../../controllers/foods-controller');

router.get('/', FoodsController.index);

module.exports = router;
