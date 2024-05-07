const {TokenStoreInterface} = require('./tokenStoreInterface');
const {VacancyPlace} = require('../../domain/enums');
const {Token} = require('./token');

class KnexTokenStore extends TokenStoreInterface {
  userId;

  db;

  constructor({userId, db}) {
    super();

    this.userId = userId || 0;
    this.db = db;
  }

  async get() {
    const result = await this.db('tokens')
      .first('credentials')
      .where({
        userId: this.userId,
        platform: VacancyPlace.HH
      });

    if (!result) {
      return null;
    }

    const {credentials} = result;

    return new Token(
      credentials.accessToken,
      credentials.tokenType,
      credentials.expiresIn,
      credentials.refreshToken
    );
  }

  async set(token) {
    await this.db('tokens')
      .insert({
        userId: this.userId,
        platform: VacancyPlace.HH,
        credentials: token
      })
      .onConflict(['userId', 'platform'])
      .merge();
  }

  async remove() {
    await this.db('tokens')
      .where({
        userId: this.userId,
        platform: VacancyPlace.HH
      })
      .del();
  }
}

module.exports = {KnexTokenStore};