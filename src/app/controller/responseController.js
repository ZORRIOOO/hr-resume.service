const {AppContext} = require('../common/appContext');
const {
  GetResponseListQuery,
  GetResponseQuery,
  GetTemplatesQuery,
  GetCollectionQuery
} = require('../../query');
const {
  SendInviteCommand,
  DiscardCandidateCommand,
  SendInviteForVacancyCommand
} = require('../../command');

module.exports = {
  getCollection: (params, ext) => {
    const extPatch = {
      ...ext,
      sessionInfo: {
        ...ext.sessionInfo,
        userId: params.authorId
      }
    };
    const appContext = new AppContext(extPatch);
    const {getCollectionQueryHandler} = appContext;
    const query = new GetCollectionQuery(params);

    return getCollectionQueryHandler.handle(query);
  },

  getResponseList: (params, ext) => {
    const extPatch = {
      ...ext,
      sessionInfo: {
        ...ext.sessionInfo,
        userId: params.authorId
      }
    };
    const appContext = new AppContext(extPatch);
    const {getResponseListQueryHandler} = appContext;
    const query = new GetResponseListQuery(params);

    return getResponseListQueryHandler.handle(query);
  },

  getResponse: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getResponseQueryHandler} = appContext;
    const query = new GetResponseQuery(params);

    return getResponseQueryHandler.handle(query);
  },

  sendInvite: (params, ext) => {
    const appContext = new AppContext(ext);
    const {sendInviteCommandHandler} = appContext;
    const command = new SendInviteCommand(params);

    return sendInviteCommandHandler.execute(command);
  },

  discardCandidate: (params, ext) => {
    const appContext = new AppContext(ext);
    const {discardCandidateCommandHandler} = appContext;
    const command = new DiscardCandidateCommand(params);

    return discardCandidateCommandHandler.execute(command);
  },

  getTemplates: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getTemplatesQueryHandler} = appContext;
    const query = new GetTemplatesQuery(params);

    return getTemplatesQueryHandler.handle(query);
  },

  sendInviteForVacancy: (params, ext) => {
    const appContext = new AppContext(ext);
    const {sendInviteForVacancyCommandHandler} = appContext;
    const command = new SendInviteForVacancyCommand(params);

    return sendInviteForVacancyCommandHandler.execute(command);
  }
};