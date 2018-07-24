class Battle_Battler {
  private _action: IBattleAction = undefined;
  sides: { own: Battle_Side; foe: Battle_Side } = { own: undefined, foe: undefined };
  moveset: PE.Battle.Moves.Move[];
  slotIndex: number;
  partyIndex: number;
  species: string;
  name: string;
  constructor(public pekemon: PE.Pokemon.Pokemon) {
    this.moveset = this.pekemon.moveset;
    this.species = this.pekemon.species;
    this.name = this.pekemon.name;
  }

  get speed() {
    return this.pekemon.stats.spe;
  }

  isFainted() {
    return this.pekemon.hp <= 0;
  }

  damage(damage) {
    console.log(`~ damge ${damage} HP  ${this.pekemon.hp} --> ${this.pekemon.hp - damage} `);
    this.pekemon.hp -= damage;
    if (this.pekemon.hp <= 0) {
      console.log(`${this.species} fainted`);
      this.pekemon.hp = 0;
    }
  }

  setAction(action: IBattleAction) {
    this._action = action;
  }

  getAction() {
    return this._action;
  }

  clearAction() {
    this._action = undefined;
  }
}
