namespace PE.Battle {
  export class Battler {
    private _hp = 0;
    private _totalHp = 0;
    private _attack: number;
    private _defense: number;
    private _spatk: number;
    private _spdef: number;
    private _speed: number;
    private _fainted = false;
    private _captured = false;

    ability: string;
    battle: typeof Manager;
    effects = {};
    forme: any;
    gender: any;
    item: string;
    ivs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number; };
    lastAttacker: {};
    lastHPLost: number;
    lastMoveUsed: number;
    lastMoveUsedSketch: number;
    lastMoveUsedType: number;
    lastRoundMoved: number;
    level: number;
    movesUsed: {};
    moves: string[];
    name: string;
    ownSide: PE.Battle.ActiveSide;
    participants: any[];
    species: string;
    statusCount: number;
    status: PE.Statuses;
    stages = {};
    tookDamage: boolean;
    turncount: number;
    types: string[];

    constructor(pokemon: PE.Pokemon.Pokemon, public index: number) {
      this.battle = this.battle;
      this.initPokemon(pokemon);
      this.initEffects(false);
      this.initPermanentEffects();
    }

    initPokemon(pokemon: PE.Pokemon.Pokemon) {
      // if (pokemon.isEgg()) throw Error("An egg can't be an active Pokémon");

      this.name = pokemon.name;
      this.species = pokemon.species;
      this.level = pokemon.level;
      this._hp = pokemon.stats.hp;
      this._totalHp = pokemon.stats.hp;
      this.gender = pokemon.gender;
      this.ability = pokemon.ability;
      this.item = pokemon.item;
      this.types = pokemon.types;
      this.forme = pokemon.forme;
      this._attack = pokemon.stats.atk;
      this._defense = pokemon.stats.def;
      this._spatk = pokemon.stats.spa;
      this._spdef = pokemon.stats.spd;
      this._speed = pokemon.stats.spe;
      this.status = pokemon.status;
      this.statusCount = pokemon.statusCount;

      this.participants = []; // Participants will earn Exp.Points if this battler is defeated;
      // this.moves = [
      //   PokeBattle_Move.pbFromPBMove(this.battle, poke.moves[0]),;
      //   PokeBattle_Move.pbFromPBMove(this.battle, poke.moves[1]),;
      //   PokeBattle_Move.pbFromPBMove(this.battle, poke.moves[2]),;
      //   PokeBattle_Move.pbFromPBMove(this.battle, poke.moves[3]);
      // ]
      this.moves = pokemon.moveset;
      this.ivs = pokemon.ivs;
    }

