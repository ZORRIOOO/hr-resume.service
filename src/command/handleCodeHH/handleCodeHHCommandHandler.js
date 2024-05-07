const {RuntimeError} = require('../../domain/exceptions');
const {KnexTokenStore} = require('../../components/hhApi/knexTokenStore');

class HandleCodeHHCommandHandler {
  /** @type {OAuthClient} */
  hhOAuthClient;

  /** @type {QueryBuilder} */
  db;

  constructor({hhOAuthClient, db}) {
    this.hhOAuthClient = hhOAuthClient;
    this.db = db;
  }

  /**
   * @param {HandleCodeHHCommand} command
   */
  async execute(command) {
    const {userId} = this.decodeState(command.state);
    const token = await this.hhOAuthClient.tokenByCode(command.code);
    const tokenStore = new KnexTokenStore({userId, db: this.db});

    await tokenStore.set(token);
  }

  decodeState(state) {
    const json = Buffer.from(state, 'base64').toString('ascii');

    try {
      return JSON.parse(json);
    } catch(err) {
      throw new RuntimeError('invalid state');
    }
  }
}

module.exports = {HandleCodeHHCommandHandler};