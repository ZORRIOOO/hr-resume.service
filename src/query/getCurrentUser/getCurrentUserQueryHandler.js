class GetCurrentUserQueryHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  handle = () => this.hhApiClient.me();
}

module.exports = {GetCurrentUserQueryHandler};