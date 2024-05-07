class GetAuthUrlHHQueryHandler {
  /** @type {OAuthClient} */
  hhOAuthClient;

  /** @type {TokenStoreInterface} */
  hhTokenStore;

  /** @type {ApiClient} */
  hhApiClient;

  constructor({hhApiClient, hhTokenStore, hhOAuthClient}) {
    this.hhApiClient = hhApiClient;
    this.hhTokenStore = hhTokenStore;
    this.hhOAuthClient = hhOAuthClient;
  }

  /**
   * @param {GetAuthUrlHHQuery} query
   */
  async handle(query) {
    const token = await this.hhTokenStore.get();
    const authLink = this.hhOAuthClient.authLink({userId: query.userId});

    if (!token) {
      return {
        authLink,
        tokenExist: false,
        tokenIsValid: false
      };
    }

    try {
      const authData = await this.hhApiClient.me();

      if (authData) {
        return {
          authLink,
          tokenExist: true,
          tokenIsValid: true
        };
      }
    } catch(err) {
      return {
        authLink,
        tokenExist: true,
        tokenIsValid: false
      };
    }
  }
}

module.exports = {GetAuthUrlHHQueryHandler};