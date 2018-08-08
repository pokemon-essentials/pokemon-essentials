const CHARACTERS_PER_LINE = 55;

enum Battle_Phase {
  Start = "Start",
  Input = "Input",
  Turn = "Turn",
  Action = "Action",
  BatledEnd = "BatledEnd"
}

enum InputPhases {
  Action = "Action",
  Move = "Move",
  Item = "Item",
  Party = "Party",
  PartySwitchFainted = "PartySwitchFainted"
}

enum WaitModes {
  Animation = "Animation",
  None = "None"
}

enum BattleActionType {
  UseMove,
  UseItem,
  Switch,
  Run
}

interface IBattleAction {
  type: BattleActionType;
  /** The tragets slot indexes */
  targets: number[];
  move?: PE.Battle.Moves.Move;
  item?: PE.Itemdex;
  switchInIndex?: number;
}

class Battle_Manager {
  private static _actionsQueue: Battle_Battler[] = [];
  private static _battlers: Battle_Battler[] = [];
  private static _actives: Battle_Battler[] = [];
  /** The current active battler performing his selected action */
  private static _subject: Battle_Battler = undefined;
  private static _currentAction: IBattleAction = undefined;

  static sides: { player: Battle_Side; foe: Battle_Side };

  public static phase: Battle_Phase | InputPhases = undefined;

  static turn: number;
  /**
   *
   */
  private static _activeMove: Battle_Move;
  private static _activeSource: Battle_Battler;
  private static _activeTarget: Battle_Battler;
  static init(p1: PE.Pokemon.Pokemon[], p2: PE.Pokemon.Pokemon[]) {
    console.log("Player Pokemons");
    console.log("==========================================================");
    console.log(p1.map(p => p.name));
    console.log("Foe Pokemons");
    console.log("==========================================================");
    console.log(p2.map(p => p.name));
    this.sides = { player: new Battle_Side(), foe: new Battle_Side() };
    for (const pokemon of p1) {
      let battler = new Battle_Battler(pokemon);
      battler.partyIndex = this.sides.player.party.length;
      battler.sides.own = this.sides.player;
      battler.sides.foe = this.sides.foe;
      this.sides.player.party.push(battler);
    }
    for (const pokemon of p2) {
      let battler = new Battle_Battler(pokemon);
      battler.partyIndex = this.sides.foe.party.length;
      battler.sides.own = this.sides.foe;
      battler.sides.foe = this.sides.player;
      this.sides.foe.party.push(battler);
    }
    this.turn = 0;

    BattleEventQueue.waitMode = WaitModes.None;
  }

  static get actives() {
    return this.sides.player.slots.concat(this.sides.foe.slots);
  }

  static update() {
    BattleEventQueue.update();
    if (BattleEventQueue.isBusy()) return;
    switch (this.phase) {
      case Battle_Phase.Start:
        this.startInput();
        break;
      case Battle_Phase.Turn:
        this.updateTurn();
        break;
      case Battle_Phase.Action:
        this.updateAction();
        break;
      case Battle_Phase.BatledEnd:
        SceneManager.goto(PE.TitleScenes.CustomScene);
        break;
    }
  }

  static startBattle() {
    this.changePhase(Battle_Phase.Start);
    this.switchInStartBattlers();
    this.showStartMessages();
  }

  static switchInStartBattlers() {
    this.sides.player.switchInStartBattlers();
    this.sides.foe.switchInStartBattlers();
  }
  static showStartMessages() {
    // this.showPausedMessage("This is a battle test scenario, open the devtools press the F12 key to see the battle log");
    // this.showPausedMessage("press the enter key to avance turns");
  }

  static startInput() {
    // IA select moves
    // the battler actions input is handle in the battle scene
    this.changePhase(Battle_Phase.Input);
  }

  static endActionsSelection() {
    this.dummyActionSelection();
    this.startTurn();
  }

  static startTurn() {
    this.turn++;
    console.log("----------------------------------------------------------");
    console.log(`# Turn ${this.turn}`);
    this.makeTurnOrder();
    this.changePhase(Battle_Phase.Turn);
  }

  static updateTurn() {
    if (!this._subject) {
      this._subject = this.getNextSubject();
    }
    if (this._subject) {
      this.processTurn();
    } else {
      this.endTurn();
    }
  }

