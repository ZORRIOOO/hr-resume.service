class AddJobPageContentCommandHandler {
  extensionDao;

  constructor({extensionDao}) {
    this.extensionDao = extensionDao;
  }

  execute = (command) => this.extensionDao.save(command);
}

module.exports = {AddJobPageContentCommandHandler};