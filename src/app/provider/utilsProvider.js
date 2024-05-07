const ProviderInterface = require('../common/providerInterface');

class UtilsProvider extends ProviderInterface {
  provide(containerBuilder) {
    containerBuilder.add('withCache', (c) => async(cacheKey, handler) => {
      const cache = c.get('cache');
      const cached = await cache.get(cacheKey);

      if (cached) {
        return cached;
      }
      const res = await handler();

      await cache.set({key: cacheKey, val: res});

      return res;
    });
  }
}

module.exports = {UtilsProvider};