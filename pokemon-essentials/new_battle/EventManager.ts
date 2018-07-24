class EventManager {
  static callbacks = {};

  static on(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event].push(callback);
    } else {
      this.callbacks[event] = [callback];
    }
  }

  static emit(event, ...args) {
    if (!this.callbacks[event]) return console.log('No subscriptions for event ' + event);
    this.callbacks[event].forEach(callback => callback(...args));
  }
}
