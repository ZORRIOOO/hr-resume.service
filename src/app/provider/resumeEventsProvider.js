/* eslint-disable max-len */
const ProviderInterface = require('../common/providerInterface');
const TransferCandidateDatasHandler =
  require('../../components/system-events/handlers/transferCandidatesToResumeHandler/transferCandidateDatasHandler');
const PutResumeHandler =
  require('../../components/system-events/handlers/putResumeHandler/putResumeHandler');
const TransferResumesAreasHandler =
  require('../../components/system-events/handlers/hhAreaTransferHandler/transferResumesAreasHandler');

class ResumeEventProvider extends ProviderInterface {
  provide(containerBuilder) {
    containerBuilder
      .add('transferCandidateDatasHandler', (c) => new TransferCandidateDatasHandler({
        transferCandidateDatasStreamFactory: c.get('transferCandidateDatasStreamFactory'),
        logger: c.get('buildLogger')('SyncInvitationsJobHandler')
      }))
      .add('putResumeHandler', (c) => new PutResumeHandler({
        resumeDao: c.get('resumeDao'),
        candidatesServiceApi: c.get('candidatesServiceApi')
      }))
      .add('transferResumesAreasHandler', (c) => new TransferResumesAreasHandler({
        logger: c.get('buildLogger')('TransferResumesAreasHandler'),
        db: c.get('db')
      }));
  }
}

module.exports = {ResumeEventProvider};