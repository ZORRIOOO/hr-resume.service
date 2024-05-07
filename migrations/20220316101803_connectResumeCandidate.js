exports.up = (knex) => knex.schema.alterTable('resumes', (tableBuilder) => {
  tableBuilder.integer('candidateId').defaultTo(null);
});

exports.down = (knex) => knex.schema.alterTable('resumes', (tableBuilder) => {
  tableBuilder.dropColumn('candidateId');
});
