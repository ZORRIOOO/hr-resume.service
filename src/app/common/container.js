const {RuntimeError} = require('../../domain/exceptions');

class Container {
  /**
   * @type {Map<string, function(Container): any>}
   * @private
   */
  definitions = new Map();

  /**
   * @type {Map<string, any>}
   * @private
   */
  resolvedEntries = new Map();

  /**
   * @param {Map<string, function(Container): any>} definitions
   */
  constructor(definitions = new Map()) {
    this.definitions = definitions;
  }

  get(name) {
    if (this.resolvedEntries.has(name)) {
      return this.resolvedEntries.get(name);
    }

    if (!this.definitions.has(name)) {
      throw new RuntimeError(`No definition found for '${name}'`);
    }

    const definition = this.definitions.get(name);
    const entry = definition(this);

    this.resolvedEntries.set(name, entry);

    return entry;
  }

  has(name) {
    return this.definitions.has(name);
  }
}

module.exports = {Container};