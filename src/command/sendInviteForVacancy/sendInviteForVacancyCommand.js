class SendInviteForVacancyCommand {
  status;

  resumeId;

  vacancyId;

  message;

  addressId;

  constructor({status, resumeId, vacancyId, message, addressId}) {
    this.status = status;
    this.resumeId = resumeId;
    this.vacancyId = vacancyId;
    this.message = message;
    this.addressId = addressId;
  }
}

module.exports = {SendInviteForVacancyCommand};