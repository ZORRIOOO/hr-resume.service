exports.up = (knex) => knex.schema.createTable('platformContent', (tableBuilder) => {
  tableBuilder.increments('id').primary();
  tableBuilder.string('url').notNullable();
  tableBuilder.binary('content');
});

exports.down = (knex) => knex.schema.dropTable('platformContent');
