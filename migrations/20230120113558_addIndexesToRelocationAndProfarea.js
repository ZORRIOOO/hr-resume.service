
exports.up = (knex) => knex.raw(`
CREATE INDEX if NOT EXISTS "resumes_resumeParams_relocationsCities_idx" ON "resumes"
    USING gin (("resumeParams"->'relocationCitiesIds') jsonb_path_ops)
    where "platform" = 6;
CREATE INDEX if NOT EXISTS "resumes_resumeParams_profAreas_idx" ON "resumes"
    USING gin (("resumeParams"->'professionalAreas') jsonb_path_ops)
    where "platform" = 6;
`);

exports.down = (knex) => knex.raw(`
DROP INDEX IF EXISTS "resumes_resumeParams_relocationsCities_idx";
DROP INDEX IF EXISTS "resumes_resumeParams_profAreas_idx";
`);

