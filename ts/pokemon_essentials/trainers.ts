namespace PE.Trainers {
  export class Trainer {
    battlers: Battle.Battler[] = [];
    constructor(private _party: Pokemon.Pokemon[]) {
      if (_party.length === 0) throw Error('Trainer must have at least one Pokémon in party');
    }

    get party() {
      return this._party;
    }

    get active(){
      return this.battlers[0];
    }

    get leader(){
      return this._party[0];
    }
  }

  export function RandomTrainer() {
    let length = Math.randomInt(5) + 1;
    let party = [];
    for (let i = 0; i < length; i++) {
      party.push(Pokemon.getRandomPokemon());
    }
    return new Trainer(party);
  }
}
