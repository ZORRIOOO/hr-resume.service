const {VacancyPlace} = require('../../../../domain/enums');

class TransferCandidateDatasHandler {
  candidatesServiceApi;

  resumeDao;

  constructor({candidatesServiceApi, resumeDao}) {
    this.candidatesServiceApi = candidatesServiceApi;
    this.resumeDao = resumeDao;
  }

  handle = async(payload) => {
    const {candidateId} = payload;

    const [candidateInfo] = await this.candidatesServiceApi.getCandidatesFullInfo({candidateId});

    if (!candidateInfo) {
      return;
    }

    const resExperience = candidateInfo?.experience?.map((item) => {
      return {
        company: item?.name,
        start: item?.startDate,
        position: item?.position,
        end: item?.endDate,
        description: item?.responsibilities
      };
    });

    const resEducation = candidateInfo?.education?.map((item) => {
      return {
        name: item?.name,
        level: item?.type,
        start: item?.startDate,
        end: item?.endDate,
        result: ''
      };
    });

    const resumeParams = {
      title: 'Профиль кандидата',
      position: [],
      salary: '',
      professionalRoles: [],
      professionalAreas: candidateInfo?.profAreas || [],
      employment: [],
      schedule: [],
      training: [],
      keySkills: [],
      candidateInfo: candidateInfo?.addInfo?.additionalInformation || '',
      experience: resExperience || [],
      education: resEducation || [],
      relocationCitiesIds: candidateInfo?.relocationCitiesIds || [],
      driveLicense: null,
      nativeLanguage: null,
      languages: [],
      citizenship: [],
      workPermit: [],
      travelTime: ''
    };

    await this.resumeDao.save(
      VacancyPlace.ITERNAL_BASE,
      candidateInfo?.candidateId.toString(),
      resumeParams,
      new Date().toISOString(),
      candidateInfo?.candidateId
    );
  }
}

module.exports = TransferCandidateDatasHandler;