const express = require('express');
const router = express.Router();
const FoodsController = require('../../../controllers/foods-controller');

router.get('/', FoodsController.index);
router.get('/:id', FoodsController.show);
router.post('/', FoodsController.create);
router.put('/:id', FoodsController.update);
router.delete('/:id', FoodsController.destroy);

module.exports = router;
