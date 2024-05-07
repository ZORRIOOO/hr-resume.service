class GetHHDictionariesQuery {
  dictionaries = [];

  constructor({dictionaries}) {
    this.dictionaries = dictionaries || [];
  }
}

module.exports = {GetHHDictionariesQuery};