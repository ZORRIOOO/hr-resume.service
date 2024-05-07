const {PredicateEnum} = require('../../domain/enums');
const {predicateLiteral} = require('../../../utils/predicateLiteral');

class SearchKeySkillsQueryHandler {
  db;

  constructor({db}) {
    this.db = db;
  }

  handle(body) {
    const {
      name,
      order = {field: 'name', predicate: PredicateEnum.ASC},
      limit,
      offset
    } = body;

    const query = this.db('keySkills')
      .limit(limit)
      .offset(offset)
      .orderBy(order.field, predicateLiteral(order.predicate));

    if (name) {
      const formattedName = name.trim().toUpperCase();

      query.where('name', 'ILIKE', `${formattedName}%`);
    }

    return query;
  }
}

module.exports = {SearchKeySkillsQueryHandler};