/* eslint-disable max-len */

exports.up = (knex) => knex.raw(`
CREATE INDEX "fullTextEducationResume_education_idx" ON "fullTextEducationResume" USING GIN (to_tsvector('russian', "educationText"));
CREATE INDEX "fullTextExperienceResume_experience_idx" ON "fullTextExperienceResume" USING GIN (to_tsvector('russian', "experienceText"));
CREATE INDEX "resumes_updatedAt_idx" ON "resumes"(("resumeParams"->>'updated_at')) where platform = 2;
`);

exports.down = (knex) => knex.raw(`
drop index if exists "fullTextEducationResume_education_idx";
drop index if exists "fullTextExperienceResume_experience_idx";
drop index if exists "resumes_updatedAt_idx";
`);