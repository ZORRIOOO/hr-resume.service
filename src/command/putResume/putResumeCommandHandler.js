class PutResumeCommandHandler {
  resumeDao;

  constructor({resumeDao}) {
    this.resumeDao = resumeDao;
  }

  execute(command) {
    const {
      platform,
      candidateId,
      resumeParams,
      resumeId,
      patch
    } = command;

    return this.resumeDao.save(
      platform,
      resumeId,
      resumeParams,
      new Date().toISOString(),
      candidateId,
      patch
    );
  }
}

module.exports = {PutResumeCommandHandler};