    initEffects(batonpass: boolean) {
      if (!batonpass) {
        // These effects are retained if Baton Pass is used
        this.stages['ATTACK'] = 0;
        this.stages['DEFENSE'] = 0;
        this.stages['SPEED'] = 0;
        this.stages['SPATK'] = 0;
        this.stages['SPDEF'] = 0;
        this.stages['EVASION'] = 0;
        this.stages['ACCURACY'] = 0;

        this.lastMoveUsedSketch = -1;
        this.effects[PE.Effects.AquaRing] = false;
        this.effects[PE.Effects.Confusion] = 0;
        this.effects[PE.Effects.Curse] = false;
        this.effects[PE.Effects.Embargo] = 0;
        this.effects[PE.Effects.FocusEnergy] = 0;
        this.effects[PE.Effects.GastroAcid] = false;
        this.effects[PE.Effects.HealBlock] = 0;
        this.effects[PE.Effects.Ingrain] = false;
        this.effects[PE.Effects.LeechSeed] = -1;
        this.effects[PE.Effects.LockOn] = 0;
        this.effects[PE.Effects.LockOnPos] = -1;
        for (const battler of this.battle.battlers) {
          if (battler.effects[PE.Effects.LockOnPos] === this.index && battler.effects[PE.Effects.LockOn] > 0) {
            battler.effects[PE.Effects.LockOn] = 0;
            battler.effects[PE.Effects.LockOnPos] = -1;
          }
        }
        this.effects[PE.Effects.MagnetRise] = 0;
        this.effects[PE.Effects.PerishSong] = 0;
        this.effects[PE.Effects.PerishSongUser] = -1;
        this.effects[PE.Effects.PowerTrick] = false;
        this.effects[PE.Effects.Substitute] = 0;
        this.effects[PE.Effects.Telekinesis] = 0;
      } else {
        if (this.effects[PE.Effects.LockOn] > 0) {
          this.effects[PE.Effects.LockOn] = 2;
        } else {
          this.effects[PE.Effects.LockOn] = 0;
        }
        if (this.effects[PE.Effects.PowerTrick]) {
          let aux = this.attack;
          this.attack = this.defense;
          this.defense = this.attack;
        }
      }
      // this.damagestate.reset();
      this._fainted = false;
      this.lastAttacker = {};
      this.lastHPLost = 0;
      this.tookDamage = false;
      this.lastMoveUsed = -1;
      this.lastMoveUsedType = -1;
      this.lastRoundMoved = -1;
      this.movesUsed = {};
      this.turncount = 0;
      this.effects[PE.Effects.Attract] = -1;
      for (const battler of this.battle.battlers) {
        if (battler.effects[PE.Effects.Attract] === this.index) {
          battler.effects[PE.Effects.Attract] = -1;
        }
      }
      this.effects[PE.Effects.BatonPass] = false;
      this.effects[PE.Effects.Bide] = 0;
      this.effects[PE.Effects.BideDamage] = 0;
      this.effects[PE.Effects.BideTarget] = -1;
      this.effects[PE.Effects.Charge] = 0;
      this.effects[PE.Effects.ChoiceBand] = -1;
      this.effects[PE.Effects.Counter] = -1;
      this.effects[PE.Effects.CounterTarget] = -1;
      this.effects[PE.Effects.DefenseCurl] = false;
      this.effects[PE.Effects.DestinyBond] = false;
      this.effects[PE.Effects.Disable] = 0;
      this.effects[PE.Effects.DisableMove] = 0;
      this.effects[PE.Effects.Electrify] = false;
      this.effects[PE.Effects.Encore] = 0;
      this.effects[PE.Effects.EncoreIndex] = 0;
      this.effects[PE.Effects.EncoreMove] = 0;
      this.effects[PE.Effects.Endure] = false;
      this.effects[PE.Effects.FirstPledge] = 0;
      this.effects[PE.Effects.FlashFire] = false;
      this.effects[PE.Effects.Flinch] = false;
      this.effects[PE.Effects.FollowMe] = 0;
      this.effects[PE.Effects.Foresight] = false;
      this.effects[PE.Effects.FuryCutter] = 0;
      this.effects[PE.Effects.Grudge] = false;
      this.effects[PE.Effects.HelpingHand] = false;
      this.effects[PE.Effects.HyperBeam] = 0;
      this.effects[PE.Effects.Illusion] = null;
      /**
       * Add here ilusion ability
       */
      this.effects[PE.Effects.Imprison] = false;
      this.effects[PE.Effects.KingsShield] = false;
      this.effects[PE.Effects.LifeOrb] = false;
      this.effects[PE.Effects.MagicCoat] = false;
      this.effects[PE.Effects.MeanLook] = -1;
      for (const battler of this.battle.battlers) {
        if (battler.effects[PE.Effects.MeanLook] === this.index) battler.effects[PE.Effects.MeanLook] = -1;
      }
      this.effects[PE.Effects.MeFirst] = false;
      this.effects[PE.Effects.Metronome] = 0;
      this.effects[PE.Effects.MicleBerry] = false;
      this.effects[PE.Effects.Minimize] = false;
      this.effects[PE.Effects.MiracleEye] = false;
      this.effects[PE.Effects.MirrorCoat] = -1;
      this.effects[PE.Effects.MirrorCoatTarget] = -1;
      this.effects[PE.Effects.MoveNext] = false;
      this.effects[PE.Effects.MudSport] = false;
      this.effects[PE.Effects.MultiTurn] = 0;
      this.effects[PE.Effects.MultiTurnAttack] = 0;
      this.effects[PE.Effects.MultiTurnUser] = -1;
      for (const battler of this.battle.battlers) {
        if (battler.effects[PE.Effects.MultiTurnUser] === this.index) {
          battler.effects[PE.Effects.MultiTurn] = 0;
          battler.effects[PE.Effects.MultiTurnUser] = -1;
        }
      }
      this.effects[PE.Effects.Nightmare] = false;
      this.effects[PE.Effects.Outrage] = 0;
      this.effects[PE.Effects.ParentalBond] = 0;
      this.effects[PE.Effects.PickupItem] = 0;
      this.effects[PE.Effects.PickupUse] = 0;
      this.effects[PE.Effects.Pinch] = false;
      this.effects[PE.Effects.Powder] = false;
      this.effects[PE.Effects.Protect] = false;
      this.effects[PE.Effects.ProtectNegation] = false;
      this.effects[PE.Effects.ProtectRate] = 1;
      this.effects[PE.Effects.Pursuit] = false;
      this.effects[PE.Effects.Quash] = false;
      this.effects[PE.Effects.Rage] = false;
      this.effects[PE.Effects.Revenge] = 0;
      this.effects[PE.Effects.Roar] = false;
      this.effects[PE.Effects.Rollout] = 0;
      this.effects[PE.Effects.Roost] = false;
      this.effects[PE.Effects.SkipTurn] = false;
      this.effects[PE.Effects.SkyDrop] = false;
      this.effects[PE.Effects.SmackDown] = false;
      this.effects[PE.Effects.Snatch] = false;
      this.effects[PE.Effects.SpikyShield] = false;
      this.effects[PE.Effects.Stockpile] = 0;
      this.effects[PE.Effects.StockpileDef] = 0;
      this.effects[PE.Effects.StockpileSpDef] = 0;
      this.effects[PE.Effects.Taunt] = 0;
      this.effects[PE.Effects.Torment] = false;
      this.effects[PE.Effects.Toxic] = 0;
      this.effects[PE.Effects.Transform] = false;
      this.effects[PE.Effects.Truant] = false;
      this.effects[PE.Effects.TwoTurnAttack] = 0;
      this.effects[PE.Effects.Type3] = -1;
      this.effects[PE.Effects.Unburden] = false;
      this.effects[PE.Effects.Uproar] = 0;
      this.effects[PE.Effects.Uturn] = false;
      this.effects[PE.Effects.WaterSport] = false;
      this.effects[PE.Effects.WeightChange] = 0;
      this.effects[PE.Effects.Yawn] = 0;
    }

