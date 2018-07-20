namespace PE.Trainers {
  export interface TrainerData {
    name: string;
    party: Pokemon.Pokemon[];
    money?: number;
    gender?: number;
    filename?: string;
  }

  export class Trainer {
    battlers: Battle.Battler[] = [];
    data: TrainerData;
    constructor() {
      this.data = { party: undefined, name: undefined };
      this.data.gender = 1;
    }

    get party() {
      return this.data.party;
    }

    set party(members) {
      this.data.party = members;
    }

    get active() {
      return this.battlers[0];
    }

    get leader() {
      return this.data.party[0];
    }
  }

  export class Player extends Trainer {
    constructor() {
      super();
    }
  }

  export class NPCTrainer extends Trainer {
    constructor(party: Pokemon.Pokemon[]) {
      super();
      if (party.length === 0) throw Error("Trainer must have at least one Pokémon in party");
      this.data = { name: "", party: party };
    }
  }

  export function RandomTrainer() {
    let length = Math.randomInt(5) + 1;
    // let length = 1;
    let party = [];
    for (let i = 0; i < length; i++) {
      party.push(Pokemon.getRandomPokemon());
    }
    return new NPCTrainer(party);
  }
}
