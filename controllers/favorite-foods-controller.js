const Food = require('../models/food');
const MealFood = require('../models/meal-food');
const pry = require('pryjs');

class FavoriteFoodsController {
  static index(request, response, next) {
    Food.top_five()
    .then(rows => {
      var rankingArray = [];
      rows.map((food) => {
        if (rankingArray.length == 0) {
          let ranking = {};
          let newFood = {};
          ranking.timesEaten = food.times_eaten;
          newFood.name = food.name;
          newFood.calories = food.calories;
          ranking.foods = [];
          ranking.foods.push(newFood);
          rankingArray.push(ranking);
        } else {
          if (rankingArray[rankingArray.length - 1].timesEaten == food.times_eaten) {
            let newFood = {};
            newFood.name = food.name;
            newFood.calories = food.calories;
            rankingArray[rankingArray.length - 1].foods.push(newFood);
          } else {
            let ranking = {};
            let newFood = {};
            ranking.timesEaten = food.times_eaten;
            newFood.name = food.name;
            newFood.calories = food.calories;
            ranking.foods = [];
            ranking.foods.push(newFood);
            rankingArray.push(ranking);
          }
        }
      });
      return rankingArray;
    })
    .then(rankingArray => response.json(rankingArray));
  }
}

module.exports = FavoriteFoodsController;
