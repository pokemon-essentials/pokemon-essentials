const EventsNames = ["BasePower", "MoveHit"];

class EventManager {
  static subscriptions = {};

  static on(eventId, callback, scope?) {
    if (this.subscriptions[eventId]) {
      this.subscriptions[eventId].push({ callback, scope });
    } else {
      this.subscriptions[eventId] = [{ callback, scope }];
    }
  }

  static emit(eventId, ...args) {
    if (!this.subscriptions[eventId]) return console.log("No subscriptions for event " + eventId);
    this.subscriptions[eventId].forEach(subscription => subscription.callback.call(subscription.scope, ...args));
  }

  static run(eventId: string, source: Battle_Battler, target?: Battle_Battler, effect?: IEventEffect, relayVar?: any) {
    let handlers = this.getEffects(eventId, source, target, effect);
    for (const handler of handlers) {
      if (relayVar) {
        relayVar = handler.apply(this, relayVar, source, target, effect);
      } else {
        relayVar = handler.apply(this, source, target, effect);
      }
    }
  }

  static getEffects(eventId: string, source: Battle_Battler, target?: Battle_Battler, effect?: IEventEffect) {
    let callbacks = [];
    let sourceAbilityEffect = Abilities.getEffect(eventId, source.pokemon.ability);
    if (sourceAbilityEffect) callbacks.push(sourceAbilityEffect);
    // let sourceItemEffect = Items.getEffects()
    if (effect.move) {
      // let sourceMoveEffect = Moves.getEffect();
    }
    if (target) {
      let foeAbilityEffect = Abilities.getEffect(eventId, target.pokemon.ability);
      if (foeAbilityEffect) callbacks.push(foeAbilityEffect);
    }
    return callbacks;
  }
}

interface IEventEffect {
  move?: Battle_Move;
}
