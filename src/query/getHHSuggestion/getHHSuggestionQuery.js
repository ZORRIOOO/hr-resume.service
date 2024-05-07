class GetHHSuggestionQuery {
  suggest;

  text;

  constructor({suggest, text}) {
    this.suggest = suggest;
    this.text = text;
  }
}

module.exports = {GetHHSuggestionQuery};