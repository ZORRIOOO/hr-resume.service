const objectMapper = require('object-mapper');

class GetResumeDayLimitQueryHandler {
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  async handle() {
    const result = await this.hhApiClient.getResumeDayLimit();

    return objectMapper(result, {
      'limits.resume_view': 'limits.resumeView',
      'limits.resume_view_from_api': 'limits.resumeViewFromApi',
      'spend.resume_view': 'spend.resumeView',
      'spend.resume_view_from_api': 'spend.resumeViewFromApi',
      'left.resume_view': 'left.resumeView',
      'left.resume_view_from_api': 'left.resumeViewFromApi'
    });
  }
}

module.exports = {GetResumeDayLimitQueryHandler};