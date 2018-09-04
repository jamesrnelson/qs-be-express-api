const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs');

class Food {
  static all() {
    return database("foods").select("id", "name", "calories");
  }

  static find(id) {
    return database("foods").select("id", "name", "calories").where("id", id)
            .then(rows => rows[0]);
  }

  static create(foodName, foodCalories) {
    return database("foods").insert({ name: foodName, calories: foodCalories }, "id");
  }

  static update(foodId, newName, newCalories) {
    return database("foods")
            .where({ id: foodId })
            .update({ name: newName, calories: newCalories}, "id");
  }

  static destroy(foodId) {
    return database("foods").where({ id: foodId }).del();
  }

  static top_five() {
    return database.raw(
        "SELECT foods.*, count(meal_foods.food_id) AS times_eaten FROM foods INNER JOIN meal_foods ON foods.id = meal_foods.food_id GROUP BY foods.id ORDER BY count(meal_foods.food_id) DESC LIMIT 5"
      )
      .then(data => data.rows);
  }
}

module.exports = Food;
