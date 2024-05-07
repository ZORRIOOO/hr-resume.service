const path = require('path');
const {EventsController} = require('./src/components/system-events/eventsController');
const Service = require('@ecosystem/service');
const {
  development,
  production
} = require('./config');

const config = Service.Config
  .add('development', {
    controllers: path.resolve(__dirname, 'src', 'app', 'controller'),
    api: true,
    db: {
      connection: development.connect.connection,
      closeTimeout: development.connect.closeTimeout
    },
    hh: development.hh
  })
  .add('production', {
    controllers: path.resolve(__dirname, 'src', 'app', 'controller'),
    api: true,
    db: {
      connection: production.connect.connection,
      closeTimeout: production.connect.closeTimeout
    },
    hh: production.hh
  });

const instance = new Service(config);

instance.useCustomExtension('catalogs');
instance.useCustomExtension('cache');
instance.useCustomExtension('uploader');
instance.use('sessionInfo', ({sessionInfo}) => sessionInfo, {executeBeforeSend: true});
instance.use('buildLogger', Service.buildLogger, {executeBeforeSend: false, useApi: false});

instance.Dependencies = {
  services: [
    'candidates'
  ]
};

const {buildLogger} = Service;
const eventsController = new EventsController({logger: buildLogger('EventsController')});

eventsController.register(instance.Events);

instance.initialize();