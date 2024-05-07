const {Writable} = require('stream');

class TransferCandidateWritebleStream extends Writable {
  logger;

  resumeDao;

  constructor({logger, resumeDao}) {
    super({objectMode: true, highWaterMark: 1});

    this.logger = logger;
    this.resumeDao = resumeDao;
  }

  async _write(resume, _, callback) {
    try {
      await this.resumeDao.save(
        resume?.platform,
        resume?.resumeId,
        resume?.resumeParams,
        new Date().toISOString(),
        resume?.candidateId
      );

      return callback();
    } catch(error) {
      this.logger.error(error.message);
    }

    return callback();
  }
}

module.exports = {TransferCandidateWritebleStream};