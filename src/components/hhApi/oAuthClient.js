const axios = require('axios');
const querystring = require('querystring');
const {Token} = require('./token');
const {RuntimeError} = require('../../domain/exceptions');

class OAuthClient {
  clientId;

  clientSecret;

  redirectUri;

  tokenStore;

  constructor(clientId, clientSecret, redirectUri, tokenStore) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.tokenStore = tokenStore;
  }

  authLink(state) {
    const url = new URL('https://hh.ru/oauth/authorize');

    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('state', Buffer.from(JSON.stringify(state))
      .toString('base64'));
    url.searchParams.set('redirect_uri', this.redirectUri);

    return url.toString();
  }

  async tokenByCode(authorizationCode) {
    const form = querystring.stringify({
      'grant_type': 'authorization_code',
      'client_id': this.clientId,
      'client_secret': this.clientSecret,
      'redirect_uri': this.redirectUri,
      'code': authorizationCode
    });

    try {
      const response = await axios.post('https://hh.ru/oauth/token', form, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      });

      return new Token(
        response.data['access_token'],
        response.data['token_type'],
        response.data['expires_in'],
        response.data['refresh_token']
      );
    } catch(err) {
      throw new RuntimeError(err);
    }
  }

  async tokenByRefresh(refreshToken) {
    const form = querystring.stringify({
      'grant_type': 'refresh_token',
      'client_id': this.clientId,
      'client_secret': this.clientSecret,
      'redirect_uri': this.redirectUri,
      'refresh_token': refreshToken
    });

    try {
      const response = await axios.post('https://hh.ru/oauth/token', form, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      });

      return new Token(
        response.data['access_token'],
        response.data['token_type'],
        response.data['expires_in'],
        response.data['refresh_token']
      );
    } catch(err) {
      throw new RuntimeError('Cannot refresh token', {
        message: err.message,
        response: err.response?.data
      });
    }
  }

  async invalidateAccessToken() {
    const {accessToken} = await this.tokenStore.get();

    if (!accessToken) {
      throw new RuntimeError('Auth token not exists');
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };

    try {
      const response = await axios.delete('https://api.hh.ru/oauth/token', config);

      if (response.status === 204) {
        await this.tokenStore.remove();
      }
    } catch(err) {
      throw new RuntimeError(err);
    }
  }
}

module.exports = {OAuthClient};