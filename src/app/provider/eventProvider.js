const ProviderInterface = require('../common/providerInterface');
const {EventDispatcher} = require('../../events/eventDispatcher');
const {ResumeViewed} = require('../../events/resumeViewed');
const {ResumeEventHandler} = require('../../events/resumeEventHandler');
const {ResumeSearched} = require('../../events/resumesSearched');

class EventProvider extends ProviderInterface {
  provide(containerBuilder) {
    containerBuilder
      .add('resumeEventHandler', (c) => new ResumeEventHandler({
        resumeDao: c.get('resumeDao'),
        contentUploader: c.get('contentUploader'),
        userId: c.get('userId') || 0,
        events: c.get('events'),
        sessionInfo: c.get('sessionInfo'),
        logger: c.get('buildLogger')('ResumeBusinessEvents')
      }))
      .add('eventDispatcher', (c) => {
        const resumeEventHandler = c.get('resumeEventHandler');
        const logger = c.get('buildLogger')('EventDispatcher');

        return new EventDispatcher({
          logger
        })
          .register(ResumeViewed, resumeEventHandler.resumeViewedSave)
          .register(ResumeViewed, resumeEventHandler.sendViewLogsEvent)
          .register(ResumeSearched, resumeEventHandler.sendSearchLogsEvent);
      });
  }
}

module.exports = {EventProvider};