
exports.up = (knex) =>
  knex.schema.createTable('keySkills', (table) => {
    table
      .increments('id')
      .primary();
    table
      .string('name')
      .notNullable()
      .comment('Полное наименование ключевого навыка');
    table
      .index(['name']);
    table
      .unique(['name']);
  });

exports.down = (knex) => knex.schema.dropTable('keySkills');
