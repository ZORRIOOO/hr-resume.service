class TransferResumesAreasHandler {
  db;

  constructor({db}) {
    this.db = db;
  }

  handle() {
    return this.db('fullTextAreaResume').insert(this.db.raw(`
    ("resumeId", platform, "areaText")
    select "resumeId",
           platform,
           "resumeParams"->'area'->>'name' as area
    from resumes
    where platform = 2 and "resumeParams" -> 'area' is not null;`));
  }
}

module.exports = TransferResumesAreasHandler;