namespace PE {
  Abilities.RegisterEffects(Abilitydex.PRIMORDIALSEA, {
    onSwitchIn: function(pokemon) {
      if ($Battle.weather === Weathers.HeavyRain) return;
      $Battle.setWeather(Weathers.HeavyRain, -1);
      $Battle.showAbilitySign(pokemon);
      let msg = "%1's %2 made a heavy rain begin to fall!";
      $Battle.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name}'s Primordial Sea made it rain heavily`);
    }
  });

  Abilities.RegisterEffects(Abilitydex.DESOLATELAND, {
    onSwitchIn: function(pokemon) {
      if ($Battle.weather === Weathers.HarshSun) return;
      $Battle.setWeather(Weathers.HarshSun, -1);
      $Battle.showAbilitySign(pokemon);
      let msg = "%1's %2 turned the sunlight extremely harsh!";
      $Battle.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Desolate Land made the sun shine harshly`);
    }
  });

  Abilities.RegisterEffects(Abilitydex.DELTASTREAM, {
    onSwitchIn: function(pokemon) {
      if ($Battle.weather === Weathers.StrongWinds) return;
      $Battle.setWeather(Weathers.StrongWinds, -1);
      $Battle.showAbilitySign(pokemon);
      let msg = "%1's %2 caused a mysterious air current that protects Flying-type Pokémon!";
      $Battle.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Delta Stream made an air current blow`);
    }
  });

  Abilities.RegisterEffects(Abilitydex.DRIZZLE, {
    onSwitchIn: function(pokemon) {
      if ($Battle.weather in PrimalWeathers || $Battle.weather === Weathers.RainDance || $Battle.weatherDuration < 0)
        return;
      let duration = pokemon.hasItem(Itemdex.DampRock) ? 8 : 5;
      $Battle.setWeather(Weathers.RainDance, duration);
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._("%1's %2 made it rain!", pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Drizzle made it rain`);
    }
  });

  Abilities.RegisterEffects(Abilitydex.DROUGHT, {
    onSwitchIn: function(pokemon) {
      if ($Battle.weather in PrimalWeathers || $Battle.weather === Weathers.SunnyDay || $Battle.weatherDuration < 0)
        return;
      console.log('llegue aqui');
      let duration = pokemon.hasItem(Itemdex.HeatRock) ? 8 : 5;
      $Battle.setWeather(Weathers.SunnyDay, duration);
      $Battle.showAbilitySign(pokemon);
      let msg = "%1's %2 intensified the sun's rays!";
      $Battle.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Drought made it sunny`);
    }
  });

  Abilities.RegisterEffects(Abilitydex.SANDSTREAM, {
    onSwitchIn: function(pokemon) {
      if ($Battle.weather in PrimalWeathers || $Battle.weather === Weathers.SandStorm || $Battle.weatherDuration < 0)
        return;
      let duration = pokemon.hasItem(Itemdex.SmoothRock) ? 8 : 5;
      $Battle.setWeather(Weathers.SandStorm, duration);
      $Battle.showAbilitySign(pokemon);
      let msg = "%1's %2 whipped up a sandstorm!";
      $Battle.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Sand Stream made it sandstorm`);
    }
  });

  Abilities.RegisterEffects(Abilitydex.SNOWWARNING, {
    onSwitchIn: function(pokemon) {
      if ($Battle.weather in PrimalWeathers || $Battle.weather === Weathers.Hail || $Battle.weatherDuration < 0) return;
      let duration = pokemon.hasItem(Itemdex.IcyRock) ? 8 : 5;
      $Battle.setWeather(Weathers.Hail, duration);
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._("%1's %2 made it hail!", pokemon.name, Abilities.getName(pokemon.ability)));
      console.log(`[Ability triggered] ${pokemon.name} Snow Warning made it hail`);
    }
  });

  Abilities.RegisterEffects([Abilitydex.AIRLOCK, Abilitydex.CLOUDNINE], {
    onSwitchIn: function(pokemon) {
      $Battle.showMessage(i18n._('%1 has %2', pokemon.name, Abilities.getName(pokemon.ability)));
      $Battle.clearWeather();
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._('The effects of the weather disappeared.'));
    }
  });

  Abilities.RegisterEffects(Abilitydex.INTIMIDATE, {
    onSwitchIn: function(pokemon) {
      for (const battler of $Battle.actives) {
        if (pokemon.isOpposing(battler.index) && !battler.hasAbility(Abilitydex.FULLMETALBODY)) {
          $Battle.showAbilitySign(pokemon);
          battler.reduceAttackStatIntimidate(pokemon);
        }
      }
      console.log(`[Ability triggered] ${pokemon.name} Intimidate`);
    }
  });

  Abilities.RegisterEffects(Abilitydex.FULLMETALBODY, {
    // onBoost: function(target, source) {
    //   if (source && source === target) return;
    //   if (target.stages[stat] < 0) target.stages[stat] === 0;
    // }
  });

  Abilities.RegisterEffects(Abilitydex.SWIFTSWIM, {
    // modifyStat: function(stat, acc) {
    //   if (stat !== Stats.Speed) return acc;
    //   if ($Battle.weather !== Weathers.HeavyRain && $Battle.weather === Weathers.RainDance) return acc;
    //   return acc * 2;
    // }
  });

  Abilities.RegisterEffects(Abilitydex.PRESSURE, {
    onSwitchIn: function(pokemon) {
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._('%1 is exerting its pressure!', pokemon.name));
    }
  });

  Abilities.RegisterEffects(Abilitydex.MOLDBREAKER, {
    onSwitchIn: function(pokemon) {
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._('%1 breaks the mold!', pokemon.name));
    }
  });

  Abilities.RegisterEffects(Abilitydex.TURBOBLAZE, {
    onSwitchIn: function(pokemon) {
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._('%1 is radiating a blazing aura!', pokemon.name));
    }
  });

  Abilities.RegisterEffects(Abilitydex.TERAVOLT, {
    onSwitchIn: function(pokemon) {
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._('%1 is radiating a bursting aura!', pokemon.name));
    }
  });

  Abilities.RegisterEffects(Abilitydex.DARKAURA, {
    onSwitchIn: function(pokemon) {
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._('%1 is radiating a dark aura!', pokemon.name));
    }
  });

  Abilities.RegisterEffects(Abilitydex.FAIRYAURA, {
    onSwitchIn: function(pokemon) {
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._('%1 is radiating a fairy aura!', pokemon.name));
    }
  });

  Abilities.RegisterEffects(Abilitydex.AURABREAK, {
    onSwitchIn: function(pokemon) {
      $Battle.showAbilitySign(pokemon);
      $Battle.showMessage(i18n._("%1 reversed all other Pokémon's auras!", pokemon.name));
    }
  });

  Abilities.RegisterEffects(Abilitydex.SLOWSTART, {
    onSwitchIn: function(pokemon) {
      $Battle.showAbilitySign(pokemon);
      var msg = "%1 can't get it going because of its %2!";
      $Battle.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
    }
  });
}
