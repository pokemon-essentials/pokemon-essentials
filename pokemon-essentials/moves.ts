namespace PE.Battle.Moves {
  export function isOHKOMove(moveid: string) {}

  export enum MoveFlags {
    Protect = "protect",
    Mirror = "mirror",
    Heal = "heal",
    Contact = "contact",
    Snatch = "snatch",
    Bullet = "bullet",
    Distance = "distance",
    Authentic = "authentic",
    Mystery = "mystery",
    Reflectable = "reflectable",
    Pulse = "pulse",
    Bite = "bite",
    Recharge = "recharge",
    Nonsky = "nonsky",
    Sound = "sound",
    Charge = "charge",
    Gravity = "gravity",
    Punch = "punch",
    rost = "rost",
    Powder = "powder",
    Dance = "dance"
  }

  export enum Categories {
    Special = "SPECIAL",
    Physical = "PHYSICAL",
    Status = "STATUS"
  }
  export class Move {
    num: number;
    /**Move's accuracy, true if never must fail e.g z move*/
    accuracy: number | boolean;
    basePower: number;
    category: Categories;
    desc: string;
    name: string;
    /**The amount of PP remaining for this move */
    pp: number;
    totalPP: number;
    /**The number of PP Ups used for this move */
    ppup: number;
    priority: number;
    flags: any;
    target: MoveTargets;
    type: Types;
    contestType: string;
    critRatio: number;
    isZ: string;
    /**For Aerilate, Pixilate, Refrigerate */
    powerBoost: boolean;

    constructor(public id: Movedex | string) {
      if (!$PE_MOVES[id]) throw Error(`Error 404: Move name ${id} not found!`);
      Object.assign(this, $PE_MOVES[id]);
    }
    //==================================================================================================================
    // About the move
    modifyType(type: Types, attacker?: Battler, opponent?: Battler) {
      if (attacker && attacker.hasAbility(Abilitydex.NORMALIZE)) {
        type = Types.NORMAL;
        this.powerBoost = true;
      } else if (attacker && attacker.hasAbility(Abilitydex.AERILATE)) {
        type = Types.FLYING;
        this.powerBoost = true;
      } else if (attacker && attacker.hasAbility(Abilitydex.REFRIGERATE)) {
        type = Types.ICE;
        this.powerBoost = true;
      } else if (attacker && attacker.hasAbility(Abilitydex.PIXILATE)) {
        type = Types.FAIRY;
        this.powerBoost = true;
      }
      return type;
    }

    getType(type: Types, attacker?: Battler, opponent?: Battler) {
      this.powerBoost = false;
      type = this.modifyType(type, attacker, opponent);
      if ($Battle.field.effects.IonDeluge && type === Types.NORMAL) {
        type = Types.ELECTRIC;
        this.powerBoost = false;
      }
      if ($Battle.field.effects.Electrify) {
        type = Types.ELECTRIC;
        this.powerBoost = false;
      }
      return type;
    }

    isStatus() {
      return this.category === Categories.Status;
    }

    IsDamaging() {
      return !this.isStatus();
    }

    hasMultipleTarget() {
      // if(this.target === MoveTargets.)
    }

    isContactMove() {
      return this.flags[MoveFlags.Contact] !== 0;
    }

    canProtectAgainst() {
      return this.flags[MoveFlags.Protect] !== 0;
    }

    // canMagicCoat() {
    //   return this.flags[MoveFlags.] !== 0;
    //   return (@flags& 0x04)!= 0 # flag c: Magic Coat
    // }

    canSnatch() {
      return this.flags[MoveFlags.Snatch] !== 0;
    }

    canMirrorMove() {
      return this.flags[MoveFlags.Mirror] !== 0;
    }

    // canKingsRock() {
    //   return this.flags[MoveFlags.] !== 0;
    //   return (@flags& 0x20)!= 0 # flag f: King's Rock
    // }

    // canThawUser() {
    //   return this.flags[MoveFlags.] !== 0;
    //   return (@flags& 0x40)!= 0 # flag g: Thaws user before moving
    // }

    // hasHighCriticalRate() {
    //   return this.flags[MoveFlags.] !== 0;
    //   return (@flags& 0x80)!= 0 # flag h: Has high critical hit rate
    // }

    isBitingMove() {
      return this.flags[MoveFlags.Bite] !== 0;
    }

    isPunchingMove() {
      return this.flags[MoveFlags.Punch] !== 0;
    }

    isSoundBased() {
      return this.flags[MoveFlags.Sound] !== 0;
    }

    isPowderMove() {
      return this.flags[MoveFlags.Powder] !== 0;
    }

    isPulseMove() {
      return this.flags[MoveFlags.Pulse] !== 0;
    }

    isBombMove() {
      return this.flags[MoveFlags.Bullet] !== 0;
    }
    //==================================================================================================================

    //==================================================================================================================
    // This move's type effectiveness
    typeImmunityByAbility(type: Types, attacker: Battler, opponent: Battler) {
      if (attacker.index === opponent.index) return false;
      if (attacker.hasMoldBreaker()) return false;
      return Battle.Abilities.moveHitTypeImmunity(this, attacker, opponent);
    }

    pbTypeModifier() {}

    //==================================================================================================================
  }
}
