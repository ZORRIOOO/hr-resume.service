const axios = require('axios');
const configs = require('./config');
const {RuntimeError} = require('../../../domain/exceptions');

class AxiosResponseInterceptor {
  /** @type {TokenStoreInterface} */
  tokenStore;

  /** @type {OAuthClient} */
  oauthClient;

  /** @type {Service.Logger} */
  logger;

  constructor({tokenStore, oauthClient, logger}) {
    this.tokenStore = tokenStore;
    this.oauthClient = oauthClient;
    this.logger = logger;
  }

  /**
   * For debug
   * @todo implements
   * @param response {Axios.Response}
   * @returns {*}
   */
  onFulfilled(response) {
    return response;
  }

  onRejected(error) {
    if (error.response) {
      return this.handleResponseError(error);
    }

    return this.handleRequestError(error);
  }

  handleResponseError(error) {
    const {status, data: responseBody} = error.response;
    const errorCtx = {...this.getErrorCtx(responseBody), status};

    if (status === 403 && errorCtx.value === 'token_expired') {
      return this.refreshTokenAndRetry(error.config);
    }

    const config = configs.find(({ctx}) =>
      [...Object.entries(ctx)].every(([k, v]) => errorCtx[k] === v));

    if (!config) {
      return Promise.reject(error);
    }

    if (config.factory) {
      return Promise.reject(config.factory(errorCtx));
    }

    return Promise.reject(new RuntimeError(config.description, errorCtx));
  }

  handleRequestError(error) {
    this.logError(error);

    return Promise.reject(error);
  }

  async refreshTokenAndRetry(config) {
    const token = await this.tokenStore.get();
    const newToken = await this.oauthClient.tokenByRefresh(token.refreshToken);

    await this.tokenStore.set(newToken);

    config.headers.Authorization = `Bearer ${newToken.accessToken}`;
    config.baseURL = undefined;

    return axios.request(config);
  }

  getErrorCtx(responseBody) {
    if (responseBody?.errors?.length) {
      return responseBody.errors[0];
    }

    return responseBody;
  }

  logError(error) {
    const request = Object.fromEntries(Object.entries(error.config)
      .filter(([k]) => ['headers', 'baseURL', 'method', 'url', 'data'].includes(k)));
    const parts = [
      error.message,
      `Request: ${JSON.stringify(request)}`
    ];

    if (error.response) {
      const response = error.response.data || {};

      parts.push(`Response: ${JSON.stringify(response)}`);
    }

    this.logger.error(parts.join('\n'));
  }
}

module.exports = {AxiosResponseInterceptor};