const {predicateLiteral} = require('../../utils/predicateLiteral');
const {VacancyPlace} = require('../domain/enums');
const {RuntimeError} = require('../domain/exceptions');
const {TextMapper} = require('./textMapper');
const objectMapper = require('object-mapper');

class ResumeDao {
  db;

  constructor({db}) {
    this.db = db;
  }

  async save(platform, resumeId, resumeParams, version, candidateId, patch) {
    const trx = await this.db.transaction();
    const dto = this.mapToDto({platform, resumeId, resumeParams, version, candidateId, patch});

    try {
      const [id] = await trx('resumes')
        .insert(dto)
        .onConflict(['platform', 'resumeId'])
        .merge()
        .returning('resumeId');

      await Promise.all([
        trx('fullTextExperienceResume')
          .where('resumeId', resumeId)
          .andWhere('platform', platform)
          .del(),
        trx('fullTextEducationResume')
          .where('resumeId', resumeId)
          .andWhere('platform', platform)
          .del(),
        trx('fullTextAreaResume')
          .where('resumeId', resumeId)
          .andWhere('platform', platform)
          .del()
      ]);

      const [
        mapEducationText,
        mapExperienceText,
        mapAreaText
      ] = this.getMapperByPlatform(platform);

      const educationText = mapEducationText(resumeId, platform, resumeParams);
      const experienceText = mapExperienceText(resumeId, platform, resumeParams);
      const areaText = mapAreaText && mapAreaText(resumeId, platform, resumeParams);
      const promises = [];

      if (educationText.length) {
        promises.push(trx('fullTextEducationResume').insert(educationText));
      }

      if (experienceText.length) {
        promises.push(trx('fullTextExperienceResume').insert(experienceText));
      }

      if (areaText) {
        promises.push(trx('fullTextAreaResume').insert(areaText));
      }

      await Promise.all(promises);
      await trx.commit();

      return {
        id,
        platform
      };
    } catch(error) {
      await trx.rollback();
      throw error;
    }

  }

  getMapperByPlatform(platform) {
    const textMapper = new TextMapper();

    switch (platform) {
      case VacancyPlace.HH:
        return [
          textMapper.mapEducationTextHH,
          textMapper.mapExperienceText,
          textMapper.mapAreaTextHH
        ];
      case VacancyPlace.RESUME_EXTENSION:
      case VacancyPlace.ITERNAL_BASE:
        return [
          textMapper.mapEducationTextInnerDB,
          textMapper.mapExperienceText
        ];
      default:
        throw new RuntimeError('unsupported platform');
    }
  }

  async findById(platform, resumeId) {
    const row = await this.db('resumes')
      .where({platform, resumeId})
      .first();

    return row || null;
  }

  findResumesByParams(request) {
    const {
      platform,
      resumeIds,
      candidateId,
      limit = 100
    } = request;

    const query = this.db('resumes')
      .limit(limit);

    if (platform) {
      query.where({platform});
    }

    if (resumeIds?.length) {
      query.whereIn('resumeId', resumeIds);
    }

    if (candidateId) {
      query.where({candidateId});
    }

    return query;
  }

  getResumeByKeyWords = async(filter) => {
    const resumes = await this.getResumesFromLocal(filter);

    return {
      resumes: resumes.slice(0, filter.perPage),
      hasNext: resumes.length > filter.perPage
    };
  }

  getResumesFromLocal(filter) {
    const {
      perPage,
      page,
      orderBy,
      platform
    } = filter;

    const query = this.buildFullTextQuery(filter, this.db);

    if (platform) {
      query.where({platform});
    }

    query
      .limit(perPage + 1)
      .offset(page * perPage)
      .orderBy(orderBy.field, predicateLiteral(orderBy.predicate))
      .select(['resumeId', 'candidateId', 'resumeParams', 'platform', 'version', 'patch']);

    return query;
  }

