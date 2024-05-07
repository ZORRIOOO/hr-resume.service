const {AppContext} = require('../common/appContext');
const {
  AddJobPageContentCommand,
  ConnectResumeContentCommand
} = require('../../command');
const {
  GetJobPageContentQuery,
  CheckDoubleByUrlQuery
} = require('../../query');

module.exports = {
  addJobPageContent: (params, ext) => {
    const appContext = new AppContext(ext);
    const {addJobPageContentCommandHandler} = appContext;
    const command = new AddJobPageContentCommand(params);

    return addJobPageContentCommandHandler.execute(command);
  },

  getJobPageContent: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getJobPageContentQueryHandler} = appContext;
    const query = new GetJobPageContentQuery(params);

    return getJobPageContentQueryHandler.handle(query);
  },

  checkDoubleByUrl: (params, ext) => {
    const appContext = new AppContext(ext);
    const {checkDoubleByUrlQueryHandler} = appContext;
    const query = new CheckDoubleByUrlQuery(params);

    return checkDoubleByUrlQueryHandler.handle(query);
  },

  connectResumeContent: (params, ext) => {
    const appContext = new AppContext(ext);
    const {connectResumeContentCommandHandler} = appContext;
    const command = new ConnectResumeContentCommand(params);

    return connectResumeContentCommandHandler.execute(command);
  },

  getPlatformByUrl: ({url}, ext) => {
    const appContext = new AppContext(ext);
    const {getPlatformByUrlQueryHandler} = appContext;

    return getPlatformByUrlQueryHandler.handle(url);
  }
};