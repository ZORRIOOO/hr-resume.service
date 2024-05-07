class GetHHLanguagesQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  withCache;

  constructor({hhApiClient, withCache}) {
    this.hhApiClient = hhApiClient;
    this.withCache = withCache;
  }

  handle() {
    const cacheKey = ['hh', 'languages'].join('.');
    const handler = () => this.hhApiClient.getLanguages();

    return this.withCache(cacheKey, handler);
  }
}

module.exports = {GetHHLanguagesQueryHandler};