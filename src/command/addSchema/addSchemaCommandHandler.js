class AddSchemaCommandHandler {
  schemaDao;

  constructor({schemaDao}) {
    this.schemaDao = schemaDao;
  }

  execute = (command) => this.schemaDao.save({
    id: command.id,
    title: command.title,
    platform: command.platform,
    schema: JSON.stringify(command.schema)
  });
}

module.exports = {AddSchemaCommandHandler};