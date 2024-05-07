class ConnectResumeContentCommand {
  resumeId;

  id;

  constructor({resumeId, id}) {
    this.resumeId = resumeId;
    this.id = id;
  }
}

module.exports = {ConnectResumeContentCommand};