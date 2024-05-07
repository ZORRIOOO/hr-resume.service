const {AppContext} = require('../common/appContext');
const {
  GetResumeListQuery,
  GetResumeQuery,
  GetResumeListByCandidateIdQuery,
  GetResumeCommentsQuery,
  GetInternalBaseResumeListQuery
} = require('../../query');
const {
  ConnectResumeCandidateCommand,
  PutResumeCommand,
  RemoveResumeCommand
} = require('../../command');

module.exports = {
  getResumeList: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getResumeListQueryHandler} = appContext;
    const query = new GetResumeListQuery(params);

    return getResumeListQueryHandler.handle(query);
  },

  getResume: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getResumeQueryHandler} = appContext;
    const query = new GetResumeQuery(params);

    return getResumeQueryHandler.handle(query);
  },

  connectResumeCandidate: (params, ext) => {
    const appContext = new AppContext(ext);
    const {connectResumeCandidateCommandHandler} = appContext;
    const query = new ConnectResumeCandidateCommand(params);

    return connectResumeCandidateCommandHandler.execute(query);
  },

  getResumeListByCandidateId: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getResumeListByCandidateIdQueryHandler} = appContext;
    const query = new GetResumeListByCandidateIdQuery(params);

    return getResumeListByCandidateIdQueryHandler.handle(query);
  },

  getResumeComments: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getResumeCommentsQueryHandler} = appContext;
    const query = new GetResumeCommentsQuery(params);

    return getResumeCommentsQueryHandler.handle(query);
  },

  putResume: ({body}, ext) => {
    const appContext = new AppContext(ext);
    const {putResumeCommandHandler} = appContext;
    const command = new PutResumeCommand(body);

    return putResumeCommandHandler.execute(command);
  },

  removeResume: ({resumeId, platform}, ext) => {
    const appContext = new AppContext(ext);
    const {removeResumeCommandHandler} = appContext;
    const command = new RemoveResumeCommand(resumeId, platform);

    return removeResumeCommandHandler.execute(command);
  },

  getInternalBaseResumeList: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getInternalBaseResumeListQueryHandler} = appContext;
    const query = new GetInternalBaseResumeListQuery(params);

    return getInternalBaseResumeListQueryHandler.handle(query);
  }
};