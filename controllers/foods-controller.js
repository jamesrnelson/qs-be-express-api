const Food = require('../models/food');
const pry = require('pryjs');

class FoodsController {
  static index(request, response, next) {
    Food.all()
    .then(foods => response.json(foods));
  }

  static show(request, response, next) {
    let food = Food.find(request.params.id)
    .then(food => {
      if (food) {
        response.json(food);
      } else {
        response.sendStatus(404);
      }
    });
  }

  static create(request, response, next) {
    Food.create(request.body.food.name, request.body.food.calories)
    .then(food => Food.find(food[0]))
    .then(food => response.json(food));
  }

}

module.exports = FoodsController;
