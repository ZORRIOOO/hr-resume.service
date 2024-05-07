class GetTemplatesQuery {
  responseId;

  templatesType;

  constructor({responseId, templatesType}) {
    this.responseId = responseId;
    this.templatesType = templatesType;
  }
}

module.exports = {GetTemplatesQuery};