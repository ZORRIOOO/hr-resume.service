class Token {
  accessToken;

  tokenType;

  expiresIn;

  refreshToken;

  constructor(accessToken, tokenType, expiresIn, refreshToken) {
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken;
  }
}

module.exports = {Token};