  static processTurn() {
    let action = this._subject.getAction();
    if (action) {
      this.startAction(action);
    } else {
      this._subject = this.getNextSubject();
    }
  }

  static endTurn() {
    this.checkFaints();
    this.checkBattleEnd();
    this.changePhase(Battle_Phase.Input);
  }

  static getNextSubject() {
    let battler = this._actionsQueue.shift();
    if (!battler) return null;
    if (!battler.isFainted()) return battler;
    return this.getNextSubject();
  }

  static makeTurnOrder() {
    let battlers = [];
    battlers = battlers.concat(this.actives);
    battlers.sort((a, b) => this.getPriority(a, b));
    this._actionsQueue = battlers;
  }

  static startAction(action) {
    this._currentAction = action;
    this.changePhase(Battle_Phase.Action);
  }

  static updateAction() {
    switch (this._currentAction.type) {
      case BattleActionType.Switch:
        this.switchBattlers(this._currentAction.switchInIndex);
        this.endAction();
        break;
      case BattleActionType.UseMove:
        let target = this._currentAction.targets.shift();
        if (target != undefined) {
          this.useMove(this._currentAction.move, target);
        } else {
          this.endAction();
        }
        break;
      case BattleActionType.UseItem:
        this.endAction();
        break;
    }
  }

  static endAction() {
    this._subject.clearAction();
    this._currentAction = undefined;
    this._subject = undefined;
    this.changePhase(Battle_Phase.Turn);
  }

  static switchBattlers(partyIndex) {
    // this._subject.sides.own.switchBattlers(this._subject.slotIndex, partyIndex);
    let change = this._subject.sides.own.nextUnfaited(this._subject.partyIndex);
    this._subject.sides.own.switchBattlers(this._subject.slotIndex, change.partyIndex);
  }

  static useMove(move: PE.Battle.Moves.Move, target) {
    console.log(move.accuracy);
    let hit = PE.Utils.chance(move.accuracy);
    console.log(hit);
    if (move.accuracy === true || hit) {
      console.log(`> ${this._subject.species} used ${move.name} --> ${this._subject.sides.foe.slots[target].species}`);
      this.showMessage(`${this._subject.name} used  ${move.name}!`);
      let foe = this._subject.sides.foe.slots[target];
      let damage = this.calculateDamage(this._subject, foe, move);
      if (damage > 0) foe.damage(damage);
    } else {
      console.log("But failed!");
      this.showMessage("But failed!");
    }
  }

  static getPriority(a: Battle_Battler, b: Battle_Battler) {
    if (b.getAction().type - a.getAction().type) {
      return b.getAction().type - a.getAction().type;
    }
    if (b.speed - a.speed) {
      return b.speed - a.speed;
    }
    return Math.random() - 0.5;
  }

  static checkFaints() {
    for (const battler of this.sides.player.actives) {
      if (battler.isFainted() && !battler.sides.own.areAllFainted()) {
        // this.changePhase(InputPhases.PartySwitchFainted);
        let change = battler.sides.own.nextUnfaited();
        battler.sides.own.switchBattlers(battler.slotIndex, change.partyIndex);
      }
    }
    for (const battler of this.sides.foe.actives) {
      if (battler.isFainted() && !battler.sides.own.areAllFainted()) {
        let change = battler.sides.own.nextUnfaited();
        battler.sides.own.switchBattlers(battler.slotIndex, change.partyIndex);
      }
    }
  }

  static checkBattleEnd() {
    if (this.sides.foe.areAllFainted()) {
      this.processVictory();
    }
    if (this.sides.player.areAllFainted()) {
      this.processDefead();
    }
  }

  static processVictory() {
    console.log("# VICTORY");
    console.log("==========================================================");
    this.showPausedMessage("Visctory");
    this.changePhase(Battle_Phase.BatledEnd);
  }

  static processDefead() {
    console.log("# DEFEAT");
    console.log("==========================================================");
    this.showPausedMessage("defeat");
    this.changePhase(Battle_Phase.BatledEnd);
  }

  static changePhase(phase: Battle_Phase | InputPhases) {
    BattleEventQueue.push(() => {
      this.phase = phase;
    }, this);
  }

