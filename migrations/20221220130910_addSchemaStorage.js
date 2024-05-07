exports.up = (knex) => knex.schema.createTable('schemas', (tableBuilder) => {
  tableBuilder
    .increments('id')
    .primary();
  tableBuilder
    .string('title')
    .notNullable();
  tableBuilder
    .integer('platform')
    .notNullable();
  tableBuilder
    .jsonb('schema')
    .notNullable();
});

exports.down = (knex) => knex.schema.dropTable('schemas');