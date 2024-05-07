const {Container} = require('./container');
const {RuntimeError} = require('../../domain/exceptions');

class ContainerBuilder {
  definitions = new Map();

  add(name, definition) {
    if (this.definitions.has(name)) {
      throw new RuntimeError(`Entry with name '${name}' already defined`);
    }

    this.definitions.set(name, definition);

    return this;
  }

  build() {
    return new Container(this.definitions);
  }
}

module.exports = {ContainerBuilder};