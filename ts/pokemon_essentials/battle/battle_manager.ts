/// <reference path="./weather.ts" />

namespace PE.Battle {
  const CHARACTERS_PER_LINE = 50;

  interface IBattleEvent { name: string, params: any[] };

  export const enum Phase { None, Init, ActionSelection, MoveSelection };
  export const enum WaitMode { None, Animation, AbilitySing };

  export abstract class Manager {
    static scene: PE.Battle.Scene_Battle;
    /** All the Pokémon of all Trainers used deternime it's unique index */
    static battlers: any[];
    static choices: any[];
    static priorityQueue: any[];
    static foeSide: ActiveSide;
    static userSide: ActiveSide;
    static foeTrainers: Trainers.Trainer[];
    static userTrainers: Trainers.Trainer[];
    private static _queue = [];

    /** The Pokémon in the field, the ones fithing right now*/
    static actives: PE.Battle.Battler[] = [];
    static field: ActiveField;

    static phase = PE.Battle.Phase.None;
    static turncount = 0;
    static waitMode = WaitMode.None;
    static weather = PE.Weathers.None;
    static weatherduration = 0;


    static setup(userTrainers: PE.Trainers.Trainer[], foeTrainers: PE.Trainers.Trainer[]) {
      this.phase = Phase.Init;
      this.turncount = 0;
      this.weatherduration = 0;

      this.userTrainers = userTrainers;
      this.foeTrainers = foeTrainers;
      this.field = new PE.Battle.ActiveField();
      this.userSide = new PE.Battle.ActiveSide();
      this.foeSide = new PE.Battle.ActiveSide();

      this.priorityQueue = [];
      this.choices = [];

      this.actives = [];
      this.battlers = [];
      for (const trainer of this.userTrainers) {
        let firstIndex = this.battlers.length;
        for (const pokemon of trainer.party) {
          let battler = new PE.Battle.Battler(pokemon, this.battlers.length);
          this.userSide.battlers.push(battler.index);
          this.battlers.push(battler);
          battler.ownSide = this.userSide;
          battler.foeSide = this.foeSide;
        }
        this.actives.push(this.battlers[firstIndex]);
      }

      for (const trainer of foeTrainers) {
        let firstIndex = this.battlers.length;
        for (const pokemon of trainer.party) {
          let battler = new PE.Battle.Battler(pokemon, this.battlers.length);
          this.foeSide.battlers.push(battler.index);
          this.battlers.push(battler);
          battler.ownSide = this.foeSide;
          battler.foeSide = this.userSide;
        }
        this.actives.push(this.battlers[firstIndex]);
      }
    }

    static start() {
      console.log("Battle Start");
      let priority = this.getPriority();
      for (const index of priority) {
        PE.Abilities.onSwitchInEffects(this.battlers[index], true);
      }
    }

    static update() {
      if (this.isBusy()) return;
      this.pop();
    }

    static isBusy() {
      return $gameMessage.isBusy() || this.waitMode !== WaitMode.None;
    }

    static push(method) {
      this._queue.push(method);
    }

    static pop() {
      if (this._queue.length <= 0) return;
      let method = this._queue.shift();
      method.apply(this);
    }

    static terminate() {
      this.clear();
      console.log("Battle End");
    }

    static clear() {
      this._queue = [];
    }

    static showMessage(msg: string) {
      this.push(() => {
        while (msg.length > CHARACTERS_PER_LINE) {
          let line = msg.substring(0, CHARACTERS_PER_LINE);
          let truncateIndex = Math.min(line.length, line.lastIndexOf(" "));
          line = line.substring(0, truncateIndex);
          $gameMessage.add(line + '\\n');
          msg = msg.substring(truncateIndex);
        }
        $gameMessage.add(msg + '\\|\\^');
      });
    }

    static showPausedMessage(msg: string) {
      this.push(() => {
        while (msg.length > CHARACTERS_PER_LINE) {
          let line = msg.substring(0, CHARACTERS_PER_LINE);
          let truncateIndex = Math.min(line.length, line.lastIndexOf(" "));
          line = line.substring(0, truncateIndex);
          $gameMessage.add(line + '\\n');
          msg = msg.substring(truncateIndex);
        }
        $gameMessage.add(msg);
      });
    }

    static changePhase(phase: Phase) {
      this.push(() => this.phase = phase);
    }



    static isOpposing(index: number) {
      for (const foeindex of this.foeSide.battlers) {
        if (foeindex === index) return true;
      }
      return false;
    }

    /** find the way this works */
    static opponent() {
      return false;
    }

    static ownedByPlayer(index: number) {
      for (const partyindex of this.userSide.battlers) {
        if (partyindex === index) return true;
      }
      return false;
    }

    static getPriority() {
      let speeds = [];
      let mPriorities = [];
      let priorityQueue = [];
      for (let i = 0; i < this.actives.length; i++) {
        const pokemon = this.actives[i];
        speeds.push(pokemon.speed);
        priorityQueue.push(pokemon.index);
        if (this.choices[pokemon.index] && this.choices[i].action === "USE_MOVE") mPriorities.push(this.choices[i].move.priority)
      }
      // order the speeds, mPriorities and priority arrays (bubble sort) by speeds
      let swapped;
      do {
        swapped = false;
        for (var i = 0; i < speeds.length - 1; i++) {
          if (speeds[i] < speeds[i + 1]) {
            let aux = speeds[i];
            speeds[i] = speeds[i + 1];
            speeds[i + 1] = aux;
            let aux2 = priorityQueue[i];
            priorityQueue[i] = priorityQueue[i + 1];
            priorityQueue[i + 1] = aux2;
            let aux3 = mPriorities[i];
            mPriorities[i] = mPriorities[i + 1]
            mPriorities[i + 1] = aux3;
            swapped = true;
          }
        }
      } while (swapped);

      // order by moves priority
      do {
        swapped = false;
        for (var i = 0; i < mPriorities.length - 1; i++) {
          if (mPriorities[i] < mPriorities[i + 1]) {
            let aux = mPriorities[i];
            mPriorities[i] = mPriorities[i + 1]
            mPriorities[i + 1] = aux;
            let aux2 = priorityQueue[i];
            priorityQueue[i] = priorityQueue[i + 1];
            priorityQueue[i + 1] = aux2;
            swapped = true;
          }
        }
      } while (swapped);
      return priorityQueue;
    }


    static showAbilityIndicator(pokemon: PE.Battle.Battler) {
      let ability = pokemon.ability;
      this.push(() => {
        let foe = this.isOpposing(pokemon.index);
        this.scene.showAbilityIndicator(ability, foe);
        this.waitMode = WaitMode.AbilitySing;
      });
    }

    static changeWaitMode(mode: WaitMode) {
      this.waitMode = mode;
    }


  }
}

let $Battle = PE.Battle.Manager;
