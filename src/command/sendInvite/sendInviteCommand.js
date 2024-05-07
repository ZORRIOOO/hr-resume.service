class SendInviteCommand {
  responseId;

  message;

  sms;

  constructor({responseId, message, sms}) {
    this.responseId = responseId;
    this.message = message;
    this.sms = sms;
  }
}

module.exports = {SendInviteCommand};