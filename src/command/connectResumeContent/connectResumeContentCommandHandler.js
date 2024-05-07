const {RuntimeError} = require('../../domain/exceptions');

class ConnectResumeContentCommandHandler {
  extensionDao;

  constructor({extensionDao}) {
    this.extensionDao = extensionDao;
  }

  async execute({resumeId, id}) {
    const content = await this.extensionDao.findById(id);

    if (!content) {
      throw new RuntimeError('Content does not exist');
    }

    await this.extensionDao.save({
      ...content,
      resumeId
    });
  }
}

module.exports = {ConnectResumeContentCommandHandler};