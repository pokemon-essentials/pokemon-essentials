namespace PE.Battle {

  interface BattlerEffects {
    AquaRing?: boolean,
    Attract?: number,
    BatonPass?: boolean,
    Bide?: number,
    BideDamage?: number,
    BideTarget?: number,
    Charge?: number,
    /** The move id lock by choice band */
    ChoiceBand?: Movedex,
    Confusion?: number,
    Counter?: number,
    CounterTarget?: number,
    Curse?: boolean,
    DefenseCurl?: boolean,
    DestinyBond?: boolean,
    Disable?: number,
    DisableMove?: number,
    Electrify?: boolean,
    Embargo?: number,
    Encore?: number,
    EncoreMoveId?: Movedex,
    EncoreMove?: number,
    Endure?: boolean,
    FirstPledge?: number,
    FlashFire?: boolean,
    Flinch?: boolean,
    FocusEnergy?: number,
    FollowMe?: number,
    Foresight?: boolean,
    FuryCutter?: number,
    FutureSight?: number,
    FutureSightMove?: number,
    FutureSightUser?: number,
    FutureSightUserPos?: number,
    GastroAcid?: boolean,
    Grudge?: boolean,
    HealBlock?: number,
    HealingWish?: boolean,
    HelpingHand?: boolean,
    HyperBeam?: number,
    Illusion?: Pokemon.Pokemon,
    Imprison?: boolean,
    Ingrain?: boolean,
    KingsShield?: boolean,
    LeechSeed?: number,
    LifeOrb?: boolean,
    LockOn?: number,
    LockOnPos?: number,
    LunarDance?: boolean,
    MagicCoat?: boolean,
    MagnetRise?: number,
    MeanLook?: number,
    MeFirst?: boolean,
    Metronome?: number,
    MicleBerry?: boolean,
    Minimize?: boolean,
    MiracleEye?: boolean,
    MirrorCoat?: number,
    MirrorCoatTarget?: number,
    MoveNext?: boolean,
    MudSport?: boolean,
    MultiTurn?: number,
    MultiTurnAttack?: number,
    MultiTurnUser?: number,
    Nightmare?: boolean,
    Outrage?: number,
    ParentalBond?: number,
    PerishSong?: number,
    PerishSongUser?: number,
    PickupItem?: string,
    PickupUse?: string,
    Pinch?: boolean,
    Powder?: boolean,
    PowerTrick?: boolean,
    Protect?: boolean,
    ProtectNegation?: boolean,
    ProtectRate?: number,
    Pursuit?: boolean,
    Quash?: boolean,
    Rage?: boolean,
    Roar?: boolean,
    Revenge?: number,
    Rollout?: number,
    Roost?: boolean,
    SkipTurn?: boolean,
    SkyDrop?: boolean,
    SmackDown?: boolean,
    Snatch?: boolean,
    SpikyShield?: boolean,
    Stockpile?: number,
    StockpileDef?: number,
    StockpileSpDef?: number,
    Substitute?: number,
    Taunt?: number,
    Telekinesis?: number,
    Torment?: boolean,
    Toxic?: number,
    Transform?: boolean,
    /** add to the effects test*/
    Truant?: boolean,
    TwoTurnAttack?: number,
    Type3?: Types,
    /** check if an item is used or lost.*/
    Unburden?: boolean,
    Uproar?: number,
    Uturn?: boolean,
    WaterSport?: boolean,
    /** aumont of weigth add the normal Pokémon weight */
    WeightChange?: number,
    Wish?: number,
    WishAmount?: number,
    WishMaker?: number,
    Yawn?: number,

  }

  const STAGE_MULT = {
    '-6': 0.2,
    '-5': 0.28,
    '-4': 0.33,
    '-3': 0.4,
    '-2': 0.5,
    '-1': 0.67,
    '0': 1,
    '1': 1.5,
    '2': 2,
    '3': 2.5,
    '4': 3,
    '5': 3.5,
    '6': 4,
  }

  export class Battler {
    hpbar: UI.HPBar;
    private _hp = 0;
    private _totalHP = 0;
    private _attack: number;
    private _defense: number;
    private _spatk: number;
    private _spdef: number;
    private _speed: number;
    private _fainted = false;
    private _captured = false;
    nickname: string;
    totalhp: number;

    ability: string;
    damageState: DamageState;
    effects: BattlerEffects;
    forme: any;
    gender: any;
    item: string;
    itemInitial: string;
    ivs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number; };
    lastAttacker: {};
    lastHPLost: number;
    lastMoveUsed: number;
    lastMoveUsedSketch: number;
    lastMoveUsedType: number;
    lastRoundMoved: number;
    level: number;
    movesUsed: {};
    moveset: Moves.Move[];
    sides: { own: ActiveSide, foe: ActiveSide } = { own: undefined, foe: undefined };
    /** Participants will earn Exp. Points if this battler is defeated */
    participants: number[];
    species: string;
    _status: Statuses;
    statusCount: number;
    stages: { HP?, Attack?, Defense?, Speed?, SpAtk?, SpDef?, Accuracy?, Evasion?};
    tookDamage: boolean;
    turncount: number;
    types: string[];

    // partner: Battler;

    constructor(public pokemon: Pokemon.Pokemon, public index: number) {
      this._hp = 0;
      this._totalHP = 0;
      this._fainted = true;
      this._captured = false;
      this.damageState = new DamageState();
      this.effects = {};
      this.stages = {};
      this.initPokemon(pokemon);
      this.initEffects(false);
      this.initPermanentEffects();
    }

    initPokemon(pokemon: Pokemon.Pokemon) {
      // if (pokemon.isEgg()) throw Error("An egg can't be an active Pokémon");
      this.nickname = pokemon.name;
      this.species = pokemon.species;
      this.level = pokemon.level;
      this._hp = pokemon.stats.hp;
      this._totalHP = pokemon.stats.hp;
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

      this.totalhp = pokemon.stats.hp;

      this.participants = [];
      this.moveset = pokemon.moveset;
      this.ivs = pokemon.ivs;
    }

    initEffects(batonpass: boolean) {
      if (!batonpass) {
        // These effects are retained if Baton Pass is used
        this.stages.Attack = 0;
        this.stages.Defense = 0;
        this.stages.Speed = 0;
        this.stages.SpAtk = 0;
        this.stages.SpDef = 0;
        this.stages.Evasion = 0;
        this.stages.Accuracy = 0;

        this.lastMoveUsedSketch = -1;
        this.effects.AquaRing = false;
        this.effects.Confusion = 0;
        this.effects.Curse = false;
        this.effects.Embargo = 0;
        this.effects.FocusEnergy = 0;
        this.effects.GastroAcid = false;
        this.effects.HealBlock = 0;
        this.effects.Ingrain = false;
        this.effects.LeechSeed = -1;
        this.effects.LockOn = 0;
        this.effects.LockOnPos = -1;
        for (const battler of $Battle.actives) {
          if (battler.effects.LockOnPos === this.index && battler.effects.LockOn > 0) {
            battler.effects.LockOn = 0;
            battler.effects.LockOnPos = -1;
          }
        }
        this.effects.MagnetRise = 0;
        this.effects.PerishSong = 0;
        this.effects.PerishSongUser = -1;
        this.effects.PowerTrick = false;
        this.effects.Substitute = 0;
        this.effects.Telekinesis = 0;
      } else {
        if (this.effects.LockOn > 0) {
          this.effects.LockOn = 2;
        } else {
          this.effects.LockOn = 0;
        }
        if (this.effects.PowerTrick) {
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
      this.effects.Attract = -1;
      for (const battler of $Battle.actives) {
        if (battler.effects.Attract === this.index) {
          battler.effects.Attract = -1;
        }
      }
      this.effects.BatonPass = false;
      this.effects.Bide = 0;
      this.effects.BideDamage = 0;
      this.effects.BideTarget = -1;
      this.effects.Charge = 0;
      this.effects.ChoiceBand = undefined;
      this.effects.Counter = -1;
      this.effects.CounterTarget = -1;
      this.effects.DefenseCurl = false;
      this.effects.DestinyBond = false;
      this.effects.Disable = 0;
      this.effects.DisableMove = 0;
      this.effects.Electrify = false;
      this.effects.Encore = 0;
      this.effects.EncoreMoveId = undefined;
      this.effects.EncoreMove = 0;
      this.effects.Endure = false;
      this.effects.FirstPledge = 0;
      this.effects.FlashFire = false;
      this.effects.Flinch = false;
      this.effects.FollowMe = 0;
      this.effects.Foresight = false;
      this.effects.FuryCutter = 0;
      this.effects.Grudge = false;
      this.effects.HelpingHand = false;
      this.effects.HyperBeam = 0;
      this.effects.Illusion = null;
      /**
       * Add here ilusion ability
       */
      this.effects.Imprison = false;
      this.effects.KingsShield = false;
      this.effects.LifeOrb = false;
      this.effects.MagicCoat = false;
      this.effects.MeanLook = -1;
      for (const battler of $Battle.actives) {
        if (battler.effects.MeanLook === this.index) battler.effects.MeanLook = -1;
      }
      this.effects.MeFirst = false;
      this.effects.Metronome = 0;
      this.effects.MicleBerry = false;
      this.effects.Minimize = false;
      this.effects.MiracleEye = false;
      this.effects.MirrorCoat = -1;
      this.effects.MirrorCoatTarget = -1;
      this.effects.MoveNext = false;
      this.effects.MudSport = false;
      this.effects.MultiTurn = 0;
      this.effects.MultiTurnAttack = 0;
      this.effects.MultiTurnUser = -1;
      for (const battler of $Battle.actives) {
        if (battler.effects.MultiTurnUser === this.index) {
          battler.effects.MultiTurn = 0;
          battler.effects.MultiTurnUser = -1;
        }
      }
      this.effects.Nightmare = false;
      this.effects.Outrage = 0;
      this.effects.ParentalBond = 0;
      this.effects.PickupItem = "";
      this.effects.PickupUse = "";
      this.effects.Pinch = false;
      this.effects.Powder = false;
      this.effects.Protect = false;
      this.effects.ProtectNegation = false;
      this.effects.ProtectRate = 1;
      this.effects.Pursuit = false;
      this.effects.Quash = false;
      this.effects.Rage = false;
      this.effects.Revenge = 0;
      this.effects.Roar = false;
      this.effects.Rollout = 0;
      this.effects.Roost = false;
      this.effects.SkipTurn = false;
      this.effects.SkyDrop = false;
      this.effects.SmackDown = false;
      this.effects.Snatch = false;
      this.effects.SpikyShield = false;
      this.effects.Stockpile = 0;
      this.effects.StockpileDef = 0;
      this.effects.StockpileSpDef = 0;
      this.effects.Taunt = 0;
      this.effects.Torment = false;
      this.effects.Toxic = 0;
      this.effects.Transform = false;
      this.effects.Truant = false;
      this.effects.TwoTurnAttack = 0;
      this.effects.Type3 = undefined;
      this.effects.Unburden = false;
      this.effects.Uproar = 0;
      this.effects.Uturn = false;
      this.effects.WaterSport = false;
      this.effects.WeightChange = 0;
      this.effects.Yawn = 0;
    }

    /**  These effects are always retained even if a Pokémon is replaced */
    initPermanentEffects() {
      this.effects.FutureSight = 0;
      this.effects.FutureSightMove = 0;
      this.effects.FutureSightUser = -1;
      this.effects.FutureSightUserPos = -1;
      this.effects.HealingWish = false;
      this.effects.LunarDance = false;
      this.effects.Wish = 0;
      this.effects.WishAmount = 0;
      this.effects.WishMaker = -1;
    }

    initialize(pokemon: Pokemon.Pokemon, index: number, batonpass: boolean) {
      //Cure status of previous Pokemon with Natural Cure
      if (this.hasAbility(Abilitydex.NATURALCURE)) this.status = Statuses.Healthy;
      // if (this.hasAbility(Abilitydex.REGENERATOR)) this.recoverHP(Math.floor(this.totalhp / 3));
      this.initPokemon(pokemon);
      this.initEffects(batonpass);
    }

    /** Update Pokémon who will gain EXP if this battler is defeated */
    updateParticipants() {
      if (this.isFainted()) return;
      if ($Battle.isOpposing(this.index)) {
        // Just the player Pokémon will gain epx
        for (const battler of this.sides.foe.actives) {
          if (!(battler.index in this.participants) && !$Battle.battlers[battler.index].isFainted()) {
            this.participants.push(battler.index);
          }
        }

      }
    }

    //==================================================================================================================
    //#region Battle Stats and complex accesors
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
      let speed = this._speed;
      speed = Math.floor(speed * STAGE_MULT[this.stages.Speed]);
      let mod = 1;
      mod = Battle.Abilities.SpeedStatEffects(this, mod);
      mod = Battle.Items.SpeedStatEffects(this, mod);
      if (this.sides.own.effects.Tailwind > 0) mod *= 2;
      if (this.sides.own.effects.Swamp) mod = Math.round(mod / 2);
      if (this.status === Statuses.Paralysis && !this.hasAbility(Abilitydex.QUICKFEET)) mod = Math.round(mod / 4);
      speed = Math.round(speed * mod);
      return Math.max(1, speed);
    }

    damage(amt) {
      this._hp -= amt;
      this.hpbar.damage(amt);
      $Battle.recoverHPAnimation(this.index);
      if (this._hp <= 0) {
        this._hp = 0;
        this.faint();
      }
    }

    faint(showMessage = true) {
      if (!this.isFainted()) {
        console.log("!!!***Can't faint with HP greater than 0");
        return true;
      }
      if (this._fainted) {
        console.log("!!!***Can't faint if already fainted");
        return true
      }
      // $Battle.scene.fainted(this);
      this.initEffects(false);

      this.status = 0;
      this.statusCount = 0
      // if (this.pokemon && $Battle.internalbattle) {
      //   this.pokemon.changeHappiness("faint");
      // }
      // if (this.pokemon.isMega()) this.pokemon.makeUnmega();
      // if (this.pokemon.isPrimal()) this.pokemon.makeUnprimal();
      this._fainted = true;

      $Battle.choices[this.index] = undefined;
      this.sides.own.effects.LastRoundFainted = $Battle.turncount;
      if (showMessage) $Battle.showPausedMessage(`${this.name} fainted!`);
      console.log(`[Pokémon fainted] ${this.name} fainted`);
      return true;
    }

    get status() {
      return this._status;
    }

    set status(value: Statuses) {
      if (this._status === Statuses.Sleep && value === Statuses.Healthy) {
        this.effects.Truant = false;
      }
      this._status = value;
      if (this.pokemon) this.pokemon.status = value; // Why?
      if (value !== Statuses.Poison) this.effects.Toxic = 0;
      if (value !== Statuses.Poison && value !== Statuses.Sleep) {
        this.statusCount = 0;
        this.pokemon.statusCount = 0;
      }
    }

    weight(attacker: Battler = undefined) {
      let w = this.pokemon.weightkg || 500;
      if (!attacker || !attacker.hasMoldBreaker()) {
        if (this.hasAbility(Abilitydex.HEAVYMETAL)) w *= 2;
        if (this.hasAbility(Abilitydex.LIGHTMETAL)) w /= 2;
      }
      if (this.hasItem('FLOATSTONE')) w /= 2;
      w *= this.effects.WeightChange;
      w = Math.floor(w);
      if (w < 0) w = 1;
      return w;
    }


    //#endregion
    //==================================================================================================================

    //==================================================================================================================
    //#region Battler info

    get name() {
      if ($Battle.isOpposing(this.index)) {
        if ($Battle.opponent()) return i18n._("the opposing %1", this.nickname);
        return i18n._("the wild %1", this.nickname);
      } else {
        if ($Battle.ownedByPlayer(this.index)) return this.nickname;
        return i18n._("the ally %1", this.nickname);
      }
    }

    hasAbility(ability: Abilitydex, ignorefainted?: boolean) {
      if (this._fainted && !ignorefainted) return false;
      if (this.effects.GastroAcid) return false;
      return this.ability === ability;
    }

    hasAbilityIn(abilities: Abilitydex[]) {
      for (const ability of abilities) {
        if (this.hasAbility(ability)) return true;
      }
      return false;
    }

    hasItem(item: string, ignorefainted?: boolean) {
      if (this._fainted && !ignorefainted) return false;
      if (this.effects.Embargo) return false;
      if ($Battle.field.effects.MagicRoom > 0) return false;
      if (this.hasAbility(Abilitydex.KLUTZ, ignorefainted)) return false;
      return this.item === item;
    }

    hasItemIn(items: string[]) {
      for (const item of items) {
        if (this.hasItem(item)) return true;
      }
      return false;
    }

    hasMove(id: Movedex) {
      for (const move of this.moveset) {
        if (id === move.id) return true;
      }
      return false;
    }

    hasMoveType(type: Types) {
      for (const move of this.moveset) {
        if (move.type === type) return true;
      }
      return false;
    }

    hasMovedThisRound() {
      if (!this.lastRoundMoved) return false;
      return this.lastRoundMoved === $Battle.turncount
    }

    hasMoldBreaker() {
      return this.hasAbilityIn([Abilitydex.MOLDBREAKER, Abilitydex.TERAVOLT, Abilitydex.TURBOBLAZE]);
    }

    hasType(type: Types | string) {
      for (const t of this.types) {
        if (t === type) return true;
      }
      if (this.effects.Type3 && this.effects.Type3 === type) return true;
      return false;
    }

    isFainted() {
      return this.hp <= 0;
    }

    isOpposing(index) {
      for (const foeindex of this.sides.foe.battlers) {
        if (foeindex === index) return true;
      }
      return false;
    }

    /** Check if the Pokémon touch the field. */
    isAirborne(ignoreability: boolean) {
      if (this.hasItem('IRONBAll')) return false;
      if (this.effects.Ingrain || this.effects.SmackDown) return false;
      if ($Battle.field.effects.Gravity) return false;
      if (this.hasType('FLYING') && !this.effects.Roost) return true;
      if (this.hasAbility(Abilitydex.LEVITATE) && !ignoreability) return true;
      if (this.hasItem('AIRBALLOON')) return true;
      if (this.effects.MagnetRise || this.effects.Telekinesis) return true;
      return false;
    }
    //#endregion
    //==================================================================================================================


    //==================================================================================================================
    //#region Status Conditions

    //------------------------------------------------------------------------------------------------------------------
    //#region Sleep
    canSleep(attacker: Battler, showMessages: boolean, move?, ignorestatus?: boolean) {
      if (this.isFainted()) return false;
      let selfSleep = attacker && attacker.index === this.index;
      if (!ignorestatus && this.status === Statuses.Sleep) {
        if (showMessages) $Battle.showMessage(i18n._(`%1 is already asleep!`, this.name));
        return false;
      }
      // user has sustitute or Safeguard
      if (!selfSleep) {
        if (this.status != Statuses.Healthy ||
          (this.effects.Substitute > 0 && (!move || !move.ignoresSubstitute(attacker)))) {
          if (showMessages) $Battle.showMessage(i18n._("But it failed!"));
          return false;
        }

        if (this.sides.own.effects.Safeguard > 0 && (!attacker || !attacker.hasAbility(Abilitydex.INFILTRATOR))) {
          if (showMessages) $Battle.showMessage(i18n._("%1's team is protected by Safeguard!", this.name))
          return false;
        }
      }
      // there are field terrains and user touch the field.
      if (!this.isAirborne(attacker && attacker.hasMoldBreaker())) {
        if ($Battle.field.effects.ElectricTerrain > 0) {
          if (showMessages)
            $Battle.showMessage(i18n._(`The Electric Terrain prevented %1 from falling asleep!`, this.name));
          return false
        } else if ($Battle.field.effects.MistyTerrain > 0) {
          if (showMessages)
            $Battle.showMessage(i18n._(`The Misty Terrain prevented %1 from falling asleep!`, this.name));
          return false
        }
      }
      // uproar
      if ((attacker && attacker.hasMoldBreaker()) || !this.hasAbility(Abilitydex.SOUNDPROOF)) {
        for (const battler of $Battle.actives) {
          if (battler.effects.Uproar > 0) {
            if (showMessages) $Battle.showMessage(i18n._(`But the uproar kept %1 awake!`, this.name));
            return false
          }
        }
      }

      if (!attacker || selfSleep || !attacker.hasMoldBreaker()) {
        if (this.hasAbilityIn([Abilitydex.VITALSPIRIT, Abilitydex.INSOMNIA, Abilitydex.SWEETVEIL]) ||
          (this.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
          [Weathers.SunnyDay, Weathers.HarshSun].contains($Battle.weather)) {
          let msg = `%1 stayed awake using its %2!`;
          if (showMessages) $Battle.showMessage(i18n._(msg, this.name, Abilities.name(this.ability)));
          return false;
        }
        // if this.partner.hasAbility(Abilitydex.SWEETVEIL) ||
        //    (this.partner.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS'))
        //   abilityname=AbilitiesEffetcs.name(this.partner.ability)
        //   $Battle.showMessage(i18n._("%1 stayed awake using its partner's %2!",this.name,abilityname)) if showMessages
        //   return false
        // end
      }
      return true;
    }

    canSleepYawn() {
      if (this.status !== Statuses.Healthy) return false;
      if (!this.hasAbility(Abilitydex.SOUNDPROOF)) {
        for (const battler of $Battle.actives) {
          if (battler.effects.Uproar > 0) return false;
        }
      }
      if (!this.isAirborne(undefined)) {
        if ($Battle.field.effects.ElectricTerrain > 0 || $Battle.field.effects.MistyTerrain > 0) return false;
      }
      if (this.hasAbilityIn([Abilitydex.VITALSPIRIT, Abilitydex.INSOMNIA, Abilitydex.SWEETVEIL]) ||
        (this.hasAbility(Abilitydex.LEAFGUARD) && ($Battle.weather == Weathers.SunnyDay ||
          $Battle.weather == Weathers.HarshSun))) {
        return false;
      }
      // return false if this.partner.this.hasAbility(:SWEETVEIL)
      return true;
    }

    sleep(msg?: string) {
      this.status = Statuses.Sleep;
      this.statusCount = 2 + Math.randomInt(3);
      if (this.hasAbility(Abilitydex.EARLYBIRD)) this.statusCount = Math.floor(this.statusCount / 2);
      // pbCancelMoves()
      // $Battle.pbCommonAnimation("Sleep",self,nil)
      if (msg && msg !== "") $Battle.showMessage(msg);
      else $Battle.showMessage(i18n._("%1 fell asleep!", this.name));
      console.log("[Status change] #{this.name} fell asleep (#{this.statusCount} turns)");
    }

    sleepSelf(duration: number = -1) {
      this.status = Statuses.Sleep;
      if (duration > 0) this.statusCount = duration;
      else this.statusCount = 2 + Math.randomInt(3);
      if (this.hasAbility(Abilitydex.EARLYBIRD)) this.statusCount = Math.floor(this.statusCount / 2);
      // pbCancelMoves
      // $Battle.pbCommonAnimation("Sleep",self,nil)
      console.log("[Status change] #{this.name} made itself fall asleep (#{this.statusCount} turns)")
    }
    //#endregion
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    //#region attrack
    canAttract(attacker, showMessages) {
      if (this.isFainted()) return false;
      if (!attacker || attacker.isFainted()) return false;
      if (this.effects.Attract >= 0) {
        if (showMessages) $Battle.showMessage(i18n._("But it failed!"));
        return false;
      }
      if (attacker.gender === 'N' || this.gender === 'N' || attacker.gender === this.gender) {
        if (showMessages) $Battle.showMessage(i18n._("But it failed!"));
        return false;
      }
      if ((!attacker || !attacker.hasMoldBreaker()) && this.hasAbility(Abilitydex.OBLIVIOUS)) {
        if (showMessages)
          $Battle.showMessage(i18n._("%1's %2 prevents romance!", this.name, Abilities.name(this.ability)));
        return false;
      }
      return true;
    }

    attract(attacker: Battler, showMessage: boolean) {
      this.effects.Attract = attacker.index;
      // $Battle.pbCommonAnimation("Attract", this, null);
      if (showMessage) $Battle.showMessage(i18n._(`%1 fell in love!`, this.name));
      console.log(`[Lingering effect triggered] ${this.name} became infatuated (with ${attacker.name})`);
      if (this.hasItem('DESTINYKNOT') && attacker.canAttract(this, false)) {
        attacker.attract(this, false);
        let msg = `%1's %2 made %3 fall in love!`;
        $Battle.showMessage(i18n._(msg, this.name, Items.name(this.item), attacker.name));
        console.log(`[Item triggered] ${this.name}'s Destiny Knot`);
      }
    }
    //#endregion
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    //#region Poison
    canPoison(attacker: Battler, showMessages: boolean, move?: any) {
      if (this._fainted) return false;
      if (this.status === Statuses.Poison) {
        if (showMessages) $Battle.showMessage(i18n._("%1 is already poisoned.", this.name));
        return false
      }
      if (this.status !== Statuses.Healthy ||
        (this.effects.Substitute > 0 && (!move || !move.ignoresSubstitute(attacker)))) {
        if (showMessages) $Battle.showMessage(i18n._("But it failed!"));
        return false
      }
      if ((this.hasType('POISON') || this.hasType('STEEL')) && !this.hasItem('RINGTARGET')) {
        if (showMessages) $Battle.showMessage(i18n._("It doesn't affect %1...", this.name));
        return false;
      }
      if ($Battle.field.effects.MistyTerrain > 0
        && !this.isAirborne(attacker && attacker.hasMoldBreaker())) {
        let m = "The Misty Terrain prevented %1 from being poisoned!";
        if (showMessages) $Battle.showMessage(i18n._(m, this.name));
        return false;
      }
      if (!attacker || !attacker.hasMoldBreaker()) {
        if (this.hasAbility(Abilitydex.IMMUNITY) || (this.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
          (this.hasAbility(Abilitydex.LEAFGUARD) && ($Battle.weather === Weathers.SunnyDay ||
            $Battle.weather === Weathers.HarshSun))) {
          let m = "%1's %2 prevents poisoning!";
          if (showMessages) $Battle.showMessage(i18n._(m, this.name, Abilities.name(this.ability)));
          return false;
        }

        if (this.partner.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
          let m = "%1's partner's %2 prevents poisoning!";
          if (showMessages) $Battle.showMessage(i18n._(m, this.name, Abilities.name(this.partner.ability)))
          return false;
        }
      }
      if (this.sides.own.effects.Safeguard > 0 &&
        (!attacker || !attacker.hasAbility(Abilitydex.INFILTRATOR))) {
        if (showMessages) $Battle.showMessage(i18n._("%1's team is protected by Safeguard!", this.name));
        return false

      }
      return true;
    }

    canPoisonSynchronize(opponent: Battler) {
      if (this._fainted) return false;
      if ((this.hasType('POISON') || this.hasType('STEEL')) && !this.hasItem('RINGTARGET')) {
        $Battle.showMessage(i18n._("%1's %2 had no effect on %3!",
          opponent.name, Abilities.name(opponent.ability), this.name));
        return false
      }
      if (this.status !== Statuses.Healthy) return false;
      if (this.hasAbility(Abilitydex.IMMUNITY) || (this.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
        (this.hasAbility(Abilitydex.LEAFGUARD) && ($Battle.weather === Weathers.SunnyDay ||
          $Battle.weather === Weathers.HarshSun))) {
        $Battle.showMessage(i18n._("%1's %2 prevents %3's %4 from working!",
          this.name, Abilities.name(this.ability),
          opponent.name, Abilities.name(opponent.ability)))
        return false
      }
      if (this.partner.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
        $Battle.showMessage(i18n._("%1's %2 prevents %3's %4 from working!",
          this.partner.name, Abilities.name(this.partner.ability),
          opponent.name, Abilities.name(opponent.ability)));
        return false;
      }
      return true;

    }

    canPoisonSpikes(moldbreaker?: boolean) {
      if (this._fainted) return false;
      if (this.status !== Statuses.Healthy) return false;
      if (this.hasType('POISON') || this.hasType('STEEL')) return false;
      if (!moldbreaker) {
        if (this.hasAbility(Abilitydex.IMMUNITY) || (this.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
          (this.partner.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS'))) return false;
        if (this.hasAbility(Abilitydex.LEAFGUARD) && ($Battle.weather === Weathers.SunnyDay ||
          $Battle.weather == Weathers.HarshSun)) return false;
      }
      if (this.sides.own.effects.Safeguard > 0) return false
      return true;
    }

    poison(attacker: Battler = undefined, msg: string = undefined, toxic: boolean = false) {
      this.status = Statuses.Poison;
      this.statusCount = toxic ? 1 : 0;
      this.effects.Toxic = 0;
      // $Battle.pbCommonAnimation("Poison",self,nil)
      if (msg && msg !== "") $Battle.showMessage(msg);
      else {
        if (toxic) $Battle.showMessage(i18n._("%1 was badly poisoned!", this.name));
        else $Battle.showMessage(i18n._("%1 was poisoned!", this.name));
      }
      if (toxic) console.log("[Status change] #{this.name} was badly poisoned]");
      else console.log("[Status change] #{this.name} was poisoned");
      if (attacker && this.index !== attacker.index && this.hasAbility(Abilitydex.SYNCHRONIZE)) {
        if (attacker.canPoisonSynchronize(this)) {
          console.log("[Ability triggered] #{this.this.name}'s Synchronize");
          let m = i18n._("%1's %2 poisoned %3!", this.name, Abilities.name(this.ability), attacker.name);
          attacker.poison(undefined, m, toxic);
        }
      }
    }
    //#endregion
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    //#region Paralize
    canParalize(attacker?, opponent?) { }
    paralize(...args) { }
    //#endregion
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    //#region Burn
    /**
     * Check if the Pokémon can be burned.
     * this.param attacker The Attacter Pokémon if exist
     * this.param showMessages Show or not the info messages
     * this.param move the move used
     */
    canBurn(attacker: Battler, showMessages: boolean, move: any = undefined) {
      if (this._fainted) return false;
      if (this.status === Statuses.Burn) {
        if (showMessages) $Battle.showMessage(i18n._("%1 already has a burn.", this.name));
        return false;
      }
      if (this.status !== Statuses.Healthy ||
        (this.effects.Substitute > 0 && (!move || !move.ignoresSubstitute(attacker)))) {
        if (showMessages) $Battle.showMessage(i18n._("But it failed!"));
        return false;
      }
      if ($Battle.field.effects.MistyTerrain > 0 && !this.isAirborne(attacker && attacker.hasMoldBreaker())) {
        if (showMessages) {
          let msg = i18n._("The Misty Terrain prevented %1 from being burned!", this.name);
          $Battle.showMessage(msg);
        }
        return false;
      }
      if (this.hasType('FIRE') && !this.hasItem('RINGTARGET')) {
        if (showMessages) $Battle.showMessage(i18n._("It doesn't affect %1...", this.name));
        return false;
      }
      if (!attacker || !attacker.hasMoldBreaker()) {
        if (this.hasAbility(Abilitydex.WATERVEIL) || (this.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
          (this.hasAbility(Abilitydex.LEAFGUARD) && ($Battle.weather === Weathers.SunnyDay || $Battle.weather === Weathers.HarshSun))) {
          if (showMessages) {
            let msg = i18n._("%1's %2 prevents burns!", this.name, Abilities.name(this.ability));
            $Battle.showMessage(msg);
          }
          return false;
        }
        if (this.partner.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
          if (showMessages) {
            let msg = i18n._("%1's partner's %2 prevents burns!", this.name, Abilities.name(this.partner.ability));
            $Battle.showMessage(msg);
          }
          return false;
        }
      }
      if (this.sides.own.effects.Safeguard > 0 && (!attacker || !attacker.hasAbility(Abilitydex.INFILTRATOR))) {
        if (showMessages) $Battle.showMessage(i18n._("%1's team is protected by Safeguard!", this.name));
        return false;
      }
      return true;
    }

    /**
     * Check if the Pokémon can be **burned** by **Synchronize** ability
     * this.param opponent The ability Pokémon user
     */
    canBurnSynchronize(opponent: Battler) {
      if (this._fainted) return false;
      if (this.status !== Statuses.Healthy) return false;
      if (this.hasType('FIRE') && !this.hasItem('RINGTARGET')) {
        let msg = i18n._("%1's %2 had no effect on %3!", opponent.name, Abilities.name(opponent.ability), this.name);
        $Battle.showMessage(msg);
        return false;
      }
      let text = "%1's %2 prevents %3's %4 from working!";
      let msg = i18n._(text, this.name, Abilities.name(this.ability), opponent.name, Abilities.name(opponent.ability));
      if (this.hasAbility(Abilitydex.WATERVEIL) ||
        (this.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
        (this.hasAbility(Abilitydex.LEAFGUARD) && ($Battle.weather === Weathers.SunnyDay || $Battle.weather == Weathers.HarshSun))) {
        $Battle.showMessage(msg);
        return false;
      }
      if (this.partner.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
        $Battle.showMessage(msg);
        return false;
      }
      return true;
    }


    /**
     * Burn the Pokémon, sets the Pokémon ststaus to burn.
     * this.param attacker the attacker Pokémon if exist
     * this.param msg custom info message
     */
    burn(attacker: Battler = undefined, msg: string = undefined) {
      this.status = Statuses.Burn;
      this.statusCount = 0;
      // $Battle.pbCommonAnimation("Burn",self,nil)
      if (msg && msg != "") $Battle.showMessage(msg);
      else $Battle.showMessage(i18n._("%1 was burned!", this.name))
      console.log("[Status change] #{this.name} was burned");
      if (attacker && this.index !== attacker.index && this.hasAbility(Abilitydex.SYNCHRONIZE)) {
        if (attacker.canBurnSynchronize(this)) {
          console.log("[Ability triggered] #{this.this.name}'s Synchronize")
          let m = i18n._("%1's %2 burned %3!", this.name, Abilities.name(this.ability), attacker.name);
          attacker.burn(undefined, m);
        }
      }
    }
    //#endregion
    //------------------------------------------------------------------------------------------------------------------

    //#endregion
    //==================================================================================================================

    //==================================================================================================================
    //#region Increase stat stages
    tooHigh(stat: Stats) {
      return this.stages[stat] >= 6;
    }

    canIncreaseStatStage(stat: Stats, attacker: Battler = undefined, showMessages = false, move = undefined,
      moldbreaker = false, ignoreContrary = false) {
      if (this._fainted) return false;
      if (!moldbreaker) {
        if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
          if (this.hasAbility(Abilitydex.CONTRARY) && !ignoreContrary) {
            return this.canReduceStatStage(stat, attacker, showMessages, moldbreaker, true)
          }
        }
      }
      if (this.tooHigh(stat)) {
        if (showMessages) $Battle.showMessage(i18n._("%1's %2 won't go any higher!", this.name, Stats.name(stat)));
        return false;
      }
      return true;
    }

    increaseStatBasic(stat: Stats, increment: number, attacker: Battler = undefined,
      moldbreaker = false, ignoreContrary = false) {
      if (!moldbreaker) {
        if (!attacker || attacker.index == this.index || !attacker.hasMoldBreaker()) {
          if (this.hasAbility(Abilitydex.CONTRARY) && !ignoreContrary) {
            return this.reduceStatBasic(stat, increment, attacker, moldbreaker, true)
          }
          if (this.hasAbility(Abilitydex.SIMPLE)) increment *= 2;
        }
      }
      increment = Math.min(increment, 6 - this.stages[stat]); // Why?
      console.log(`[Stat change] ${this.name}'s ${Stats.name(stat)} rose by ${increment} stage(s)`);
      console.log(`${Stats.name(stat)} stage: ${this.stages[stat]} --> ${this.stages[stat] + increment}`);
      this.stages[stat] += increment;
      return increment;
    }

    increaseStat(stat: Stats, increment: number, attacker: Battler, showMessages: boolean,
      move: any = undefined, animation: boolean = true, moldbreaker: boolean = false, ignoreContrary: boolean = false) {
      if (!(stat in Stats)) return false;
      if (!moldbreaker) {
        if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
          if (this.hasAbility(Abilitydex.CONTRARY) && !ignoreContrary) {
            return this.reduceStat(stat, increment, attacker, showMessages, move, animation, moldbreaker, true);
          }
        }
      }
      if (this.canIncreaseStatStage(stat, attacker, showMessages, move, moldbreaker, ignoreContrary)) {
        increment = this.increaseStatBasic(stat, increment, attacker, moldbreaker, ignoreContrary);
        if (increment > 0) {
          if (ignoreContrary) {
            if (animation) $Battle.showMessage(i18n._("%1's %2 activated!", this.name, Abilities.name(this.ability)));
          }
          // if (animation) $Battle.pbCommonAnimation("StatUp",self,nil);
          let texts = [
            i18n._("%1's %2 rose!", this.name, Stats.name(stat)),
            i18n._("%1's %2 rose sharply!", this.name, Stats.name(stat)),
            i18n._("%1's %2 rose drastically!", this.name, Stats.name(stat))]
          if (showMessages) $Battle.showMessage(texts[Math.min(increment - 1, 2)]);
          return true
        }
      }
      return false;
    }

    increaseStatWithCause(stat: Stats, increment: number, attacker: Battler, cause: string, showanim = true,
      showMessages = true, moldbreaker = false, ignoreContrary = false) {
      if (!(stat in Stats)) return false;
      if (!moldbreaker) {
        if (!attacker || attacker.index == this.index || !attacker.hasMoldBreaker()) {
          if (this.hasAbility(Abilitydex.CONTRARY) && !ignoreContrary) {
            return this.reduceStatWithCause(stat, increment, attacker, cause, showanim, showMessages, moldbreaker, true);
          }
        }
      }
      if (this.canIncreaseStatStage(stat, attacker, false, undefined, moldbreaker, ignoreContrary)) {
        increment = this.increaseStatBasic(stat, increment, attacker, moldbreaker, ignoreContrary);
        if (increment > 0) {

          if (ignoreContrary) {
            if (showMessages) $Battle.showMessage(i18n._("%1's %2 activated!", this.name, Abilities.name(this.ability)))
          }
          // if (showanim) $Battle.pbCommonAnimation("StatUp",self,nil)
          let texts = [];
          if (attacker.index === this.index) {
            texts = [
              i18n._("%1's %2 raised its %3!", this.name, cause, Stats.name(stat)),
              i18n._("%1's %2 sharply raised its %3!", this.name, cause, Stats.name(stat)),
              i18n._("%1's %2 went way up!", this.name, Stats.name(stat))
            ]
          }
          else {
            texts = [
              i18n._("%1's %2 raised %3's %4!", attacker.name, cause, this.name, Stats.name(stat)),
              i18n._("%1's %2 sharply raised %3's %4!", attacker.name, cause, this.name, Stats.name(stat)),
              i18n._("%1's %2 drastically raised %3's %4!", attacker.name, cause, this.name, Stats.name(stat))
            ]
          }
          if (showMessages) $Battle.showMessage(texts[Math.min(increment - 1, 2)]);
          return true;
        }
      }
      return false;
    }

    //#endregion
    //==================================================================================================================

    //==================================================================================================================
    //#region Decrease stat stages
    tooLow(stat: Stats) {
      return this.stages[stat] <= -6;
    }

    /**
     * Check if can decrease the stat stage
     *
     * Tickle (04A) and Noble Roar (13A) can't use this, but replicate it instead.
     * (Reason is they lowers more than 1 stat independently, and therefore could
     * show certain messages twice which is undesirable.)
     * this.param stat The stat to check
     * this.param attacker The Attacker pokémon
     * this.param showMessages Show Info messages
     * this.param move The move used
     * this.param moldbreaker
     * this.param ignoreContrary
     */
    canReduceStatStage(stat: Stats, attacker: Battler = undefined, showMessages = false, move: any = undefined,
      moldbreaker = false, ignoreContrary = false) {
      if (this._fainted) return false;
      if (!moldbreaker) {
        if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
          if (this.hasAbility(Abilitydex.CONTRARY) && !ignoreContrary) {
            return this.canIncreaseStatStage(stat, attacker, showMessages, move, moldbreaker, true)
          }
        }
      }
      let selfreduce = attacker && attacker.index === this.index;
      if (!selfreduce) {
        if (this.effects.Substitute > 0 && (!move || !move.ignoresSubstitute(attacker))) {
          if (showMessages) $Battle.showMessage(i18n._("But it failed!"));
          return false;
        }
        if (this.sides.own.effects.Mist > 0 && (!attacker || !attacker.hasAbility(Abilitydex.INFILTRATOR))) {
          if (showMessages) $Battle.showMessage(i18n._("%1 is protected by Mist!", this.name));
          return false;
        }
        if (!moldbreaker && (!attacker || !attacker.hasMoldBreaker())) {
          if (this.hasAbilityIn([Abilitydex.CLEARBODY, Abilitydex.WHITESMOKE])) {
            if (showMessages) {
              let msg = "%1's %2 prevents stat loss!";
              $Battle.showMessage(i18n._(msg, this.name, Abilities.name(this.ability)));
            }
            return false;
          }
          if (this.hasType('GRASS')) {
            if (this.hasAbility(Abilitydex.FLOWERVEIL)) {
              if (showMessages) {
                let msg = "%1's %2 prevents stat loss!";
                $Battle.showMessage(i18n._(msg, this.name, Abilities.name(this.ability)));
              }
              return false;
            }
            else if (this.partner.hasAbility(Abilitydex.FLOWERVEIL)) {
              if (showMessages) {
                let msg = "%1's %2 prevents %3's stat loss!";
                $Battle.showMessage(i18n._(msg, this.partner.name, Abilities.name(this.ability), this.name));
              }
              return false;
            }
          }
          if (stat === Stats.Attack && this.hasAbility(Abilitydex.HYPERCUTTER)) {
            if (showMessages) {
              let msg = "%1's %2 prevents Attack loss!";
              $Battle.showMessage(i18n._(msg, this.name, Abilities.name(this.ability)));
            }
            return false;
          }
          if (stat === Stats.Defense && this.hasAbility(Abilitydex.BIGPECKS)) {
            if (showMessages) {
              let msg = "%1's %2 prevents Defence loss!";
              $Battle.showMessage(i18n._(msg, this.name, Abilities.name(this.ability)));
            }
            return false;
          }
          if (stat === Stats.Accuracy && this.hasAbility(Abilitydex.KEENEYE)) {
            if (showMessages) {
              let msg = "%1's %2 prevents Accuracy loss!";
              $Battle.showMessage(i18n._(msg, this.name, Abilities.name(this.ability)));
            }
            return false;
          }
        }
      }
      if (this.tooLow(stat)) {
        if (showMessages) $Battle.showMessage(i18n._("%1's %2 won't go any lower!", this.name, Stats.name(stat)));
        return false;
      }
      return true;
    }

    reduceStatBasic(stat: Stats, increment: number, attacker: Battler = undefined,
      moldbreaker = false, ignoreContrary = false) {
      // moldbreaker is true only when Roar forces out a Pokémon into Sticky Web
      if (!moldbreaker) {
        if (!attacker || attacker.index == this.index || !attacker.hasMoldBreaker()) {
          if (this.hasAbility(Abilitydex.CONTRARY) && !ignoreContrary) {
            return this.increaseStatBasic(stat, increment, attacker, moldbreaker, true);
          }
          if (this.hasAbility(Abilitydex.SIMPLE)) increment *= 2;
        }
      }
      increment = Math.min(increment, 6 + this.stages[stat]);
      console.log(`[Stat change] ${this.name}'s ${Stats.name(stat)} fell by ${increment} stage(s)`);
      console.log(`${Stats.name(stat)} stage: ${this.stages[stat]} --> ${this.stages[stat] - increment}`)
      this.stages[stat] -= increment;
      return increment;
    }

    reduceStat(stat: Stats, increment: number, attacker: Battler, showMessages: boolean,
      move: any = undefined, downanim = true, moldbreaker = false, ignoreContrary = false) {
      if (!(stat in Stats)) return false;
      if (!moldbreaker) {

        if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
          if (this.hasAbility(Abilitydex.CONTRARY) && !ignoreContrary) {
            return this.increaseStat(stat, increment, attacker, showMessages, move, downanim, moldbreaker, true)
          }
        }
      }
      if (this.canReduceStatStage(stat, attacker, showMessages, move, moldbreaker, ignoreContrary)) {
        increment = this.reduceStatBasic(stat, increment, attacker, moldbreaker, ignoreContrary)
        if (increment > 0) {
          if (ignoreContrary) {
            if (downanim) $Battle.showMessage(i18n._("%1's %2 activated!", this.name, Abilities.name(this.ability)));
          }
          // $Battle.pbCommonAnimation("StatDown",self,nil) if downanim
          let texts = [
            i18n._("%1's %2 fell!", this.name, Stats.name(stat)),
            i18n._("%1's %2 harshly fell!", this.name, Stats.name(stat)),
            i18n._("%1's %2 severely fell!", this.name, Stats.name(stat))]
          if (showMessages) $Battle.showMessage(texts[Math.min(increment - 1, 2)])
          // Defiant
          if (this.hasAbility(Abilitydex.DEFIANT) && (!attacker || attacker.isOpposing(this.index))) {
            this.increaseStatWithCause(Stats.Attack, 2, this, Abilities.name(this.ability));
          }
          // Competitive
          if (this.hasAbility(Abilitydex.COMPETITIVE) && (!attacker || attacker.isOpposing(this.index))) {
            this.increaseStatWithCause(Stats.SpAtk, 2, this, Abilities.name(this.ability))
          }
          return true;
        }
      }
      return false;
    }

    reduceStatWithCause(stat: Stats, increment: number, attacker: Battler, cause: string,
      showanim = true, showMessages = true, moldbreaker = false, ignoreContrary = false) {
      if (!(stat in Stats)) return false;
      if (!moldbreaker) {
        if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
          if (this.hasAbility(Abilitydex.CONTRARY) && !ignoreContrary) {
            return this.increaseStatWithCause(stat, increment, attacker, cause, showanim, showMessages, moldbreaker, true);
          }
        }
      }
      if (this.canReduceStatStage(stat, attacker, false, undefined, moldbreaker, ignoreContrary)) {
        increment = this.reduceStatBasic(stat, increment, attacker, moldbreaker, ignoreContrary);
        if (increment > 0) {
          if (ignoreContrary) {

            if (showMessages) $Battle.showMessage(i18n._("%1's %2 activated!", this.name, Abilities.name(this.ability)));
          }
          // if (showanim) $Battle.pbCommonAnimation("StatDown",self,nil)
          let texts = [];
          if (attacker.index === this.index) {

            texts = [
              i18n._("%1's %2 lowered its %3!", this.name, cause, Stats.name(stat)),
              i18n._("%1's %2 harshly lowered its %3!", this.name, cause, Stats.name(stat)),
              i18n._("%1's %2 severely lowered its %3!", this.name, cause, Stats.name(stat))
            ]
          }
          else {
            texts = [
              i18n._("%1's %2 lowered %3's %4!", attacker.name, cause, this.name, Stats.name(stat)),
              i18n._("%1's %2 harshly lowered %3's %4!", attacker.name, cause, this.name, Stats.name(stat)),
              i18n._("%1's %2 severely lowered %3's %4!", attacker.name, cause, this.name, Stats.name(stat))
            ]
          }
          if (showMessages) $Battle.showMessage(texts[Math.min(increment - 1, 2)]);
          // Defiant
          if (this.hasAbility(Abilitydex.DEFIANT) && (!attacker || attacker.isOpposing(this.index))) {
            this.increaseStatWithCause(Stats.Attack, 2, this, Abilities.name(this.ability));
          }
          // Competitive
          if (this.hasAbility(Abilitydex.COMPETITIVE) && (!attacker || attacker.isOpposing(this.index))) {
            this.increaseStatWithCause(Stats.SpAtk, 2, this, Abilities.name(this.ability))
          }
          return true
        }
      }
      return false;
    }

    reduceAttackStatIntimidate(opponent: Battler) {
      if (this._fainted) return false;
      if (this.effects.Substitute > 0) {
        let msg = "%1's substitute protected it from %2's %3!";
        $Battle.showMessage(i18n._(msg, this.name, opponent.name, Abilities.name(opponent.ability)))
        return false;
      }
      if (!opponent.hasAbility(Abilitydex.CONTRARY)) {
        if (this.sides.own.effects.Mist > 0) {
          let msg = "%1 is protected from %2's %3 by Mist!";
          $Battle.showMessage(i18n._(msg, this.name, opponent.name, Abilities.name(opponent.ability)))
          return false;
        }
        if (this.hasAbilityIn([Abilitydex.CLEARBODY, Abilitydex.WHITESMOKE, Abilitydex.HYPERCUTTER]) || (this.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS'))) {
          let msg = "%1's %2 prevented %3's %4 from working!";
          $Battle.showMessage(i18n._(msg, this.name, Abilities.name(this.ability),
            opponent.name, Abilities.name(opponent.ability)))
          return false;
        }
        if (this.partner.hasAbility(Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
          let msg = "%1's %2 prevented %3's %4 from working!";
          $Battle.showMessage(i18n._(msg, this.partner.name, Abilities.name(this.partner.ability),
            opponent.name, Abilities.name(opponent.ability)))
          return false
        }
      }
      return this.reduceStatWithCause(Stats.Attack, 1, opponent, Abilities.name(opponent.ability))
    }


    //#endregion
    //==================================================================================================================


    reduceHP(...args) {
      return 0;
    }

    recoverHP(...arg) {
      return 0;
    }


    get partner() {
      return this;
    }

    cureStatus(...args) {
      throw Error('Not Implemented');
    }
    cureConfusion(...args) {
      throw Error('Not Implemented');
    }
    cureAttract(...args) {
      throw Error('Not Implemented');
    }


    //==================================================================================================================
    // Held item effects
    //==================================================================================================================
    consumeItem(recycle = true, pickup = true) {
      let itemname = Items.name(this.item);
      if (recycle) this.pokemon.itemRecycle = this.item
      if (this.pokemon.itemInitial == this.item) this.pokemon.itemInitial = undefined;
      if (pickup) {

        this.effects.PickupItem = this.item
        this.effects.PickupUse = $Battle.nextPickupUse()
      }
      this.item = undefined;
      this.effects.Unburden = true;
      // Symbiosis
      // if pbPartner && pbPartner.hasWorkingAbility(:SYMBIOSIS) && recycle
      //   if pbPartner.item>0 &&
      //      !$Battle.isUnlosableItem(this.partner(),pbPartner.item) &&
      //      !$Battle.isUnlosableItem(self,pbPartner.item)
      //     $Battle.pbDisplay(_INTL("{1}'s {2} let it share its {3} with {4}!",
      //        pbPartner.pbThis,PBAbilities.getName(pbPartner.ability),
      //        Items.name(pbPartner.item),pbThis(true)));
      //     this.item=pbPartner.item
      //     pbPartner.item=0
      //     pbPartner.effects.Unburden=true
      //     pbBerryCureCheck
      //   end
      // end
    }




  }
}
