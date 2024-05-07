/* eslint-disable max-len */
exports.up = (knex) => knex.schema.createTable('fullTextAreaResume', (tableBuilder) => {
  tableBuilder.string('resumeId');
  tableBuilder.integer('platform');
  tableBuilder.text('areaText');
  tableBuilder.foreign(['resumeId', 'platform'])
    .references(['resumeId', 'platform'])
    .on('resumes');
  tableBuilder.index(['resumeId', 'platform']);

  knex.raw(`
  CREATE INDEX fullTextAreaResume_areaText_idx ON "fullTextAreaResume" USING GIN (to_tsvector('russian', "areaText"))
  `);
});

exports.down = (knex) => knex.schema.dropTable('fullTextAreaResume');
