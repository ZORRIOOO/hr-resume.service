const {settings} = require('../../lib/parser/settings');

class GetPlatformByUrlQueryHandler {
  handle(url) {
    for (const [patterns, platform] of settings) {
      if (patterns.some((pattern) => new RegExp(pattern).test(url))) {
        return platform;
      }
    }

    return null;
  }
}

module.exports = {GetPlatformByUrlQueryHandler};