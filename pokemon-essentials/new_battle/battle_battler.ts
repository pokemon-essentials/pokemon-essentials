class Battle_Battler {
  private _action: IBattleAction = undefined;
  sides: { own: Battle_Side; foe: Battle_Side } = { own: undefined, foe: undefined };
  moveset: PE.Battle.Moves.Move[];
  slotIndex: number;
  partyIndex: number;
  species: string;
  name: string;
  types: string[];
  level: number;

  guid = PE.Utils.guid();
  constructor(public pokemon: PE.Pokemon.Pokemon) {
    this.moveset = this.pokemon.moveset;
    this.species = this.pokemon.species;
    this.name = this.pokemon.name;
    this.types = this.pokemon.types;
    this.level = this.pokemon.level;
  }

  get attack() {
    return this.pokemon.stats.atk;
  }

  get defense() {
    return this.pokemon.stats.def;
  }
  get spatk() {
    return this.pokemon.stats.spa;
  }
  get spdef() {
    return this.pokemon.stats.spd;
  }
  get speed() {
    return this.pokemon.stats.spe;
  }

  hasType(type) {
    for (const t of this.types) {
      if (t === type) return true;
    }
    return false;
  }

  isFainted() {
    return this.pokemon.hp <= 0;
  }

  damage(damage) {
    console.log(`~ damage ${damage} ${this.species} HP  ${this.pokemon.hp} --> ${this.pokemon.hp - damage} `);
    this.pokemon.hp -= damage;
    if (this.pokemon.hp <= 0) {
      this.faint();
    }
  }

  faint() {
    console.log(`~ ${this.species} fainted!`);
    $BattleManager.showMessage(`${this.name} fainted!`);
    this.pokemon.hp = 0;
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
