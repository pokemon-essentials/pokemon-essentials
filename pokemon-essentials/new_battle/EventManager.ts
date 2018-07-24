class EventManager {
  static subscriptions = {};

  static on(event, callback, scope?) {
    if (this.subscriptions[event]) {
      this.subscriptions[event].push({callback, scope});
    } else {
      this.subscriptions[event] = [{callback, scope}];
    }
  }

  static emit(event, ...args) {
    if (!this.subscriptions[event]) return console.log('No subscriptions for event ' + event);
    this.subscriptions[event].forEach(subscription => subscription.callback.call(subscription.scope, ...args));
  }
}
