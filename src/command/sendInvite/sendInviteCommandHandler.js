class SendInviteCommandHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  execute = (query) => this.hhApiClient.invite(query);
}

module.exports = {SendInviteCommandHandler};