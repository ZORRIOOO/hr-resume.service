class GetResumeCommentsQuery {
  ownerId;

  page;

  perPage;

  constructor({ownerId, page, perPage}) {
    this.ownerId = ownerId;
    this.page = page;
    this.perPage = perPage;
  }
}

module.exports = {GetResumeCommentsQuery};