class InvalidateHHAccessTokenCommandHandler {
  hhOAuthClient;

  constructor({hhOAuthClient}) {
    this.hhOAuthClient = hhOAuthClient;
  }

  async execute() {
    await this.hhOAuthClient.invalidateAccessToken();
  }
}

module.exports = {InvalidateHHAccessTokenCommandHandler};