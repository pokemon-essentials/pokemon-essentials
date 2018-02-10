/// <reference path="../weather.ts" />

namespace PE.Battle {
  const CHARACTERS_PER_LINE = 45;

  interface IBattleEvent { name: string, params: any[] };

  export const enum Phase { None, Init, ActionSelection, MoveSelection };
  export const enum WaitMode { None, Animation, AbilitySing };
  export const enum ActionChoices { UseMove, UseItem, Switch };

  export const enum Enviroments { None, TallGrass, Cave, StillWater, Building, Plain, Sand, Rock, LongGrass, PondWater, SeaWater, UnderWater };

  export abstract class Manager {

    static scene: Scene_Battle;
    /** Whether the player can escape or not */
    static canEscape: boolean;
    /** Player Trainer. */
    static player: Trainers.Trainer;
    /** Opponents Pokémon Trainers*/
    static opponents: Trainers.Trainer[];

    static trainers: { player: Trainers.Trainer[], foe: Trainers.Trainer[] }
    /**  The initial order of Pokémon in the player's party.*/
    static partyOrder = [];
    static sides: { player: ActiveSide, foe: ActiveSide };
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


    static setup(allies: Trainers.Trainer[], opponets: Trainers.Trainer[]) {
      this.trainers = { player: allies, foe: opponets };
      this.player = allies[0];
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
        this.sides.player.actives.push(this.battlers[firstIndex].index);
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
        this.sides.foe.actives.push(this.battlers[firstIndex].index);
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

    static isUnlosableItem(pokemon: Battler, item) {

    }

    static checkGlobalAbility(ability: Abilitydex) {
      for (const battler of this.actives) {
        if (battler.hasAbility(ability)) return battler;
      }
      return undefined;
    }
    //endregion
    //==================================================================================================================

    //==================================================================================================================
    //region Check whether actions can be taken
    static canShowCommands(index: number) {
      let pokemon = this.battlers[index];
      if (pokemon.isFainted()) return false;
      if (pokemon.effects.TwoTurnAttack > 0 || pokemon.effects.HyperBeam > 0 ||
        pokemon.effects.Rollout > 0 || pokemon.effects.Outrage > 0 ||
        pokemon.effects.Uproar > 0 || pokemon.effects.Bide > 0) {
        return false;
      }
      return true;
    }


    static canShowMovesSelection(index: number) {
      let pokemon = this.battlers[index];
      if (!this.canShowCommands(index)) return false;
      let found = false;
      for (const move of pokemon.moveset) {
        if (this.canChooseMove(index, move, false)) found = true;
      }
      if (!found) return false;
      if (pokemon.effects.Encore) return false;
      return true;
    }

    static canChooseMove(index, move, showMessages, sleeptalk = false) {
      let pokemon = this.battlers[index];
      if (!move) return;
      if (move.pp <= 0 && move.totalpp > 0 && sleeptalk) {
        if (showMessages) this.showMessage(i18n._("There's no PP left for this move!"));
        return false;
      }
      if (pokemon.hasItem('ASSAULTVEST') && move.isStatus()) {
        if (showMessages) {
          let msg = "The effects of the %1 prevent status moves from being used!";
          this.showMessage(i18n._(msg, Items.name(pokemon.item)));
        }
        return false;
      }
      if (pokemon.hasItemIn(['CHOICEBAND', 'CHOICESPECS', 'CHOICESCARF']) &&
        pokemon.effects.ChoiceBand !== undefined) {
        if (move.id !== pokemon.effects.ChoiceBand) {
          if (showMessages) {
            let msg = "%1 allows the use of only %2!";
            this.showMessage(i18n._(msg, Items.name(pokemon.item), move.name));
          }
          return false;
        }
      }
      if (pokemon.effects.Imprison) {
        for (const index of this.sides.foe.actives) {
          if (this.battlers[index].hasMove(move.id)) {
            this.showMessage(i18n._("%1 can't use the sealed %2!", pokemon.name, move.name));
            return false;
          }
        }
      }
      if (pokemon.effects.Taunt > 0 && move.basePower <= 0) {
        if (showMessages)
          this.showMessage(i18n._("%1 can't use %2 after the taunt!", pokemon.name, move.name))
        return false;
      }
      if (pokemon.effects.Torment && move.id === this.lastMoveUsed) {
        if (showMessages) {
          let msg = "%1 can't use the same move twice in a row due to the torment!";
          this.showMessage(i18n._(msg, pokemon.name, move.name))
        }
        return false;
      }
      if (pokemon.effects.DisableMove === move.id && sleeptalk) {
        if (showMessages)
          this.showMessage(i18n._("%1's %2 is disabled!", pokemon.name, move.name))
        return false;
      }
      // if (move.id === "BELCH" && pokemon.belch) {
      if (move.id === "BELCH") {
        if (showMessages) {
          let msg = "%1 hasn't eaten any held berry, so it can't possibly belch!";
          this.showMessage(i18n._(msg, pokemon.name, move.name))
        }
        return false;
      }
      if (pokemon.effects.Encore > 0 && pokemon.effects.EncoreMoveId !== move.index) {
        return false;
      }
      return true;
    }


    //endregion
    //==================================================================================================================

    //------------------------------------------------------------------------------------------------------------------
    //region Attacking

    static autoChooseMove(index, showMessages = true) {
      let pokemon = this.battlers[index];
      if (pokemon.isFainted()) {
        this.choices[pokemon.index] = undefined;
        return;
      }
      if (pokemon.effects.Encore &&
        this.canChooseMove(pokemon.index, pokemon.effects.EncoreMoveId, false)) {
        console.log(`[Auto choosing Encore move] ${pokemon.effects.EncoreMoveId}`);
        this.choices = {
          action: ActionChoices.UseMove,
          move: pokemon.effects.EncoreMoveId,
          target: pokemon.sides.foe.actives[0]
        }
      }
    }
    static getPriority() {
      let speeds = [];
      let mPriorities = [];
      let priorityQueue = [];
      for (const pokemon of this.actives) {
        speeds.push(pokemon.speed);
        priorityQueue.push(pokemon.index);
        if (this.choices[pokemon.index] && this.choices[pokemon.index].action === ActionChoices.UseMove) {
          mPriorities.push(this.choices[pokemon.index].move.priority)
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

      console.log("Priority Queue");
      console.log(priorityQueue);
      return priorityQueue;
    }
    //endregion
    //------------------------------------------------------------------------------------------------------------------

    //==================================================================================================================
    // Switching Pokémon.
    static canSwitchLax() {

    }

    static canSwitch(currIndex, switchingIndex, showMessages, ignoreMeanLook = false) {
      // let currPokemon =
    }
    //==================================================================================================================

    static start() {
      console.log("Battle Start");
      $Battle.showPausedMessage(i18n._('A wild %1 has apeared!', this.trainers.foe[0].party[0].name));
      $Battle.showMessage(i18n._('Go %1!', this.trainers.player[0].party[0].name));
      let priority = this.getPriority();
      for (const index of priority) {
        Abilities.onSwitchInEffects(this.battlers[index], true);
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
      this.clearWeather();
    }

    static showMessage(msg: string) {
      msg = Utils.capitalize(msg);
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
      msg = Utils.capitalize(msg);
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


    static runActions() {
      this.turncount++;
      console.log(`Turn #${this.turncount}`);
      for (const battler of this.actives) {
        if (this.choices[battler.index]) continue;
        this.choices[battler.index] = (DummySelection(battler));
      }
      let priority = this.getPriority();
      // use moves
      for (const index of priority) {
        if (this.battlers[index].isFainted()) continue;
        let choice = this.choices[index];
        let target = this.battlers[choice.target];
        console.log(`${this.battlers[index].name} Speed: ${this.battlers[index].speed}`);
        console.log(`${this.battlers[index].name} used ${choice.move.name}, move priority: ${choice.move.priority}`);
        this.showMessage(i18n._('%1 used %2', this.battlers[index].name, choice.move.name));
        let d = this.getDamage(this.battlers[index], target, choice.move);
        if (d > 0) {
          this.battlers[choice.target].damage(d);
          console.log(`Damage: ${d}`);
          console.log(`${target.name} HP: ${target.totalhp} --> ${target.hp}`);
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
        def = target.spdef
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
      let damage = ((((((2 * source.level) / 5) + 2) * move.basePower * (atk / def)) / 50) + 2) * modifier;
      return Math.floor(damage);
    }


    static choose(move, target) {
      this.choices[this.currentInx] = {
        action: ActionChoices.UseMove,
        move: move,
        target: target
      }
    }


    static showAbilityIndicator(pokemon: Battler) {
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


  }
}

const $Battle = PE.Battle.Manager;


function DummySelection(battler: PE.Battle.Battler) {
  return {
    action: PE.Battle.ActionChoices.UseMove,
    move: battler.moveset[0],
    target: battler.sides.foe.actives[0]
  };
}
