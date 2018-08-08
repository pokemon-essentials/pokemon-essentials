Abilities.RegisterEffects(PE.Abilitydex.PRIMORDIALSEA, {
  BasePower: function(damage, pokemon) {
    console.log("base power primodial sea");
  }
});
Abilities.RegisterEffects(PE.Abilitydex.DROUGHT, {
  SwitchIn: function(pokemon) {
    // if ($Battle.weather in PE.PrimalWeathers || $Battle.weather === PE.Weathers.SunnyDay || $Battle.weatherDuration < 0) return;
    // let duration = pokemon.hasItem(Itemdex.HeatRock) ? 8 : 5;
    // $Battle.setWeather(Weathers.SunnyDay, duration);
    // $Battle.showAbilitySign(pokemon);
    let msg = "%1's %2 intensified the sun's rays!";
    $BattleManager.showMessage(i18n._(msg, pokemon.name, Abilities.getName(pokemon.ability)));
    console.log(`[Ability triggered] ${pokemon.name} Drought made it sunny`);
  }
});
