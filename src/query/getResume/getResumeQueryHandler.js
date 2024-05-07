const {VacancyPlace} = require('../../domain/enums');
const {RuntimeError} = require('../../domain/exceptions');
const {ResumeViewed} = require('../../events/resumeViewed');

class GetResumeQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  /** @type {ResumeDao} */
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
   * @param {GetResumeQuery} query
   */
  async handle(query) {
    const resume = await this.resumeDao.findById(query.platform, query.resumeId);

    if (resume && !query.withPersist && !query.responseId) {
      const {resumeParams, candidateId, patch, version} = resume;

      return {
        ...resumeParams,
        photo: patch || resumeParams.photo,
        candidateId,
        version
      };
    }

    const [handler, responseMapper] = this.getHandlerByPlatform(query.platform);

    const response = await handler(query);

    if (!response.version && response.contact.length > 0) {
      response.version = new Date().toISOString();
    }

    const mappedResponse = responseMapper(response);

    if (response['can_view_full_info']) {
      this.eventDispatcher.emit(new ResumeViewed({query, response, resume}));
    }

    return mappedResponse;
  }

  getHandlerByPlatform(platform) {
    switch (platform) {
      case VacancyPlace.HH:
        return [
          (query) => this.hhApiClient
            .getResume(query.resumeId, query.withContacts, query.responseId),
          (response) => this.mapHHResponse(response)
        ];
      default:
        throw new RuntimeError('unsupported platform');
    }
  }

  mapHHResponse = (params) => params;
}

module.exports = {GetResumeQueryHandler};