  buildFullTextQuery(filter, db) {
    const {
      compositeId,
      version,
      profArea,
      relocationCitiesIds,
      searchKeyWords
    } = filter;

    const query = db('resumes');

    const keyWordsArr = searchKeyWords?.map((item) => {
      return {
        table: this.getColumnAndTableNameByField(item?.searchField),
        keyWords: this.getKeyWordByLogic(item?.searchLogic, item?.keyWords)
      };
    }).filter((item) => item?.table && item?.keyWords?.length);

    if (compositeId?.id && compositeId?.platform) {
      const {id, platform} = compositeId;

      query.where('resumeId', id);
      query.where('platform', platform);
    }

    if (version && version.length) {
      const [start, end] = version;

      if (start) {
        query
          .whereRaw(`"resumes"."version" >= ?::timestamp`, [start]);
      }
      if (end) {
        query
          .whereRaw(`"resumes"."version" <= ?::timestamp`, [end]);
      }
    }

    if (relocationCitiesIds?.length) {
      const placeholders = relocationCitiesIds.map(() => '?').join(',');

      query.where((subQuery) => {
        subQuery
          .where('platform', VacancyPlace.ITERNAL_BASE)
          .whereRaw(`
            "resumes"."resumeParams" -> 'relocationCitiesIds' @>
              any (array[${placeholders}]::jsonb[])`,
          relocationCitiesIds.map((item) => `[${item}]`));
      });
    }

    if (profArea?.length) {
      const placeholders = profArea.map(() => '?').join(',');

      query.where((subQuery) => {
        subQuery
          .where('platform', VacancyPlace.ITERNAL_BASE)
          .whereRaw(`
            "resumes"."resumeParams" -> 'professionalAreas' @>
              any (array[${placeholders}]::jsonb[])`,
          profArea.map((item) => `[${item}]`));
      });
    }

    if (keyWordsArr?.length) {
      keyWordsArr.forEach((element) => {
        query.whereExists(
          db(`${element?.table?.tableName}`)
            .whereRaw(`
              to_tsvector('russian', "${element?.table?.columnName}") @@
              to_tsquery('russian', '${element?.keyWords}')
            `)
            .whereRaw(`"resumes"."resumeId" = "${element?.table?.tableName}"."resumeId"`)
            .whereRaw(`"resumes"."platform" = "${element?.table?.tableName}"."platform"`)
        );
      });
    }

    return query;
  }

  getColumnAndTableNameByField(field) {
    switch (field) {
      case 'education':
        return {
          columnName: 'educationText',
          tableName: 'fullTextEducationResume'
        };
      case 'experience':
        return {
          columnName: 'experienceText',
          tableName: 'fullTextExperienceResume'
        };
      case 'area':
        return {
          columnName: 'areaText',
          tableName: 'fullTextAreaResume'
        };
      default:
        return undefined;
    }
  }

  getKeyWordByLogic(logic, text) {
    switch (logic) {
      case 'phrase': {
        const trimedText = this.removeWhitespacesFormKeyWords(text);
        const queryString = trimedText?.map((word) =>
          this.containsSpecialChars(word) ? `''${word}''` : `${word}`).join('<->');

        return `${queryString}`;
      }
      case 'all': {
        const trimedText = this.removeWhitespacesFormKeyWords(text);

        return trimedText?.map((word) =>
          this.containsSpecialChars(word) ? `''${word}''` : `${word}`).join('&');
      }
      case 'any': {
        const trimedText = this.removeWhitespacesFormKeyWords(text);

        return trimedText?.map((word) =>
          this.containsSpecialChars(word) ? `''${word}''` : `${word}`).join('|');
      }
      default:
        return undefined;
    }
  }

  removeWhitespacesFormKeyWords(text) {
    return text?.map((el) => el.split(' '))
      .flat()
      .map((el) => el.trim())
      .filter(Boolean);
  }

  containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    return specialChars.test(str);
  }

  mapToDto = (src) => objectMapper(src, {
    'platform': 'platform',
    'resumeId': 'resumeId?',
    'resumeParams': 'resumeParams',
    'version': 'version?',
    'candidateId': 'candidateId?',
    'patch': 'patch?'
  });
}

module.exports = {ResumeDao};