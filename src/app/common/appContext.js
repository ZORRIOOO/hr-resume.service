const {ContainerBuilder} = require('./containerBuilder');
const {CommonProvider} = require('../provider/commonProvider');
const {QueryProvider} = require('../provider/queryProvider');
const {CommandProvider} = require('../provider/commandProvider');
const {ComponentsProvider} = require('../provider/componentsProvider');
const {DaoProvider} = require('../provider/daoProvider');
const {UtilsProvider} = require('../provider/utilsProvider');
const {EventProvider} = require('../provider/eventProvider');
const {ResumeEventProvider} = require('../provider/resumeEventsProvider');
const {ApiProvider} = require('../provider/apiProvider');

class AppContext {
  /** @type {Container} */
  container;

  constructor(ext) {
    const providers = [
      new CommonProvider(ext),
      new QueryProvider(),
      new CommandProvider(),
      new ComponentsProvider(),
      new DaoProvider(),
      new UtilsProvider(),
      new EventProvider(),
      new ResumeEventProvider(),
      new ApiProvider()
    ];

    const builder = providers.reduce((b, provider) => {
      provider.provide(b);

      return b;
    }, new ContainerBuilder());

    this.container = builder.build();

    return new Proxy(this, {
      get: (target, name) => target.container.get(name)
    });
  }
}

module.exports = {AppContext};