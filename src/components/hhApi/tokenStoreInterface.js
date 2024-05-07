/* eslint-disable no-unused-vars */

const {RuntimeError} = require('../../domain/exceptions');

/**
 * @interface
 */
class TokenStoreInterface {
  /**
   * @return {Promise<Token|null>}
   */
  get() {
    throw new RuntimeError('must be implemented');
  }

  /**
   * @param {Token} token
   * @return {Promise<void>}
   */
  set(token) {
    throw new RuntimeError('must be implemented');
  }
}

module.exports = {TokenStoreInterface};