exports.up = (knex) => knex.schema.createTable('tokens', (tableBuilder) => {
  tableBuilder
    .integer('userId')
    .notNullable()
    .index();
  tableBuilder
    .integer('platform')
    .notNullable()
    .index();
  tableBuilder
    .jsonb('credentials')
    .notNullable();

  tableBuilder.unique(['userId', 'platform']);
});

exports.down = (knex) => knex.schema.dropTable('tokens');
