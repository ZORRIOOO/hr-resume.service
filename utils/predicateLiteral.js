const {predicate: Predicate} = require('@ecosystem/enums/shared');

const reversed = Object.keys(Predicate)
  .reduce((acc, literal) => {
    acc.set(Predicate[literal], literal);

    return acc;
  }, new Map());

const predicateLiteral = (predicateOrdinal) => reversed.get(predicateOrdinal);

module.exports = {
  predicateLiteral
};
