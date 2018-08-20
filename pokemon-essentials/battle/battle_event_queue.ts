namespace PE {
  /**
   * Controls the battle async events like mesagges, animations
   */
  export class BattleEventQueue {
    private static _queue = [];
    static waitMode: WaitModes;
    static push(method, scope: any = this) {
      this._queue.push({ method: method, scope: scope });
    }

    static pop() {
      if (this._queue.length <= 0) return;
      let action = this._queue.shift();
      action.method.apply(action.scope);
    }

    static update() {
      if (this.isBusy()) return;
      this.pop();
    }

    static isBusy() {
      // return $gameMessage.isBusy() || this.waitMode !== WaitMode.None;
      return $gameMessage.isBusy() || this.waitMode !== WaitModes.None;
    }
  }
}
