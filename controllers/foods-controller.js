const Food = require('../models/food');

class FoodsController {
  static index(request, response, next) {
    Food.all()
    .then(foods => response.json(foods));
  }

}

module.exports = FoodsController;
