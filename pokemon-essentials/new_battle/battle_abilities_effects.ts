Abilities.RegisterEffects(PE.Abilitydex.DRIZZLE, {
  SwitchIn: function(damage, pokemon) {
    if (!BattleWeather.isPrimalWeather($BattleManager.weather) || $BattleManager.weather === WEATHERS.Rain) return;
    $BattleManager.setWeather(WEATHERS.Rain, 5);
    // $Battle.showAbilitySign(pokemon);
    $BattleManager.showMessage(i18n._("It started to rain!"));
    console.log(`[Ability triggered] ${pokemon.name} Drought made it rain`);
  }
});

Abilities.RegisterEffects(PE.Abilitydex.DROUGHT, {
  SwitchIn: function(pokemon) {
    if (!BattleWeather.isPrimalWeather($BattleManager.weather) || $BattleManager.weather === WEATHERS.HarshSunlight) return;
    // let duration = pokemon.hasItem(Itemdex.HeatRock) ? 8 : 5;
    $BattleManager.setWeather(WEATHERS.HarshSunlight, 5);
    // $Battle.showAbilitySign(pokemon);
    $BattleManager.showMessage(i18n._("The sunlight turned harsh!"));
    console.log(`[Ability triggered] ${pokemon.name} Drought made it sunny`);
  }
});
