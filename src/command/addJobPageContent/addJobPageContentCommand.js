class AddJobPageContentCommand {
  id;

  url;

  platform;

  pageContent;

  constructor({id, url, platform, pageContent}) {
    this.id = id;
    this.url = url;
    this.platform = platform;
    this.pageContent = pageContent;
  }
}

module.exports = {AddJobPageContentCommand};