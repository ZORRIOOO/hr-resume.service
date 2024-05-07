const {AppContext} = require('../../app/common/appContext');
const Service = require('@ecosystem/esoft-service');

class EventsController {
  logger;

  constructor({logger}) {
    this.logger = logger;
  }

  register(events) {
    const handlers = {
      'resume-business.transferAllCandidatesDatas': this.onTransferAllCandidatesDatas,
      'resume-business.putResumeAfterCreateCandidate': this.onPutResumeAfterCreateCandidate,
      'resume-business.transferHHAreaResumes': this.onTransferHHAreaResumes
    };

    Object.entries(handlers).forEach(([eventName, handler]) => {
      events.on(eventName, this.decorate(handler));
    });
  }

  onTransferAllCandidatesDatas = async(eventPayload, appContext) => {
    const {transferCandidateDatasHandler} = appContext;

    await transferCandidateDatasHandler.handle(eventPayload);
  };

  onPutResumeAfterCreateCandidate = async(eventPayload, appContext) => {
    const {putResumeHandler} = appContext;

    await putResumeHandler.handle(eventPayload);
  };

  onTransferHHAreaResumes = async(eventPayload, appContext) => {
    const {transferResumesAreasHandler} = appContext;

    await transferResumesAreasHandler.handle(eventPayload);
  }

  makeContext(ext) {
    return new AppContext({
      ...ext,
      db: ext.dbCreator() || ext.db,
      buildLogger: Service.buildLogger
    });
  }

  wrapError(err, ...message) {
    this.logger.error([
      ...message,
      err.stack || err.message || err
    ].join(' '));
  }

  getPayload(event) {
    const {payload} = event;

    if (typeof payload === 'string') {
      try {
        return JSON.parse(payload);
      } catch(err) {
        this.logger.error([
          `JSON parse failed: ${err.message}`,
          `Event: ${JSON.stringify(event)}`
        ].join('. '));
        throw err;
      }
    }

    return payload;
  }

  decorate = (fn) => async(event, ext) => {
    this.logger.info(`Start handle event '${event?.type}'.`);

    const appContext = this.makeContext(ext);
    const payload = this.getPayload(event);

    try {
      await fn(payload, appContext);
    } catch(err) {
      this.wrapError(err, `Handle '${event.type}':`);
    }

    this.logger.info(`Finish handle event '${event?.type}'.`);
  };
}

module.exports = {EventsController};