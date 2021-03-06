const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs');

class MealFood {
  static find(foodId) {
    return database("meal_foods")
      .select()
      .where({ food_id: foodId })
  }

  static create(params) {
    return database("meal_foods")
      .insert({ meal_id: params.meal_id, food_id: params.id })
      .returning(['meal_id', 'food_id']);
  }

  static destroy(params) {
    return database("meal_foods")
      .where({ meal_id: params.meal_id, food_id: params.id })
      .del();
  }
}

module.exports = MealFood;
