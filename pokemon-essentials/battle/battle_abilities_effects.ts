namespace PE.Abilities {
  Abilities.RegisterEffects(ABILITYDEX.DELTASTREAM, {
    SwitchIn: function(pokemon) {
      if ($BattleManager.weather === WEATHERS.StrongWinds) return;
      $BattleManager.setWeather(WEATHERS.StrongWinds, -1);
      // $BattleManager.showAbilitySign(pokemon);
      let msg = "%1's %2 caused a mysterious air current that protects Flying-type Pokémon!";
      $BattleManager.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Delta Stream made an air current blow`);
    },
    SetWeather: function(source, target, effects) {
      if (effects.weather === WEATHERS.StrongWinds && BattleWeather.isPrimalWeather(effects.weather)) return true;
      return false;
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.DRIZZLE, {
    SwitchIn: function(pokemon) {
      if (!BattleWeather.isPrimalWeather($BattleManager.weather) || $BattleManager.weather === WEATHERS.Rain) return;
      $BattleManager.setWeather(WEATHERS.Rain, 5);
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("It started to rain!"));
      console.log(`[Ability triggered] ${pokemon.name} Drought made it rain`);
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.DROUGHT, {
    SwitchIn: function(pokemon) {
      if (!BattleWeather.isPrimalWeather($BattleManager.weather) || $BattleManager.weather === WEATHERS.HarshSunlight) return;
      // let duration = pokemon.hasItem(Itemdex.HeatRock) ? 8 : 5;
      $BattleManager.setWeather(WEATHERS.HarshSunlight, 5);
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("The sunlight turned harsh!"));
      console.log(`[Ability triggered] ${pokemon.name} Drought made it sunny`);
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.PRIMORDIALSEA, {
    SwitchIn: function(pokemon) {
      if ($BattleManager.weather === WEATHERS.HeavyRain) return;
      $BattleManager.setWeather(WEATHERS.HeavyRain, -1);
      // $BattleManager.showAbilitySign(pokemon);
      let msg = "%1's %2 made a heavy rain begin to fall!";
      $BattleManager.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name}'s Primordial Sea made it rain heavily`);
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.DESOLATELAND, {
    SwitchIn: function(pokemon) {
      if ($BattleManager.weather === WEATHERS.ExtremelyHarshSunlight) return;
      $BattleManager.setWeather(WEATHERS.ExtremelyHarshSunlight, -1);
      // $BattleManager.showAbilitySign(pokemon);
      let msg = "%1's %2 turned the sunlight extremely harsh!";
      $BattleManager.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Desolate Land made the sun shine harshly`);
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.SANDSTREAM, {
    SwitchIn: function(pokemon) {
      if (!BattleWeather.isPrimalWeather($BattleManager.weather) || $BattleManager.weather === WEATHERS.SandStorm) return;
      $BattleManager.setWeather(WEATHERS.SandStorm, 5);
      // $BattleManager.showAbilitySign(pokemon);
      let msg = "%1's %2 whipped up a sandstorm!";
      $BattleManager.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Sand Stream made it sandstorm`);
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.SNOWWARNING, {
    SwitchIn: function(pokemon) {
      if (!BattleWeather.isPrimalWeather($BattleManager.weather) || $BattleManager.weather === WEATHERS.Hail) return;
      $BattleManager.setWeather(WEATHERS.Hail, 5);
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("%1's %2 made it hail!", pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Snow Warning made it hail`);
    }
  });

  Abilities.RegisterEffects([ABILITYDEX.AIRLOCK, ABILITYDEX.CLOUDNINE], {
    SwitchIn: function(pokemon) {
      $BattleManager.showMessage(i18n._("%1 has %2", pokemon.name, Abilities.getName(pokemon.ability)));
      // $BattleManager.clearWeather();
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("The effects of the weather disappeared."));
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.INTIMIDATE, {
    SwitchIn: function(pokemon) {
      for (const battler of pokemon.sides.foe.actives) {
        // $BattleManager.showAbilitySign(pokemon);
        // battler.reduceStat()
        console.log(`[Ability triggered] ${pokemon.name} Intimidate --> ${battler.name}`);
      }
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.FULLMETALBODY, {
    // onBoost: function(target, source) {
    //   if (source && source === target) return;
    //   if (target.stages[stat] < 0) target.stages[stat] === 0;
    // }
  });

  Abilities.RegisterEffects(ABILITYDEX.SWIFTSWIM, {
    // modifyStat: function(stat, acc) {
    //   if (stat !== Stats.Speed) return acc;
    //   if ($BattleManager.weather !== WEATHERS.HeavyRain && $BattleManager.weather === WEATHERS.RainDance) return acc;
    //   return acc * 2;
    // }
  });

  Abilities.RegisterEffects(ABILITYDEX.PRESSURE, {
    SwitchIn: function(pokemon) {
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("%1 is exerting its pressure!", pokemon.name));
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.MOLDBREAKER, {
    SwitchIn: function(pokemon) {
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("%1 breaks the mold!", pokemon.name));
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.TURBOBLAZE, {
    SwitchIn: function(pokemon) {
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("%1 is radiating a blazing aura!", pokemon.name));
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.TERAVOLT, {
    SwitchIn: function(pokemon) {
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("%1 is radiating a bursting aura!", pokemon.name));
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.DARKAURA, {
    SwitchIn: function(pokemon) {
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("%1 is radiating a dark aura!", pokemon.name));
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.FAIRYAURA, {
    SwitchIn: function(pokemon) {
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("%1 is radiating a fairy aura!", pokemon.name));
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.AURABREAK, {
    SwitchIn: function(pokemon) {
      // $BattleManager.showAbilitySign(pokemon);
      $BattleManager.showMessage(i18n._("%1 reversed all other Pokémon's auras!", pokemon.name));
    }
  });

  Abilities.RegisterEffects(ABILITYDEX.SLOWSTART, {
    SwitchIn: function(pokemon) {
      // $BattleManager.showAbilitySign(pokemon);
      var msg = "%1 can't get it going because of its %2!";
      $BattleManager.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
    }
  });
}
