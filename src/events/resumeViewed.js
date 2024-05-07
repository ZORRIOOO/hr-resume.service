class ResumeViewed {
  query;

  response;

  resume;

  constructor({query, response, resume}) {
    this.query = query;
    this.response = response;
    this.resume = resume;
  }
}

module.exports = {ResumeViewed};