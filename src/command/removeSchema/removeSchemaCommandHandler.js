class RemoveSchemaCommandHandler {
  schemaDao;

  constructor({schemaDao}) {
    this.schemaDao = schemaDao;
  }

  execute = (command) => this.schemaDao.remove(command);
}

module.exports = {RemoveSchemaCommandHandler};