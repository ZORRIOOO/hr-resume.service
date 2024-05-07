class GetResumeListByCandidateIdQueryHandler {
  resumeDao;

  constructor({resumeDao}) {
    this.resumeDao = resumeDao;
  }

  handle(query) {
    const {
      candidateId
    } = query;

    return this.resumeDao.findResumesByParams({candidateId});
  }
}

module.exports = {GetResumeListByCandidateIdQueryHandler};