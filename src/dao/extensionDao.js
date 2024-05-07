const objectMapper = require('object-mapper');

class ExtensionDao {
  db;

  constructor({db}) {
    this.db = db;
  }

  async save(command) {
    const dto = this.mapToDto(command);

    const [id] = await this.db('platformContent')
      .insert(dto)
      .onConflict(['id'])
      .merge()
      .returning('id');

    return id;
  }

  mapToDto = (command) => objectMapper(command, {
    id: 'id?',
    url: 'url',
    platform: 'platform',
    pageContent: 'pageContent',
    resumeId: 'resumeId?'
  });

  async findById(id) {
    const row = await this.db('platformContent')
      .where({id})
      .first();

    return row || null;
  }

  async checkDoubleByUrl(url) {
    const row = await this.db('platformContent')
      .where({url})
      .first();

    if (!row) {
      return null;
    }

    return objectMapper(row, {
      'id': 'id',
      'resumeId': 'resumeId?'
    });
  }
}

module.exports = {ExtensionDao};