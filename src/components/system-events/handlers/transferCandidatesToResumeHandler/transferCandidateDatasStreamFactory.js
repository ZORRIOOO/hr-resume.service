const {GetCandidatesReadableStream} =
  require('./getCandidatesReadableStream');
const {pipeline} = require('stream');
const {promisify} = require('util');

class TransferCandidateDatasStreamFactory {
  logger;

  generatorCandidatesForTransfer;

  getCollectionDuplexStream;

  transferCandidateWritebleStream;

  constructor({
    logger,
    generatorCandidatesForTransfer,
    getCollectionDuplexStream,
    transferCandidateWritebleStream
  }) {
    this.logger = logger;
    this.generatorCandidatesForTransfer = generatorCandidatesForTransfer;
    this.getCollectionDuplexStream = getCollectionDuplexStream;
    this.transferCandidateWritebleStream = transferCandidateWritebleStream;
  }

  create(candidateIds) {
    const iterator = this.generatorCandidatesForTransfer.generate(candidateIds);

    const candidates = new GetCandidatesReadableStream(iterator);

    candidates
      .on('data', (d) => this.logger.debug(`Candidates readable stream ${JSON.stringify(d)}`))
      .on('error', (error) => this.errorWrapper('Candidates readable stream', error));

    this.getCollectionDuplexStream
      .on('data', (d) => this.logger.debug(`Transform stream: ${JSON.stringify(d)}`))
      .on('error', (error) => this.errorWrapper('Transform stream', error));

    this.transferCandidateWritebleStream
      .on('error', (error) => this.errorWrapper('Writable stream', error));

    return promisify(pipeline)(
      candidates,
      this.getCollectionDuplexStream,
      this.transferCandidateWritebleStream
    );
  }

  errorWrapper(prefix = null, error) {
    const parts = [error.message];

    if (error.reason) {
      parts.push(`Reason: ${JSON.stringify(error.reason)}.`);
    }

    if (error.meta) {
      parts.push(`Meta: ${JSON.stringify(error.meta)}`);
    }

    if (prefix) {
      parts.unshift(`[${prefix}]`);
    }

    this.logger.error(parts.join(' '));
  }
}

module.exports = {TransferCandidateDatasStreamFactory};