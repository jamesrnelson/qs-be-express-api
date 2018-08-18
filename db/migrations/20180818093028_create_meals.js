
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meals', function (table) {
      table.increments('id');
      table.string('name');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meals')
  ]);
};
