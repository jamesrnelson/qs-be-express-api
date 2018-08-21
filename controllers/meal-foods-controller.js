const MealFood = require('../models/meal-food');
const Food = require('../models/food')
const Meal = require('../models/meal')
const pry = require('pryjs');

class MealFoodsController {
  static create(request, response, next) {
    const promises = [
      Meal.find(request.params.meal_id),
      Food.find(request.params.id)
    ]

    MealFood.create(request.params)
    .then((newMealFood) => {
      Promise.all(promises)
      .then((data) => {
        let message = { "message": `Successfully added ${data[1].name} to ${data[0][0].name}` }
        response.status(201).json(message);
      });
    });
  }

  static destroy(request, response, next) {
    const promises = [
      Meal.find(request.params.meal_id),
      Food.find(request.params.id)
    ]

    MealFood.destroy(request.params)
      .then((destroyedMealFood) => {
        Promise.all(promises)
        .then((data) => {
          let message = { "message": `Successfully removed ${data[1].name} from ${data[0][0].name}` }
          response.status(201).json(message);
        });
      });
  }
}

module.exports = MealFoodsController;
