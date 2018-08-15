const Food = require('../models/food');

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

}

module.exports = FoodsController;
