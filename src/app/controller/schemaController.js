const {AppContext} = require('../common/appContext');
const {
  AddSchemaCommand,
  RemoveSchemaCommand
} = require('../../command');
const {
  GetSchemaQuery,
  GetSchemaListQuery
} = require('../../query');

module.exports = {
  addSchema: (params, ext) => {
    const appContext = new AppContext(ext);
    const {addSchemaCommandHandler} = appContext;
    const command = new AddSchemaCommand(params);

    return addSchemaCommandHandler.execute(command);
  },

  getSchemaList: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getSchemaListQueryHandler} = appContext;
    const query = new GetSchemaListQuery(params);

    return getSchemaListQueryHandler.handle(query);
  },

  getSchema: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getSchemaQueryHandler} = appContext;
    const query = new GetSchemaQuery(params);

    return getSchemaQueryHandler.handle(query);
  },

  removeSchema: (params, ext) => {
    const appContext = new AppContext(ext);
    const {removeSchemaCommandHandler} = appContext;
    const command = new RemoveSchemaCommand(params);

    return removeSchemaCommandHandler.execute(command);
  }
};