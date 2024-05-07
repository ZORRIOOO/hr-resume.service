exports.up = (knex) => knex.schema.alterTable('resumes', (tableBuilder) => {
  tableBuilder.jsonb('patch').defaultTo(null);
});

exports.down = (knex) => knex.schema.alterTable('resumes', (tableBuilder) => {
  tableBuilder.dropColumn('patch');
});
