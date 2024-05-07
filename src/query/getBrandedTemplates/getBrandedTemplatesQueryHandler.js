class GetBrandedTemplatesQueryHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  async handle() {
    const result = await this.hhApiClient.getBrandedTemplates();

    return result.items;
  }
}

module.exports = {GetBrandedTemplatesQueryHandler};