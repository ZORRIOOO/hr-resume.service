class GetCollectionQueryHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  handle = (query) => this.hhApiClient.getCollection(query);
}

module.exports = {GetCollectionQueryHandler};