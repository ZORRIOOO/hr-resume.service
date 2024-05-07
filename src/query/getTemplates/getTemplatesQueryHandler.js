class GetTemplatesQueryHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  handle(query) {
    return this.hhApiClient.getMessageTemplateByParams(query);
  }
}

module.exports = {GetTemplatesQueryHandler};