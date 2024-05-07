/* eslint-disable max-len */
const ProviderInterface = require('../common/providerInterface');
const {OAuthClient} = require('../../components/hhApi/oAuthClient');
const {ApiClient} = require('../../components/hhApi/apiClient');
const {KnexTokenStore} = require('../../components/hhApi/knexTokenStore');
const {ContentUploader} = require('../../components/hhApi/contentUploader');
const {AxiosResponseInterceptor} =
  require('../../components/hhApi/errors/axiosResponseInterceptor');
const {TransferCandidateDatasStreamFactory} =
  require('../../components/system-events/handlers/transferCandidatesToResumeHandler/transferCandidateDatasStreamFactory');
const {GeneratorCandidatesForTransfer} =
  require('../../components/system-events/handlers/transferCandidatesToResumeHandler/generatorCandidatesForTransfer');
const {GetCollectionDuplexStream} =
  require('../../components/system-events/handlers/transferCandidatesToResumeHandler/getCollectionDuplexStream');
const {TransferCandidateWritebleStream} =
  require('../../components/system-events/handlers/transferCandidatesToResumeHandler/transferCandidateWritebleStream');

class ComponentsProvider extends ProviderInterface {
  provide(containerBuilder) {
    containerBuilder
      .add('hhOAuthClient', (c) => new OAuthClient(
        c.get('config')?.hh?.clientId,
        c.get('config')?.hh?.clientSecret,
        c.get('config')?.hh?.redirectUri,
        c.get('hhTokenStore')
      ))
      .add('hhTokenStore', (c) => new KnexTokenStore({
        userId: c.get('userId'),
        db: c.get('db')
      }))
      .add('hhApiClient', (c) => new ApiClient({
        timeout: c.get('config')?.hh?.timeout,
        baseUrl: c.get('config')?.hh?.baseUrl,
        tokenStore: c.get('hhTokenStore'),
        headers: {
          'HH-User-Agent': c.get('config')?.hh?.hhUserAgent
        },
        responseInterceptor: c.get('responseInterceptor')
      }))
      .add('contentUploader', (c) => new ContentUploader({
        directory: c.get('config')?.hh?.directoryName,
        uploader: c.get('uploader'),
        hhApiClient: c.get('hhApiClient'),
        logger: c.get('buildLogger')('ContentUploader')
      }))
      .add('responseInterceptor', (c) => new AxiosResponseInterceptor({
        tokenStore: c.get('hhTokenStore'),
        oauthClient: c.get('hhOAuthClient'),
        logger: c.get('buildLogger')('AxiosResponseInterceptor')
      }))
      .add('transferCandidateDatasStreamFactory', (c) => new TransferCandidateDatasStreamFactory({
        generatorCandidatesForTransfer: c.get('generatorCandidatesForTransfer'),
        getCollectionDuplexStream: c.get('getCollectionDuplexStream'),
        transferCandidateWritebleStream: c.get('transferCandidateWritebleStream'),
        logger: c.get('buildLogger')('transferCandidateDatasStreamFactory')
      }))
      .add('generatorCandidatesForTransfer', (c) => new GeneratorCandidatesForTransfer({
        candidatesServiceApi: c.get('candidatesServiceApi'),
        logger: c.get('buildLogger')('generatorCandidatesForTransfer')
      }))
      .add('getCollectionDuplexStream', (c) => new GetCollectionDuplexStream({
        logger: c.get('buildLogger')('getCollectionDuplexStream'),
        catalogs: c.get('catalogs')
      }))
      .add('transferCandidateWritebleStream', (c) => new TransferCandidateWritebleStream({
        logger: c.get('buildLogger')('transferCandidateWritebleStream'),
        resumeDao: c.get('resumeDao')
      }));
  }
}

module.exports = {ComponentsProvider};