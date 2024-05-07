exports.up = (knex) => knex.schema.alterTable('platformContent', (tableBuilder) => {
  tableBuilder.dropColumn('content');
  tableBuilder.jsonb('pageContent');
  tableBuilder.integer('resumeId').defaultTo(null);
  tableBuilder.text('url').alter();
});

exports.down = (knex) => knex.schema.alterTable('platformContent', (tableBuilder) => {
  tableBuilder.dropColumn('resumeId');
  tableBuilder.dropColumn('pageContent');
  tableBuilder.binary('content');
  tableBuilder.string('url').alter();
});
