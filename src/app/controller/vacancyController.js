const {AppContext} = require('../common/appContext');
const {
  PostVacancyCommand,
  ArchiveVacancyCommand
} = require('../../command');
const {
  GetVacancyQuery
} = require('../../query');

module.exports = {
  postVacancy: (parameters, ext) => {
    const appContext = new AppContext(ext);
    const {postVacancyCommandHandler} = appContext;
    const command = new PostVacancyCommand(parameters);

    return postVacancyCommandHandler.execute(command);
  },

  archiveVacancy: (parameters, ext) => {
    const appContext = new AppContext(ext);
    const {archiveVacancyCommandHandler} = appContext;
    const command = new ArchiveVacancyCommand(parameters);

    return archiveVacancyCommandHandler.execute(command);
  },

  getVacancy: (parameters, ext) => {
    const extPatch = {
      ...ext,
      sessionInfo: {
        ...ext.sessionInfo,
        userId: parameters.authorId
      }
    };
    const appContext = new AppContext(extPatch);
    const {getVacancyQueryHandler} = appContext;
    const query = new GetVacancyQuery(parameters);

    return getVacancyQueryHandler.handle(query);
  }
};