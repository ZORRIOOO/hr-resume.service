const Service = require('@ecosystem/service');

class ResumeEventHandler {
  resumeDao;

  contentUploader;

  logger;

  events;

  sessionInfo;

  constructor({resumeDao, contentUploader, logger, events, sessionInfo}) {
    this.resumeDao = resumeDao;
    this.contentUploader = contentUploader;
    this.logger = logger;
    this.events = events;
    this.sessionInfo = sessionInfo;
  }

  /**
  * @param {ResumeViewed} event
  */
  sendViewLogsEvent = async(event) => {
    try {
      await this.events.sendToServices({
        type: 'resume-business.resumeViewedLogs',
        payload: {
          ...event,
          sessionInfo: this.sessionInfo
        }
      }, Service.EventModes.UNSAFE);
    } catch(error) {
      this.logger.error(`Error while sending event after action with resumes: ${error.message}`);
    }
  }

  /**
  * @param {ResumeSearched} event
  */
  sendSearchLogsEvent = async(event) => {
    try {
      await this.events.sendToServices({
        type: 'resume-business.resumesSearchLogs',
        payload: {
          ...event,
          sessionInfo: this.sessionInfo
        }
      });
    } catch(error) {
      this.logger.error(`Error while sending event after action with resumes: ${error.message}`);
    }
  }

  resumeViewedSave = async({query, response, resume}) => {
    const {
      photo,
      download: {pdf}
    } = response;

    const media = {};

    if (photo) {
      media.small = photo.small;
      media.medium = photo.medium;
    }

    if (pdf.url) {
      media.url = pdf.url;
    }

    const requests = ['small', 'medium', 'url']
      .map((key) => media[key])
      .map((url) => this.contentUploader.getContent(url));

    const [
      small,
      medium,
      url
    ] = await Promise.all(requests);

    await this.resumeDao.save(
      query.platform,
      response.id,
      response,
      new Date().toISOString(),
      resume?.candidateId || null,
      {small, medium, url}
    );
  }
}

module.exports = {ResumeEventHandler};