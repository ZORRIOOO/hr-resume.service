class ConnectResumeCandidateCommand {
  platform;

  resumeId;

  extraParameters;

  constructor({platform, resumeId, extraParameters}) {
    this.platform = platform;
    this.resumeId = resumeId;
    this.extraParameters = extraParameters;
  }
}

module.exports = {ConnectResumeCandidateCommand};