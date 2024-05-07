exports.up = (knex) => knex.raw(`
truncate table "fullTextExperienceResume";
truncate table "fullTextEducationResume";


insert INTO "fullTextExperienceResume" ("resumeId", platform, "experienceText")
select "resumeId",
       platform,
       concat_ws(
           ', ',
           jsonb_array_elements("resumeParams"->'experience') ->> 'company',
           jsonb_array_elements("resumeParams"->'experience') ->> 'position',
           jsonb_array_elements("resumeParams"->'experience') ->> 'description'
           ) as "experienceText"
from resumes
where platform = 2 and "resumeParams" -> 'experience' is not null;

insert into "fullTextEducationResume"("resumeId", platform, "educationText")
select "resumeId",
       platform,
       concat_ws(
           ', ',
           jsonb_array_elements("resumeParams"->'education'->'additional') ->> 'name',
           jsonb_array_elements("resumeParams"->'education'->'additional') ->> 'organization',
           jsonb_array_elements("resumeParams"->'education'->'additional') ->> 'year',
           jsonb_array_elements("resumeParams"->'education'->'additional') ->> 'result'
           ) as "educationText"
from resumes
where platform = 2 and "resumeParams" -> 'education' is not null;

insert INTO "fullTextEducationResume" ("resumeId", platform, "educationText")
select "resumeId",
       platform,
       concat_ws(
           ', ',
           jsonb_array_elements("resumeParams"->'education'->'primary') ->> 'name',
           jsonb_array_elements("resumeParams"->'education'->'primary') ->> 'organization',
           jsonb_array_elements("resumeParams"->'education'->'primary') ->> 'year',
           jsonb_array_elements("resumeParams"->'education'->'primary') ->> 'result'
           ) as "educationText"
from resumes
where platform = 2 and "resumeParams" -> 'education' is not null;


insert INTO "fullTextEducationResume" ("resumeId", platform, "educationText")
select "resumeId",
       platform,
       concat_ws(
           ', ',
           jsonb_array_elements("resumeParams"->'education'->'elementary') ->> 'name',
           jsonb_array_elements("resumeParams"->'education'->'elementary') ->> 'organization',
           jsonb_array_elements("resumeParams"->'education'->'elementary') ->> 'year',
           jsonb_array_elements("resumeParams"->'education'->'elementary') ->> 'result'
           ) as "educationText"
from resumes
where platform = 2 and "resumeParams" -> 'education' is not null;

insert INTO "fullTextEducationResume" ("resumeId", platform, "educationText")
select "resumeId",
       platform,
       concat_ws(
           ', ',
           jsonb_array_elements("resumeParams"->'education'->'attestation') ->> 'name',
           jsonb_array_elements("resumeParams"->'education'->'attestation') ->> 'organization',
           jsonb_array_elements("resumeParams"->'education'->'attestation') ->> 'year',
           jsonb_array_elements("resumeParams"->'education'->'attestation') ->> 'result'
           ) as "educationText"
from resumes
where platform = 2 and "resumeParams" -> 'education' is not null;
`);

exports.down = () => Promise.resolve();
