
exports.up = (knex) => knex.raw(`
  create index if not exists resumes_candidate_id_idx
  on resumes("candidateId");
`);

exports.down = (knex) => knex.raw(`
  drop index if exists resumes_candidate_id_idx;
`);