const ProviderInterface = require('../common/providerInterface');

class CommonProvider extends ProviderInterface {
  constructor(ext) {
    super();

    this.ext = ext;
  }

  provide(containerBuilder) {
    const {
      metrics,
      api,
      config,
      events,
      sessionInfo,
      buildLogger,
      cache,
      catalogs,
      db,
      uploader
    } = this.ext;

    containerBuilder
      .add('metrics', () => metrics)
      .add('api', () => api)
      .add('buildLogger', () => buildLogger)
      .add('config', () => config)
      .add('events', () => events)
      .add('sessionInfo', () => sessionInfo)
      .add('userId', () => sessionInfo.userId)
      .add('cache', () => cache)
      .add('catalogs', () => catalogs)
      .add('db', () => db)
      .add('uploader', () => uploader);
  }
}

module.exports = {CommonProvider};
