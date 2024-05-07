class GetSkillsByIdsQueryHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  async handle(query) {
    const {ids} = query;

    const response = await this.hhApiClient.getSkills(ids);

    return response.items;
  }
}

module.exports = {GetSkillsByIdsQueryHandler};