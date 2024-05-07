class GetHHProfessionalRolesQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  withCache;

  constructor({hhApiClient, withCache}) {
    this.hhApiClient = hhApiClient;
    this.withCache = withCache;
  }

  handle() {
    const cacheKey = ['hh', 'professionalRoles'].join('.');
    const handler = async() => {
      const {categories} = await this.hhApiClient.getProfessionalRoles();

      return categories;
    };

    return this.withCache(cacheKey, handler);
  }
}

module.exports = {GetHHProfessionalRolesQueryHandler};