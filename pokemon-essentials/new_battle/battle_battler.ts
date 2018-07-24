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
    console.log(`~ damage ${damage} ${this.name} HP  ${this.pekemon.hp} --> ${this.pekemon.hp - damage} `);
    this.pekemon.hp -= damage;
    if (this.pekemon.hp <= 0) {
      console.log(`~ ${this.name} fainted`);
      this.pekemon.hp = 0;
    }
  }

  getFirstDamageMove() {
    for (const move of this.moveset) {
      if (move.basePower > 0) return move;
    }
    return this.moveset[0];
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
