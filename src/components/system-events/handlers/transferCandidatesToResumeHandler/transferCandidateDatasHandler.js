class TransferCandidateDatasHandler {
  transferCandidateDatasStreamFactory;

  constructor({transferCandidateDatasStreamFactory}) {
    this.transferCandidateDatasStreamFactory = transferCandidateDatasStreamFactory;
  }

  handle(payload) {
    return this.transferCandidateDatasStreamFactory.create(payload);
  }
}

module.exports = TransferCandidateDatasHandler;