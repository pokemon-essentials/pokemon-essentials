/// <reference path="./weather.ts" />

namespace PE.Battle {
  const CHARACTERS_PER_LINE = 35;

  interface IBattleEvent { name: string, params: any[] };

  export const enum Phase { None, Init, ActionSelection, MoveSelection };

  export abstract class Manager {
    private static _queue: any[];

    static battlers: PE.Battle.Battler[] = [];
    static field: ActiveField;
    static phase: Phase;
    static turncount: number;
    static waitMode: string;

    static weather = PE.Weather.None;

    static setup() {
      this._queue = [];
      this.phase = Phase.Init;
      this.waitMode = "";
      this.turncount = 0;

      // this.side = new PE.Battle.ActiveField();
      this.field = new PE.Battle.ActiveField();
      this.weather = PE.Weather.None;

      // this.battlers = []; // TODO
      for (const battler of this.battlers) {
        battler.ownSide = new PE.Battle.ActiveSide();
      }
    }

    static update() {
      if (this.isBusy()) return;
      this.pop();
    }

    static isBusy() {
      return $gameMessage.isBusy() || this.waitMode !== "";
    }

    static push(name, ...args: any[]) {
      let params = Array.prototype.slice.call(arguments, 1);
      this._queue.push({ name: name, params: params });
    }

    static pop() {
      if (this._queue.length <= 0) return;
      let method = this._queue.shift();
      if (!method.name || !this[method.name]) throw new Error('Method not found: ' + method.name);
      this[method.name].apply(this, method.params);
    }

    private static __showMessage(msg: string) {
      while (msg.length > CHARACTERS_PER_LINE) {
        let line = msg.substring(0, CHARACTERS_PER_LINE);
        let truncateIndex = Math.min(line.length, line.lastIndexOf(" "));
        line = line.substring(0, truncateIndex);
        $gameMessage.add(line + '\\n');
        msg = msg.substring(truncateIndex);
      }
      $gameMessage.add(msg + '\\|\\^');
    }

    private static __showPausedMessage(msg: string) {
      while (msg.length > CHARACTERS_PER_LINE) {
        let line = msg.substring(0, CHARACTERS_PER_LINE);
        let truncateIndex = Math.min(line.length, line.lastIndexOf(" "));
        line = line.substring(0, truncateIndex);
        $gameMessage.add(line + '\\n');
        msg = msg.substring(truncateIndex);
      }
      $gameMessage.add(msg);
    }

    static showMessage(msg: string) {
      this.push('__showMessage', msg);
    }

    static showPausedMessage(msg: string) {
      this.push('__showPausedMessage', msg);
    }

    private static __changePhase(phase: Phase) {
      this.phase = phase;
    }

    static changePhase(phase: Phase) {
      this.push('__changePhase', phase);
    }

  }
}
