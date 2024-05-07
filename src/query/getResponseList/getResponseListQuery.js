class GetResponseListQuery {
  vacancyId;

  authorId;

  page;

  perPage;

  constructor({vacancyId, authorId, page, perPage}) {
    this.vacancyId = vacancyId;
    this.authorId = authorId;
    this.page = page;
    this.perPage = perPage;
  }
}

module.exports = {GetResponseListQuery};