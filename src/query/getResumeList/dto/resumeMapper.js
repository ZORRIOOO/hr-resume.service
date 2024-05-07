const objectMapper = require('object-mapper');
const {ResumeId} = require('./resumeId');
const {VacancyPlace} = require('../../../domain/enums');
const {Salary} = require('./salary');
const {Experience} = require('./experience');
const {ResumeListItem} = require('./resumeListItem');
const {Candidate} = require('./candidate');

class ResumeMapper {
  map(src, localResume) {
    const schema = this.getSchemaByPlatform(localResume?.platform);
    const {
      candidate,
      title,
      salary,
      lastExperience,
      updatedAt,
      lastComment
    } = objectMapper(src, schema);

    const {resumeId, candidateId, version, patch} = localResume || {};

    return new ResumeListItem({
      id: new ResumeId(localResume?.platform, resumeId),
      candidate: candidate ?
        new Candidate(candidate.fullName?.join(' '), patch?.small || candidate.photo) :
        null,
      title,
      salary,
      lastExperience,
      updatedAt: updatedAt || version,
      lastComment,
      version,
      candidateId
    });
  }

  getSchemaByPlatform(platform) {
    switch (platform) {
      case VacancyPlace.HH:
        return this.schemaHHResume;
      case VacancyPlace.RESUME_EXTENSION:
      case VacancyPlace.ITERNAL_BASE:
        return this.schemaInnerDBResume;
      default:
        break;
    }
  }

  get schemaInnerDBResume() {
    return {
      position: {
        key: 'title?',
        transform: (position) => {
          if (Array.isArray(position)) {
            return position.map(({name}) => name).join(', ');
          }

          return position?.label || null;
        }
      },
      'lastName': 'candidate.fullName[]+',
      'firstName': 'candidate.fullName[]+',
      'secondName': 'candidate.fullName[]+',
      'middleName': 'candidate.fullName[]+',
      'photo': 'candidate.photo?',
      salary: {
        key: 'salary?',
        transform: (salary) => {
          if (!salary) {
            return null;
          }

          return new Salary(Number(salary), 'RUR');
        }
      },
      'experience[0]': {
        key: 'lastExperience?',
        transform: (lastExperience) => {
          if (!lastExperience) {
            return null;
          }

          return new Experience({
            company: lastExperience.company,
            position: lastExperience.position,
            description: lastExperience.description,
            start: lastExperience.start,
            end: lastExperience.end
          });
        }
      },
      'candidateId': 'candidateId?'
    };
  }

  get schemaHHResume() {
    return {
      title: 'title?',
      'last_name': 'candidate.fullName[]+',
      'first_name': 'candidate.fullName[]+',
      'middle_name': 'candidate.fullName[]+',
      'photo.small': 'candidate.photo?',
      salary: {
        key: 'salary?',
        transform: (salary) => {
          if (!salary) {
            return null;
          }

          return new Salary(salary.amount, salary.currency);
        }
      },
      'experience[0]': {
        key: 'lastExperience?',
        transform: (lastExperience) => {
          if (!lastExperience) {
            return null;
          }

          return new Experience({
            company: lastExperience.company,
            position: lastExperience.position,
            start: lastExperience.start,
            end: lastExperience.end
          });
        }
      },
      'updated_at': 'updatedAt?',
      'version': 'version?',
      'candidateId': 'candidateId?'
    };
  }
}

module.exports = {ResumeMapper};