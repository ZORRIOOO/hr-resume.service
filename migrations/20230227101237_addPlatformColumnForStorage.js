exports.up = (knex) =>
  knex.schema.alterTable('platformContent', (tableBuilder) => {
    tableBuilder.integer('platform').defaultTo(null);
  });

exports.down = (knex) =>
  knex.schema.alterTable('platformContent', (tableBuilder) => {
    tableBuilder.dropColumn('platform');
  });
