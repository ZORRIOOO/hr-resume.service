
exports.up = (knex) => knex.raw(`
CREATE INDEX if NOT EXISTS "resumes_version_idx" ON "resumes" USING btree ("version")
`);

exports.down = (knex) => knex.raw(`
DROP INDEX IF EXISTS "resumes_version_idx";
`);

