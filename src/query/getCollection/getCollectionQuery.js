class GetCollectionQuery {
  collectionType;

  vacancyId;

  authorId;

  page;

  perPage;

  constructor({collectionType, vacancyId, authorId, page, perPage}) {
    this.collectionType = collectionType;
    this.vacancyId = vacancyId;
    this.authorId = authorId;
    this.page = page;
    this.perPage = perPage;
  }
}

module.exports = {GetCollectionQuery};