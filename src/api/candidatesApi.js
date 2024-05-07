class CandidatesServiceApi {
  constructor({api}) {
    this._api = api;
  }

  getCandidatesFullInfo({lastCandidateId, limit = 1, candidateId}) {
    return this._api()
      .service('candidates.getCandidateFullInfo')
      .params({lastCandidateId, limit, candidateId});
  }
}

module.exports = {CandidatesServiceApi};
