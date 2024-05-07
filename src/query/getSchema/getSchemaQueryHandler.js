const {RuntimeError} = require('../../domain/exceptions');

class GetSchemaQueryHandler {
  schemaDao;

  constructor({schemaDao}) {
    this.schemaDao = schemaDao;
  }

  async handle(query) {
    const {id} = query;
    const schema = await this.schemaDao.findById(id);

    if (!schema) {
      throw new RuntimeError('There is no such schema!');
    }

    return schema;
  }
}

module.exports = {GetSchemaQueryHandler};