    /**  These effects are always retained even if a Pokémon is replaced */
    initPermanentEffects() {
      this.effects[PE.Effects.FutureSight] = 0;
      this.effects[PE.Effects.FutureSightMove] = 0;
      this.effects[PE.Effects.FutureSightUser] = -1;
      this.effects[PE.Effects.FutureSightUserPos] = -1;
      this.effects[PE.Effects.HealingWish] = false;
      this.effects[PE.Effects.LunarDance] = false;
      this.effects[PE.Effects.Wish] = 0;
      this.effects[PE.Effects.WishAmount] = 0;
      this.effects[PE.Effects.WishMaker] = -1;
    }


    // In battle Stats
    get hp() {
      return this._hp;
    }

    get attack() {
      return this._attack;
    }

    set attack(value) {
      this._attack = value;
    }

    get defense() {
      return this._defense;
    }

    set defense(value) {
      this._defense = value;
    }

    get spatk() {
      return this._spatk;
    }

    get spdef() {
      return this._spdef;
    }

    get speed() {
      return this._speed;
    }

    // Battler info
    hasAbility(ability: string) {
      return this.ability === ability;
    }

    hasAbilityIn(abilities: string[]) {
      for (const ability of abilities) {
        if (this.hasAbility(ability)) return true;
      }
      return false;
    }

    hasItem(item: string) {
      return this.item === item;
    }

    hasMovedThisRound() {
      if (!this.lastRoundMoved) return false;
      return this.lastRoundMoved === this.battle.turncount
    }

    hasMoldBreaker() { }

    hasType(type: string) {
      for (const t of this.types) {
        if (t === type) return true;
      }
      if (this.effects[PE.Effects.Type3] && this.effects[PE.Effects.Type3] === type) return true;
      return false;
    }

    isFainted() {
      return this.hp <= 0;
    }

    isAirborne(aux) { }


