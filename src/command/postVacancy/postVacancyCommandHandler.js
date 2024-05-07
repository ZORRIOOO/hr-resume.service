class PostVacancyCommandHandler {
  /** @type {ApiClient} */
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  execute({body}) {
    return this.hhApiClient.postVacancy(body);
  }
}

module.exports = {PostVacancyCommandHandler};