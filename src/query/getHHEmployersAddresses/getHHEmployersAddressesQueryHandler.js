class GetHHEmployersAddressesQueryHandler {
  /** @type {ApiClient} */
  hhApiClient;

  constructor({hhApiClient}) {
    this.hhApiClient = hhApiClient;
  }

  handle() {
    return this.hhApiClient.getAddresses();
  }
}

module.exports = {GetHHEmployersAddressesQueryHandler};