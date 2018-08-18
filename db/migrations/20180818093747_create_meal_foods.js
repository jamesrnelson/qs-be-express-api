
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meal_foods', function(table) {
      table.increments('id');
      table.integer('meal_id');
      table.integer('food_id');

      table.foreign('meal_id')
      .references('meals.id');
      
      table.foreign('food_id')
      .references('foods.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meal_foods')
  ]);
};