  static dummyActionSelection() {
    for (const battler of this.actives) {
      let action: IBattleAction = undefined;
      if (PE.Utils.chance(20) && battler.sides.own.nextUnfaited(battler.partyIndex)) {
        action = {
          targets: [0],
          type: BattleActionType.Switch,
          switchInIndex: 0
        };
      } else {
        action = {
          targets: [0],
          type: BattleActionType.UseMove,
          move: battler.getFirstDamageMove()
        };
      }
      battler.setAction(action);
    }
  }

  static calculateDamage(source: Battle_Battler, target: Battle_Battler, move: PE.Battle.Moves.Move) {
    EventManager.run("BasePower", source, target, { move: move });
    // http://bulbapedia.bulbagarden.net/wiki/Damage
    let atk = 0;
    let def = 0;
    if (move.category == PE.Battle.Moves.Categories.Special) {
      atk = source.spatk;
      def = target.spdef;
    } else if (move.category == PE.Battle.Moves.Categories.Physical) {
      atk = source.attack;
      def = target.defense;
    } else {
      return 0;
    }

    let effectiveness = PE.Types.effectiveness(move.type, target.types);
    let msg = null;
    if (effectiveness <= 0.5) {
      msg = `It's not very effective...`;
    } else if (effectiveness >= 2) {
      msg = `It's super effective!`;
    } else if (effectiveness == 0) {
      msg = `It doesn't affect ${target.name}`;
    }

    if (msg) {
      console.log("~ " + msg);
      this.showMessage(msg);
    }

    let stab = source.hasType(move.type) ? 1.5 : 1;
    let critical = 1;
    let random = Math.random() * 100;
    if (PE.Utils.chance(6.25)) {
      critical = 1.5;
      console.log("~ critical hit!");
      this.showMessage("critical hit!");
    }
    random = Math.random() * (1 - 0.81) + 0.81;
    let modifier = critical * random * stab * effectiveness;
    let power = move.basePower;
    let damage = ((((2 * source.level) / 5 + 2) * power * (atk / def)) / 50 + 2) * modifier;
    return Math.max(Math.floor(damage), 1);
  }

