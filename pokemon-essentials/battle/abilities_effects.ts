namespace PE.Battle.Abilities {

  export function name(id: string) {
    return i18n._($PE_ABILITIES[id].name);
  }

  /**
   * Activate the Pokémon **Switch in** abilities effects.
   * @param pokemon the switch in Pokémon
   * @param onactive
   */
  export function OnSwitchInEffects(pokemon: Battle.Battler, onactive: boolean) {
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
            let movetype = move.getType(move.type, battler);
            let effectiveness = Types.effectiveness(movetype, pokemon.types, pokemon.effects.Type3);
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



  export function OnDealingDamageEffects(move: Moves.Move, user: Battler, target: Battler, damage: number) {
    if (damage <= 0) return;
    let movetype = move.getType(move.type, user, target);
    //==================================================================================================================
    // Contact Moves
    // Long Reach - Contact moves from the user will not trigger effects caused by contact.
    if (move.isContactMove() && !target.damageState.substitute && !user.hasAbility(Abilitydex.LONGREACH, true)) {
      //----------------------------------------------------------------------------------------------------------------
      // Aftermath - An attacker that knocks out this Pokémon with a contact move takes damage equal to 1/4 of its own max HP
      if (target.hasAbility(Abilitydex.AFTERMATH, true) && target.isFainted() && !user.isFainted()) {
        if (!$Battle.checkGlobalAbility(Abilitydex.DAMP) && !user.hasMoldBreaker() && !user.hasAbility(Abilitydex.MAGICGUARD)) {
          // $Battle.scene.pbDamageAnimation(user, 0);
          user.damage(Math.floor(user.totalhp / 4));
          $Battle.showMessage(i18n._(`%1 was caught in the aftermath!`, user.name));
          console.log(`[Ability triggered] ${target.name}'s Aftermath`);
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Cute Charm - Has a 30% chance of infatuating an attacker on contact.
      if (target.hasAbility(Abilitydex.CUTECHARM) && Utils.chance(30)) {
        if (!user.isFainted() && user.canAttract(target, false)) {
          user.attract(target, false);
          $Battle.showMessage(i18n._("%1's %2 made %3 fall in love", target.name, Abilities.name(target.ability), user.name));
          console.log(`[Ability triggered] ${target.name}'s Cute Charm`);
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Effect Spore - Has a 30% chance of afflicting an attacker with poison, paralysis, or sleep on contact.
      if (target.hasAbility(Abilitydex.EFFECTSPORE, true)) {
        if (!user.hasType(Types.GRASS) || !user.hasAbility(Abilitydex.OVERCOAT) || !user.hasItem('SAFETYGOGGLES')) {
          let msg = "";
          if (Utils.chance(10) && user.canPoison(undefined, false)) {
            user.poison(target);
            msg = "%1's %2 poisoned %3!";
          }
          else if (Utils.chance(10) && user.canParalize(undefined, false)) {
            user.paralize(target);
            msg = "%1's %2 paralyzed %3 It may be unable to move!";
          }
          else if (Utils.chance(10) && user.canSleep(undefined, false)) {
            user.sleep();
            msg = "%1's %2 made %3 fall sleep!";
          }
          if (msg !== "") {
            $Battle.showMessage(i18n._(msg, target.name, Abilities.name(target.ability), user.name));
            console.log(`[Ability triggered] ${target.name}'s Effect Spore`);
          }
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Flame Body - Has a 30% chance of burning an attacker on contact.
      if (target.hasAbility(Abilitydex.FLAMEBODY, true) && Utils.chance(30) && user.canBurn(null, false)) {
        console.log(`[Ability triggered] ${target.name}'s Flame Body`);
        user.burn(target);
        $Battle.showMessage(i18n._("%1's %2 burned %3", target.name, Abilities.name(target.ability), user.name));
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Fluffy - Halves damage taken from contact moves, but doubles damage taken from Fire-type moves.
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Gooey, Tangling Hair - TODO - Decreases an attacker's Speed by one stage on contact.
      if (target.hasAbilityIn([Abilitydex.GOOEY, Abilitydex.TANGLINGHAIR])) {
        console.log(`[Ability triggered] ${target.name}'s ${target.ability}`);
        if (user.reduceStatWithCause(Stats.Speed, 1, target, Abilities.name(target.ability))) {
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Mummy - Replaces an attacker's Ability with Mummy on contact.
      // TODO check Parental bound and Rock Head effects
      if (target.hasAbility(Abilitydex.MUMMY, true) && !user.isFainted()) {
        if (!user.hasAbilityIn([Abilitydex.MULTITYPE, Abilitydex.STANCECHANGE, Abilitydex.SCHOOLING,
        Abilitydex.BATTLEBOND, Abilitydex.SHIELDSDOWN, Abilitydex.RKSSYSTEM, Abilitydex.DISGUISE, Abilitydex.MUMMY])) {
          user.ability = Abilitydex.MUMMY;
          $Battle.showMessage(i18n._(`%1 was mummified by %2!`, user.name, target.name));
          console.log(`[Ability triggered] ${target.name}'s Mummy copied onto ${user.name}`);
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Poison Point - Has a 30% chance of poisoning an attacker on contact.
      if (target.hasAbility(Abilitydex.POISONPOINT, true) && Utils.chance(30) && user.canPoison(undefined, false)) {
        console.log(`[Ability triggered] ${target.name}'s Poison Point`);
        user.poison(target);
        $Battle.showMessage(i18n._("%1's %2 posioned %3", target.name, Abilities.name(target.ability), user.name));
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Rough Skin, Iron Barbs - Damages an attacker for 1/8 of its max HP on contact.
      if (target.hasAbilityIn([Abilitydex.ROUGHSKIN, Abilitydex.IRONBARBS])) {
        if (!user.hasAbility(Abilitydex.MAGICGUARD) && !user.isFainted()) {
          // $Battle.scene.pbDamageAnimation(user, 0);
          user.damage(Math.floor(user.totalhp / 8));
          $Battle.showMessage(i18n._("%1's %2 hurt %3!", target.name, Abilities.name(target.ability), user.name));
          console.log(`[Ability triggered] ${target.name}'s ${target.ability}}`);
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Poison Touch - Has a 30% chance of poisoning a target on contact.
      if (user.hasAbility(Abilitydex.POISONTOUCH, true) && target.canPoison(undefined, false) && Utils.chance(30)) {
        target.poison(user);
        $Battle.showMessage(i18n._("%1's %2 poisoned %3", user.name, Abilities.name(user.ability), target.name));
        console.log(`[Ability triggered] ${user.name}'s Poison Touch`)
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Static - Has a 30% chance of paralyzing an attacker on contact.
      if (target.hasAbility(Abilitydex.STATIC, true) && Utils.chance(30) && user.canParalize(undefined, false)) {
        user.paralize(target);
        let msg = "%1's %2 paralyzed %3 It may be unable to move!";
        $Battle.showMessage(i18n._(msg, target.name, Abilities.name(target.ability), user.name));
        console.log(`[Ability triggered] ${target.name}'s Static`);
      }
      //----------------------------------------------------------------------------------------------------------------
    }
    //==================================================================================================================

    if (!target.damageState.substitute) {
      //----------------------------------------------------------------------------------------------------------------
      // Anger Point
      if (target.hasAbility(Abilitydex.ANGERPOINT)) {
        if (target.damageState.critical && target.canIncreaseStatStage(Stats.Attack, target)) {
          target.stages.Attack = 6;
          // $Battle.pbCommonAnimation("StatUp", target, null);
          // $Battle.showMessage(i18n._(`${target.name}'s ${Abilities.name(target.name)} disabled ${user}!`));
          // console.log(`[Ability triggered] ${target.name}'s Cursed Body disabled ${user.name}`);
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Justified - Being hit by a Dark-type move boosts the Attack stat of the Pokémon, for justice.
      if (target.hasAbility(Abilitydex.JUSTIFIED) && movetype === Types.DARK) {
        if (target.increaseStatWithCause(Stats.Attack, 1, target, Abilities.name(target.ability))) {
          console.log(`[Ability triggered] ${target.name}'s Justified`);
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Rattled - Dark, Ghost, and Bug type moves scare the Pokémon and boost its Speed stat.
      if (target.hasAbility(Abilitydex.RATTLED) && [Types.DARK, Types.GHOST, Types.BUG].contains(movetype)) {
        if (target.increaseStatWithCause(Stats.Speed, 1, target, Abilities.name(target.ability))) {
          console.log(`[Ability triggered] ${target.name}'s Rattled`);
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Stamina - Boosts the Defense stat when hit by an attack.
      if (target.hasAbility(Abilitydex.STAMINA)) {
        if (target.increaseStatWithCause(Stats.Defense, 1, target, Abilities.name(target.ability))) {
          console.log(`[Ability triggered] ${target.name}'s Stamina`);
        }
      }
      //----------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------
      // Weak Armor -Physical attacks to the Pokémon lower its Defense stat but sharply raise its Speed stat.
      if (target.hasAbility(Abilitydex.WEAKARMOR) && move.category === Moves.Categories.Physical) {
        if (target.reduceStatWithCause(Stats.Defense, 1, target, Abilities.name(target.ability))) {
          console.log(`[Ability triggered] ${target.name}'s Weak Armor (lower Defense)`)
        }
        if (target.increaseStatWithCause(Stats.Speed, 1, target, Abilities.name(target.ability))) {
          console.log(`[Ability triggered] ${target.name}'s Weak Armor (raise Speed)`)
        }
      }
      //----------------------------------------------------------------------------------------------------------------
    }
    AbilityCureCheck(user);
    AbilityCureCheck(target);
  }


  export function moveHitTypeImmunity(move: Battle.Moves.Move, attacker: Battle.Battler, opponent: Battle.Battler) {
    let movetype = move.getType(move.type, attacker, opponent);
    if (opponent.hasAbility(Abilitydex.SAPSIPPER) && movetype === Types.GRASS) {
      console.log(`[Ability triggered] ${opponent.name}'s Sap Sipper (made ${move.name} ineffective)`)
      if (opponent.canIncreaseStatStage(Stats.Attack, opponent)) {
        opponent.increaseStatWithCause(Stats.Attack, 1, opponent, Battle.Abilities.name(opponent.ability));
      }
      else {
        $Battle.showMessage(i18n._("%1's %2 made %3 ineffective!", opponent.name, Battle.Abilities.name(opponent.ability), self.name))
      }
      return true;
    }
    if ((opponent.hasAbility(Abilitydex.STORMDRAIN) && movetype === Types.WATER) ||
      (opponent.hasAbility(Abilitydex.LIGHTNINGROD) && movetype === Types.ELECTRIC)) {
      console.log("[Ability triggered] ${opponent.name}'s ${AbilitiesEffetcs.name(opponent.ability)} (made ${move.name} ineffective)")
      if (opponent.canIncreaseStatStage(Stats.SpAtk, opponent)) {
        opponent.increaseStatWithCause(Stats.SpAtk, 1, opponent, Battle.Abilities.name(opponent.ability))
      } else {
        $Battle.showMessage(i18n._("%1's %2 made %3 ineffective!", opponent.name, Battle.Abilities.name(opponent.ability), self.name))
      }
      return true;
    }
    if (opponent.hasAbility(Abilitydex.MOTORDRIVE) && movetype === Types.ELECTRIC) {
      console.log("[Ability triggered] ${opponent.name}'s Motor Drive (made ${move.name} ineffective)");
      if (opponent.canIncreaseStatStage(Stats.Speed, opponent)) {

        opponent.increaseStatWithCause(Stats.Speed, 1, opponent, Battle.Abilities.name(opponent.ability))
      }
      else {

        $Battle.showMessage(i18n._("%1's %2 made %3 ineffective!", opponent.name, Battle.Abilities.name(opponent.ability), self.name))
      }
      return true;
    }
    if ((opponent.hasAbilityIn([Abilitydex.DRYSKIN, Abilitydex.WATERABSORB]) && movetype === Types.WATER) ||
      (opponent.hasAbility(Abilitydex.VOLTABSORB) && movetype === Types.ELECTRIC)) {
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
    if (opponent.hasAbility(Abilitydex.FLASHFIRE) && movetype === Types.FIRE) {
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



  export function AfterHitEffects(user: Battler, target: Battler, thismove: Moves.Move, turneffects) {
    if (turneffects.TotalDamage === 0) return;

    // if (!(user.hasAbility(Abilitydex.SHEERFORCE) && thismove.addlEffect > 0)) {
    if (!(user.hasAbility(Abilitydex.SHEERFORCE))) {
      // Target's held items:
      // Red Card
      if (target.hasItem('REDCARD') && $Battle.canSwitch(user.index, -1, false)) {
        user.effects.Roar = true;
        $Battle.showMessage(i18n._("%1 held up its %2 against the %3!", target.name, Items.name(target.item), user.name));
        target.consumeItem();
        // Eject Button
      } else if (target.hasItem('EJECTBUTTON') && $Battle.canChooseNonActive(target.index)) {
        target.effects.Uturn = true;
        $Battle.showMessage(i18n._("%1 is switched out with the %2!", target.name, Items.name(target.item)));
        target.consumeItem();
      }
      // User's held items:
      // Shell Bell
      if (user.hasItem('SHELLBELL') && user.effects.HealBlock == 0) {
        console.log(`[Item triggered] ${user.name}'s Shell Bell (total damage=${turneffects.TotalDamage})`)
        let hpgain = user.recoverHP(Math.floor(turneffects.TotalDamage / 8), true);
        if (hpgain > 0)
          $Battle.showMessage(i18n._("%1 restored a little HP using its %2!", user.name, Items.name(user.item)))
      }
      // Life Orb
      if (user.effects.LifeOrb && !user.hasAbility(Abilitydex.MAGICGUARD)) {
        console.log(`[Item triggered] ${user.name}'s Life Orb (recoil)`);
        let hploss = user.reduceHP(Math.floor(user.totalhp / 10), true);
        if (hploss > 0) $Battle.showMessage(i18n._("%1 lost some of its HP!", user.name));
      }

      if (user.isFainted()) user.faint();// no return
      // Color Change
      let movetype = thismove.getType(thismove.type, user, target);
      if (target.hasAbility(Abilitydex.COLORCHANGE) && !target.hasType(movetype)) {
        console.log(`[Ability triggered] ${target.name}'s Color Change made it ${movetype}-type`);
        target.types = [movetype.toString()];
        target.effects.Type3 = -1
        $Battle.showMessage(i18n._("%1's %2 made it the %3 type!", target.name, Abilities.name(target.ability), movetype));
      }
    }
    // Moxie
    if (user.hasAbility(Abilitydex.MOXIE) && target.isFainted()) {
      if (user.increaseStatWithCause(Stats.Attack, 1, user, Abilities.name(user.ability)))
        console.log("[Ability triggered] ${user.name}'s Moxie");
    }
    // Magician
    if (user.hasAbility(Abilitydex.MAGICIAN)) {
      if (target.item && user.item == undefined && user.effects.Substitute == 0 && target.effects.Substitute == 0 &&
        !target.hasAbility(Abilitydex.STICKYHOLD) && !$Battle.isUnlosableItem(target, target.item)
        && !$Battle.isUnlosableItem(user, target.item) && ($Battle.opponent || !$Battle.isOpposing(user.index))) {
        user.item = target.item;
        target.item = undefined;
        target.effects.Unburden = true;
        // if !$Battle.opponent &&   // In a wild battle
        //  user.pokemon.itemInitial==0 &&
        //  target.pokemon.itemInitial==user.item
        //  user.pokemon.itemInitial=user.item
        // target.pokemon.itemInitial=0
        // end
        $Battle.showMessage(i18n._("%1 stole %2's %3 with {4}!", user.name,
          target.name, Items.name(user.item), Abilities.name(user.ability)))
        console.log(`[Ability triggered] ${user.name}'s Magician stole ${target.name}'s ${Items.name(user.item)}`)

      }
    }
    // Pickpocket
    if (target.hasAbility(Abilitydex.PICKPOCKET)) {
      if (target.item == undefined && user.item && user.effects.Substitute == 0 && target.effects.Substitute == 0 &&
        !user.hasAbility(Abilitydex.STICKYHOLD) && !$Battle.isUnlosableItem(user, user.item) &&
        !$Battle.isUnlosableItem(target, user.item) && ($Battle.opponent || !$Battle.isOpposing(target.index))) {
        target.item = user.item;
        user.item = undefined;
        user.effects.Unburden = true
        if (!$Battle.opponent &&   // In a wild battle
          target.itemInitial == undefined &&
          user.itemInitial == target.item) {
          target.itemInitial = target.item;
          user.itemInitial = undefined;
        }
      }
      $Battle.showMessage(i18n._("%1 pickpocketed %2's %3!", target.name,
        user.name, Items.name(target.item)))
      console.log("[Ability triggered] ${target.name}'s Pickpocket stole ${user.name(true)}'s ${Items.name(target.item)}")
    }
  }


  export function AbilityCureCheck(pokemon: Battler) {
    if (pokemon.isFainted()) return;
    switch (pokemon.status) {
      case Statuses.Sleep:
        if (pokemon.hasAbilityIn([Abilitydex.VITALSPIRIT, Abilitydex.INSOMNIA])) {
          console.log(`[Ability triggered] ${pokemon.name}'s ${Abilities.name(pokemon.ability)}`);
          pokemon.cureStatus(false);
          $Battle.showMessage(i18n._("%1's %2 woke it up!", pokemon.name, Abilities.name(pokemon.ability)))
        }
        break;
      case Statuses.Poison:
        if (pokemon.hasAbility(Abilitydex.IMMUNITY)) {
          console.log(`[Ability triggered] ${pokemon.name}'s ${Abilities.name(pokemon.ability)}`);
          pokemon.cureStatus(false);
          $Battle.showMessage(i18n._("%1's %2 cured its poisoning!", pokemon.name, Abilities.name(pokemon.ability)))
        }
        break;
      case Statuses.Burn:
        if (pokemon.hasAbility(Abilitydex.WATERVEIL)) {

          console.log(`[Ability triggered] ${pokemon.name}'s ${Abilities.name(pokemon.ability)}`);
          pokemon.cureStatus(false);
          $Battle.showMessage(i18n._("%1's %2 healed its burn!", pokemon.name, Abilities.name(pokemon.ability)))
        }
        break;
      case Statuses.Paralysis:
        if (pokemon.hasAbility(Abilitydex.LIMBER)) {

          console.log(`[Ability triggered] ${pokemon.name}'s ${Abilities.name(pokemon.ability)}`);
          pokemon.cureStatus(false);
          $Battle.showMessage(i18n._("%1's %2 cured its paralysis!", pokemon.name, Abilities.name(pokemon.ability)))
        }
        break;
      case Statuses.Frozen:
        if (pokemon.hasAbility(Abilitydex.MAGMAARMOR)) {

          console.log(`[Ability triggered] ${pokemon.name}'s ${Abilities.name(pokemon.ability)}`);
          pokemon.cureStatus(false);
          $Battle.showMessage(i18n._("%1's %2 defrosted it!", pokemon.name, Abilities.name(pokemon.ability)))
        }
    }
    if (pokemon.effects.Confusion > 0 && pokemon.hasAbility(Abilitydex.OWNTEMPO)) {

      console.log(`[Ability triggered] ${pokemon.name}'s ${Abilities.name(pokemon.ability)} (attract)`);
      pokemon.cureConfusion(false)
      $Battle.showMessage(i18n._("%1's %2 snapped it out of its confusion!", pokemon.name, Abilities.name(pokemon.ability)))
    }
    if (pokemon.effects.Attract >= 0 && pokemon.hasAbility(Abilitydex.OBLIVIOUS)) {

      console.log(`[Ability triggered] ${pokemon.name}'s ${Abilities.name(pokemon.ability)}`);
      pokemon.cureAttract()
      $Battle.showMessage(i18n._("%1's %2 cured its infatuation status!", pokemon.name, Abilities.name(pokemon.ability)))
    }
    if (pokemon.effects.Taunt > 0 && pokemon.hasAbility(Abilitydex.OBLIVIOUS)) {
      console.log(`[Ability triggered] ${pokemon.name}'s ${Abilities.name(pokemon.ability)} (taunt)`);
      pokemon.effects.Taunt = 0
      $Battle.showMessage(i18n._("%1's %2 made its taunt wear off!", pokemon.name, Abilities.name(pokemon.ability)))
    }
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
