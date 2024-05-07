const ProviderInterface = require('../common/providerInterface');
const {CandidatesServiceApi} = require('../../api/candidatesApi');

class ApiProvider extends ProviderInterface {
  provide(containerBuilder) {
    containerBuilder
      .add('candidatesServiceApi', (c) => new CandidatesServiceApi({
        api: c.get('api')
      }));
  }
}

module.exports = {ApiProvider};