const express = require('express');
const router = express.Router();
const FavoriteFoodsController = require('../../../controllers/favorite-foods-controller');

router.get('/', FavoriteFoodsController.index);

module.exports = router;
