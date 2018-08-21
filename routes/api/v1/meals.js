const express = require('express');
const router = express.Router();
const MealsController = require('../../../controllers/meals-controller');
const MealFoodsController = require('../../../controllers/meal-foods-controller');

router.get('/', MealsController.index);
router.get('/:id/foods', MealsController.show);
router.post('/:meal_id/foods/:id', MealFoodsController.create);
router.delete('/:meal_id/foods/:id', MealFoodsController.destroy);

module.exports = router;
