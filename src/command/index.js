const {HandleCodeHHCommand} = require('./handleCodeHH/handleCodeHHCommand');
const {HandleCodeHHCommandHandler} = require('./handleCodeHH/handleCodeHHCommandHandler');
const {
  ConnectResumeCandidateCommand
} = require('./connectResumeCandidate/ConnectResumeCandidateCommand');
const {
  ConnectResumeCandidateCommandHandler
} = require('./connectResumeCandidate/ConnectResumeCandidateCommandHandler');
const {InvalidateHHAccessTokenCommand} =
  require('./invalidateHHAccessToken/invalidateHHAccessTokenCommand');
const {InvalidateHHAccessTokenCommandHandler} =
  require('./invalidateHHAccessToken/invalidateHHAccessTokenCommandHandler');
const {PostVacancyCommand} = require('./postVacancy/postVacancyCommand');
const {PostVacancyCommandHandler} = require('./postVacancy/postVacancyCommandHandler');
const {ArchiveVacancyCommand} = require('./archiveVacancy/archiveVacancyCommand');
const {ArchiveVacancyCommandHandler} = require('./archiveVacancy/archiveVacancyCommandHandler');
const {SendInviteCommand} = require('./sendInvite/sendInviteCommand');
const {SendInviteCommandHandler} = require('./sendInvite/sendInviteCommandHandler');
const {DiscardCandidateCommand} = require('./discardCandidate/discardCandidateCommand');
const {DiscardCandidateCommandHandler} =
  require('./discardCandidate/discardCandidateCommandHandler');
const {SendInviteForVacancyCommand} =
  require('./sendInviteForVacancy/sendInviteForVacancyCommand');
const {SendInviteForVacancyCommandHandler} =
  require('./sendInviteForVacancy/sendInviteForVacancyCommandHandler');
const {PutResumeCommand} = require('./putResume/putResumeCommand');
const {PutResumeCommandHandler} = require('./putResume/putResumeCommandHandler');
const {RemoveResumeCommand} = require('./removeResume/removeResumeCommand');
const {RemoveResumeCommandHandler} = require('./removeResume/removeResumeCommandHandler');
const {AddKeySkillCommand} = require('./addKeySkill/addKeySkillCommand');
const {AddKeySkillCommandHandler} = require('./addKeySkill/addKeySkillCommandHandler');
const {RemoveKeySkillCommand} = require('./removeKeySkill/removeKeySkillCommand');
const {RemoveKeySkillCommandHandler} = require('./removeKeySkill/removeKeySkillCommandHandler');
const {AddJobPageContentCommand} =
  require('./addJobPageContent/addJobPageContentCommand');
const {AddJobPageContentCommandHandler} =
  require('./addJobPageContent/addJobPageContentCommandHandler');
const {AddSchemaCommand} = require('./addSchema/addSchemaCommand');
const {AddSchemaCommandHandler} = require('./addSchema/addSchemaCommandHandler');
const {RemoveSchemaCommand} = require('./removeSchema/removeSchemaCommand');
const {RemoveSchemaCommandHandler} = require('./removeSchema/removeSchemaCommandHandler');
const {ConnectResumeContentCommand} = require('./connectResumeContent/connectResumeContentCommand');
const {ConnectResumeContentCommandHandler} =
  require('./connectResumeContent/connectResumeContentCommandHandler');

module.exports = {
  HandleCodeHHCommand,
  HandleCodeHHCommandHandler,
  ConnectResumeCandidateCommand,
  ConnectResumeCandidateCommandHandler,
  InvalidateHHAccessTokenCommand,
  InvalidateHHAccessTokenCommandHandler,
  PostVacancyCommand,
  PostVacancyCommandHandler,
  ArchiveVacancyCommand,
  ArchiveVacancyCommandHandler,
  SendInviteCommand,
  SendInviteCommandHandler,
  DiscardCandidateCommand,
  DiscardCandidateCommandHandler,
  SendInviteForVacancyCommand,
  SendInviteForVacancyCommandHandler,
  PutResumeCommand,
  PutResumeCommandHandler,
  RemoveResumeCommand,
  RemoveResumeCommandHandler,
  AddKeySkillCommand,
  AddKeySkillCommandHandler,
  RemoveKeySkillCommand,
  RemoveKeySkillCommandHandler,
  AddJobPageContentCommand,
  AddJobPageContentCommandHandler,
  AddSchemaCommand,
  AddSchemaCommandHandler,
  RemoveSchemaCommand,
  RemoveSchemaCommandHandler,
  ConnectResumeContentCommand,
  ConnectResumeContentCommandHandler
};