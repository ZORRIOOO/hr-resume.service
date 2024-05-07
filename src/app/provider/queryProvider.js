const ProviderInterface = require('../common/providerInterface');
const {
  GetResumeListQueryHandler,
  GetAuthUrlHHQueryHandler,
  GetResumeQueryHandler,
  GetHHDictionariesQueryHandler,
  GetHHAreasQueryHandler,
  GetHHLanguagesQueryHandler,
  GetHHProfessionalRolesQueryHandler,
  GetHHSuggestionQueryHandler,
  GetResumeListByCandidateIdQueryHandler,
  GetHHEmployersAddressesQueryHandler,
  GetHHManagersQueryHandler,
  GetHHPublicationTypesQueryHandler,
  GetResumeCommentsQueryHandler,
  GetResponseListQueryHandler,
  GetResponseQueryHandler,
  GetTemplatesQueryHandler,
  GetBrandedTemplatesQueryHandler,
  GetCurrentUserQueryHandler,
  SearchKeySkillsQueryHandler,
  GetCollectionQueryHandler,
  GetResumeDayLimitQueryHandler,
  GetJobPageContentQueryHandler,
  GetSchemaQueryHandler,
  GetSchemaListQueryHandler,
  GetInternalBaseResumeListQueryHandler,
  CheckDoubleByUrlQueryHandler,
  GetVacancyQueryHandler,
  GetSkillsByIdsQueryHandler,
  GetPlatformByUrlQueryHandler
} = require('../../query');

class QueryProvider extends ProviderInterface {
  provide(containerBuilder) {
    containerBuilder
      .add('getResumeListQueryHandler', (c) => new GetResumeListQueryHandler({
        hhApiClient: c.get('hhApiClient'),
        resumeDao: c.get('resumeDao'),
        userId: c.get('userId') || 0,
        eventDispatcher: c.get('eventDispatcher')
      }))
      .add('getAuthUrlHHQueryHandler', (c) => new GetAuthUrlHHQueryHandler({
        hhApiClient: c.get('hhApiClient'),
        hhTokenStore: c.get('hhTokenStore'),
        hhOAuthClient: c.get('hhOAuthClient')
      }))
      .add('getResumeQueryHandler', (c) => new GetResumeQueryHandler({
        hhApiClient: c.get('hhApiClient'),
        resumeDao: c.get('resumeDao'),
        userId: c.get('userId') || 0,
        eventDispatcher: c.get('eventDispatcher')
      }))
      .add('getHHDictionariesQueryHandler', (c) => new GetHHDictionariesQueryHandler({
        hhApiClient: c.get('hhApiClient'),
        withCache: c.get('withCache')
      }))
      .add('getHHAreasQueryHandler', (c) => new GetHHAreasQueryHandler({
        hhApiClient: c.get('hhApiClient'),
        withCache: c.get('withCache')
      }))
      .add('getHHLanguagesQueryHandler', (c) => new GetHHLanguagesQueryHandler({
        hhApiClient: c.get('hhApiClient'),
        withCache: c.get('withCache')
      }))
      .add('getHHProfessionalRolesQueryHandler', (c) => new GetHHProfessionalRolesQueryHandler({
        hhApiClient: c.get('hhApiClient'),
        withCache: c.get('withCache')
      }))
      .add('getHHSuggestionQueryHandler', (c) => new GetHHSuggestionQueryHandler({
        hhApiClient: c.get('hhApiClient'),
        withCache: c.get('withCache')
      }))
      .add('getResumeListByCandidateIdQueryHandler',
        (c) => new GetResumeListByCandidateIdQueryHandler({
          resumeDao: c.get('resumeDao')
        }))
      .add('getHHEmployersAddressesQueryHandler', (c) => new GetHHEmployersAddressesQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getHHManagersQueryHandler', (c) => new GetHHManagersQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getHHPublicationTypesQueryHandler', (c) => new GetHHPublicationTypesQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getResumeCommentsQueryHandler', (c) => new GetResumeCommentsQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getResponseListQueryHandler', (c) => new GetResponseListQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getResponseQueryHandler', (c) => new GetResponseQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getTemplatesQueryHandler', (c) => new GetTemplatesQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getBrandedTemplatesQueryHandler', (c) => new GetBrandedTemplatesQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getCurrentUserQueryHandler', (c) => new GetCurrentUserQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('searchKeySkillsQueryHandler', (c) => new SearchKeySkillsQueryHandler({
        db: c.get('db')
      }))
      .add('getCollectionQueryHandler', (c) => new GetCollectionQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getResumeDayLimitQueryHandler', (c) => new GetResumeDayLimitQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getJobPageContentQueryHandler', (c) => new GetJobPageContentQueryHandler({
        extensionDao: c.get('extensionDao')
      }))
      .add('getVacancyQueryHandler', (c) => new GetVacancyQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getSchemaQueryHandler', (c) => new GetSchemaQueryHandler({
        schemaDao: c.get('schemaDao')
      }))
      .add('getSchemaListQueryHandler', (c) => new GetSchemaListQueryHandler({
        schemaDao: c.get('schemaDao')
      }))
      .add('getInternalBaseResumeListQueryHandler', (c) =>
        new GetInternalBaseResumeListQueryHandler({
          resumeDao: c.get('resumeDao')
        }))
      .add('checkDoubleByUrlQueryHandler', (c) => new CheckDoubleByUrlQueryHandler({
        extensionDao: c.get('extensionDao')
      }))
      .add('getSkillsByIdsQueryHandler', (c) => new GetSkillsByIdsQueryHandler({
        hhApiClient: c.get('hhApiClient')
      }))
      .add('getPlatformByUrlQueryHandler', () => new GetPlatformByUrlQueryHandler());
  }
}

module.exports = {QueryProvider};