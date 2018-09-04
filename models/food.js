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
      "SELECT foods.*, count(meal_foods.food_id) AS times_eaten, meals.name AS meal_name FROM foods INNER JOIN meal_foods ON foods.id = meal_foods.food_id INNER JOIN meals ON meal_foods.meal_id = meals.id GROUP BY meal_name, foods.id ORDER BY count(meal_foods.food_id) DESC LIMIT 5"
    )
    .then(data => data.rows)
    .then((rows) => {
      let rankingData = rows.map((food) => {
        let ranking = {}
        ranking.timesEaten = food.times_eaten;
        ranking.name = food.name;
        ranking.calories = food.calories;
        let mealPromises = database.raw(
          "SELECT meals.* FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id WHERE meal_foods.food_id = ?", [food.id]
        )
        .then((data) => {
          let mealNames = data.rows.map((meal) => {
            return meal.name
          })
          return Promise.all(mealNames)
        });
        ranking.mealsWhenEaten = Promise.all(mealPromises)
        return ranking
      });
      return Promise.all(rankingData);
    });
  }

  static findEachMeal(foodId) {
    return database.raw(
      "SELECT meals.* FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id WHERE meal_foods.food_id = ?", [foodId]
    )
    .then(data => data.rows)
    .then((rows) => {
      let promises = rows.map((meal) => {
        return meal.name;
      });
      return Promise.all(promises)
    });
  }
}

module.exports = Food;

// "SELECT * FROM meal_foods INNER JOIN meals ON meal_foods.meal_id = meals.id WHERE meal_foods.food_id "
