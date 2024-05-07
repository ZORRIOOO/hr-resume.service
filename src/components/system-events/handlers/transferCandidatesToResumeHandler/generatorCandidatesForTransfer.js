class GeneratorCandidatesForTransfer {
  static CANDIDATES_GENERATOR_LIMIT = 10;

  candidatesServiceApi;

  logger;

  constructor({candidatesServiceApi, logger}) {
    this.candidatesServiceApi = candidatesServiceApi;
    this.logger = logger;
  }

  async* generate() {
    let lastCandidateId = 0;

    try {
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const candidates = await this.candidatesServiceApi.getCandidatesFullInfo({
          lastCandidateId,
          limit: GeneratorCandidatesForTransfer.CANDIDATES_GENERATOR_LIMIT
        });

        for (const candidate of candidates) {
          lastCandidateId = candidate.candidateId;
          yield candidate;
        }

        if (candidates.length < GeneratorCandidatesForTransfer.CANDIDATES_GENERATOR_LIMIT) {
          break;
        }
      }
    } catch(error) {
      this.logger.error(error.message);
    }
  }
}

module.exports = {GeneratorCandidatesForTransfer};