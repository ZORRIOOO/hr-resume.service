class ArchiveVacancyCommandHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  execute({vacancyId}) {
    return this.hhApiClient.archiveVacancy(vacancyId);
  }
}

module.exports = {ArchiveVacancyCommandHandler};