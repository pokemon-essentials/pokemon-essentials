namespace MV {
  export interface SaveContents {
    PEPlayer: PE.Trainers.TrainerData;
  }
}

var $PE_ABILITIES: any;
var $PE_MOVES: any;
var $PE_POKEDEX: any;
var $PE_ITEMS: any;

var $Player: PE.Trainers.Player = null;

function setup() {
  SceneManager._screenWidth = SETTINGS.SCREEN_WIDTH;
  SceneManager._screenHeight = SETTINGS.SCREEN_HEIGHT;
  SceneManager._boxWidth = SETTINGS.SCREEN_WIDTH;
  SceneManager._boxHeight = SETTINGS.SCREEN_HEIGHT;

  /**
   * Forces to always uses canvas render to avoid WEBGl MAX_TEXTURE_SIZE error.
   * @override
   */
  SceneManager.preferableRendererType = function() {
    return "canvas";
  };

  SceneManager.initNwjs = function() {};

  SceneManager.onKeyDown = function(event) {};

  /**
   * load Pokémon database files and store in the given constants.
   */
  DataManager.loadDataFile("$PE_ABILITIES", "pe/abilities.json");
  DataManager.loadDataFile("$PE_MOVES", "pe/moves.json");
  DataManager.loadDataFile("$PE_POKEDEX", "pe/pokedex.json");

  //===========================================================================
  // Saves and Loads
  //===========================================================================

  $Player = new PE.Trainers.Player();
  let DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    var contents = DataManager_makeSaveContents();
    contents.PEPlayer = $Player.data;
    return contents;
  };

  let Datamanager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    Datamanager_extractSaveContents(contents);
    $Player.data = contents.PEPlayer ? contents.PEPlayer : $Player.data;
  };
  SceneManager.run(Scene_Boot);
}

window.onload = function() {
  setup();
};
