class GetResumeListQuery {
  platform;

  filter;

  userId;

  constructor({platform, filter}) {
    this.platform = platform;
    this.filter = filter;
  }
}

module.exports = {GetResumeListQuery};