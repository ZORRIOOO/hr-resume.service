class GetHHAreasQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  withCache;

  constructor({hhApiClient, withCache}) {
    this.hhApiClient = hhApiClient;
    this.withCache = withCache;
  }

  handle(query) {
    const cacheKey = ['hh', 'areas', query.areaId]
      .filter(Boolean)
      .join('.');

    const handler = async() => {
      const response = await this.hhApiClient.getAreas(query.areaId);
      const areas = Array.isArray(response) ? response : response.areas;

      return areas.map((area) =>
        Object.fromEntries(Object.entries(area)
          .filter(([key]) => ['id', 'name', 'areas'].includes(key))));
    };

    return this.withCache(cacheKey, handler);
  }
}

module.exports = {GetHHAreasQueryHandler};
