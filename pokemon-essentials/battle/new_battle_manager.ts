namespace PE {
  const enum BattlePhase {
    None,
    Init,
    ActionSelection,
    MoveSelection,
    Animation,
    Waiting
  }

  const enum WaitMode {
    None,
    Animation,
    AbilitySign
  }

  export class NewBattleManager {
    static allies: Battle.Battler[];
    static foes: Battle.Battler[];
    static actives: Battle.Battler[];
    static battlers: Battle.Battler[];
    static priority: any[];
    static turn: number;
    static choices: {};
    static sides: { player: Battle.ActiveSide; foe: Battle.ActiveSide };
    static setup(allies: Pokemon.Pokemon[], foes: Pokemon.Pokemon[]) {
      this.battlers = [];
      this.actives = [];

      this.sides = { player: new Battle.ActiveSide(), foe: new Battle.ActiveSide() };

      this.sides.player.battlers = allies.map(pokemon => {
        let battler = new Battle.Battler(pokemon, this.battlers.length);
        battler.sides.own = this.sides.player;
        battler.sides.foe = this.sides.foe;
        this.battlers.push(battler);
        return battler;
      });

      this.sides.foe.battlers = foes.map(pokemon => {
        let battler = new Battle.Battler(pokemon, this.battlers.length);
        battler.sides.own = this.sides.foe;
        battler.sides.foe = this.sides.player;
        this.battlers.push(battler);
        return battler;
      });

      this.actives.push(this.sides.player.battlers[0]);
      this.actives.push(this.sides.foe.battlers[0]);
      this.choices = {};
      this.turn = 0;

      this.startTurn();
    }

    static startTurn() {
      for (const pokemon of this.actives) {
        let action = pokemon.selectAction();
        if (action == Battle.ActionChoices.Switch) {
          console.log(`${pokemon.species} switch to --> ${pokemon.sides.foe.battlers[0].species}`);
        } else if (action == Battle.ActionChoices.UseMove) {
          console.log(`${pokemon.species} Used ${pokemon.moveset[0].name} --> ${pokemon.sides.foe.battlers[0].species}`);
        }
      }

      this.actives.sort((a, b) => {
        return b.moveset[0].priority - a.moveset[0].priority || b.speed - a.speed;
      });

      var out = this.actives.map(function(pokemon) {
        return {
          BattleIndex: pokemon.index,
          name: pokemon.species,
          speed: pokemon.speed,
          move: pokemon.moveset[0].name,
          priority: pokemon.moveset[0].priority
        };
      });

      this.turn++;
      console.log(`Start turn #${this.turn}`);
      console.table(out);
      this.priority = Array.from(this.actives.keys());
      this.action();
    }

    static action() {
      if (this.priority.length === 0) {
        this.terminateTurn();
        return;
      }

      this.next()
        .action(this)
        .then(() => this.action());
    }

    static next() {
      // Determine and return the next creature to take a turn.
      // ...
      let index = this.priority.shift();
      if (index === undefined) return;
      if (!this.actives[index].isFainted()) return this.actives[index];
    }

    static terminateTurn() {
      console.log("turn end");
    }

    runSwitch() {
      // this.BeforeSwitch();
      // this.switch();
    }
    runAfterSwitch() {}
    runActions() {
      this.runSwitch();
      this.runAfterSwitch();
    }
  }
}

function StartRandomBattle() {
  let p1 = PE.Pokemon.getRandomParty(6);
  let p2 = PE.Pokemon.getRandomParty(6);
  PE.NewBattleManager.setup(p1, p2);
}

function SelectAction(pokemon: PE.Battle.Battler) {
  let action = PE.Battle.ActionChoices.UseMove;
  if (PE.Utils.chance(30)) action = PE.Battle.ActionChoices.Switch;
  let choice = { action };
  if (action === PE.Battle.ActionChoices.UseMove) {
    let selectedMove = pokemon.moveset[0];
    for (const move of pokemon.moveset) {
      if (move.IsDamaging()) {
        selectedMove = move;
        break;
      }
    }
    choice["move"] = selectedMove;
    // switch (selectedMove.target) {
    //   case PE.Battle.MoveTargets.Normal:
    //     target
    //     break;
    // }
  } else if (action === PE.Battle.ActionChoices.Switch) {
  }

  return choice;
}
