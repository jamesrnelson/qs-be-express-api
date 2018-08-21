const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs');

class MealFood {
  static create(params) {
    return database("meal_foods")
      .insert({ meal_id: params.meal_id, food_id: params.id })
      .returning(['meal_id', 'food_id'])
  }
}

module.exports = MealFood;
