class RemoveResumeCommandHandler {
  db;

  constructor({db}) {
    this.db = db;
  }

  async execute(command) {
    const {
      platform,
      resumeId
    } = command;

    const trx = await this.db.transaction();

    try {
      await Promise.all([
        trx('fullTextEducationResume')
          .where('platform', platform)
          .andWhere('resumeId', resumeId)
          .del(),
        trx('fullTextExperienceResume')
          .where('platform', platform)
          .andWhere('resumeId', resumeId)
          .del()
      ]);

      await trx('resumes')
        .where('platform', platform)
        .andWhere('resumeId', resumeId)
        .del();

      await trx.commit();
    } catch(error) {
      await trx.rollback();
      throw error;
    }
  }
}

module.exports = {RemoveResumeCommandHandler};