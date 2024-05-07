class SendInviteForVacancyCommandHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  execute = (command) => this.hhApiClient.sendInviteForVacancy(command);
}

module.exports = {SendInviteForVacancyCommandHandler};