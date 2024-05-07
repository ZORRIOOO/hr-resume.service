class BaseApi {
  /** @type {function(): API} */
  api;

  /** @type {{info: func, error: func, warn: func, debug: func}} */
  logger;

  cache;

  service;

  constructor({api, logger, cache}) {
    this.api = api;
    this.logger = logger;
    this.cache = cache;

    const [, s, b] = this.constructor.name.toLowerCase().match(/^(\w+?)(business)?(api)$/);

    this.service = [s, b].filter(Boolean).join('-');
  }

  /**
   * @protected
   * @param {string} method
   * @return {API}
   */
  method(method) {
    return this.api().service(`${this.service}.${method}`);
  }
}

module.exports = {BaseApi};