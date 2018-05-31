var PE;
(function(PE) {
  var Battle;
  (function(Battle) {
    var STAGE_MULT = {
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
      '6': 4
    };
    var Battler = /** @class */ (function() {
      // partner: Battler;
      function Battler(pokemon, index) {
        this.pokemon = pokemon;
        this.index = index;
        this._hp = 0;
        this._totalHP = 0;
        this._fainted = false;
        this._captured = false;
        this.sides = {own: undefined, foe: undefined};
        this._hp = 0;
        this._totalHP = 0;
        this._fainted = true;
        this._captured = false;
        this.damageState = new Battle.DamageState();
        this.effects = {};
        this.stages = {};
        this.initPokemon(pokemon);
        this.initEffects(false);
        this.initPermanentEffects();
      }
      Battler.prototype.initPokemon = function(pokemon) {
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
      };
      Battler.prototype.initEffects = function(batonpass) {
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
          for (var _i = 0, _a = $Battle.actives; _i < _a.length; _i++) {
            var battler = _a[_i];
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
            var aux = this.attack;
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
        for (var _b = 0, _c = $Battle.actives; _b < _c.length; _b++) {
          var battler = _c[_b];
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
        for (var _d = 0, _e = $Battle.actives; _d < _e.length; _d++) {
          var battler = _e[_d];
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
        for (var _f = 0, _g = $Battle.actives; _f < _g.length; _f++) {
          var battler = _g[_f];
          if (battler.effects.MultiTurnUser === this.index) {
            battler.effects.MultiTurn = 0;
            battler.effects.MultiTurnUser = -1;
          }
        }
        this.effects.Nightmare = false;
        this.effects.Outrage = 0;
        this.effects.ParentalBond = 0;
        this.effects.PickupItem = '';
        this.effects.PickupUse = '';
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
      };
      /**  These effects are always retained even if a Pokémon is replaced */
      Battler.prototype.initPermanentEffects = function() {
        this.effects.FutureSight = 0;
        this.effects.FutureSightMove = 0;
        this.effects.FutureSightUser = -1;
        this.effects.FutureSightUserPos = -1;
        this.effects.HealingWish = false;
        this.effects.LunarDance = false;
        this.effects.Wish = 0;
        this.effects.WishAmount = 0;
        this.effects.WishMaker = -1;
      };
      Battler.prototype.initialize = function(pokemon, index, batonpass) {
        //Cure status of previous Pokemon with Natural Cure
        if (this.hasAbility(PE.Abilitydex.NATURALCURE)) this.status = PE.Statuses.Healthy;
        // if (this.hasAbility(Abilitydex.REGENERATOR)) this.recoverHP(Math.floor(this.totalhp / 3));
        this.initPokemon(pokemon);
        this.initEffects(batonpass);
      };
      /** Update Pokémon who will gain EXP if this battler is defeated */
      Battler.prototype.updateParticipants = function() {
        if (this.isFainted()) return;
        if ($Battle.isOpposing(this.index)) {
          // Just the player Pokémon will gain epx
          for (var _i = 0, _a = this.sides.foe.actives; _i < _a.length; _i++) {
            var battler = _a[_i];
            if (!(battler.index in this.participants) && !$Battle.battlers[battler.index].isFainted()) {
              this.participants.push(battler.index);
            }
          }
        }
      };
      Object.defineProperty(Battler.prototype, 'hp', {
        //==================================================================================================================
        //#region Battle Stats and complex accesors
        get: function() {
          return this._hp;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Battler.prototype, 'attack', {
        get: function() {
          return this._attack;
        },
        set: function(value) {
          this._attack = value;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Battler.prototype, 'defense', {
        get: function() {
          return this._defense;
        },
        set: function(value) {
          this._defense = value;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Battler.prototype, 'spatk', {
        get: function() {
          return this._spatk;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Battler.prototype, 'spdef', {
        get: function() {
          return this._spdef;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Battler.prototype, 'speed', {
        get: function() {
          var speed = this._speed;
          speed = Math.floor(speed * STAGE_MULT[this.stages.Speed]);
          var mod = 1;
          mod = Battle.Abilities.SpeedStatEffects(this, mod);
          mod = Battle.Items.SpeedStatEffects(this, mod);
          if (this.sides.own.effects.Tailwind > 0) mod *= 2;
          if (this.sides.own.effects.Swamp) mod = Math.round(mod / 2);
          if (this.status === PE.Statuses.Paralysis && !this.hasAbility(PE.Abilitydex.QUICKFEET))
            mod = Math.round(mod / 4);
          speed = Math.round(speed * mod);
          return Math.max(1, speed);
        },
        enumerable: true,
        configurable: true
      });
      Battler.prototype.damage = function(amt) {
        this._hp -= amt;
        this.hpbar.damage(amt);
        $Battle.recoverHPAnimation(this.index);
        if (this._hp <= 0) {
          this._hp = 0;
          this.faint();
        }
      };
      Battler.prototype.faint = function(showMessage) {
        if (showMessage === void 0) {
          showMessage = true;
        }
        if (!this.isFainted()) {
          console.log("!!!***Can't faint with HP greater than 0");
          return true;
        }
        if (this._fainted) {
          console.log("!!!***Can't faint if already fainted");
          return true;
        }
        // $Battle.scene.fainted(this);
        this.initEffects(false);
        this.status = 0;
        this.statusCount = 0;
        // if (this.pokemon && $Battle.internalbattle) {
        //   this.pokemon.changeHappiness("faint");
        // }
        // if (this.pokemon.isMega()) this.pokemon.makeUnmega();
        // if (this.pokemon.isPrimal()) this.pokemon.makeUnprimal();
        this._fainted = true;
        $Battle.choices[this.index] = undefined;
        this.sides.own.effects.LastRoundFainted = $Battle.turncount;
        if (showMessage) $Battle.showPausedMessage(this.name + ' fainted!');
        console.log('[Pok\u00E9mon fainted] ' + this.name + ' fainted');
        return true;
      };
      Object.defineProperty(Battler.prototype, 'status', {
        get: function() {
          return this._status;
        },
        set: function(value) {
          if (this._status === PE.Statuses.Sleep && value === PE.Statuses.Healthy) {
            this.effects.Truant = false;
          }
          this._status = value;
          if (this.pokemon) this.pokemon.status = value; // Why?
          if (value !== PE.Statuses.Poison) this.effects.Toxic = 0;
          if (value !== PE.Statuses.Poison && value !== PE.Statuses.Sleep) {
            this.statusCount = 0;
            this.pokemon.statusCount = 0;
          }
        },
        enumerable: true,
        configurable: true
      });
      Battler.prototype.weight = function(attacker) {
        if (attacker === void 0) {
          attacker = undefined;
        }
        var w = this.pokemon.weightkg || 500;
        if (!attacker || !attacker.hasMoldBreaker()) {
          if (this.hasAbility(PE.Abilitydex.HEAVYMETAL)) w *= 2;
          if (this.hasAbility(PE.Abilitydex.LIGHTMETAL)) w /= 2;
        }
        if (this.hasItem('FLOATSTONE')) w /= 2;
        w *= this.effects.WeightChange;
        w = Math.floor(w);
        if (w < 0) w = 1;
        return w;
      };
      Object.defineProperty(Battler.prototype, 'name', {
        //#endregion
        //==================================================================================================================
        //==================================================================================================================
        //#region Battler info
        get: function() {
          if ($Battle.isOpposing(this.index)) {
            if ($Battle.opponent()) return i18n._('the opposing %1', this.nickname);
            return i18n._('the wild %1', this.nickname);
          } else {
            if ($Battle.ownedByPlayer(this.index)) return this.nickname;
            return i18n._('the ally %1', this.nickname);
          }
        },
        enumerable: true,
        configurable: true
      });
      Battler.prototype.hasAbility = function(ability, ignorefainted) {
        if (this._fainted && !ignorefainted) return false;
        if (this.effects.GastroAcid) return false;
        return this.ability === ability;
      };
      Battler.prototype.hasAbilityIn = function(abilities) {
        for (var _i = 0, abilities_1 = abilities; _i < abilities_1.length; _i++) {
          var ability = abilities_1[_i];
          if (this.hasAbility(ability)) return true;
        }
        return false;
      };
      Battler.prototype.hasItem = function(item, ignorefainted) {
        if (this._fainted && !ignorefainted) return false;
        if (this.effects.Embargo) return false;
        if ($Battle.field.effects.MagicRoom > 0) return false;
        if (this.hasAbility(PE.Abilitydex.KLUTZ, ignorefainted)) return false;
        return this.item === item;
      };
      Battler.prototype.hasItemIn = function(items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
          var item = items_1[_i];
          if (this.hasItem(item)) return true;
        }
        return false;
      };
      Battler.prototype.hasMove = function(id) {
        for (var _i = 0, _a = this.moveset; _i < _a.length; _i++) {
          var move = _a[_i];
          if (id === move.id) return true;
        }
        return false;
      };
      Battler.prototype.hasMoveType = function(type) {
        for (var _i = 0, _a = this.moveset; _i < _a.length; _i++) {
          var move = _a[_i];
          if (move.type === type) return true;
        }
        return false;
      };
      Battler.prototype.hasMovedThisRound = function() {
        if (!this.lastRoundMoved) return false;
        return this.lastRoundMoved === $Battle.turncount;
      };
      Battler.prototype.hasMoldBreaker = function() {
        return this.hasAbilityIn([PE.Abilitydex.MOLDBREAKER, PE.Abilitydex.TERAVOLT, PE.Abilitydex.TURBOBLAZE]);
      };
      Battler.prototype.hasType = function(type) {
        for (var _i = 0, _a = this.types; _i < _a.length; _i++) {
          var t = _a[_i];
          if (t === type) return true;
        }
        if (this.effects.Type3 && this.effects.Type3 === type) return true;
        return false;
      };
      Battler.prototype.isFainted = function() {
        return this.hp <= 0;
      };
      Battler.prototype.isOpposing = function(index) {
        for (var _i = 0, _a = this.sides.foe.battlers; _i < _a.length; _i++) {
          var foeindex = _a[_i];
          if (foeindex === index) return true;
        }
        return false;
      };
      /** Check if the Pokémon touch the field. */
      Battler.prototype.isAirborne = function(ignoreability) {
        if (this.hasItem('IRONBAll')) return false;
        if (this.effects.Ingrain || this.effects.SmackDown) return false;
        if ($Battle.field.effects.Gravity) return false;
        if (this.hasType('FLYING') && !this.effects.Roost) return true;
        if (this.hasAbility(PE.Abilitydex.LEVITATE) && !ignoreability) return true;
        if (this.hasItem('AIRBALLOON')) return true;
        if (this.effects.MagnetRise || this.effects.Telekinesis) return true;
        return false;
      };
      //#endregion
      //==================================================================================================================
      //==================================================================================================================
      //#region Status Conditions
      //------------------------------------------------------------------------------------------------------------------
      //#region Sleep
      Battler.prototype.canSleep = function(attacker, showMessages, move, ignorestatus) {
        if (this.isFainted()) return false;
        var selfSleep = attacker && attacker.index === this.index;
        if (!ignorestatus && this.status === PE.Statuses.Sleep) {
          if (showMessages) $Battle.showMessage(i18n._('%1 is already asleep!', this.name));
          return false;
        }
        // user has sustitute or Safeguard
        if (!selfSleep) {
          if (
            this.status != PE.Statuses.Healthy ||
            (this.effects.Substitute > 0 && (!move || !move.ignoresSubstitute(attacker)))
          ) {
            if (showMessages) $Battle.showMessage(i18n._('But it failed!'));
            return false;
          }
          if (this.sides.own.effects.Safeguard > 0 && (!attacker || !attacker.hasAbility(PE.Abilitydex.INFILTRATOR))) {
            if (showMessages) $Battle.showMessage(i18n._("%1's team is protected by Safeguard!", this.name));
            return false;
          }
        }
        // there are field terrains and user touch the field.
        if (!this.isAirborne(attacker && attacker.hasMoldBreaker())) {
          if ($Battle.field.effects.ElectricTerrain > 0) {
            if (showMessages)
              $Battle.showMessage(i18n._('The Electric Terrain prevented %1 from falling asleep!', this.name));
            return false;
          } else if ($Battle.field.effects.MistyTerrain > 0) {
            if (showMessages)
              $Battle.showMessage(i18n._('The Misty Terrain prevented %1 from falling asleep!', this.name));
            return false;
          }
        }
        // uproar
        if ((attacker && attacker.hasMoldBreaker()) || !this.hasAbility(PE.Abilitydex.SOUNDPROOF)) {
          for (var _i = 0, _a = $Battle.actives; _i < _a.length; _i++) {
            var battler = _a[_i];
            if (battler.effects.Uproar > 0) {
              if (showMessages) $Battle.showMessage(i18n._('But the uproar kept %1 awake!', this.name));
              return false;
            }
          }
        }
        if (!attacker || selfSleep || !attacker.hasMoldBreaker()) {
          if (
            this.hasAbilityIn([PE.Abilitydex.VITALSPIRIT, PE.Abilitydex.INSOMNIA, PE.Abilitydex.SWEETVEIL]) ||
            (this.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
            [PE.Weathers.SunnyDay, PE.Weathers.HarshSun].contains($Battle.weather)
          ) {
            var msg = '%1 stayed awake using its %2!';
            if (showMessages) $Battle.showMessage(i18n._(msg, this.name, Battle.Abilities.name(this.ability)));
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
      };
      Battler.prototype.canSleepYawn = function() {
        if (this.status !== PE.Statuses.Healthy) return false;
        if (!this.hasAbility(PE.Abilitydex.SOUNDPROOF)) {
          for (var _i = 0, _a = $Battle.actives; _i < _a.length; _i++) {
            var battler = _a[_i];
            if (battler.effects.Uproar > 0) return false;
          }
        }
        if (!this.isAirborne(undefined)) {
          if ($Battle.field.effects.ElectricTerrain > 0 || $Battle.field.effects.MistyTerrain > 0) return false;
        }
        if (
          this.hasAbilityIn([PE.Abilitydex.VITALSPIRIT, PE.Abilitydex.INSOMNIA, PE.Abilitydex.SWEETVEIL]) ||
          (this.hasAbility(PE.Abilitydex.LEAFGUARD) &&
            ($Battle.weather == PE.Weathers.SunnyDay || $Battle.weather == PE.Weathers.HarshSun))
        ) {
          return false;
        }
        // return false if this.partner.this.hasAbility(:SWEETVEIL)
        return true;
      };
      Battler.prototype.sleep = function(msg) {
        this.status = PE.Statuses.Sleep;
        this.statusCount = 2 + Math.randomInt(3);
        if (this.hasAbility(PE.Abilitydex.EARLYBIRD)) this.statusCount = Math.floor(this.statusCount / 2);
        // pbCancelMoves()
        // $Battle.pbCommonAnimation("Sleep",self,nil)
        if (msg && msg !== '') $Battle.showMessage(msg);
        else $Battle.showMessage(i18n._('%1 fell asleep!', this.name));
        console.log('[Status change] #{this.name} fell asleep (#{this.statusCount} turns)');
      };
      Battler.prototype.sleepSelf = function(duration) {
        if (duration === void 0) {
          duration = -1;
        }
        this.status = PE.Statuses.Sleep;
        if (duration > 0) this.statusCount = duration;
        else this.statusCount = 2 + Math.randomInt(3);
        if (this.hasAbility(PE.Abilitydex.EARLYBIRD)) this.statusCount = Math.floor(this.statusCount / 2);
        // pbCancelMoves
        // $Battle.pbCommonAnimation("Sleep",self,nil)
        console.log('[Status change] #{this.name} made itself fall asleep (#{this.statusCount} turns)');
      };
      //#endregion
      //------------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------------
      //#region attrack
      Battler.prototype.canAttract = function(attacker, showMessages) {
        if (this.isFainted()) return false;
        if (!attacker || attacker.isFainted()) return false;
        if (this.effects.Attract >= 0) {
          if (showMessages) $Battle.showMessage(i18n._('But it failed!'));
          return false;
        }
        if (attacker.gender === 'N' || this.gender === 'N' || attacker.gender === this.gender) {
          if (showMessages) $Battle.showMessage(i18n._('But it failed!'));
          return false;
        }
        if ((!attacker || !attacker.hasMoldBreaker()) && this.hasAbility(PE.Abilitydex.OBLIVIOUS)) {
          if (showMessages)
            $Battle.showMessage(i18n._("%1's %2 prevents romance!", this.name, Battle.Abilities.name(this.ability)));
          return false;
        }
        return true;
      };
      Battler.prototype.attract = function(attacker, showMessage) {
        this.effects.Attract = attacker.index;
        // $Battle.pbCommonAnimation("Attract", this, null);
        if (showMessage) $Battle.showMessage(i18n._('%1 fell in love!', this.name));
        console.log('[Lingering effect triggered] ' + this.name + ' became infatuated (with ' + attacker.name + ')');
        if (this.hasItem('DESTINYKNOT') && attacker.canAttract(this, false)) {
          attacker.attract(this, false);
          var msg = "%1's %2 made %3 fall in love!";
          $Battle.showMessage(i18n._(msg, this.name, Battle.Items.name(this.item), attacker.name));
          console.log('[Item triggered] ' + this.name + "'s Destiny Knot");
        }
      };
      //#endregion
      //------------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------------
      //#region Poison
      Battler.prototype.canPoison = function(attacker, showMessages, move) {
        if (this._fainted) return false;
        if (this.status === PE.Statuses.Poison) {
          if (showMessages) $Battle.showMessage(i18n._('%1 is already poisoned.', this.name));
          return false;
        }
        if (
          this.status !== PE.Statuses.Healthy ||
          (this.effects.Substitute > 0 && (!move || !move.ignoresSubstitute(attacker)))
        ) {
          if (showMessages) $Battle.showMessage(i18n._('But it failed!'));
          return false;
        }
        if ((this.hasType('POISON') || this.hasType('STEEL')) && !this.hasItem('RINGTARGET')) {
          if (showMessages) $Battle.showMessage(i18n._("It doesn't affect %1...", this.name));
          return false;
        }
        if ($Battle.field.effects.MistyTerrain > 0 && !this.isAirborne(attacker && attacker.hasMoldBreaker())) {
          var m = 'The Misty Terrain prevented %1 from being poisoned!';
          if (showMessages) $Battle.showMessage(i18n._(m, this.name));
          return false;
        }
        if (!attacker || !attacker.hasMoldBreaker()) {
          if (
            this.hasAbility(PE.Abilitydex.IMMUNITY) ||
            (this.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
            (this.hasAbility(PE.Abilitydex.LEAFGUARD) &&
              ($Battle.weather === PE.Weathers.SunnyDay || $Battle.weather === PE.Weathers.HarshSun))
          ) {
            var m = "%1's %2 prevents poisoning!";
            if (showMessages) $Battle.showMessage(i18n._(m, this.name, Battle.Abilities.name(this.ability)));
            return false;
          }
          if (this.partner.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
            var m = "%1's partner's %2 prevents poisoning!";
            if (showMessages) $Battle.showMessage(i18n._(m, this.name, Battle.Abilities.name(this.partner.ability)));
            return false;
          }
        }
        if (this.sides.own.effects.Safeguard > 0 && (!attacker || !attacker.hasAbility(PE.Abilitydex.INFILTRATOR))) {
          if (showMessages) $Battle.showMessage(i18n._("%1's team is protected by Safeguard!", this.name));
          return false;
        }
        return true;
      };
      Battler.prototype.canPoisonSynchronize = function(opponent) {
        if (this._fainted) return false;
        if ((this.hasType('POISON') || this.hasType('STEEL')) && !this.hasItem('RINGTARGET')) {
          $Battle.showMessage(
            i18n._("%1's %2 had no effect on %3!", opponent.name, Battle.Abilities.name(opponent.ability), this.name)
          );
          return false;
        }
        if (this.status !== PE.Statuses.Healthy) return false;
        if (
          this.hasAbility(PE.Abilitydex.IMMUNITY) ||
          (this.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
          (this.hasAbility(PE.Abilitydex.LEAFGUARD) &&
            ($Battle.weather === PE.Weathers.SunnyDay || $Battle.weather === PE.Weathers.HarshSun))
        ) {
          $Battle.showMessage(
            i18n._(
              "%1's %2 prevents %3's %4 from working!",
              this.name,
              Battle.Abilities.name(this.ability),
              opponent.name,
              Battle.Abilities.name(opponent.ability)
            )
          );
          return false;
        }
        if (this.partner.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
          $Battle.showMessage(
            i18n._(
              "%1's %2 prevents %3's %4 from working!",
              this.partner.name,
              Battle.Abilities.name(this.partner.ability),
              opponent.name,
              Battle.Abilities.name(opponent.ability)
            )
          );
          return false;
        }
        return true;
      };
      Battler.prototype.canPoisonSpikes = function(moldbreaker) {
        if (this._fainted) return false;
        if (this.status !== PE.Statuses.Healthy) return false;
        if (this.hasType('POISON') || this.hasType('STEEL')) return false;
        if (!moldbreaker) {
          if (
            this.hasAbility(PE.Abilitydex.IMMUNITY) ||
            (this.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
            (this.partner.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS'))
          )
            return false;
          if (
            this.hasAbility(PE.Abilitydex.LEAFGUARD) &&
            ($Battle.weather === PE.Weathers.SunnyDay || $Battle.weather == PE.Weathers.HarshSun)
          )
            return false;
        }
        if (this.sides.own.effects.Safeguard > 0) return false;
        return true;
      };
      Battler.prototype.poison = function(attacker, msg, toxic) {
        if (attacker === void 0) {
          attacker = undefined;
        }
        if (msg === void 0) {
          msg = undefined;
        }
        if (toxic === void 0) {
          toxic = false;
        }
        this.status = PE.Statuses.Poison;
        this.statusCount = toxic ? 1 : 0;
        this.effects.Toxic = 0;
        // $Battle.pbCommonAnimation("Poison",self,nil)
        if (msg && msg !== '') $Battle.showMessage(msg);
        else {
          if (toxic) $Battle.showMessage(i18n._('%1 was badly poisoned!', this.name));
          else $Battle.showMessage(i18n._('%1 was poisoned!', this.name));
        }
        if (toxic) console.log('[Status change] #{this.name} was badly poisoned]');
        else console.log('[Status change] #{this.name} was poisoned');
        if (attacker && this.index !== attacker.index && this.hasAbility(PE.Abilitydex.SYNCHRONIZE)) {
          if (attacker.canPoisonSynchronize(this)) {
            console.log("[Ability triggered] #{this.this.name}'s Synchronize");
            var m = i18n._("%1's %2 poisoned %3!", this.name, Battle.Abilities.name(this.ability), attacker.name);
            attacker.poison(undefined, m, toxic);
          }
        }
      };
      //#endregion
      //------------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------------
      //#region Paralize
      Battler.prototype.canParalize = function(attacker, opponent) {};
      Battler.prototype.paralize = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
      };
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
      Battler.prototype.canBurn = function(attacker, showMessages, move) {
        if (move === void 0) {
          move = undefined;
        }
        if (this._fainted) return false;
        if (this.status === PE.Statuses.Burn) {
          if (showMessages) $Battle.showMessage(i18n._('%1 already has a burn.', this.name));
          return false;
        }
        if (
          this.status !== PE.Statuses.Healthy ||
          (this.effects.Substitute > 0 && (!move || !move.ignoresSubstitute(attacker)))
        ) {
          if (showMessages) $Battle.showMessage(i18n._('But it failed!'));
          return false;
        }
        if ($Battle.field.effects.MistyTerrain > 0 && !this.isAirborne(attacker && attacker.hasMoldBreaker())) {
          if (showMessages) {
            var msg = i18n._('The Misty Terrain prevented %1 from being burned!', this.name);
            $Battle.showMessage(msg);
          }
          return false;
        }
        if (this.hasType('FIRE') && !this.hasItem('RINGTARGET')) {
          if (showMessages) $Battle.showMessage(i18n._("It doesn't affect %1...", this.name));
          return false;
        }
        if (!attacker || !attacker.hasMoldBreaker()) {
          if (
            this.hasAbility(PE.Abilitydex.WATERVEIL) ||
            (this.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
            (this.hasAbility(PE.Abilitydex.LEAFGUARD) &&
              ($Battle.weather === PE.Weathers.SunnyDay || $Battle.weather === PE.Weathers.HarshSun))
          ) {
            if (showMessages) {
              var msg = i18n._("%1's %2 prevents burns!", this.name, Battle.Abilities.name(this.ability));
              $Battle.showMessage(msg);
            }
            return false;
          }
          if (this.partner.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
            if (showMessages) {
              var msg = i18n._(
                "%1's partner's %2 prevents burns!",
                this.name,
                Battle.Abilities.name(this.partner.ability)
              );
              $Battle.showMessage(msg);
            }
            return false;
          }
        }
        if (this.sides.own.effects.Safeguard > 0 && (!attacker || !attacker.hasAbility(PE.Abilitydex.INFILTRATOR))) {
          if (showMessages) $Battle.showMessage(i18n._("%1's team is protected by Safeguard!", this.name));
          return false;
        }
        return true;
      };
      /**
       * Check if the Pokémon can be **burned** by **Synchronize** ability
       * this.param opponent The ability Pokémon user
       */
      Battler.prototype.canBurnSynchronize = function(opponent) {
        if (this._fainted) return false;
        if (this.status !== PE.Statuses.Healthy) return false;
        if (this.hasType('FIRE') && !this.hasItem('RINGTARGET')) {
          var msg_1 = i18n._(
            "%1's %2 had no effect on %3!",
            opponent.name,
            Battle.Abilities.name(opponent.ability),
            this.name
          );
          $Battle.showMessage(msg_1);
          return false;
        }
        var text = "%1's %2 prevents %3's %4 from working!";
        var msg = i18n._(
          text,
          this.name,
          Battle.Abilities.name(this.ability),
          opponent.name,
          Battle.Abilities.name(opponent.ability)
        );
        if (
          this.hasAbility(PE.Abilitydex.WATERVEIL) ||
          (this.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) ||
          (this.hasAbility(PE.Abilitydex.LEAFGUARD) &&
            ($Battle.weather === PE.Weathers.SunnyDay || $Battle.weather == PE.Weathers.HarshSun))
        ) {
          $Battle.showMessage(msg);
          return false;
        }
        if (this.partner.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
          $Battle.showMessage(msg);
          return false;
        }
        return true;
      };
      /**
       * Burn the Pokémon, sets the Pokémon ststaus to burn.
       * this.param attacker the attacker Pokémon if exist
       * this.param msg custom info message
       */
      Battler.prototype.burn = function(attacker, msg) {
        if (attacker === void 0) {
          attacker = undefined;
        }
        if (msg === void 0) {
          msg = undefined;
        }
        this.status = PE.Statuses.Burn;
        this.statusCount = 0;
        // $Battle.pbCommonAnimation("Burn",self,nil)
        if (msg && msg != '') $Battle.showMessage(msg);
        else $Battle.showMessage(i18n._('%1 was burned!', this.name));
        console.log('[Status change] #{this.name} was burned');
        if (attacker && this.index !== attacker.index && this.hasAbility(PE.Abilitydex.SYNCHRONIZE)) {
          if (attacker.canBurnSynchronize(this)) {
            console.log("[Ability triggered] #{this.this.name}'s Synchronize");
            var m = i18n._("%1's %2 burned %3!", this.name, Battle.Abilities.name(this.ability), attacker.name);
            attacker.burn(undefined, m);
          }
        }
      };
      //#endregion
      //------------------------------------------------------------------------------------------------------------------
      //#endregion
      //==================================================================================================================
      //==================================================================================================================
      //#region Increase stat stages
      Battler.prototype.tooHigh = function(stat) {
        return this.stages[stat] >= 6;
      };
      Battler.prototype.canIncreaseStatStage = function(
        stat,
        attacker,
        showMessages,
        move,
        moldbreaker,
        ignoreContrary
      ) {
        if (attacker === void 0) {
          attacker = undefined;
        }
        if (showMessages === void 0) {
          showMessages = false;
        }
        if (move === void 0) {
          move = undefined;
        }
        if (moldbreaker === void 0) {
          moldbreaker = false;
        }
        if (ignoreContrary === void 0) {
          ignoreContrary = false;
        }
        if (this._fainted) return false;
        if (!moldbreaker) {
          if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
            if (this.hasAbility(PE.Abilitydex.CONTRARY) && !ignoreContrary) {
              return this.canReduceStatStage(stat, attacker, showMessages, moldbreaker, true);
            }
          }
        }
        if (this.tooHigh(stat)) {
          if (showMessages) $Battle.showMessage(i18n._("%1's %2 won't go any higher!", this.name, PE.Stats.name(stat)));
          return false;
        }
        return true;
      };
      Battler.prototype.increaseStatBasic = function(stat, increment, attacker, moldbreaker, ignoreContrary) {
        if (attacker === void 0) {
          attacker = undefined;
        }
        if (moldbreaker === void 0) {
          moldbreaker = false;
        }
        if (ignoreContrary === void 0) {
          ignoreContrary = false;
        }
        if (!moldbreaker) {
          if (!attacker || attacker.index == this.index || !attacker.hasMoldBreaker()) {
            if (this.hasAbility(PE.Abilitydex.CONTRARY) && !ignoreContrary) {
              return this.reduceStatBasic(stat, increment, attacker, moldbreaker, true);
            }
            if (this.hasAbility(PE.Abilitydex.SIMPLE)) increment *= 2;
          }
        }
        increment = Math.min(increment, 6 - this.stages[stat]); // Why?
        console.log('[Stat change] ' + this.name + "'s " + PE.Stats.name(stat) + ' rose by ' + increment + ' stage(s)');
        console.log(PE.Stats.name(stat) + ' stage: ' + this.stages[stat] + ' --> ' + (this.stages[stat] + increment));
        this.stages[stat] += increment;
        return increment;
      };
      Battler.prototype.increaseStat = function(
        stat,
        increment,
        attacker,
        showMessages,
        move,
        animation,
        moldbreaker,
        ignoreContrary
      ) {
        if (move === void 0) {
          move = undefined;
        }
        if (animation === void 0) {
          animation = true;
        }
        if (moldbreaker === void 0) {
          moldbreaker = false;
        }
        if (ignoreContrary === void 0) {
          ignoreContrary = false;
        }
        if (!(stat in PE.Stats)) return false;
        if (!moldbreaker) {
          if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
            if (this.hasAbility(PE.Abilitydex.CONTRARY) && !ignoreContrary) {
              return this.reduceStat(stat, increment, attacker, showMessages, move, animation, moldbreaker, true);
            }
          }
        }
        if (this.canIncreaseStatStage(stat, attacker, showMessages, move, moldbreaker, ignoreContrary)) {
          increment = this.increaseStatBasic(stat, increment, attacker, moldbreaker, ignoreContrary);
          if (increment > 0) {
            if (ignoreContrary) {
              if (animation)
                $Battle.showMessage(i18n._("%1's %2 activated!", this.name, Battle.Abilities.name(this.ability)));
            }
            // if (animation) $Battle.pbCommonAnimation("StatUp",self,nil);
            var texts = [
              i18n._("%1's %2 rose!", this.name, PE.Stats.name(stat)),
              i18n._("%1's %2 rose sharply!", this.name, PE.Stats.name(stat)),
              i18n._("%1's %2 rose drastically!", this.name, PE.Stats.name(stat))
            ];
            if (showMessages) $Battle.showMessage(texts[Math.min(increment - 1, 2)]);
            return true;
          }
        }
        return false;
      };
      Battler.prototype.increaseStatWithCause = function(
        stat,
        increment,
        attacker,
        cause,
        showanim,
        showMessages,
        moldbreaker,
        ignoreContrary
      ) {
        if (showanim === void 0) {
          showanim = true;
        }
        if (showMessages === void 0) {
          showMessages = true;
        }
        if (moldbreaker === void 0) {
          moldbreaker = false;
        }
        if (ignoreContrary === void 0) {
          ignoreContrary = false;
        }
        if (!(stat in PE.Stats)) return false;
        if (!moldbreaker) {
          if (!attacker || attacker.index == this.index || !attacker.hasMoldBreaker()) {
            if (this.hasAbility(PE.Abilitydex.CONTRARY) && !ignoreContrary) {
              return this.reduceStatWithCause(
                stat,
                increment,
                attacker,
                cause,
                showanim,
                showMessages,
                moldbreaker,
                true
              );
            }
          }
        }
        if (this.canIncreaseStatStage(stat, attacker, false, undefined, moldbreaker, ignoreContrary)) {
          increment = this.increaseStatBasic(stat, increment, attacker, moldbreaker, ignoreContrary);
          if (increment > 0) {
            if (ignoreContrary) {
              if (showMessages)
                $Battle.showMessage(i18n._("%1's %2 activated!", this.name, Battle.Abilities.name(this.ability)));
            }
            // if (showanim) $Battle.pbCommonAnimation("StatUp",self,nil)
            var texts = [];
            if (attacker.index === this.index) {
              texts = [
                i18n._("%1's %2 raised its %3!", this.name, cause, PE.Stats.name(stat)),
                i18n._("%1's %2 sharply raised its %3!", this.name, cause, PE.Stats.name(stat)),
                i18n._("%1's %2 went way up!", this.name, PE.Stats.name(stat))
              ];
            } else {
              texts = [
                i18n._("%1's %2 raised %3's %4!", attacker.name, cause, this.name, PE.Stats.name(stat)),
                i18n._("%1's %2 sharply raised %3's %4!", attacker.name, cause, this.name, PE.Stats.name(stat)),
                i18n._("%1's %2 drastically raised %3's %4!", attacker.name, cause, this.name, PE.Stats.name(stat))
              ];
            }
            if (showMessages) $Battle.showMessage(texts[Math.min(increment - 1, 2)]);
            return true;
          }
        }
        return false;
      };
      //#endregion
      //==================================================================================================================
      //==================================================================================================================
      //#region Decrease stat stages
      Battler.prototype.tooLow = function(stat) {
        return this.stages[stat] <= -6;
      };
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
      Battler.prototype.canReduceStatStage = function(stat, attacker, showMessages, move, moldbreaker, ignoreContrary) {
        if (attacker === void 0) {
          attacker = undefined;
        }
        if (showMessages === void 0) {
          showMessages = false;
        }
        if (move === void 0) {
          move = undefined;
        }
        if (moldbreaker === void 0) {
          moldbreaker = false;
        }
        if (ignoreContrary === void 0) {
          ignoreContrary = false;
        }
        if (this._fainted) return false;
        if (!moldbreaker) {
          if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
            if (this.hasAbility(PE.Abilitydex.CONTRARY) && !ignoreContrary) {
              return this.canIncreaseStatStage(stat, attacker, showMessages, move, moldbreaker, true);
            }
          }
        }
        var selfreduce = attacker && attacker.index === this.index;
        if (!selfreduce) {
          if (this.effects.Substitute > 0 && (!move || !move.ignoresSubstitute(attacker))) {
            if (showMessages) $Battle.showMessage(i18n._('But it failed!'));
            return false;
          }
          if (this.sides.own.effects.Mist > 0 && (!attacker || !attacker.hasAbility(PE.Abilitydex.INFILTRATOR))) {
            if (showMessages) $Battle.showMessage(i18n._('%1 is protected by Mist!', this.name));
            return false;
          }
          if (!moldbreaker && (!attacker || !attacker.hasMoldBreaker())) {
            if (this.hasAbilityIn([PE.Abilitydex.CLEARBODY, PE.Abilitydex.WHITESMOKE])) {
              if (showMessages) {
                var msg = "%1's %2 prevents stat loss!";
                $Battle.showMessage(i18n._(msg, this.name, Battle.Abilities.name(this.ability)));
              }
              return false;
            }
            if (this.hasType('GRASS')) {
              if (this.hasAbility(PE.Abilitydex.FLOWERVEIL)) {
                if (showMessages) {
                  var msg = "%1's %2 prevents stat loss!";
                  $Battle.showMessage(i18n._(msg, this.name, Battle.Abilities.name(this.ability)));
                }
                return false;
              } else if (this.partner.hasAbility(PE.Abilitydex.FLOWERVEIL)) {
                if (showMessages) {
                  var msg = "%1's %2 prevents %3's stat loss!";
                  $Battle.showMessage(i18n._(msg, this.partner.name, Battle.Abilities.name(this.ability), this.name));
                }
                return false;
              }
            }
            if (stat === PE.Stats.Attack && this.hasAbility(PE.Abilitydex.HYPERCUTTER)) {
              if (showMessages) {
                var msg = "%1's %2 prevents Attack loss!";
                $Battle.showMessage(i18n._(msg, this.name, Battle.Abilities.name(this.ability)));
              }
              return false;
            }
            if (stat === PE.Stats.Defense && this.hasAbility(PE.Abilitydex.BIGPECKS)) {
              if (showMessages) {
                var msg = "%1's %2 prevents Defence loss!";
                $Battle.showMessage(i18n._(msg, this.name, Battle.Abilities.name(this.ability)));
              }
              return false;
            }
            if (stat === PE.Stats.Accuracy && this.hasAbility(PE.Abilitydex.KEENEYE)) {
              if (showMessages) {
                var msg = "%1's %2 prevents Accuracy loss!";
                $Battle.showMessage(i18n._(msg, this.name, Battle.Abilities.name(this.ability)));
              }
              return false;
            }
          }
        }
        if (this.tooLow(stat)) {
          if (showMessages) $Battle.showMessage(i18n._("%1's %2 won't go any lower!", this.name, PE.Stats.name(stat)));
          return false;
        }
        return true;
      };
      Battler.prototype.reduceStatBasic = function(stat, increment, attacker, moldbreaker, ignoreContrary) {
        if (attacker === void 0) {
          attacker = undefined;
        }
        if (moldbreaker === void 0) {
          moldbreaker = false;
        }
        if (ignoreContrary === void 0) {
          ignoreContrary = false;
        }
        // moldbreaker is true only when Roar forces out a Pokémon into Sticky Web
        if (!moldbreaker) {
          if (!attacker || attacker.index == this.index || !attacker.hasMoldBreaker()) {
            if (this.hasAbility(PE.Abilitydex.CONTRARY) && !ignoreContrary) {
              return this.increaseStatBasic(stat, increment, attacker, moldbreaker, true);
            }
            if (this.hasAbility(PE.Abilitydex.SIMPLE)) increment *= 2;
          }
        }
        increment = Math.min(increment, 6 + this.stages[stat]);
        console.log('[Stat change] ' + this.name + "'s " + PE.Stats.name(stat) + ' fell by ' + increment + ' stage(s)');
        console.log(PE.Stats.name(stat) + ' stage: ' + this.stages[stat] + ' --> ' + (this.stages[stat] - increment));
        this.stages[stat] -= increment;
        return increment;
      };
      Battler.prototype.reduceStat = function(
        stat,
        increment,
        attacker,
        showMessages,
        move,
        downanim,
        moldbreaker,
        ignoreContrary
      ) {
        if (move === void 0) {
          move = undefined;
        }
        if (downanim === void 0) {
          downanim = true;
        }
        if (moldbreaker === void 0) {
          moldbreaker = false;
        }
        if (ignoreContrary === void 0) {
          ignoreContrary = false;
        }
        if (!(stat in PE.Stats)) return false;
        if (!moldbreaker) {
          if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
            if (this.hasAbility(PE.Abilitydex.CONTRARY) && !ignoreContrary) {
              return this.increaseStat(stat, increment, attacker, showMessages, move, downanim, moldbreaker, true);
            }
          }
        }
        if (this.canReduceStatStage(stat, attacker, showMessages, move, moldbreaker, ignoreContrary)) {
          increment = this.reduceStatBasic(stat, increment, attacker, moldbreaker, ignoreContrary);
          if (increment > 0) {
            if (ignoreContrary) {
              if (downanim)
                $Battle.showMessage(i18n._("%1's %2 activated!", this.name, Battle.Abilities.name(this.ability)));
            }
            // $Battle.pbCommonAnimation("StatDown",self,nil) if downanim
            var texts = [
              i18n._("%1's %2 fell!", this.name, PE.Stats.name(stat)),
              i18n._("%1's %2 harshly fell!", this.name, PE.Stats.name(stat)),
              i18n._("%1's %2 severely fell!", this.name, PE.Stats.name(stat))
            ];
            if (showMessages) $Battle.showMessage(texts[Math.min(increment - 1, 2)]);
            // Defiant
            if (this.hasAbility(PE.Abilitydex.DEFIANT) && (!attacker || attacker.isOpposing(this.index))) {
              this.increaseStatWithCause(PE.Stats.Attack, 2, this, Battle.Abilities.name(this.ability));
            }
            // Competitive
            if (this.hasAbility(PE.Abilitydex.COMPETITIVE) && (!attacker || attacker.isOpposing(this.index))) {
              this.increaseStatWithCause(PE.Stats.SpAtk, 2, this, Battle.Abilities.name(this.ability));
            }
            return true;
          }
        }
        return false;
      };
      Battler.prototype.reduceStatWithCause = function(
        stat,
        increment,
        attacker,
        cause,
        showanim,
        showMessages,
        moldbreaker,
        ignoreContrary
      ) {
        if (showanim === void 0) {
          showanim = true;
        }
        if (showMessages === void 0) {
          showMessages = true;
        }
        if (moldbreaker === void 0) {
          moldbreaker = false;
        }
        if (ignoreContrary === void 0) {
          ignoreContrary = false;
        }
        if (!(stat in PE.Stats)) return false;
        if (!moldbreaker) {
          if (!attacker || attacker.index === this.index || !attacker.hasMoldBreaker()) {
            if (this.hasAbility(PE.Abilitydex.CONTRARY) && !ignoreContrary) {
              return this.increaseStatWithCause(
                stat,
                increment,
                attacker,
                cause,
                showanim,
                showMessages,
                moldbreaker,
                true
              );
            }
          }
        }
        if (this.canReduceStatStage(stat, attacker, false, undefined, moldbreaker, ignoreContrary)) {
          increment = this.reduceStatBasic(stat, increment, attacker, moldbreaker, ignoreContrary);
          if (increment > 0) {
            if (ignoreContrary) {
              if (showMessages)
                $Battle.showMessage(i18n._("%1's %2 activated!", this.name, Battle.Abilities.name(this.ability)));
            }
            // if (showanim) $Battle.pbCommonAnimation("StatDown",self,nil)
            var texts = [];
            if (attacker.index === this.index) {
              texts = [
                i18n._("%1's %2 lowered its %3!", this.name, cause, PE.Stats.name(stat)),
                i18n._("%1's %2 harshly lowered its %3!", this.name, cause, PE.Stats.name(stat)),
                i18n._("%1's %2 severely lowered its %3!", this.name, cause, PE.Stats.name(stat))
              ];
            } else {
              texts = [
                i18n._("%1's %2 lowered %3's %4!", attacker.name, cause, this.name, PE.Stats.name(stat)),
                i18n._("%1's %2 harshly lowered %3's %4!", attacker.name, cause, this.name, PE.Stats.name(stat)),
                i18n._("%1's %2 severely lowered %3's %4!", attacker.name, cause, this.name, PE.Stats.name(stat))
              ];
            }
            if (showMessages) $Battle.showMessage(texts[Math.min(increment - 1, 2)]);
            // Defiant
            if (this.hasAbility(PE.Abilitydex.DEFIANT) && (!attacker || attacker.isOpposing(this.index))) {
              this.increaseStatWithCause(PE.Stats.Attack, 2, this, Battle.Abilities.name(this.ability));
            }
            // Competitive
            if (this.hasAbility(PE.Abilitydex.COMPETITIVE) && (!attacker || attacker.isOpposing(this.index))) {
              this.increaseStatWithCause(PE.Stats.SpAtk, 2, this, Battle.Abilities.name(this.ability));
            }
            return true;
          }
        }
        return false;
      };
      Battler.prototype.reduceAttackStatIntimidate = function(opponent) {
        if (this._fainted) return false;
        if (this.effects.Substitute > 0) {
          var msg = "%1's substitute protected it from %2's %3!";
          $Battle.showMessage(i18n._(msg, this.name, opponent.name, Battle.Abilities.name(opponent.ability)));
          return false;
        }
        if (!opponent.hasAbility(PE.Abilitydex.CONTRARY)) {
          if (this.sides.own.effects.Mist > 0) {
            var msg = "%1 is protected from %2's %3 by Mist!";
            $Battle.showMessage(i18n._(msg, this.name, opponent.name, Battle.Abilities.name(opponent.ability)));
            return false;
          }
          if (
            this.hasAbilityIn([PE.Abilitydex.CLEARBODY, PE.Abilitydex.WHITESMOKE, PE.Abilitydex.HYPERCUTTER]) ||
            (this.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS'))
          ) {
            var msg = "%1's %2 prevented %3's %4 from working!";
            $Battle.showMessage(
              i18n._(
                msg,
                this.name,
                Battle.Abilities.name(this.ability),
                opponent.name,
                Battle.Abilities.name(opponent.ability)
              )
            );
            return false;
          }
          if (this.partner.hasAbility(PE.Abilitydex.FLOWERVEIL) && this.hasType('GRASS')) {
            var msg = "%1's %2 prevented %3's %4 from working!";
            $Battle.showMessage(
              i18n._(
                msg,
                this.partner.name,
                Battle.Abilities.name(this.partner.ability),
                opponent.name,
                Battle.Abilities.name(opponent.ability)
              )
            );
            return false;
          }
        }
        return this.reduceStatWithCause(PE.Stats.Attack, 1, opponent, Battle.Abilities.name(opponent.ability));
      };
      //#endregion
      //==================================================================================================================
      Battler.prototype.reduceHP = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return 0;
      };
      Battler.prototype.recoverHP = function() {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }
        return 0;
      };
      Object.defineProperty(Battler.prototype, 'partner', {
        get: function() {
          return this;
        },
        enumerable: true,
        configurable: true
      });
      Battler.prototype.cureStatus = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        throw Error('Not Implemented');
      };
      Battler.prototype.cureConfusion = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        throw Error('Not Implemented');
      };
      Battler.prototype.cureAttract = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        throw Error('Not Implemented');
      };
      //==================================================================================================================
      // Held item effects
      //==================================================================================================================
      Battler.prototype.consumeItem = function(recycle, pickup) {
        if (recycle === void 0) {
          recycle = true;
        }
        if (pickup === void 0) {
          pickup = true;
        }
        var itemname = Battle.Items.name(this.item);
        if (recycle) this.pokemon.itemRecycle = this.item;
        if (this.pokemon.itemInitial == this.item) this.pokemon.itemInitial = undefined;
        if (pickup) {
          this.effects.PickupItem = this.item;
          this.effects.PickupUse = $Battle.nextPickupUse();
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
      };
      return Battler;
    })();
    Battle.Battler = Battler;
  })((Battle = PE.Battle || (PE.Battle = {})));
})(PE || (PE = {}));
