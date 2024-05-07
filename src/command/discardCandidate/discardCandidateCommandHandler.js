class DiscardCandidateCommandHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  execute = (query) => this.hhApiClient.discard(query);
}

module.exports = {DiscardCandidateCommandHandler};