const {AppContext} = require('../common/appContext');
const {RemoveKeySkillCommand, AddKeySkillCommand} = require('../../command');
const {SearchKeySkillsQuery} = require('../../query');

module.exports = {
  searchKeySkills: ({params}, ext) => {
    const appContext = new AppContext(ext);
    const {searchKeySkillsQueryHandler} = appContext;
    const query = new SearchKeySkillsQuery(params);

    return searchKeySkillsQueryHandler.handle(query);
  },

  removeKeySkill: ({id}, ext) => {
    const appContext = new AppContext(ext);
    const {removeKeySkillCommandHandler} = appContext;
    const command = new RemoveKeySkillCommand(id);

    return removeKeySkillCommandHandler.execute(command);
  },

  addKeySkill: ({name}, ext) => {
    const appContext = new AppContext(ext);
    const {addKeySkillCommandHandler} = appContext;
    const command = new AddKeySkillCommand(name);

    return addKeySkillCommandHandler.execute(command);
  }
};