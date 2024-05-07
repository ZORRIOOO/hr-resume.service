class GetResponseQueryHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  handle = (query) => this.hhApiClient.getResponse(query);
}

module.exports = {GetResponseQueryHandler};