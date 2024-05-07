const objectMapper = require('object-mapper');
const {ResumeId} = require('./resumeId');
const {VacancyPlace} = require('../../../domain/enums');
const {Salary} = require('./salary');
const {Experience} = require('./experience');
const {ResumeListItem} = require('./resumeListItem');
const {Candidate} = require('./candidate');
const {Comments} = require('./comments');

class HHResumeMapper {
  map(src, localResume) {
    const {
      id,
      candidate,
      title,
      salary,
      lastExperience,
      updatedAt,
      lastComment,
      comments
    } = objectMapper(src, this.schema);

    const {candidateId, version, patch} = localResume || {};

    return new ResumeListItem({
      id,
      candidate: candidate ?
        new Candidate(candidate.fullName?.join(' '), patch?.small || candidate.photo) :
        null,
      title,
      salary,
      lastExperience,
      updatedAt,
      lastComment,
      version,
      candidateId,
      comments
    });
  }

  get schema() {
    return {
      id: {
        key: 'id?',
        transform: (id) => new ResumeId(VacancyPlace.HH, id)
      },
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
            description: lastExperience.description,
            start: lastExperience.start,
            end: lastExperience.end
          });
        }
      },
      'updated_at': 'updatedAt?',
      'version': 'version?',
      'candidateId': 'candidateId?',
      'owner': {
        key: 'comments?',
        transform: (owner) => {
          if (!owner) {
            return null;
          }

          return new Comments(
            owner.id,
            owner.comments.counters.total
          );
        }
      }
    };
  }
}

module.exports = {HHResumeMapper};