  static showMessage(msg: string) {
    BattleEventQueue.push(() => {
      msg = PE.Utils.capitalize(msg);
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
    BattleEventQueue.push(() => {
      msg = PE.Utils.capitalize(msg);
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

  static wait(mode: WaitModes) {
    BattleEventQueue.waitMode = mode;
  }

  /**
   * This is copy from showdown
   */

  /**
   * sets the current move and pokemon
   */
  static setActiveMove(move?: Battle_Move, source?: Battle_Battler, target?: Battle_Battler) {
    if (!move) move = null;
    if (!source) source = null;
    if (!target) target = source;
    this._activeMove = move;
    this._activeSource = source;
    this._activeTarget = target;
  }

  static tryMoveHit(target: Battle_Battler, pokemon: Battle_Battler, move: Battle_Move) {
    this.setActiveMove(move, pokemon, target);
    //   move.zBrokeProtect = false;
    let hitResult = true;
    //   hitResult = this.singleEvent('PrepareHit', move, {}, target, pokemon, move);
    //   if (!hitResult) {
    //     if (hitResult === false) this.add('-fail', target);
    //     return false;
    //   }
    //   this.runEvent('PrepareHit', pokemon, target, move);
    //   if (!this.singleEvent('Try', move, null, pokemon, target, move)) {
    //     return false;
    //   }
    //   if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
    //     if (move.target === 'all') {
    //       hitResult = this.runEvent('TryHitField', target, pokemon, move);
    //     } else {
    //       hitResult = this.runEvent('TryHitSide', target, pokemon, move);
    //     }
    //     if (!hitResult) {
    //       if (hitResult === false) this.add('-fail', target);
    //       return false;
    //     }
    //     return this.moveHit(target, pokemon, move);
    //   }
    //   hitResult = this.runEvent('TryImmunity', target, pokemon, move);
    //   if (!hitResult) {
    //     if (hitResult !== null) {
    //       if (!move.spreadHit) this.attrLastMove('[miss]');
    //       this.add('-miss', pokemon, target);
    //     }
    //     return false;
    //   }
    //   if (move.ignoreImmunity === undefined) {
    //     move.ignoreImmunity = (move.category === 'Status');
    //   }
    //   if (this.gen < 7 && (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) && !target.runImmunity(move.type, true)) {
    //     return false;
    //   }
    //   hitResult = this.runEvent('TryHit', target, pokemon, move);
    //   if (!hitResult) {
    //     if (hitResult === false) this.add('-fail', target);
    //     return false;
    //   }
    //   if (this.gen >= 7 && (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) && !target.runImmunity(move.type, true)) {
    //     return false;
    //   }
    //   if (move.flags['powder'] && target !== pokemon && !this.getImmunity('powder', target)) {
    //     this.debug('natural powder immunity');
    //     this.add('-immune', target, '[msg]');
    //     return false;
    //   }
    //   if (this.gen >= 7 && move.pranksterBoosted && pokemon.hasAbility('prankster') && target.side !== pokemon.side && !this.getImmunity('prankster', target)) {
    //     this.debug('natural prankster immunity');
    //     if (!target.illusion) this.add('-hint', "In gen 7, Dark is immune to Prankster moves.");
    //     this.add('-immune', target, '[msg]');
    //     return false;
    //   }
    //   let boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
    //   // calculate true accuracy
    //   let accuracy = move.accuracy;
    //   let boosts, boost;
    //   if (accuracy !== true) {
    //     if (!move.ignoreAccuracy) {
    //       boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
    //       boost = this.clampIntRange(boosts['accuracy'], -6, 6);
    //       if (boost > 0) {
    //         accuracy *= boostTable[boost];
    //       } else {
    //         accuracy /= boostTable[-boost];
    //       }
    //     }
    //     if (!move.ignoreEvasion) {
    //       boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
    //       boost = this.clampIntRange(boosts['evasion'], -6, 6);
    //       if (boost > 0) {
    //         accuracy /= boostTable[boost];
    //       } else if (boost < 0) {
    //         accuracy *= boostTable[-boost];
    //       }
    //     }
    //   }
    //   if (move.ohko) { // bypasses accuracy modifiers
    //     if (!target.isSemiInvulnerable()) {
    //       accuracy = 30;
    //       if (move.ohko === 'Ice' && this.gen >= 7 && !pokemon.hasType('Ice')) {
    //         accuracy = 20;
    //       }
    //       if (pokemon.level >= target.level && (move.ohko === true || !target.hasType(move.ohko))) {
    //         accuracy += (pokemon.level - target.level);
    //       } else {
    //         this.add('-immune', target, '[ohko]');
    //         return false;
    //       }
    //     }
    //   } else {
    //     accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
    //   }
    //   if (move.alwaysHit || (move.id === 'toxic' && this.gen >= 6 && pokemon.hasType('Poison'))) {
    //     accuracy = true; // bypasses ohko accuracy modifiers
    //   } else {
    //     accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
    //   }
    //   // @ts-ignore
    //   if (accuracy !== true && !this.randomChance(accuracy, 100)) {
    //     if (!move.spreadHit) this.attrLastMove('[miss]');
    //     this.add('-miss', pokemon, target);
    //     return false;
    //   }
    //   if (move.breaksProtect) {
    //     let broke = false;
    //     for (const effectid of ['banefulbunker', 'kingsshield', 'protect', 'spikyshield']) {
    //       if (target.removeVolatile(effectid)) broke = true;
    //     }
    //     if (this.gen >= 6 || target.side !== pokemon.side) {
    //       for (const effectid of ['craftyshield', 'matblock', 'quickguard', 'wideguard']) {
    //         if (target.side.removeSideCondition(effectid)) broke = true;
    //       }
    //     }
    //     if (broke) {
    //       if (move.id === 'feint') {
    //         this.add('-activate', target, 'move: Feint');
    //       } else {
    //         this.add('-activate', target, 'move: ' + move.name, '[broken]');
    //       }
    //     }
    //   }
    //   if (move.stealsBoosts) {
    //     let boosts = {};
    //     let stolen = false;
    //     for (let statName in target.boosts) {
    //       let stage = target.boosts[statName];
    //       if (stage > 0) {
    //         boosts[statName] = stage;
    //         stolen = true;
    //       }
    //     }
    //     if (stolen) {
    //       this.attrLastMove('[still]');
    //       this.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
    //       this.boost(boosts, pokemon, pokemon);
    //       for (let statName in boosts) {
    //         boosts[statName] = 0;
    //       }
    //       target.setBoost(boosts);
    //       this.add('-anim', pokemon, "Spectral Thief", target);
    //     }
    //   }
    //   move.totalDamage = 0;
    //   /**@type {number | false} */
    //   let damage = 0;
    //   pokemon.lastDamage = 0;
    //   if (move.multihit) {
    //     let hits = move.multihit;
    //     if (Array.isArray(hits)) {
    //       // yes, it's hardcoded... meh
    //       if (hits[0] === 2 && hits[1] === 5) {
    //         if (this.gen >= 5) {
    //           hits = this.sample([2, 2, 3, 3, 4, 5]);
    //         } else {
    //           hits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
    //         }
    //       } else {
    //         hits = this.random(hits[0], hits[1] + 1);
    //       }
    //     }
    //     hits = Math.floor(hits);
    //     let nullDamage = true;
    //     /**@type {number | false} */
    //     let moveDamage;
    //     // There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
    //     let isSleepUsable = move.sleepUsable || this.getMove(move.sourceEffect).sleepUsable;
    //     let i;
    //     for (i = 0; i < hits && target.hp && pokemon.hp; i++) {
    //       if (pokemon.status === 'slp' && !isSleepUsable) break;
    //       if (move.multiaccuracy && i > 0) {
    //         accuracy = move.accuracy;
    //         if (accuracy !== true) {
    //           if (!move.ignoreAccuracy) {
    //             boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
    //             boost = this.clampIntRange(boosts['accuracy'], -6, 6);
    //             if (boost > 0) {
    //               accuracy *= boostTable[boost];
    //             } else {
    //               accuracy /= boostTable[-boost];
    //             }
    //           }
    //           if (!move.ignoreEvasion) {
    //             boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
    //             boost = this.clampIntRange(boosts['evasion'], -6, 6);
    //             if (boost > 0) {
    //               accuracy /= boostTable[boost];
    //             } else if (boost < 0) {
    //               accuracy *= boostTable[-boost];
    //             }
    //           }
    //         }
    //         accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
    //         if (!move.alwaysHit) {
    //           accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
    //           // @ts-ignore
    //           if (accuracy !== true && !this.randomChance(accuracy, 100)) break;
    //         }
    //       }
    //       moveDamage = this.moveHit(target, pokemon, move);
    //       if (moveDamage === false) break;
    //       if (nullDamage && (moveDamage || moveDamage === 0 || moveDamage === undefined)) nullDamage = false;
    //       // Damage from each hit is individually counted for the
    //       // purposes of Counter, Metal Burst, and Mirror Coat.
    //       damage = (moveDamage || 0);
    //       // Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
    //       move.totalDamage += damage;
    //       if (move.mindBlownRecoil && i === 0) {
    //         this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.getEffect('Mind Blown'), true);
    //       }
    //       this.eachEvent('Update');
    //     }
    //     if (i === 0) return false;
    //     if (nullDamage) damage = false;
    //     this.add('-hitcount', target, i);
    //   } else {
    //     damage = this.moveHit(target, pokemon, move);
    //     move.totalDamage = damage;
    //   }
    //   if (move.recoil && move.totalDamage) {
    //     this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, pokemon, 'recoil');
    //   }
    //   if (move.struggleRecoil) {
    //     // @ts-ignore
    //     this.directDamage(this.clampIntRange(Math.round(pokemon.maxhp / 4), 1), pokemon, pokemon, {id: 'strugglerecoil'});
    //   }
    //   if (target && pokemon !== target) target.gotAttacked(move, damage, pokemon);
    //   if (move.ohko) this.add('-ohko');
    //   if (!damage && damage !== 0) return damage;
    //   this.eachEvent('Update');
    //   if (target && !move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
    //     this.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
    //     this.runEvent('AfterMoveSecondary', target, pokemon, move);
    //   }
    //   return damage;
  }
}

const $BattleManager = Battle_Manager;
