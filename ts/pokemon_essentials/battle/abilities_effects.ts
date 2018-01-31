namespace PE.Battle.Abilities {
  export function name(id: string) {
    return i18n._($PE_ABILITIES[id].name);
  }

  /**
   * Activate the Pokémon **Switch in** abilities effects.
   * @param pokemon the switch in Pokémon
   * @param onactive
   */
  export function onSwitchInEffects(pokemon: Battle.Battler, onactive: boolean) {
    if (pokemon.isFainted()) return;
    // if (onactive) {
    //   battler.battle.pbPrimalReversion(battler.index);
    // }

    //------------------------------------------------------------------------------------------------------------------
    // #region Wheaters abilities
    if (onactive) {
      if (pokemon.hasAbility(Abilitydex.PRIMORDIALSEA) && $Battle.weather != Weathers.HeavyRain) {
        $Battle.setWeather(Weathers.HeavyRain, -1);
        $Battle.showAbilityIndicator(pokemon);
        let msg = "%1's %2 made a heavy rain begin to fall!";
        $Battle.showMessage(i18n._(msg, pokemon.name, Battle.Abilities.name(pokemon.ability)));
        console.log(`[Ability triggered] ${pokemon.name}'s Primordial Sea made it rain heavily`);
      }
      if (pokemon.hasAbility(Abilitydex.DESOLATELAND) && $Battle.weather != Weathers.HarshSun) {
        $Battle.setWeather(Weathers.HarshSun, -1);
        $Battle.showAbilityIndicator(pokemon);
        let msg = "%1's %2 turned the sunlight extremely harsh!"
        $Battle.showMessage(i18n._(msg, pokemon.name, Battle.Abilities.name(pokemon.ability)));
        console.log(`[Ability triggered] ${pokemon.name} Desolate Land made the sun shine harshly`);
      }
      if (pokemon.hasAbility(Abilitydex.DELTASTREAM) && $Battle.weather != Weathers.StrongWinds) {
        $Battle.setWeather(Weathers.StrongWinds, -1);
        $Battle.showAbilityIndicator(pokemon);
        let msg = "%1's %2 caused a mysterious air current that protects Flying-type Pokémon!";
        $Battle.showMessage(i18n._(msg, pokemon.name, Battle.Abilities.name(pokemon.ability)));
        console.log(`[Ability triggered] ${pokemon.name} Delta Stream made an air current blow`);
      }
      if (!($Battle.weather in PrimalWeathers)) {
        if (pokemon.hasAbility(Abilitydex.DRIZZLE) && ($Battle.weather !== Weathers.RainDance || $Battle.weatherDuration !== -1)) {
          let weatherduration = pokemon.hasItem('DAMPROCK') ? 8 : 5;
          $Battle.setWeather(Weathers.RainDance, weatherduration);
          $Battle.showAbilityIndicator(pokemon);
          let msg = "%1's %2 made it rain!";
          $Battle.showMessage(i18n._(msg, pokemon.name, Battle.Abilities.name(pokemon.ability)));
          console.log(`[Ability triggered] ${pokemon.name} Drizzle made it rain`);
        }
        if (pokemon.hasAbility(Abilitydex.DROUGHT) && ($Battle.weather !== Weathers.SunnyDay || $Battle.weatherDuration !== -1)) {
          let weatherduration = pokemon.hasItem('HEATROCK') ? 8 : 5;
          $Battle.setWeather(Weathers.SunnyDay, weatherduration);
          $Battle.showAbilityIndicator(pokemon);
          let msg = "%1's %2 intensified the sun's rays!";
          $Battle.showMessage(i18n._(msg, pokemon.name, Battle.Abilities.name(pokemon.ability)));
          console.log(`[Ability triggered] ${pokemon.name} Drought made it sunny`);
        }
        if (pokemon.hasAbility(Abilitydex.SANDSTREAM) && ($Battle.weather !== Weathers.SandStorm || $Battle.weatherDuration !== -1)) {
          let weatherduration = pokemon.hasItem('SMOOTHROCK') ? 8 : 5;
          $Battle.setWeather(Weathers.SandStorm, weatherduration);
          $Battle.showAbilityIndicator(pokemon);
          let msg = "%1's %2 whipped up a sandstorm!";
          $Battle.showMessage(i18n._(msg, pokemon.name, Battle.Abilities.name(pokemon.ability)));
          console.log(`[Ability triggered] ${pokemon.name} Sand Stream made it sandstorm`);
        }
        if (pokemon.hasAbility(Abilitydex.SNOWWARNING) && ($Battle.weather != Weathers.Hail || $Battle.weatherDuration != -1)) {
          let weatherduration = pokemon.hasItem('ICYROCK') ? 8 : 5;
          $Battle.setWeather(Weathers.Hail, weatherduration);
          $Battle.showAbilityIndicator(pokemon);
          // battler.battle.pbCommonAnimation("Hail",null,null)
          $Battle.showMessage(i18n._("%1's %2 made it hail!", pokemon.name, Battle.Abilities.name(pokemon.ability)));
          console.log(`[Ability triggered] ${pokemon.name} Snow Warning made it hail`);
        }
      }
      if (pokemon.hasAbility(Abilitydex.AIRLOCK) || pokemon.hasAbility(Abilitydex.CLOUDNINE)) {
        $Battle.clearWeather();
        $Battle.showAbilityIndicator(pokemon);
        $Battle.showMessage(i18n._("%1 has %2", pokemon.name, Battle.Abilities.name(pokemon.ability)));
        $Battle.showMessage(i18n._("The effects of the weather disappeared."))
      }
    }
    // #endregion
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Trace -
    // Evaluate traced first will evaluate the abilities effect below when the swap is over
    if (pokemon.hasAbility(Abilitydex.TRACE)) {
      let choices: Battle.Battler[] = [];
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index)) {
          if (!battler.hasAbilityIn([Abilitydex.TRACE, Abilitydex.MULTITYPE, Abilitydex.FLOWERGIFT, Abilitydex.IMPOSTER,
          Abilitydex.STANCECHANGE, Abilitydex.RKSSYSTEM, Abilitydex.ILLUSION, Abilitydex.ZENMODE, Abilitydex.STANCECHANGE,
          Abilitydex.POWEROFALCHEMY, Abilitydex.RECEIVER, Abilitydex.SCHOOLING, Abilitydex.COMATOSE, Abilitydex.SHIELDSDOWN,
          Abilitydex.DISGUISE, Abilitydex.BATTLEBOND, Abilitydex.POWERCONSTRUCT])) {
            choices.push(battler);
          }
        }
      }
      if (choices.length > 0) {
        let choice = choices[Math.randomInt(choices.length)];
        $Battle.showAbilityIndicator(pokemon);
        pokemon.ability = choice.ability;
        let abilityname = Battle.Abilities.name(choice.ability);
        $Battle.showMessage(i18n._("%1 traced %2's %3", pokemon.name, choice.name, abilityname));
        console.log(`[Ability triggered] ${pokemon.name} Trace turned into ${abilityname} from ${choice.name}`);
      }
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Intimidate - Intimidates opposing Pokémon upon entering battle, lowering their Attack stat.
    if (pokemon.hasAbility(Abilitydex.INTIMIDATE) && onactive) {
      console.log(`[Ability triggered] ${pokemon.name} Intimidate`);
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index) && !battler.hasAbility(Abilitydex.FULLMETALBODY)) {
          $Battle.showAbilityIndicator(pokemon);
          battler.reduceAttackStatIntimidate(pokemon);
        }
      }
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Download - Compares an opposing Pokémon's Defense and Sp. Def stats before raising its own Attack or Sp. Atk stat
    // whichever will be more effective.
    if (pokemon.hasAbility(Abilitydex.DOWNLOAD) && onactive) {
      let odef = 0, ospd = 0;
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index)) {
          odef += battler.defense;
          ospd += battler.spdef;
        }
      }
      $Battle.showAbilityIndicator(pokemon);
      if (ospd > odef) {
        if (pokemon.increaseStatWithCause(Stats.Attack, 1, pokemon, Battle.Abilities.name(pokemon.ability))) {
          console.log(`[Ability triggered] ${pokemon.name} Download (raising Attack)`);
        }
      } else {
        if (pokemon.increaseStatWithCause(Stats.SpAtk, 1, pokemon, Battle.Abilities.name(pokemon.ability))) {
          console.log(`[Ability triggered] ${pokemon.name} Download (raising SpAtk)`);
        }
      }
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Frisk - When it enters a battle, the Pokémon can check an opposing Pokémon's held item.
    if (pokemon.hasAbility(Abilitydex.FRISK) && $Battle.ownedByPlayer(pokemon.index) && onactive) {
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index) && battler.item && !battler.isFainted()) {
          console.log(`[Ability triggered] ${pokemon.name} Frisk`);
          $Battle.showAbilityIndicator(pokemon);
          $Battle.showMessage(i18n._(`%1 frisked the foe and found one %2!`, pokemon.name, Items.name(battler.item)));
        }
      }
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Anticipation - The Pokémon can sense an opposing Pokémon's dangerous moves.
    if (pokemon.hasAbility(Abilitydex.ANTICIPATION) && $Battle.ownedByPlayer(pokemon.index) && onactive) {
      let found = false;
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index) && !battler.isFainted()) {
          for (const move of battler.moveset) {
            let effectiveness = Types.effectiveness(move.type, pokemon.types, pokemon.effects.Type3);
            if ((effectiveness >= 2 && move.basePower > 0) || Battle.Moves.isOHKOMove(move.id)) {
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }
      if (found) {
        console.log(`[Ability triggered] ${pokemon.name} has Anticipation`);
        $Battle.showAbilityIndicator(pokemon);
        $Battle.showMessage(i18n._("%1 shuddered with anticipation!", pokemon.name));
      }
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Forewarn - The Pokémon transforms with the weather to change its type to Water, Fire, or Ice.
    // if battler.hasAbility(Abilitydex.FOREWARN) && $Battle.pbOwnedByPlayer?(@index) && onactive
    //   console.log("[Ability triggered] ${name} has Forewarn")
    //   highpower=0
    //   fwmoves=[]
    //   for foe in [pbOpposing1,pbOpposing2]
    //     next if foe.isFainted?
    //     for j in foe.moves
    //       movedata=PBMoveData.new(j.id)
    //       power=movedata.basedamage
    //       power=160 if movedata.function==0x70// OHKO
    //       power=150 if movedata.function==0x8B// Eruption
    //       power=120 if movedata.function==0x71 || # Counter
    //                    movedata.function==0x72 || # Mirror Coat
    //                    movedata.function==0x73 || # Metal Burst
    //       power=80 if movedata.function==0x6A ||  # SonicBoom
    //                   movedata.function==0x6B ||  # Dragon Rage
    //                   movedata.function==0x6D ||  # Night Shade
    //                   movedata.function==0x6E ||  # Endeavor
    //                   movedata.function==0x6F ||  # Psywave
    //                   movedata.function==0x89 ||  # Return
    //                   movedata.function==0x8A ||  # Frustration
    //                   movedata.function==0x8C ||  # Crush Grip
    //                   movedata.function==0x8D ||  # Gyro Ball
    //                   movedata.function==0x90 ||  # Hidden Power
    //                   movedata.function==0x96 ||  # Natural Gift
    //                   movedata.function==0x97 ||  # Trump Card
    //                   movedata.function==0x98 ||  # Flail
    //                   movedata.function==0x9A // Grass Knot
    //       if power>highpower
    //         fwmoves=[j.id]; highpower=power
    //       elsif power==highpower
    //         fwmoves.push(j.id)
    //       end
    //     end
    //   end
    //   if fwmoves.length>0
    //     fwmove=fwmoves[Math.randomInt(fwmoves.length)]
    //     movename=PBMoves.getName(fwmove)
    //     $Battle.showMessage(i18n._("${battler.name}'s Forewarn alerted it to %2!",name,movename))
    //   end
    // end
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Pressure message
    if (pokemon.hasAbility(Abilitydex.PRESSURE) && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is exerting its pressure!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Mold Breaker message
    if (pokemon.hasAbility(Abilitydex.MOLDBREAKER) && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 breaks the mold!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Turboblaze message
    if (pokemon.hasAbility(Abilitydex.TURBOBLAZE) && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is radiating a blazing aura!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Teravolt message
    if (pokemon.hasAbility(Abilitydex.TERAVOLT) && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is radiating a bursting aura!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Dark Aura message
    if (pokemon.hasAbility(Abilitydex.DARKAURA) && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is radiating a dark aura!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Fairy Aura message
    if (pokemon.hasAbility(Abilitydex.FAIRYAURA) && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is radiating a fairy aura!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Aura Break message
    if (pokemon.hasAbility(Abilitydex.AURABREAK) && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 reversed all other Pokémon's auras!`, pokemon.name))
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Slow Start message
    if (pokemon.hasAbility(Abilitydex.SLOWSTART) && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      let msg = "%1 can't get it going because of its %2!";
      $Battle.showMessage(i18n._(msg, pokemon.name, Battle.Abilities.name(pokemon.ability)));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Imposter - The Pokémon transforms itself into the Pokémon it's facing.
    // if battler.hasAbility(Abilitydex.IMPOSTER) && !@effects.Transform && onactive
    //   choice=pbOppositeOpposing
    //   blacklist=[
    //      0xC9,// Fly
    //      0xCA,// Dig
    //      0xCB,// Dive
    //      0xCC,// Bounce
    //      0xCD,// Shadow Force
    //      0xCE,// Sky Drop
    //      0x14D// Phantom Force
    //   ]
    //   if choice.effects.Transform ||
    //      choice.effects.Illusion ||
    //      choice.effects.Substitute>0 ||
    //      choice.effects.SkyDrop ||
    //      blacklist.include?(PBMoveData.new(choice.effects.TwoTurnAttack).function)
    //     console.log("[Ability triggered] ${pokemon.name} Imposter couldn't transform")
    //   else
    //     console.log("[Ability triggered] ${pokemon.name} Imposter")
    //     $Battle.pbAnimation(getConst(PBMoves,:TRANSFORM),self,choice)
    //     @effects.Transform=true
    //     @type1=choice.type1
    //     @type2=choice.type2
    //     @effects.Type3=-1
    //     @ability=choice.ability
    //     @attack=choice.attack
    //     @defense=choice.defense
    //     @speed=choice.speed
    //     @SpAtk=choice.SpAtk
    //     @spdef=choice.spdef
    //     for i in [Stats.EVASION]
    //       @stages[i]=choice.stages[i]
    //     end
    //     for i in 0...4
    //       @moves[i]=PokeBattle_Move.pbFromPBMove($Battle,PBMove.new(choice.moves[i].id))
    //       @moves[i].pp=5
    //       @moves[i].totalpp=5
    //     end
    //     @effects.Disable=0
    //     @effects.DisableMove=0
    //     $Battle.showMessage(i18n._("${battler.name} transformed into %2!",name,choice.name(true)))
    //     console.log("[Pokémon transformed] ${name} transformed into ${choice.name(true)}")
    //   end
    // end
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Air Balloon message
    if (pokemon.hasItem('AIRBALLOON') && onactive) {
      $Battle.showMessage(i18n._("%1 floats in the air with its %2!", pokemon.name, Items.name(pokemon.item)));
    }
    //------------------------------------------------------------------------------------------------------------------


  }

  export function moveHitTypeImmunity(move: Battle.Moves.Move, attacker: Battle.Battler, opponent: Battle.Battler) {
    if (opponent.hasAbility(Abilitydex.SAPSIPPER) && move.type === Types.GRASS) {
      console.log(`[Ability triggered] ${opponent.name}'s Sap Sipper (made ${move.name} ineffective)`)
      if (opponent.canIncreaseStatStage(Stats.Attack, opponent)) {
        opponent.increaseStatWithCause(Stats.Attack, 1, opponent, Battle.Abilities.name(opponent.ability));
      }
      else {
        $Battle.showMessage(i18n._("%1's %2 made %3 ineffective!", opponent.name, Battle.Abilities.name(opponent.ability), self.name))
      }
      return true;
    }
    if ((opponent.hasAbility(Abilitydex.STORMDRAIN) && move.type === Types.WATER) ||
      (opponent.hasAbility(Abilitydex.LIGHTNINGROD) && move.type === Types.ELECTRIC)) {
      console.log("[Ability triggered] ${opponent.name}'s ${AbilitiesEffetcs.name(opponent.ability)} (made ${move.name} ineffective)")
      if (opponent.canIncreaseStatStage(Stats.SpAtk, opponent)) {
        opponent.increaseStatWithCause(Stats.SpAtk, 1, opponent, Battle.Abilities.name(opponent.ability))
      } else {
        $Battle.showMessage(i18n._("%1's %2 made %3 ineffective!", opponent.name, Battle.Abilities.name(opponent.ability), self.name))
      }
      return true;
    }
    if (opponent.hasAbility(Abilitydex.MOTORDRIVE) && move.type === Types.ELECTRIC) {
      console.log("[Ability triggered] ${opponent.name}'s Motor Drive (made ${move.name} ineffective)");
      if (opponent.canIncreaseStatStage(Stats.Speed, opponent)) {

        opponent.increaseStatWithCause(Stats.Speed, 1, opponent, Battle.Abilities.name(opponent.ability))
      }
      else {

        $Battle.showMessage(i18n._("%1's %2 made %3 ineffective!", opponent.name, Battle.Abilities.name(opponent.ability), self.name))
      }
      return true;
    }
    if ((opponent.hasAbilityIn([Abilitydex.DRYSKIN, Abilitydex.WATERABSORB]) && move.type === Types.WATER) ||
      (opponent.hasAbility(Abilitydex.VOLTABSORB) && move.type === Types.ELECTRIC)) {
      console.log("[Ability triggered] ${opponent.name}'s ${AbilitiesEffetcs.name(opponent.ability)} (made ${move.name} ineffective)")
      let healed = false;
      if (opponent.effects.HealBlock == 0) {
        // if (opponent.recoverHP(Math.floor(opponent.totalhp / 4), true) > 0){
        //   $Battle.showMessage(i18n._("%1's %2 restored its HP!", opponent.name, AbilitiesEffetcs.name(opponent.ability)))
        //   healed = true;
        // }
      }
      if (!healed) {
        $Battle.showMessage(i18n._("%1's %2 made %3 useless!", opponent.name, Battle.Abilities.name(opponent.ability), move.name));
      }
      return true;
    }
    if (opponent.hasAbility(Abilitydex.FLASHFIRE) && move.type === Types.FIRE) {
      console.log("[Ability triggered] ${opponent.name}'s Flash Fire (made ${move.name} ineffective)")

      if (!opponent.effects.FlashFire) {
        opponent.effects.FlashFire = true
        $Battle.showMessage(i18n._("%1's %2 raised its Fire power!", opponent.name, Battle.Abilities.name(opponent.ability)))
      }
      else {
        $Battle.showMessage(i18n._("%1's %2 made %3 ineffective!", opponent.name, Battle.Abilities.name(opponent.ability), self.name))
      }
      return true;
    }
    if (opponent.hasAbility(Abilitydex.TELEPATHY) && move.IsDamaging() && !opponent.isOpposing(attacker.index)) {
      console.log("[Ability triggered] ${opponent.name}'s Telepathy (made ${move.name} ineffective)");
      $Battle.showMessage(i18n._("%1 avoids attacks by its ally Pokémon!", opponent.name));
      return true
    }
    if (opponent.hasAbility(Abilitydex.BULLETPROOF) && move.isBombMove()) {
      console.log("[Ability triggered] ${opponent.name}'s Bulletproof (made ${move.name} ineffective)")
      $Battle.showMessage(i18n._("%1's %2 made %3 ineffective!", opponent.name, Battle.Abilities.name(opponent.ability), self.name))
      return true
    }
    return false;
  }



  export function SpeedStatEffects(pokemon: Battler, speed: number) {
    if (pokemon.hasAbility(Abilitydex.CHLOROPHYLL) && ($Battle.weather === Weathers.SunnyDay || $Battle.weather === Weathers.HarshSun)) speed *= 2;
    else if (pokemon.hasAbility(Abilitydex.QUICKFEET) && pokemon.status !== Statuses.Healthy) speed = Math.round(speed * 1.5);
    else if (pokemon.hasAbility(Abilitydex.SANDRUSH) && $Battle.weather === Weathers.SandStorm) speed *= 2;
    else if (pokemon.hasAbility(Abilitydex.SLOWSTART) && pokemon.turncount <= 5) speed = Math.round(speed / 2);
    else if (pokemon.hasAbility(Abilitydex.SLUSHRUSH) && $Battle.weather === Weathers.Hail) speed *= 2;
    else if (pokemon.hasAbility(Abilitydex.SURGESURFER) && $Battle.field.effects.ElectricTerrain > 0) speed *= 2;
    else if (pokemon.hasAbility(Abilitydex.SWIFTSWIM) && ($Battle.weather === Weathers.RainDance || $Battle.weather === Weathers.HeavyRain)) speed *= 2;
    else if (pokemon.hasAbility(Abilitydex.UNBURDEN) && pokemon.effects.Unburden && pokemon.item == "") speed *= 2;
    return speed;
  }
}
