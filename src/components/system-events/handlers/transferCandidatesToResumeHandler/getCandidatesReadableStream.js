const {Readable} = require('stream');

class GetCandidatesReadableStream extends Readable {
  generatorCandidatesForTransfer;

  constructor(generatorCandidatesForTransfer) {
    super({objectMode: true, highWaterMark: 1});

    this.generatorCandidatesForTransfer = generatorCandidatesForTransfer;
  }

  async _read() {
    const result = await this.generatorCandidatesForTransfer.next();

    if (result.value) {
      this.push(result.value);
    } else {
      this.push(null);
    }
  }
}

module.exports = {GetCandidatesReadableStream};