const environment = process.env.NODE_ENV || 'development';
const pry = require('pryjs');
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {
  static all() {
    return database('meals').select()
      .then((rows) => {
        let promises = rows.map((meal) => {
          return database('foods').select('foods.id', 'foods.name', 'foods.calories')
            .innerJoin('meal_foods', 'foods.id', 'meal_foods.food_id')
            .where('meal_foods.meal_id', meal.id)
            .then((foods) => {
              meal['foods'] = foods;

              return meal;
            });
        });

        return Promise.all(promises);
      });
  }

  static find(mealId) {
    return database('meals').select().where("id", mealId)
      .then((rows) => {
        let promises = rows.map((meal) => {
          return database('foods').select('foods.id', 'foods.name', 'foods.calories')
            .innerJoin('meal_foods', 'foods.id', 'meal_foods.food_id')
            .where('meal_foods.meal_id', meal.id)
            .then((foods) => {
              meal['foods'] = foods;

              return meal;
            });
        });

        return Promise.all(promises);
      });
  }
}

module.exports = Meal;
