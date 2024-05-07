const objectMapper = require('object-mapper');

class SchemaDao {
  db;

  constructor({db}) {
    this.db = db;
  }

  async save(command) {
    const dto = this.mapToDto(command);
    const [id] = await this.db('schemas')
      .insert(dto)
      .onConflict('id')
      .merge()
      .returning('id');

    return id;
  }

  mapToDto = (command) =>
    objectMapper(command, {
      id: 'id?',
      title: 'title',
      platform: 'platform',
      schema: 'schema'
    });

  getList({platform}) {
    const query = this.db('schemas');

    if (platform) {
      query.where({platform});
    }

    return query
      .select(
        'id',
        'title',
        'platform'
      );
  }

  async findById(id) {
    const row = await this.db('schemas')
      .where({id})
      .first();

    return row || null;
  }

  async remove({id}) {
    await this.db('schemas')
      .where({id})
      .del();
  }
}

module.exports = {SchemaDao};