const objectMapper = require('object-mapper');

class GetVacancyQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  async handle(query) {
    const {vacancyId} = query;
    const vacancy = await this.hhApiClient.getVacancy(vacancyId);

    return objectMapper(vacancy, {
      'id': 'id',
      'description': 'description',
      'branded_description': 'brandedDescription',
      'key_skills': 'keySkills',
      'schedule': 'schedule',
      'accept_handicapped': 'acceptHandicapped',
      'accept_kids': 'acceptKids',
      'experience': 'experience',
      'address': 'address',
      'alternate_url': 'alternateUrl',
      'apply_alternate_url': 'applyAlternateUrl',
      'code': 'code',
      'department': 'department',
      'employment': 'employment',
      'salary': 'salary',
      'archived': 'archived',
      'insider_interview': 'insiderInterview',
      'area': 'area',
      'name': 'name',
      'initial_created_at': 'initialCreatedAt',
      'created_at': 'createdAt',
      'published_at': 'publishedAt',
      'employer': 'employer',
      'response_letter_required': 'responseLetterRequired',
      'type': 'type',
      'has_test': 'hasTest',
      'response_url': 'responseUrl',
      'test': 'test',
      'contacts': 'contacts',
      'billing_type': 'billingType',
      'allow_messages': 'allowMessages',
      'premium': 'premium',
      'driver_license_types': 'driverLicenseTypes',
      'accept_incomplete_resumes': 'acceptIncompleteResumes',
      'working_days': 'workingDays',
      'working_time_intervals': 'workingTimeIntervals',
      'working_time_modes': 'workingTimeModes',
      'accept_temporary': 'acceptTemporary',
      'professional_roles': 'professionalRoles',
      'languages': 'languages'
    });
  }

}

module.exports = {GetVacancyQueryHandler};