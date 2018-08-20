const express = require('express');
const router = express.Router();
const MealsController = require('../../../controllers/meals-controller');

router.get('/', MealsController.index);
router.get('/:id/foods', MealsController.show);

module.exports = router;
