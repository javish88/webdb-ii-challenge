exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments("VIN");

    tbl.string("make", 128).notNullable();

    tbl.string("model", 128).notNullable();

    tbl.integer("mileage").notNullable();

    tbl.string("transmission type", 128).defaultTo(null);

    tbl.string("title status", 128).defaultTo("clean");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
