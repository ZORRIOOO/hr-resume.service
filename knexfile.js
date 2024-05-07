'use strict';

const {development, production, test} = require('./config');

module.exports = {
  development: development.connect,
  production: production.connect,
  test: test.connect
};
