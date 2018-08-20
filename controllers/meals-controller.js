const Meal = require('../models/meal');
const pry = require('pryjs');

class MealsController {
  static index(request, response, next) {
    Meal.all()
    .then(meals => response.json(meals));
  }

  static show(request, response, next) {
    let meal = Meal.find(request.params.id)
    .then(meal => {
      if (meal[0]) {
        response.json(meal[0]);
      } else {
        response.sendStatus(404);
      }
    });
  }
}

module.exports = MealsController;
