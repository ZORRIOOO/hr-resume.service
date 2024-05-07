/* eslint-disable no-unused-vars */
const {RuntimeError} = require('../../domain/exceptions');

/**
 * @interface
 */
class ProviderInterface {
  /**
   * @param {ContainerBuilder} containerBuilder
   * @return {void}
   */
  provide(containerBuilder) {
    throw new RuntimeError('Must be implemented');
  }
}

module.exports = ProviderInterface;
