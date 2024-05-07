const {AppContext} = require('../common/appContext');
const {
  GetHHDictionariesQuery,
  GetHHAreasQuery,
  GetHHLanguagesQuery,
  GetHHProfessionalRolesQuery,
  GetHHSuggestionQuery,
  GetHHEmployersAddressesQuery,
  GetHHManagersQuery,
  GetHHPublicationTypesQuery,
  GetBrandedTemplatesQuery,
  GetSkillsByIdsQuery
} = require('../../query');

module.exports = {
  getHHDictionaries: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getHHDictionariesQueryHandler} = appContext;
    const query = new GetHHDictionariesQuery(params);

    return getHHDictionariesQueryHandler.handle(query);
  },

  getHHAreas: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getHHAreasQueryHandler} = appContext;
    const query = new GetHHAreasQuery(params);

    return getHHAreasQueryHandler.handle(query);
  },

  getHHLanguages: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getHHLanguagesQueryHandler} = appContext;
    const query = new GetHHLanguagesQuery();

    return getHHLanguagesQueryHandler.handle(query);
  },

  getHHProfessionalRoles: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getHHProfessionalRolesQueryHandler} = appContext;
    const query = new GetHHProfessionalRolesQuery();

    return getHHProfessionalRolesQueryHandler.handle(query);
  },

  getHHSuggestions: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getHHSuggestionQueryHandler} = appContext;
    const query = new GetHHSuggestionQuery(params);

    return getHHSuggestionQueryHandler.handle(query);
  },

  getHHEmployersAddresses: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getHHEmployersAddressesQueryHandler} = appContext;
    const query = new GetHHEmployersAddressesQuery();

    return getHHEmployersAddressesQueryHandler.handle(query);
  },

  getHHManagers: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getHHManagersQueryHandler} = appContext;
    const query = new GetHHManagersQuery();

    return getHHManagersQueryHandler.handle(query);
  },

  getHHPublicationTypes: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getHHPublicationTypesQueryHandler} = appContext;
    const query = new GetHHPublicationTypesQuery();

    return getHHPublicationTypesQueryHandler.handle(query);
  },

  getBrandedTemplates: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getBrandedTemplatesQueryHandler} = appContext;
    const query = new GetBrandedTemplatesQuery();

    return getBrandedTemplatesQueryHandler.handle(query);
  },

  getResumeDayLimit: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getResumeDayLimitQueryHandler} = appContext;

    return getResumeDayLimitQueryHandler.handle();
  },

  getSkillsByIds: (params, ext) => {
    const appContext = new AppContext(ext);
    const {getSkillsByIdsQueryHandler} = appContext;
    const query = new GetSkillsByIdsQuery(params);

    return getSkillsByIdsQueryHandler.handle(query);
  }
};
