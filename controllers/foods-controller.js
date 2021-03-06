const Food = require('../models/food');
const MealFood = require('../models/meal-food');
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
    const food = request.body.food;

    for (let requiredParameter of ['name', 'calories']) {
      if (!food[requiredParameter]) {
        return response
          .status(400)
          .send({ error: `Expected format: { name: <String>, calories: <Integer> }. You're missing a "${requiredParameter}" property.` });
      }
    }

    Food.create(food.name, food.calories)
    .then(food => Food.find(food[0]))
    .then(food => response.json(food));
  }

  static update(request, response, next) {
    let newAttributes = request.body.food

    for (let requiredParameter of ['name', 'calories'])
      if (!newAttributes[requiredParameter]) {
        return response.sendStatus(400);
      }

    Food.update(request.params.id, newAttributes.name, newAttributes.calories)
    .then(updatedFood => Food.find(updatedFood[0]))
    .then(retrievedFood => response.json(retrievedFood));
  }

  static destroy(request, response, next) {
    let foodId = request.params.id
    MealFood.find(foodId)
    .then(mealFood => {
      if (mealFood.length > 0) {
        response.sendStatus(404);
      } else {
        Food.destroy(foodId)
        .then((destroyedFood) => {
          if (destroyedFood) {
            response.sendStatus(204);
          } else {
            response.sendStatus(404);
          }
        })
      }
    })
  }

}

module.exports = FoodsController;
