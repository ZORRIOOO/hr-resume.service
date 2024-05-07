class AddSchemaCommand {
  id;

  title;

  platform;

  schema;

  constructor({id, title, platform, schema}) {
    this.id = id;
    this.title = title;
    this.platform = platform;
    this.schema = schema;
  }
}

module.exports = {AddSchemaCommand};