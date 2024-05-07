class EventDispatcher {
  /**
   * @type {Map<Function, Array<function(event): Promise<void>>>}
   */
  handlers = new Map();

  constructor({logger}) {
    this.logger = logger;
  }

  register(event, handler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }

    this.handlers.get(event).push(handler);

    return this;
  }

  emit(event) {
    if (!this.handlers.has(event.constructor)) {
      return;
    }

    const handlers = this.handlers.get(event.constructor);

    return Promise.all(handlers.map((handler) => this.withLogging(handler, event)));
  }

  withLogging = async(fn, ...args) => {
    try {
      await fn(...args);
    } catch(error) {
      this.logger.error(error.stack || error);
    }
  }
}

module.exports = {EventDispatcher};