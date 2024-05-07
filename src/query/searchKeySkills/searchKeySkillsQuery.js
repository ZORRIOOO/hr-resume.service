class SearchKeySkillsQuery {
  name;

  limit;

  offset;

  order;

  constructor({name, limit, offset, order}) {
    this.name = name;
    this.limit = limit;
    this.offset = offset;
    this.order = order;
  }
}

module.exports = {SearchKeySkillsQuery};