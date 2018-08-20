const Meal = require('../models/meal');
const pry = require('pryjs');

class MealsController {
  static index(request, response, next) {
    Meal.all()
    .then(meals => response.json(meals));
  }

  static show(request, response, next) {
    let meal = Meal.find(request.params.id)
    .then(meal => response.json(meal));
  }
}

module.exports = MealsController;
