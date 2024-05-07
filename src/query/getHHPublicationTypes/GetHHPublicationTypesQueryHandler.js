class GetHHPublicationTypesQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  handle() {
    return this.hhApiClient.getAvailablePublicationTypes();
  }
}

module.exports = {GetHHPublicationTypesQueryHandler};