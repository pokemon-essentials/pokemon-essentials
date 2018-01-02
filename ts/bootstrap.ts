/// <reference path="pokemon_essentials/settings.ts" />
SceneManager._screenWidth = SETTINGS.SCREEN_WIDTH;
SceneManager._screenHeight = SETTINGS.SCREEN_HEIGHT;
SceneManager._boxWidth = SETTINGS.SCREEN_WIDTH;
SceneManager._boxHeight = SETTINGS.SCREEN_HEIGHT;

/**
 * Forces to always uses canvas render to avoid WEBGl MAX_TEXTURE_SIZE error.
 * @override
 */
SceneManager.preferableRendererType = function () {
  return 'canvas';
};


/**
 * load Pokémon database files and store in the given constants.
 */
var $PE_ABILITIES: any;
var $PE_MOVES: any;
var $PE_POKEDEX: any;
DataManager.loadDataFile('$PE_ABILITIES', 'pe/abilities.json');
DataManager.loadDataFile('$PE_MOVES', 'pe/moves.json');
DataManager.loadDataFile('$PE_POKEDEX', 'pe/pokedex.json');



Scene_Title.prototype.commandNewGame = function () {
  DataManager.setupNewGame();
  this._commandWindow.close();
  this.fadeOutAll();
  console.log(PE.Pokemon.getRandomPokemon());
  SceneManager.goto(Scene_Map);
};