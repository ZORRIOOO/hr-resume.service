const {Transform} = require('stream');
const {VacancyPlace} = require('../../../../domain/enums');

class GetCollectionDuplexStream extends Transform {
  logger;

  catalogs;

  constructor({logger, catalogs}) {
    super({objectMode: true, highWaterMark: 1});
    this.logger = logger;
    this.catalogs = catalogs;
  }

  _transform = (candidate, _, callback) => {
    const resExperience = candidate?.experience?.map((item) => {
      return {
        company: item?.name,
        start: item?.startDate,
        position: item?.position,
        end: item?.endDate,
        description: item?.responsibilities
      };
    });

    const resEducation = candidate?.education?.map((item) => {
      return {
        name: item?.name,
        level: item?.type,
        start: item?.startDate,
        end: item?.endDate,
        result: ''
      };
    });

    const parameters = {
      platform: VacancyPlace.ITERNAL_BASE,
      candidateId: candidate?.candidateId,
      resumeId: candidate?.candidateId.toString(),
      resumeParams: {
        title: 'Профиль кандидата',
        position: [],
        salary: '',
        professionalRoles: [],
        professionalAreas: candidate?.profAreas || [],
        employment: [],
        schedule: [],
        training: [],
        keySkills: [],
        candidateInfo: candidate?.addInfo?.additionalInformation || '',
        experience: resExperience || [],
        education: resEducation || [],
        relocationCitiesIds: candidate?.relocationCitiesIds || [],
        driveLicense: null,
        nativeLanguage: null,
        languages: [],
        citizenship: [],
        workPermit: [],
        travelTime: '',
        experienceStatus: candidate?.experienceStatus || null,
        educationStatus: candidate?.educationStatus || null,
        createdAt: candidate?.createdAt
      }
    };

    this.push(parameters);

    return callback();
  }
}

module.exports = {GetCollectionDuplexStream};