    //===========================================================================
    // Statuses Conditions
    canSleep(attacker: PE.Battle.Battler, showMessages: boolean, move, ignorestatus: boolean) {
      if (this.isFainted()) return false;
      let selfSleep = attacker && attacker.index === this.index;
      if (!ignorestatus && this.status === PE.Statuses.Sleep) {
        if (showMessages) this.battle.showMessage(i18n._(`%1 is already asleep!`, this.name));
        return false;
      }
      // user has sustitute or Safeguard
      if (!selfSleep) {
        if (this.status != PE.Statuses.Healthy ||
          (this.effects[PE.Effects.Substitute] > 0 && (!move || !move.ignoresSubstitute(attacker)))) {
          if (showMessages) this.battle.showMessage(i18n._("But it failed!"));
          return false;
        }

        if (this.ownSide.effects[PE.Effects.Safeguard] > 0 && (!attacker || !attacker.hasAbility('INFILTRATOR'))) {
          if (showMessages) this.battle.showMessage(i18n._("%1's team is protected by Safeguard!", this.name))
          return false;
        }
      }
      // there are field terrains and user touch the field.
      if (!this.isAirborne(attacker && attacker.hasMoldBreaker())) {
        if (this.battle.field.effects[PE.Effects.ElectricTerrain] > 0) {
          if (showMessages)
            this.battle.showMessage(i18n._(`The Electric Terrain prevented %1 from falling asleep!`, this.name));
          return false
        } else if (this.battle.field.effects[PE.Effects.MistyTerrain] > 0) {
          if (showMessages)
            this.battle.showMessage(i18n._(`The Misty Terrain prevented %1 from falling asleep!`, this.name));
          return false
        }
      }
      // uproar
      if ((attacker && attacker.hasMoldBreaker()) || !this.hasAbility('SOUNDPROOF')) {
        for (const battler of this.battle.battlers) {
          if (battler.effects[PE.Effects.Uproar] > 0) {
            if (showMessages) this.battle.showMessage(i18n._(`But the uproar kept %1 awake!`, this.name));
            return false
          }
        }
      }

      if (!attacker || selfSleep || !attacker.hasMoldBreaker()) {
        if (this.hasAbilityIn(['VITALSPIRIT', 'INSOMIA', 'SWEETVEIL']) ||
          (this.hasAbility('FLOWERVEIL') && this.hasType('GRASS')) ||
          [PE.Weather.SunnyDay, PE.Weather.HarshSun].contains(this.battle.weather)) {
          let msg = `%1 stayed awake using its %2!`;
          if (showMessages) this.battle.showMessage(i18n._(msg, this.name, PE.Abilities.name(this.ability)));
          return false;
        }
        // if pbPartner.hasAbility('SWEETVEIL') ||
        //    (pbPartner.hasAbility('FLOWERVEIL') && pbHasType?(:GRASS))
        //   abilityname=PE.Abilities.name(pbPartner.ability)
        //   this.battle.showMessage(i18n._("{1} stayed awake using its partner's {2}!",pbThis,abilityname)) if showMessages
        //   return false
        // end
      }
      return true;
    }

    sleep() { }

    canAttract(attacker, showMessages) {
      if (this.isFainted()) return false;
      if (!attacker || attacker.isFainted()) return false;
      if (this.effects[PE.Effects.Attract] >= 0) {
        if (showMessages) this.battle.showMessage(i18n._("But it failed!"));
        return false;
      }
      if (attacker.gender === 'N' || this.gender === 'N' || attacker.gender === this.gender) {
        if (showMessages) this.battle.showMessage(i18n._("But it failed!"));
        return false;
      }
      if ((!attacker || !attacker.hasMoldBreaker()) && this.hasAbility('OBLIVIOUS')) {
        if (showMessages)
          this.battle.showMessage(i18n._("%1's %2 prevents romance!", this.name, PE.Abilities.name(this.ability)));
        return false;
      }
      return true;
    }

    attract(attacker: PE.Battle.Battler, showMessage: boolean) {
      this.effects[PE.Effects.Attract] = attacker.index;
      // this.battle.pbCommonAnimation("Attract", this, null);
      if (showMessage) this.battle.showMessage(i18n._(`%1 fell in love!`, this.name));
      console.log(`[Lingering effect triggered] ${this.name} became infatuated (with ${attacker.name})`);
      if (this.hasItem('DESTINYKNOT') && attacker.canAttract(this, false)) {
        attacker.attract(this, false);
        let msg = `%1's %2 made %3 fall in love!`;
        this.battle.showMessage(i18n._(msg, this.name, PE.Items.name(this.item), attacker.name));
        console.log(`[Item triggered] ${this.name}'s Destiny Knot`);
      }
    }

    canPoison() { }
    poison() { }

    canParalize() { }
    paralize() { }

    canBurn() { }
    burn() { }



  }
}
