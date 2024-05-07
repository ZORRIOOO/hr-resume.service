const ProviderInterface = require('../common/providerInterface');
const {
  HandleCodeHHCommandHandler,
  ConnectResumeCandidateCommandHandler,
  InvalidateHHAccessTokenCommandHandler,
  PostVacancyCommandHandler,
  ArchiveVacancyCommandHandler,
  SendInviteCommandHandler,
  DiscardCandidateCommandHandler,
  SendInviteForVacancyCommandHandler,
  PutResumeCommandHandler,
  RemoveResumeCommandHandler,
  AddKeySkillCommandHandler,
  RemoveKeySkillCommandHandler,
  AddJobPageContentCommandHandler,
  AddSchemaCommandHandler,
  RemoveSchemaCommandHandler,
  ConnectResumeContentCommandHandler
} = require('../../command');

class CommandProvider extends ProviderInterface {
  provide(containerBuilder) {
    containerBuilder
      .add('handleCodeHHCommandHandler', (c) => new HandleCodeHHCommandHandler({
        hhOAuthClient: c.get('hhOAuthClient'),
        db: c.get('db')
      }))
      .add('connectResumeCandidateCommandHandler', (c) => new ConnectResumeCandidateCommandHandler({
        resumeDao: c.get('resumeDao')
      }))
      .add('invalidateHHAccessTokenCommandHandler', (c) =>
        new InvalidateHHAccessTokenCommandHandler({
          hhOAuthClient: c.get('hhOAuthClient')
        }))
      .add('postVacancyCommandHandler', (c) => new PostVacancyCommandHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('archiveVacancyCommandHandler', (c) => new ArchiveVacancyCommandHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('sendInviteCommandHandler', (c) => new SendInviteCommandHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('discardCandidateCommandHandler', (c) => new DiscardCandidateCommandHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('sendInviteForVacancyCommandHandler', (c) => new SendInviteForVacancyCommandHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('putResumeCommandHandler', (c) => new PutResumeCommandHandler({
        resumeDao: c.get('resumeDao')
      }))
      .add('removeResumeCommandHandler', (c) => new RemoveResumeCommandHandler({
        db: c.get('db')
      }))
      .add('addKeySkillCommandHandler', (c) => new AddKeySkillCommandHandler({
        db: c.get('db')
      }))
      .add('removeKeySkillCommandHandler', (c) => new RemoveKeySkillCommandHandler({
        db: c.get('db')
      }))
      .add('addJobPageContentCommandHandler', (c) => new AddJobPageContentCommandHandler({
        extensionDao: c.get('extensionDao')
      }))
      .add('addSchemaCommandHandler', (c) => new AddSchemaCommandHandler({
        schemaDao: c.get('schemaDao')
      }))
      .add('removeSchemaCommandHandler', (c) => new RemoveSchemaCommandHandler({
        schemaDao: c.get('schemaDao')
      }))
      .add('connectResumeContentCommandHandler', (c) => new ConnectResumeContentCommandHandler({
        extensionDao: c.get('extensionDao')
      }));
  }
}

module.exports = {CommandProvider};