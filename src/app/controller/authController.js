const {AppContext} = require('../common/appContext');
const {HandleCodeHHCommand, InvalidateHHAccessTokenCommand} = require('../../command');
const {GetAuthUrlHHQuery, GetCurrentUserQuery} = require('../../query');

module.exports = {
  getAuthUrlHH: ({userId}, ext) => {
    const appContext = new AppContext(ext);
    const {getAuthUrlHHQueryHandler} = appContext;
    const query = new GetAuthUrlHHQuery({userId});

    return getAuthUrlHHQueryHandler.handle(query);
  },

  handleCodeHH: (params, ext) => {
    const appContext = new AppContext(ext);
    const {handleCodeHHCommandHandler} = appContext;
    const command = new HandleCodeHHCommand(params);

    return handleCodeHHCommandHandler.execute(command);
  },

  invalidateHHAccessToken: (_, ext) => {
    const appContext = new AppContext(ext);
    const {invalidateHHAccessTokenCommandHandler} = appContext;
    const command = new InvalidateHHAccessTokenCommand();

    return invalidateHHAccessTokenCommandHandler.execute(command);
  },

  getCurrentUser: (_, ext) => {
    const appContext = new AppContext(ext);
    const {getCurrentUserQueryHandler} = appContext;
    const query = new GetCurrentUserQuery();

    return getCurrentUserQueryHandler.handle(query);
  }
};