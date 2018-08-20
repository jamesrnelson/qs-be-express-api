
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meal_foods').del()
    .then(() => knex('meals').del())
    .then(() => knex('foods').del())
    .then(() => {
      return Promise.all([
        knex.raw(
        'INSERT INTO meals (name) VALUES (?)',
        ["Breakfast"]
        ),
        knex.raw(
        'INSERT INTO meals (name) VALUES (?)',
        ["Snack"]
        ),
        knex.raw(
        'INSERT INTO meals (name) VALUES (?)',
        ["Lunch"]
        ),
        knex.raw(
        'INSERT INTO meals (name) VALUES (?)',
        ["Dinner"]
        )
      ]);
    })
    .then(() => {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Banana", 150]
          ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Yogurt", 550]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Apple", 220]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Gum", 50]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Cheese", 400]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Bagel Bites - Four Cheese", 650]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Chicken Burrito", 800]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Steak", 1000]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Pork Kebabs", 1200]
        )
      ]);
    })
    .then(() => {
      return Promise.all([
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [1, 1]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [1, 2]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [1, 3]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [2, 1]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [2, 4]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [2, 5]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [3, 6]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [3, 7]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [3, 3]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [4, 1]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [4, 6]
        ),
        knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [4, 7]
        )
      ]);
    });
  };
