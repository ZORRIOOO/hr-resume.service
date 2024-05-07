const {VacancyPlace} = require('../../domain/enums');
const settings = new Map()
  .set([
    '.+://hh\\.(ru|kz|by|uz|az)/resume/.*',
    '.+://hh1\\.az/resume/.*',
    '.+://headhunter\\.kg/resume/.*',
    '.+://rabota\\.by/resume/.*',
    '.+://.*\\.hh\\.(ru|kz|by|uz|az)/resume/.*'
  ], VacancyPlace.HH)
  .set([
    '.+://www\\.superjob\\.ru/resume/[^\\?]+\\d+\\.html',
    '.+://superjob\\.ru/resume/[^\\?]+\\d+\\.html',
    '.+://.*\\.superjob\\.ru/resume/[^\\?]+\\d+\\.html'
  ], VacancyPlace.SUPER_JOB)
  .set([
    '.+://www\\.farpost\\.ru\\/.*/rabota/resume/[^\\?]+\\d+\\.html',
    '.+://farpost\\.ru/.*/rabota/resume/[^\\?]+\\d+\\.html',
    '.+://.*\\.farpost\\.ru/.*/rabota/resume/[^\\?]+\\d+\\.html'
  ], VacancyPlace.FARPOST)
  .set([
    '.+://www\\.avito\\.ru\\/.*/rezume/[^\\?]+\\d+',
    '.+://.avito\\.ru/.*/rezume/[^\\?]+\\d+'
  ], VacancyPlace.AVITO)
  .set([
    '.+://hr.zarplata\\.ru/resume/.*',
    '.+://.*\\.hr.zarplata\\.ru/resume/.*'
  ], VacancyPlace.ZARPLATA_RU)
  .set([
    '.+://.*\\.rabota\\.ru/resume\\d+\\.html'
  ], VacancyPlace.RABOTA_RU)
  .set([
    '.+://vk\\.com/.*'
  ], VacancyPlace.VK)
  .set([
    '.+://trudvsem\\.ru/.*/card/.*'
  ], VacancyPlace.TRUD_VSEM)
  .set([
    '.+://search\\.hr-mnenie.com\\/resume/.*'
  ], VacancyPlace.HR_MNENIE);

module.exports = {settings};