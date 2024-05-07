const {
  test
} = require('../../config');
const {ApiClient} = require('../../src/components/hhApi/apiClient');
const {AxiosResponseInterceptor} = require('../../src/components/hhApi/errors/axiosResponseInterceptor');
const Service = require('@ecosystem/service');

const createApiClient = (headers) => {
  const tokenStore = {
    get: () => Promise.resolve({accessToken: 'test', refreshToken: 'test'}),
    set: () => {}
  };

  const oauthClient = {
    tokenByRefresh: () => Promise.resolve({accessToken: 'test'})
  };

  return new ApiClient({
    timeout: test?.hh?.timeout,
    baseUrl: test?.hh?.baseUrl,
    tokenStore,
    headers,
    responseInterceptor: new AxiosResponseInterceptor({
      tokenStore,
      oauthClient,
      logger: Service.buildLogger('AxiosResponseInterceptor')
    })
  });
};

module.exports = {
  createApiClient
};