const {GetResumeListQuery} = require('./getResumeList/getResumeListQuery');
const {GetResumeListQueryHandler} = require('./getResumeList/getResumeListQueryHandler');
const {GetAuthUrlHHQuery} = require('./makeAuthUrlHH/getAuthUrlHHQuery');
const {GetAuthUrlHHQueryHandler} = require('./makeAuthUrlHH/getAuthUrlHHQueryHandler');
const {GetResumeQuery} = require('./getResume/getResumeQuery');
const {GetResumeQueryHandler} = require('./getResume/getResumeQueryHandler');
const {GetHHDictionariesQuery} = require('./getHHDictionaries/getHHDictionariesQuery');
const {GetHHDictionariesQueryHandler} =
  require('./getHHDictionaries/GetHHDictionariesQueryHandler');
const {GetHHAreasQuery} = require('./getHHAreas/getHHAreasQuery');
const {GetHHAreasQueryHandler} = require('./getHHAreas/getHHAreasQueryHandler');
const {GetHHLanguagesQuery} = require('./getHHLanguages/getHHLanguagesQuery');
const {GetHHLanguagesQueryHandler} = require('./getHHLanguages/getHHLanguagesQueryHandler');
const {GetHHProfessionalRolesQuery} =
  require('./getHHProfessionalRoles/getHHProfessionalRolesQuery');
const {GetHHProfessionalRolesQueryHandler} =
  require('./getHHProfessionalRoles/getHHProfessionalRolesQueryHandler');
const {GetHHSuggestionQuery} = require('./getHHSuggestion/getHHSuggestionQuery');
const {GetHHSuggestionQueryHandler} = require('./getHHSuggestion/getHHSuggestionQueryHandler');
const {GetResumeListByCandidateIdQuery} =
  require('./getResumeListByCandidateId/getResumeListByCandidateIdQuery');
const {GetResumeListByCandidateIdQueryHandler} =
  require('./getResumeListByCandidateId/getResumeListByCandidateIdQueryHandler');
const {GetHHEmployersAddressesQuery} =
  require('./getHHEmployersAddresses/getHHEmployersAddressesQuery');
const {GetHHEmployersAddressesQueryHandler} =
  require('./getHHEmployersAddresses/getHHEmployersAddressesQueryHandler');
const {GetHHManagersQuery} = require('./getHHManagers/getHHManagersQuery');
const {GetHHManagersQueryHandler} = require('./getHHManagers/getHHManagersQueryHandler');
const {GetHHPublicationTypesQuery} = require('./getHHPublicationTypes/GetHHPublicationTypesQuery');
const {GetHHPublicationTypesQueryHandler} =
  require('./getHHPublicationTypes/GetHHPublicationTypesQueryHandler');
const {GetResumeCommentsQuery} = require('./getResumeComments/getResumeCommentsQuery');
const {GetResumeCommentsQueryHandler} =
require('./getResumeComments/getResumeCommentsQueryHandler');
const {GetResponseListQuery} = require('./getResponseList/getResponseListQuery');
const {GetResponseListQueryHandler} = require('./getResponseList/getResponseListQueryHandler');
const {GetResponseQuery} = require('./getResponse/getResponseQuery');
const {GetResponseQueryHandler} = require('./getResponse/getResponseQueryHandler');
const {GetTemplatesQuery} = require('./getTemplates/getTemplatesQuery');
const {GetTemplatesQueryHandler} = require('./getTemplates/getTemplatesQueryHandler');
const {GetBrandedTemplatesQuery} = require('./getBrandedTemplates/getBrandedTemplatesQuery');
const {GetBrandedTemplatesQueryHandler} =
  require('./getBrandedTemplates/getBrandedTemplatesQueryHandler');
const {GetCurrentUserQuery} = require('./getCurrentUser/getCurrentUserQuery');
const {GetCurrentUserQueryHandler} = require('./getCurrentUser/getCurrentUserQueryHandler');
const {SearchKeySkillsQuery} = require('./searchKeySkills/searchKeySkillsQuery');
const {SearchKeySkillsQueryHandler} = require('./searchKeySkills/searchKeySkillsQueryHandler');
const {GetCollectionQuery} = require('./getCollection/getCollectionQuery');
const {GetCollectionQueryHandler} = require('./getCollection/getCollectionQueryHandler');
const {GetResumeDayLimitQueryHandler} =
  require('./getResumeDayLimit/getResumeDayLimitQueryHandler');
