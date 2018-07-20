namespace PE.Battle {
  const CHARACTERS_PER_LINE = 40;

  interface IBattleEvent {
    name: string;
    params: any[];
  }

  export const enum Phase {
    None = "None",
    Init = "Init",
    ActionSelection = "ActionSelection",
    MoveSelection = "MoveSelection",
    Animation = "Animation"
  }
  export const enum WaitMode {
    None,
    Animation,
    AbilitySign
  }
  export const enum ActionChoices {
    UseMove,
    UseItem,
    Switch
  }

  export const enum Enviroments {
    None,
    TallGrass,
    Cave,
    StillWater,
    Building,
    Plain,
    Sand,
    Rock,
    LongGrass,
    PondWater,
    SeaWater,
    UnderWater
  }

  export abstract class Manager {
    static scene: Scene_Battle;
    /** Whether the player can escape or not */
    static canEscape: boolean;
    /** Player Trainer. */
    static player: Trainers.Trainer;
    /** Opponents Pokémon Trainers*/
    static opponents: Trainers.Trainer[];

    static trainers: { player: Trainers.Trainer[]; foe: Trainers.Trainer[] };
    /**  The initial order of Pokémon in the player's party.*/
    static partyOrder = [];
    static sides: { player: ActiveSide; foe: ActiveSide };
    static field: ActiveField;
    static enviroment: Enviroments;
    static weather: Weathers;
    static weatherDuration: Number;
    /** Choices made by each Pokémon this round */
    static choices: any;
    static lastMoveUsed;
    static lastMoveUser;
    /** Whether Amulet Coin's effect applies */
    static amuletCoin;
    /** Money gained in battle by using Pay Day */
    static extraMoney;
    /** Whether Happy Hour's effect applies */
    static doubleMoney;

    static currentInx: number;
    /** All the Pokémon of all Trainers used deternime it's unique index */
    static battlers: Battler[];
    static priorityQueue: any[];
    private static _queue = [];

    /** The Pokémon in the field, the ones fithing right now*/
    static actives: Battler[] = [];

    static phase = Phase.None;
    static turncount = 0;
    static waitMode = WaitMode.None;

    static started = false;

    static setup(opponets: Trainers.Trainer[], allies: Trainers.Trainer[]) {
      allies.unshift($Player);
      this.trainers = { player: allies, foe: opponets };
      this.player = $Player;
      this.opponents = opponets;
      this.field = new ActiveField();
      this.sides = { player: new ActiveSide(), foe: new ActiveSide() };
      this.actives = [];
      this.battlers = [];
      for (const trainer of allies) {
        let firstIndex = this.battlers.length;
        for (const pokemon of trainer.party) {
          let battler = new Battler(pokemon, this.battlers.length);
          this.battlers.push(battler);
          trainer.battlers.push(battler);
          this.sides.player.battlers.push(battler.index);
          battler.sides.own = this.sides.player;
          battler.sides.foe = this.sides.foe;
        }
        this.actives.push(this.battlers[firstIndex]);
        this.sides.player.actives.push(this.battlers[firstIndex]);
      }
      for (const trainer of opponets) {
        let firstIndex = this.battlers.length;
        for (const pokemon of trainer.party) {
          let battler = new Battler(pokemon, this.battlers.length);
          this.battlers.push(battler);
          trainer.battlers.push(battler);
          this.sides.foe.battlers.push(battler.index);
          battler.sides.own = this.sides.foe;
          battler.sides.foe = this.sides.player;
        }
        this.actives.push(this.battlers[firstIndex]);
        this.sides.foe.actives.push(this.battlers[firstIndex]);
      }
      this.partyOrder = [];
      for (const pokemon of this.player.battlers) {
        this.partyOrder.push(pokemon.index);
      }
      this.choices = {};
      this.enviroment = Enviroments.None;
      this.weather = Weathers.None;
      this.weatherDuration = 0;
      this.lastMoveUsed = -1;
      this.lastMoveUser = -1;
      this.amuletCoin = false;
      this.extraMoney = 0;
      this.doubleMoney = 0;
      this.turncount = 0;
      this.priorityQueue = [];

      this.phase = Phase.Init;
      this.currentInx = 0;

      UI.actionsInx = 0;
      UI.movesInx = 0;
    }

    //==================================================================================================================
    //region Battlers Info
    static isOpposing(index: number) {
      for (const foeindex of this.sides.foe.battlers) {
        if (foeindex === index) return true;
      }
      return false;
    }

    /** find the way this works */
    static opponent() {
      return false;
    }

    static ownedByPlayer(index: number) {
      for (const partyindex of this.sides.player.battlers) {
        if (partyindex === index) return true;
      }
      return false;
    }

    //------------------------------------------------------------------------------------------------------------------
    //region Attacking

    static getPriority() {
      let speeds = [];
      let mPriorities = [];
      let priorityQueue = [];
      for (const pokemon of this.actives) {
        speeds.push(pokemon.speed);
        priorityQueue.push(pokemon.index);
        if (this.choices[pokemon.index] && this.choices[pokemon.index].action === ActionChoices.UseMove) {
          mPriorities.push(this.choices[pokemon.index].move.priority);
        }
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
            mPriorities[i] = mPriorities[i + 1];
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
            mPriorities[i] = mPriorities[i + 1];
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

    static switchIn(index: number) {
      this.choices[this.currentInx] = {
        action: ActionChoices.Switch,
        index: index
      };

      // this.runActions();
    }
    //==================================================================================================================

    static start() {
      console.log("Battle Start");
      $Battle.showPausedMessage(i18n._("A wild %1 has apeared!", this.trainers.foe[0].party[0].name));
      $Battle.showMessage(i18n._("Go %1!", this.trainers.player[0].party[0].name));
      let priority = this.getPriority();
      for (const index of priority) {
        let pokemon = this.battlers[index];
        Abilities.Effects("onSwitchIn", pokemon);
      }
      this.push(() => (this.started = true));
    }

    static update() {
      if (this.isBusy()) return;
      this.pop();
    }

    static isBusy() {
      return $gameMessage.isBusy() || this.waitMode !== WaitMode.None;
    }

    static push(method, scope: any = this) {
      this._queue.push({ method: method, scope: scope });
    }

    static pop() {
      if (this._queue.length <= 0) return;
      let action = this._queue.shift();
      action.method.apply(action.scope);
    }

    static terminate() {
      this.clear();
      console.log("Battle End");
    }

    static clear() {
      this._queue = [];
      this.actives = [];
      $Player.battlers = [];
      this.started = false;
      UI.actionsInx = 0;
      UI.movesInx = 0;
      this.clearWeather();
    }

    static showMessage(msg: string) {
      return;
      msg = Utils.capitalize(msg);
      this.push(() => {
        while (msg.length > CHARACTERS_PER_LINE) {
          let line = msg.substring(0, CHARACTERS_PER_LINE);
          let truncateIndex = Math.min(line.length, line.lastIndexOf(" "));
          line = line.substring(0, truncateIndex);
          $gameMessage.add(line + "\\n");
          msg = msg.substring(truncateIndex + 1);
        }
        $gameMessage.add(msg + "\\|\\^");
      });
    }

    static showPausedMessage(msg: string) {
      return;
      msg = Utils.capitalize(msg);
      this.push(() => {
        while (msg.length > CHARACTERS_PER_LINE) {
          let line = msg.substring(0, CHARACTERS_PER_LINE);
          let truncateIndex = Math.min(line.length, line.lastIndexOf(" "));
          line = line.substring(0, truncateIndex + 1);
          $gameMessage.add(line + "\\n");
          msg = msg.substring(truncateIndex + 1);
        }
        $gameMessage.add(msg);
      });
    }

    static changePhase(phase: Phase) {
      console.log("Battle Phase: " + phase);
      this.push(() => (this.phase = phase));
    }

    static runActions() {
      this.turncount++;
      console.log(`Turn #${this.turncount}`);
      for (const battler of this.actives) {
        if (this.choices[battler.index]) continue;
        this.choices[battler.index] = DummySelection(battler);
      }

      let priority = this.getPriority();

      for (const index of priority) {
        let choice = this.choices[index];
        if (choice.action === ActionChoices.Switch) {
          let out = this.actives[this.currentInx];
          let enter = this.battlers[choice.index];
          this.actives[this.currentInx] = enter;
          out.sides.own.actives[this.currentInx] = enter;
          Abilities.Effects("onSwitchIn", enter);
        }
      }

      // use moves
      for (const index of priority) {
        let user = this.battlers[index];
        if (user.isFainted()) continue;
        let choice = this.choices[index];
        let target = user.sides.foe.actives[choice.target];
        if (choice.action === ActionChoices.UseMove) {
          console.log(`${user.name} Speed: ${user.speed}`);
          console.log(`${user.name} used ${choice.move.name}, move priority: ${choice.move.priority}`);
          let d = this.getDamage(user, target, choice.move);
          if (d > 0) {
            // this.push(() => target.damage(d));
            console.log(`Damage: ${d}`);
            console.log(`${target.name} HP: ${target.totalhp} --> ${target.hp}`);
            target.damage(d);
          }
          this.showMessage(i18n._("%1 used %2", user.name, choice.move.name));
        }
      }

      // check faint
      for (const b of this.actives) {
        if (b.isFainted() && this.isOpposing(b.index)) {
          if (b.sides.own.isAnyUnfainted()) {
            let index = IAselectNextPokemon(b.index);
            this.switchIn(index);
          }
          this.terminate();
        }
      }

      this.changePhase(Phase.ActionSelection);
    }

    static getDamage(source: Battle.Battler, target: Battle.Battler, move) {
      // http://bulbapedia.bulbagarden.net/wiki/Damage
      let atk = 0;
      let def = 0;
      if (move.category == "SPECIAL") {
        atk = source.spatk;
        def = target.spdef;
      } else if (move.category == "PHYSICAL") {
        atk = source.attack;
        def = target.defense;
      } else {
        return 0;
      }

      let effectiveness = Types.effectiveness(move.type, target.types, target.effects.Type3);

      let msg = null;
      if (effectiveness <= 0.5) {
        msg = `It's not very effective...`;
      } else if (effectiveness >= 2) {
        msg = `It's super effective!`;
      } else if (effectiveness == 0) {
        msg = `It doesn't affect ${target.name}`;
      }
      if (msg) {
        // PE_BattleControl.push('showMessage', msg);
        console.log(msg);
      }

      let stab = source.hasType(move.type) ? 1.5 : 1;
      let critical = 1;
      let random = Math.random() * 100;
      if (random < 0.0625) {
        critical = 1.5;
        // PE_BattleControl.push('showMessage', "critical hit");
      }
      random = Math.random() * (1 - 0.81) + 0.81;
      let modifier = critical * random * stab * effectiveness;
      let damage = ((((2 * source.level) / 5 + 2) * move.basePower * (atk / def)) / 50 + 2) * modifier;
      return Math.floor(damage);
    }

    static choose(move, target) {
      this.choices[this.actives[this.currentInx].index] = {
        action: ActionChoices.UseMove,
        move: move,
        target: 0
      };
    }

    static showAbilitySign(pokemon: Battler) {
      let ability = pokemon.ability;
      this.push(() => {
        let foe = this.isOpposing(pokemon.index);
        this.scene.showAbilityIndicator(ability, foe);
        this.waitMode = WaitMode.AbilitySign;
      });
    }

    static changeWaitMode(mode: WaitMode) {
      this.waitMode = mode;
    }

    /**
     * Set the battle weather and start it's animation
     * @param weather the new weather
     * @param duration the duration. -1 for unlimited weather time.
     */
    static setWeather(weather: Weathers, duration: number) {
      this.weather = weather;
      this.weatherDuration = duration;
      this.push(() => {
        this.scene.setWeather(weather);
      });
    }

    static clearWeather() {
      this.weather = Weathers.None;
      this.weatherDuration = 0;
    }

    static nextPickupUse(): string {
      throw Error("not implemented");
    }

    static recoverHPAnimation(index: number) {
      this.push(() => {
        this.battlers[index].hpbar.start();
        this.waitMode = WaitMode.Animation;
        this.phase = Phase.Animation;
      });
    }
  }
}

const $Battle = PE.Battle.Manager;

function DummySelection(battler: PE.Battle.Battler) {
  return {
    action: PE.Battle.ActionChoices.UseMove,
    move: battler.moveset[0],
    target: 0
  };
}

function IAselectNextPokemon(index) {
  for (const pokeindex of $Battle.sides.foe.battlers) {
    if (index === pokeindex) continue;
    let pokemon = $Battle.battlers[pokeindex];
    if (!pokemon.isFainted()) return index;
  }
  return;
}
