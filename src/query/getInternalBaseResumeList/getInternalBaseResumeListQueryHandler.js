const {ResumeMapper} = require('../getResumeList/dto/resumeMapper');

class GetInternalBaseResumeListQueryHandler {
  resumeDao;

  constructor({resumeDao}) {
    this.resumeDao = resumeDao;
  }

  /**
   * @param {GetInternalBaseResumeListQuery} query
   */
  async handle(query) {
    const {
      filter
    } = query;

    const result = await this.resumeDao.getResumeByKeyWords(filter);
    const {list, hasNext} = this.mapEsoftTechResponse(result);

    return this.response(list, hasNext);
  }

  response(list = [], hasNext = false) {
    return {
      list,
      hasNext
    };
  }

  mapEsoftTechResponse = ({resumes, hasNext}) => {
    const mapper = new ResumeMapper();

    const localResumeMap = resumes.reduce((map, item) =>
      map.set(item.resumeId, item), new Map());

    const list = resumes.map((item) =>
      mapper.map(item.resumeParams, localResumeMap.get(item.resumeId)));

    return {
      list,
      hasNext
    };
  }
}

module.exports = {GetInternalBaseResumeListQueryHandler};