namespace PE.Trainers {
  export class Trainer {
    battlers: PE.Battle.Battler[] = [];
    constructor(private _party: PE.Pokemon.Pokemon[]) {
      if (_party.length === 0) throw Error('Trainer must have at least one Pokémon in party');
    }

    get party() {
      return this._party;
    }
  }
}
