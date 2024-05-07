const {RuntimeError} = require('../../domain/exceptions');

class ConnectResumeCandidateCommandHandler {
  resumeDao;

  constructor({resumeDao}) {
    this.resumeDao = resumeDao;
  }

  async execute(command) {
    const resume = await this.resumeDao.findById(command.platform, command.resumeId);

    if (!resume) {
      throw new RuntimeError('Resume does not exist');
    }

    const {
      platform,
      resumeId,
      resumeParams,
      version,
      patch
    } = resume;

    await this.resumeDao.save(
      platform,
      resumeId,
      resumeParams,
      version,
      command.extraParameters.candidateId,
      patch
    );
  }
}

module.exports = {ConnectResumeCandidateCommandHandler};