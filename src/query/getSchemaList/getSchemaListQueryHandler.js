class GetSchemaListQueryHandler {
  schemaDao;

  constructor({schemaDao}) {
    this.schemaDao = schemaDao;
  }

  handle = (query) => this.schemaDao.getList(query);
}

module.exports = {GetSchemaListQueryHandler};