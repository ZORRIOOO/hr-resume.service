class PutResumeCommand {
    platform;

    resumeParams;

    candidateId;

    resumeId;

    constructor({platform, resumeParams, candidateId, resumeId}) {
      this.platform = platform || null;
      this.resumeParams = resumeParams || null;
      this.candidateId = candidateId || null;
      this.resumeId = resumeId || null;
    }
}

module.exports = {PutResumeCommand};