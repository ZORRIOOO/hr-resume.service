const {RuntimeError} = require('../../domain/exceptions');

class GetJobPageContentQueryHandler {
  extensionDao;

  constructor({extensionDao}) {
    this.extensionDao = extensionDao;
  }

  async handle({id}) {
    const jobPageContent = await this.extensionDao.findById(id);

    if (!jobPageContent) {
      throw new RuntimeError('There is nothing');
    }

    return jobPageContent;
  }
}

module.exports = {GetJobPageContentQueryHandler};