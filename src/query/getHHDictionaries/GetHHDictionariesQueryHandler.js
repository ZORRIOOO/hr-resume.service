class GetHHDictionariesQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  withCache;

  constructor({hhApiClient, withCache}) {
    this.hhApiClient = hhApiClient;
    this.withCache = withCache;
  }

  async handle(query) {
    const cacheKey = ['hh', 'dictionaries'].join('.');
    const handler = () => this.hhApiClient.getDictionaries();
    const dictionaries = await this.withCache(cacheKey, handler);

    if (!query.dictionaries.length) {
      return dictionaries;
    }

    const entries = [...Object.entries(dictionaries)]
      .filter(([key]) => query.dictionaries.includes(key));

    return Object.fromEntries(entries);
  }
}

module.exports = {GetHHDictionariesQueryHandler};