class GetResponseListQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  handle = (query) => this.hhApiClient.getNegotiations(query);
}

module.exports = {GetResponseListQueryHandler};