const {GetJobPageContentQuery} = require('./getJobPageContent/getJobPageContentQuery');
const {GetJobPageContentQueryHandler} =
  require('./getJobPageContent/getJobPageContentQueryHandler');
const {GetSchemaListQuery} = require('./getSchemaList/getSchemaListQuery');
const {GetSchemaListQueryHandler} = require('./getSchemaList/getSchemaListQueryHandler');
const {GetSchemaQuery} = require('./getSchema/getSchemaQuery');
const {GetSchemaQueryHandler} = require('./getSchema/getSchemaQueryHandler');
const {GetInternalBaseResumeListQuery} =
  require('./getInternalBaseResumeList/getInternalBaseResumeListQuery');
const {GetInternalBaseResumeListQueryHandler} =
  require('./getInternalBaseResumeList/getInternalBaseResumeListQueryHandler');
const {CheckDoubleByUrlQuery} = require('./checkDoubleByUrl/checkDoubleByUrlQuery');
const {CheckDoubleByUrlQueryHandler} = require('./checkDoubleByUrl/checkDoubleByUrlQueryHandler');
const {GetVacancyQuery} = require('./getVacancy/getVacancyQuery');
const {GetVacancyQueryHandler} = require('./getVacancy/getVacancyQueryHandler');
const {GetSkillsByIdsQuery} = require('./getSkillsByIds/getSkillsByIdsQuery');
const {GetSkillsByIdsQueryHandler} = require('./getSkillsByIds/getSkillsByIdsQueryHandler');
const {GetPlatformByUrlQueryHandler} = require('./getPlatformByUrl/getPlatformByUrlQueryHandler');

module.exports = {
  GetResumeListQuery,
  GetResumeListQueryHandler,
  GetAuthUrlHHQuery,
  GetAuthUrlHHQueryHandler,
  GetResumeQuery,
  GetResumeQueryHandler,
  GetHHDictionariesQuery,
  GetHHDictionariesQueryHandler,
  GetHHAreasQuery,
  GetHHAreasQueryHandler,
  GetHHLanguagesQuery,
  GetHHLanguagesQueryHandler,
  GetHHProfessionalRolesQuery,
  GetHHProfessionalRolesQueryHandler,
  GetHHSuggestionQuery,
  GetHHSuggestionQueryHandler,
  GetResumeListByCandidateIdQuery,
  GetResumeListByCandidateIdQueryHandler,
  GetHHEmployersAddressesQuery,
  GetHHEmployersAddressesQueryHandler,
  GetHHManagersQuery,
  GetHHManagersQueryHandler,
  GetHHPublicationTypesQuery,
  GetHHPublicationTypesQueryHandler,
  GetResumeCommentsQuery,
  GetResumeCommentsQueryHandler,
  GetResponseListQuery,
  GetResponseListQueryHandler,
  GetResponseQuery,
  GetResponseQueryHandler,
  GetTemplatesQuery,
  GetTemplatesQueryHandler,
  GetBrandedTemplatesQuery,
  GetBrandedTemplatesQueryHandler,
  GetCurrentUserQuery,
  GetCurrentUserQueryHandler,
  SearchKeySkillsQuery,
  SearchKeySkillsQueryHandler,
  GetCollectionQuery,
  GetCollectionQueryHandler,
  GetResumeDayLimitQueryHandler,
  GetJobPageContentQuery,
  GetJobPageContentQueryHandler,
  GetSchemaListQuery,
  GetSchemaListQueryHandler,
  GetSchemaQuery,
  GetSchemaQueryHandler,
  GetInternalBaseResumeListQuery,
  GetInternalBaseResumeListQueryHandler,
  CheckDoubleByUrlQuery,
  CheckDoubleByUrlQueryHandler,
  GetVacancyQuery,
  GetVacancyQueryHandler,
  GetSkillsByIdsQuery,
  GetSkillsByIdsQueryHandler,
  GetPlatformByUrlQueryHandler
};