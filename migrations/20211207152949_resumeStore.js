exports.up = (knex) => knex.schema.createTable('resumes', (tableBuilder) => {
  tableBuilder.integer('platform').notNullable();
  tableBuilder.string('resumeId').notNullable();
  tableBuilder.jsonb('resumeParams').notNullable();
  tableBuilder.timestamp('version', {useTz: false}).notNullable();

  tableBuilder.primary(['platform', 'resumeId']);
});

exports.down = (knex) => knex.schema.dropTable('resumes');
