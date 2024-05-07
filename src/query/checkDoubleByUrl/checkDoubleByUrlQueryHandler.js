class CheckDoubleByUrlQueryHandler {
  extensionDao;

  constructor({extensionDao}) {
    this.extensionDao = extensionDao;
  }

  handle = ({url}) => this.extensionDao.checkDoubleByUrl(url);
}

module.exports = {CheckDoubleByUrlQueryHandler};