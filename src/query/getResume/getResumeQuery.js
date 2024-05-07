class GetResumeQuery {
  platform;

  resumeId;

  withContacts;

  withPersist;

  responseId;

  constructor({platform, resumeId, withContacts, withPersist, responseId}) {
    this.platform = platform;
    this.resumeId = resumeId;
    this.withContacts = withContacts;
    this.withPersist = withPersist;
    this.responseId = responseId;
  }
}

module.exports = {GetResumeQuery};