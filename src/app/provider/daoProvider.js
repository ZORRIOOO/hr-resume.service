const ProviderInterface = require('../common/providerInterface');
const {ResumeDao} = require('../../dao/resumeDao');
const {ExtensionDao} = require('../../dao/extensionDao');
const {SchemaDao} = require('../../dao/schemaDao');

class DaoProvider extends ProviderInterface {
  provide(containerBuilder) {
    containerBuilder
      .add('resumeDao', (c) => new ResumeDao({
        db: c.get('db')
      }))
      .add('extensionDao', (c) => new ExtensionDao({
        db: c.get('db')
      }))
      .add('schemaDao', (c) => new SchemaDao({
        db: c.get('db')
      }));
  }
}

module.exports = {DaoProvider};
