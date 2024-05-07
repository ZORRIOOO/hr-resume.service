class GetHHSuggestionQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  async handle(query) {
    const {text} = query;

    if (text.trim().length < 2) {
      return [];
    }

    const result = await this.hhApiClient.getSuggest(query);

    return result.items;
  }
}

module.exports = {GetHHSuggestionQueryHandler};