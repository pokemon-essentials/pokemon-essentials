//=============================================================================
// main.js
//=============================================================================
const pokemon_essentials = [
  // Data Enums
  'datadex/pokedex.js',
  'datadex/movedex.js',
  'datadex/abilitydex.js',
  'datadex/itemdex.js',


  'core/character.js',
  'core/pokemon.js',
  'core/sprites.js',
  'core/tiledmap.js',
  'core/utils.js',
  'core/window_message.js',

  'battle/abilities_effects.js',
  'battle/active_side_field.js',
  'battle/battle_manager.js',
  'battle/battle_misc.js',
  'battle/battle_ui.js',
  'battle/battler.js',
  'battle/damage_state.js',
  'battle/moves_effects.js',
  'battle/scene_battle.js',
  'battle/targets.js',

  'enums/environment.js',
  'enums/experience.js',
  'enums/natures.js',
  'enums/stats.js',
  'enums/statuses.js',
  'enums/types.js',
  'enums/weather.js',

  'misc_scenes/scene_intro.js',
  'misc_scenes/scene_party.js',
  'misc_scenes/scene_title.js',

  'items.js',
  'moves.js',
  'trainers.js',
  //
  'settings.js ',
  'i18n.js',
  'bootstrap.js'
]

PluginManager.setupPokemonEssentials = function() {
  for (const filename of pokemon_essentials) {
    this.loadScript(filename);
  }
};

PluginManager.setup($plugins);
PluginManager._path = 'js/pokemon_essentials/';
var PE = PE || {};
PluginManager.setupPokemonEssentials();

window.onload = function() {
  SceneManager.run(Scene_Boot);
};
