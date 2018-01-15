namespace PE.Abilities {
  export function name(id: string) {
    return i18n._($PE_ABILITIES[id].name);
  }

  /**
   * Activate the Pokémon **Switch in** abilities effects.
   * @param pokemon the switch in Pokémon
   * @param onactive
   */
  export function onSwitchInEffects(pokemon: PE.Battle.Battler, onactive: boolean) {
    if (pokemon.isFainted()) return;
    // if (onactive) {
    //   battler.battle.pbPrimalReversion(battler.index);
    // }

    //------------------------------------------------------------------------------------------------------------------
    // #region Wheaters abilities
    if (onactive) {
      if (pokemon.hasAbility('PRIMORDIALSEA') && $Battle.weather != PE.Weathers.HeavyRain) {
        $Battle.setWeather(PE.Weathers.HeavyRain, -1);
        $Battle.showAbilityIndicator(pokemon);
        let msg = "%1's %2 made a heavy rain begin to fall!";
        $Battle.showMessage(i18n._(msg, pokemon.name, PE.Abilities.name(pokemon.ability)));
        console.log(`[Ability triggered] ${pokemon.name}'s Primordial Sea made it rain heavily`);
      }
      if (pokemon.hasAbility('DESOLATELAND') && $Battle.weather != PE.Weathers.HarshSun) {
        $Battle.setWeather(PE.Weathers.HarshSun, -1);
        $Battle.showAbilityIndicator(pokemon);
        let msg = "%1's %2 turned the sunlight extremely harsh!"
        $Battle.showMessage(i18n._(msg, pokemon.name, PE.Abilities.name(pokemon.ability)));
        console.log(`[Ability triggered] ${pokemon.name} Desolate Land made the sun shine harshly`);
      }
      if (pokemon.hasAbility('DELTASTREAM') && $Battle.weather != PE.Weathers.StrongWinds) {
        $Battle.setWeather(PE.Weathers.StrongWinds, -1);
        $Battle.showAbilityIndicator(pokemon);
        let msg = "%1's %2 caused a mysterious air current that protects Flying-type Pokémon!";
        $Battle.showMessage(i18n._(msg, pokemon.name, PE.Abilities.name(pokemon.ability)));
        console.log(`[Ability triggered] ${pokemon.name} Delta Stream made an air current blow`);
      }
      if (!($Battle.weather in PE.PrimalWeathers)) {
        if (pokemon.hasAbility('DRIZZLE') && ($Battle.weather !== PE.Weathers.RainDance || $Battle.weatherduration !== -1)) {
          let weatherduration = pokemon.hasItem('DAMPROCK') ? 8 : 5;
          $Battle.setWeather(PE.Weathers.RainDance, weatherduration);
          $Battle.showAbilityIndicator(pokemon);
          let msg = "%1's %2 made it rain!";
          $Battle.showMessage(i18n._(msg, pokemon.name, PE.Abilities.name(pokemon.ability)));
          console.log(`[Ability triggered] ${pokemon.name} Drizzle made it rain`);
        }
        if (pokemon.hasAbility('DROUGHT') && ($Battle.weather !== PE.Weathers.SunnyDay || $Battle.weatherduration !== -1)) {
          let weatherduration = pokemon.hasItem('HEATROCK') ? 8 : 5;
          $Battle.setWeather(PE.Weathers.SunnyDay, weatherduration);
          $Battle.showAbilityIndicator(pokemon);
          let msg = "%1's %2 intensified the sun's rays!";
          $Battle.showMessage(i18n._(msg, pokemon.name, PE.Abilities.name(pokemon.ability)));
          console.log(`[Ability triggered] ${pokemon.name} Drought made it sunny`);
        }
        if (pokemon.hasAbility('SANDSTREAM') && ($Battle.weather !== PE.Weathers.SandStorm || $Battle.weatherduration !== -1)) {
          let weatherduration = pokemon.hasItem('SMOOTHROCK') ? 8 : 5;
          $Battle.setWeather(PE.Weathers.SandStorm, weatherduration);
          $Battle.showAbilityIndicator(pokemon);
          let msg = "%1's %2 whipped up a sandstorm!";
          $Battle.showMessage(i18n._(msg, pokemon.name, PE.Abilities.name(pokemon.ability)));
          console.log(`[Ability triggered] ${pokemon.name} Sand Stream made it sandstorm`);
        }
        if (pokemon.hasAbility('SNOWWARNING') && ($Battle.weather != PE.Weathers.Hail || $Battle.weatherduration != -1)) {
          let weatherduration = pokemon.hasItem('ICYROCK') ? 8 : 5;
          $Battle.setWeather(PE.Weathers.Hail, weatherduration);
          $Battle.showAbilityIndicator(pokemon);
          // battler.battle.pbCommonAnimation("Hail",null,null)
          $Battle.showMessage(i18n._("%1's %2 made it hail!", pokemon.name, PE.Abilities.name(pokemon.ability)));
          console.log(`[Ability triggered] ${pokemon.name} Snow Warning made it hail`);
        }
      }
      if (pokemon.hasAbility('AIRLOCK') || pokemon.hasAbility('CLOUDNINE')) {
        $Battle.clearWeather();
        $Battle.showAbilityIndicator(pokemon);
        $Battle.showMessage(i18n._("%1 has %2", pokemon.name, PE.Abilities.name(pokemon.ability)));
        $Battle.showMessage(i18n._("The effects of the weather disappeared."))
      }
    }
    // #endregion
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Trace - When it enters a battle, the Pokémon copies an opposing Pokémon's Ability.
    // Evaluate traced first will evaluate the abilities effect below when the swap is over
    if (pokemon.hasAbility('TRACE')) {
      let choices: PE.Battle.Battler[] = [];
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index)) {
          if (!battler.hasAbilityIn(['TRACE', 'MULTITYPE', 'FLOWERGIFT', 'IMPOSTER', 'STANCECHANGE', 'RKSSYSTEMS',
            'ILLUSION', 'ZENMODE', 'STANGECHANGE', 'POWEROFALCHEMY', 'RECEIVER', 'SCHOOLING', 'COMATOSE', 'SHIELDDOWN',
            'DISGUISE', 'BATTLEBOND', 'POWERCONSTRUCT'])) {
            choices.push(battler);
          }
        }
      }
      if (choices.length > 0) {
        let choice = choices[Math.randomInt(choices.length)];
        $Battle.showAbilityIndicator(pokemon);
        pokemon.ability = choice.ability;
        let abilityname = PE.Abilities.name(choice.ability);
        $Battle.showMessage(i18n._("%1 traced %2's %3", pokemon.name, choice.name, abilityname));
        console.log(`[Ability triggered] ${pokemon.name} Trace turned into ${abilityname} from ${choice.name}`);
      }
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Intimidate - Intimidates opposing Pokémon upon entering battle, lowering their Attack stat.
    if (pokemon.hasAbility('INTIMIDATE') && onactive) {
      console.log(`[Ability triggered] ${pokemon.name} Intimidate`);
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index) && !battler.hasAbility('FULLMETALBODY')) {
          $Battle.showAbilityIndicator(pokemon);
          battler.reduceAttackStatIntimidate(pokemon);
        }
      }
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Download - Compares an opposing Pokémon's Defense and Sp. Def stats before raising its own Attack or Sp. Atk stat
    // whichever will be more effective.
    if (pokemon.hasAbility('DOWNLOAD') && onactive) {
      let odef = 0, ospd = 0;
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index)) {
          odef += battler.defense;
          ospd += battler.spdef;
        }
      }
      $Battle.showAbilityIndicator(pokemon);
      if (ospd > odef) {
        if (pokemon.increaseStatWithCause(PE.Stats.Attack, 1, pokemon, PE.Abilities.name(pokemon.ability))) {
          console.log(`[Ability triggered] ${pokemon.name} Download (raising Attack)`);
        }
      } else {
        if (pokemon.increaseStatWithCause(PE.Stats.SpAtk, 1, pokemon, PE.Abilities.name(pokemon.ability))) {
          console.log(`[Ability triggered] ${pokemon.name} Download (raising SpAtk)`);
        }
      }
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Frisk - When it enters a battle, the Pokémon can check an opposing Pokémon's held item.
    if (pokemon.hasAbility('FRISK') && $Battle.ownedByPlayer(pokemon.index) && onactive) {
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index) && battler.item && !battler.isFainted()) {
          console.log(`[Ability triggered] ${pokemon.name} Frisk`);
          $Battle.showAbilityIndicator(pokemon);
          $Battle.showMessage(i18n._(`%1 frisked the foe and found one %2!`, pokemon.name, PE.Items.name(battler.item)));
        }
      }
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Anticipation - The Pokémon can sense an opposing Pokémon's dangerous moves.
    if (pokemon.hasAbility('ANTICIPATION') && $Battle.ownedByPlayer(pokemon.index) && onactive) {
      let found = false;
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index) && !battler.isFainted()) {
          for (const move of battler.moveset) {
            let effectiveness = PE.Types.effectiveness(move.type, pokemon.types, pokemon.effects[PE.Effects.Type3]);
            if ((effectiveness >= 2 && move.basePower > 0) || PE.Moves.isOHKOMove(move.id)) {
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
    // if battler.hasAbility('FOREWARN') && $Battle.pbOwnedByPlayer?(@index) && onactive
    //   console.log("[Ability triggered] #{pbThis} has Forewarn")
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
    //     $Battle.showMessage(i18n._("${battler.name}'s Forewarn alerted it to {2}!",pbThis,movename))
    //   end
    // end
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Pressure message
    if (pokemon.hasAbility('PRESSURE') && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is exerting its pressure!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Mold Breaker message
    if (pokemon.hasAbility('MOLDBREAKER') && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 breaks the mold!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Turboblaze message
    if (pokemon.hasAbility('TURBOBLAZE') && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is radiating a blazing aura!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Teravolt message
    if (pokemon.hasAbility('TERAVOLT') && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is radiating a bursting aura!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Dark Aura message
    if (pokemon.hasAbility('DARKAURA') && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is radiating a dark aura!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Fairy Aura message
    if (pokemon.hasAbility('FAIRYAURA') && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 is radiating a fairy aura!`, pokemon.name));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Aura Break message
    if (pokemon.hasAbility('AURABREAK') && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      $Battle.showMessage(i18n._(`%1 reversed all other Pokémon's auras!`, pokemon.name))
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Slow Start message
    if (pokemon.hasAbility('SLOWSTART') && onactive) {
      $Battle.showAbilityIndicator(pokemon);
      let msg = "%1 can't get it going because of its %2!";
      $Battle.showMessage(i18n._(msg, pokemon.name, PE.Abilities.name(pokemon.ability)));
    }
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Imposter - The Pokémon transforms itself into the Pokémon it's facing.
    // if battler.hasAbility('IMPOSTER') && !@effects[PBEffects::Transform] && onactive
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
    //   if choice.effects[PBEffects::Transform] ||
    //      choice.effects[PBEffects::Illusion] ||
    //      choice.effects[PBEffects::Substitute]>0 ||
    //      choice.effects[PBEffects::SkyDrop] ||
    //      blacklist.include?(PBMoveData.new(choice.effects[PBEffects::TwoTurnAttack]).function)
    //     console.log("[Ability triggered] ${pokemon.name} Imposter couldn't transform")
    //   else
    //     console.log("[Ability triggered] ${pokemon.name} Imposter")
    //     $Battle.pbAnimation(getConst(PBMoves,:TRANSFORM),self,choice)
    //     @effects[PBEffects::Transform]=true
    //     @type1=choice.type1
    //     @type2=choice.type2
    //     @effects[PBEffects::Type3]=-1
    //     @ability=choice.ability
    //     @attack=choice.attack
    //     @defense=choice.defense
    //     @speed=choice.speed
    //     @spatk=choice.spatk
    //     @spdef=choice.spdef
    //     for i in [PBStats::ATTACK,PBStats::DEFENSE,PBStats::SPEED,
    //               PBStats::SPATK,PBStats::SPDEF,PBStats::ACCURACY,PBStats::EVASION]
    //       @stages[i]=choice.stages[i]
    //     end
    //     for i in 0...4
    //       @moves[i]=PokeBattle_Move.pbFromPBMove($Battle,PBMove.new(choice.moves[i].id))
    //       @moves[i].pp=5
    //       @moves[i].totalpp=5
    //     end
    //     @effects[PBEffects::Disable]=0
    //     @effects[PBEffects::DisableMove]=0
    //     $Battle.showMessage(i18n._("${battler.name} transformed into {2}!",pbThis,choice.pbThis(true)))
    //     console.log("[Pokémon transformed] #{pbThis} transformed into #{choice.pbThis(true)}")
    //   end
    // end
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    // Air Balloon message
    if (pokemon.hasItem('AIRBALLOON') && onactive) {
      $Battle.showMessage(i18n._("%1 floats in the air with its %2!", pokemon.name, PE.Items.name(pokemon.item)));
    }
    //------------------------------------------------------------------------------------------------------------------


  }
}
