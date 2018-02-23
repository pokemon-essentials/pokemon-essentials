/// <reference path="rpgmakermv.d/rmmv/rpg_mv.d.ts" />
/// <reference path="pokemon_essentials/settings.ts" />
/// <reference path="pokemon_essentials/trainers.ts" />

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


SceneManager.initNwjs = function () { }


/**
 * load Pokémon database files and store in the given constants.
 */
var $PE_ABILITIES: any;
var $PE_MOVES: any;
var $PE_POKEDEX: any;
var $PE_ITEMS: any;
DataManager.loadDataFile('$PE_ABILITIES', 'pe/abilities.json');
DataManager.loadDataFile('$PE_MOVES', 'pe/moves.json');
DataManager.loadDataFile('$PE_POKEDEX', 'pe/pokedex.json');

//===========================================================================
// Saves and Loads
//===========================================================================
namespace MV {
  export interface SaveContents {
    PEPlayer: PE.Trainers.TrainerData;
  }
}

let DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
  var contents = DataManager_makeSaveContents();
  contents.PEPlayer = $Player.data;
  return contents;
};

let Datamanager_extractSaveContents = DataManager.extractSaveContents
DataManager.extractSaveContents = function (contents) {
  Datamanager_extractSaveContents(contents);
  $Player.data = contents.PEPlayer ? contents.PEPlayer : $Player.data;
};

var $Player = new PE.Trainers.Player();
//===========================================================================

// if debug
// location.search = "test";
