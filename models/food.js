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
}

module.exports = Food;
