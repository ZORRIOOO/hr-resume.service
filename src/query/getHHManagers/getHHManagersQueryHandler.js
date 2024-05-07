class GetHHManagersQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  handle = () => this.hhApiClient.getManagers();
}

module.exports = {GetHHManagersQueryHandler};