const Food = require('../models/food');
const pry = require('pryjs');

class RecipesController {
  static index(request, response, next) {
    let food = Food.find(request.params.id)
    let food_name = food.name
    fetch(`http://api.yummly.com/v1/api/recipes?_app_id=4d31de00&_app_key=e660bdff4ade5b248a3ea3b64720dd8e&q=${food_name}`)
    .then((response) => {
      response.matches.map
    })
  }
}
