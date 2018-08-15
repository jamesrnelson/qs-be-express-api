const express = require('express');
const router = express.Router();
const FoodsController = require('../../../controllers/foods-controller');

router.get('/', FoodsController.index);
router.get('/:id', FoodsController.show)

module.exports = router;
