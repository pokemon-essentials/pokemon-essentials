/// <reference path="./weather.ts" />

namespace PE.Battle {
  const CHARACTERS_PER_LINE = 35;

  interface IBattleEvent { name: string, params: any[] };

  export const enum Phase { None, Init, ActionSelection, MoveSelection };
  export const enum WaitMode { None, Animation };

  export abstract class Manager {
    private static _queue = [];

    static battlers: PE.Battle.Battler[] = [];
    static field: ActiveField;

    static phase = PE.Battle.Phase.None;
    static turncount = 0;
    static waitMode = WaitMode.None;
    static weather = PE.Weather.None;

    static setup() {
      this.phase = Phase.Init;
      // this.side = new PE.Battle.ActiveField();
      this.field = new PE.Battle.ActiveField();

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

  }
}
