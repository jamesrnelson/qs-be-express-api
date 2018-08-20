const express = require('express');
const router = express.Router();
const MealsController = require('../../../controllers/meals-controller');

router.get('/', MealsController.index);

module.exports = router;
