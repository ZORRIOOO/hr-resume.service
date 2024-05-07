class ResumeListItem {
  /** @type {ResumeId} */
  id;

  /** @type {Candidate} */
  candidate;

  title;

  /** @type {Salary} */
  salary;

  lastExperience;

  updatedAt;

  lastComment;

  version;

  candidateId;

  comments;

  constructor({
    id,
    candidate,
    title,
    salary,
    lastExperience,
    updatedAt,
    lastComment,
    version,
    candidateId,
    comments
  }) {
    this.id = id;
    this.candidate = candidate;
    this.title = title;
    this.salary = salary;
    this.lastExperience = lastExperience;
    this.updatedAt = updatedAt;
    this.lastComment = lastComment || null;
    this.version = version || null;
    this.candidateId = candidateId || null;
    this.comments = comments || null;
  }
}

module.exports = {ResumeListItem};