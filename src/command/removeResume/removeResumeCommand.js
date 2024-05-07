class RemoveResumeCommand {
    platform;

    resumeId;

    constructor(resumeId, platform) {
      this.platform = platform;
      this.resumeId = resumeId;
    }
}

module.exports = {RemoveResumeCommand};