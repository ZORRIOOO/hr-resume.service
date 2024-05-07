const {VacancyPlace} = require('../../domain/enums');
const {HHResumeMapper} = require('./dto/hhResumeMapper');
const {ResumeSearched} = require('../../events/resumesSearched');

class GetResumeListQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  resumeDao;

  userId;

  eventDispatcher;

  constructor({hhApiClient, resumeDao, userId, eventDispatcher}) {
    this.hhApiClient = hhApiClient;
    this.resumeDao = resumeDao;
    this.userId = userId;
    this.eventDispatcher = eventDispatcher;
  }

  /**
   * @param {GetResumeListQuery} query
   */
  async handle(query) {
    const {
      platform,
      filter
    } = query;

    const [handler, responseMapper] = this.getHandler(platform);
    const result = await handler(filter);

    const {list, count} = await responseMapper(result);

    const response = this.response(list, count);

    this.eventDispatcher.emit(new ResumeSearched({query, response}));

    return response;
  }

  response(list = [], count = 0) {
    return {
      list,
      count
    };
  }

  getHandler(platform) {
    switch (platform) {
      case VacancyPlace.HH:
        return [
          (query) => this.hhApiClient.searchResume(query),
          (response) => this.mapHHResponse(response)
        ];
      default:
        break;
    }
  }

  mapHHResponse = async({items: given, found}) => {
    const mapper = new HHResumeMapper();
    const resumeIds = given.map(({id}) => id);

    const localResumes = resumeIds.length ?
      await this.resumeDao.findResumesByParams({platform: VacancyPlace.HH, resumeIds}) :
      [];
    const localResumeMap = localResumes.reduce((map, item) =>
      map.set(item.resumeId, item), new Map());

    const list = given.map((item) => mapper.map(item, localResumeMap.get(item.id)));

    return {
      list,
      count: found
    };
  };
}

module.exports = {GetResumeListQueryHandler};