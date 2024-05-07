/* eslint-disable max-len */
exports.up = (knex) => Promise.all([
  knex.schema.createTable('fullTextEducationResume', (tableBuilder) => {
    tableBuilder.string('resumeId');
    tableBuilder.integer('platform');
    tableBuilder.text('educationText');
    tableBuilder.foreign(['resumeId', 'platform'])
      .references(['resumeId', 'platform'])
      .on('resumes');
    tableBuilder.index(['resumeId', 'platform']);

    knex.raw(`
  CREATE INDEX education_idx ON "fullTextEducationResume" USING GIN (to_tsvector('russian', "educationText"))
  `);
  }),

  knex.schema.createTable('fullTextExperienceResume', (tableBuilder) => {
    tableBuilder.string('resumeId');
    tableBuilder.integer('platform');
    tableBuilder.text('experienceText');
    tableBuilder.foreign(['resumeId', 'platform'])
      .references(['resumeId', 'platform'])
      .on('resumes');
    tableBuilder.index(['resumeId', 'platform']);

    knex.raw(`
  CREATE INDEX experience_idx ON "fullTextExperienceResume" USING GIN (to_tsvector('russian', "experienceText"))
  `);
  })
]);

exports.down = (knex) => Promise.all([
  knex.schema.dropTable('fullTextEducationResume'),
  knex.schema.dropTable('fullTextExperienceResume')
]);
