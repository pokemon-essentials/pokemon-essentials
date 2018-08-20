namespace PE {
  const EventsNames = ["BasePower", "MoveHit"];

  export class EventManager {
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
      relayVar = relayVar || null;
      for (const handler of handlers) {
        if (relayVar) {
          relayVar = handler.call(this, relayVar, source, target, effect);
        } else {
          relayVar = handler.call(this, source, target, effect);
        }
      }
      return relayVar;
    }

    static getEffects(eventId: string, source: Battle_Battler, target?: Battle_Battler, effect?: IEventEffect) {
      let callbacks = [];
      if (source) {
        let sourceAbilityEffect = Abilities.getEffect(eventId, source.pokemon.ability);
        if (sourceAbilityEffect) callbacks.push(sourceAbilityEffect);
        // let sourceItemEffect = Items.getEffects()
      }
      if (effect && effect.move) {
        // let sourceMoveEffect = Moves.getEffect();
      }
      if (target) {
        let foeAbilityEffect = Abilities.getEffect(eventId, target.pokemon.ability);
        if (foeAbilityEffect) callbacks.push(foeAbilityEffect);
      }
      let weatherEffects = BattleWeather.getEffect(eventId, $BattleManager.weather);
      if (weatherEffects) callbacks.push(weatherEffects);
      return callbacks;
    }
  }

  export interface IEventEffect {
    // move?: Battle_Move;
    move?: PE.Battle.Moves.Move;
    weather?: WEATHERS;
  }

  export interface IEventsEffects {
    BasePower?(damage: number, source: Battle_Battler, target?: Battle_Battler, effect?: IEventEffect);
    SwitchIn?(source: Battle_Battler, target?: Battle_Battler, effect?: IEventEffect);
    /**
     * Called when try to set the battle weather
     * @param weather the new weather to set
     * @returns return false to cancel the weather set
     */
    SetWeather?(source: Battle_Battler, target?: Battle_Battler, effect?: IEventEffect): boolean | null | undefined;
  }
}
