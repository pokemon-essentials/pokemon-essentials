SceneManager._screenWidth = SETTINGS.SCREEN_WIDTH;
SceneManager._screenHeight = SETTINGS.SCREEN_HEIGHT;
SceneManager._boxWidth = SETTINGS.SCREEN_WIDTH;
SceneManager._boxHeight = SETTINGS.SCREEN_HEIGHT;

SceneManager.onKeyDown = function(event) {
  if (!event.ctrlKey && !event.altKey) {
    switch (event.keyCode) {
      case 116: // F5
        if (Utils.isNwjs()) {
          location.reload();
        }
        break;
      case 119: // F8
        if (Utils.isNwjs() && Utils.isOptionValid('test')) {
          require('nw.gui').Window.get().showDevTools();
        }
        break;
      case 123: // F12
        if (Utils.isNwjs() && Utils.isOptionValid('test')) {
          require('nw.gui').Window.get().showDevTools();
        }
        break;
    }
  }
};

/**
 * Forces to always uses canvas render to avoid WEBGl MAX_TEXTURE_SIZE error.
 * @override
 */
SceneManager.preferableRendererType = function() {
  return 'canvas';
};
// SceneManager.initNwjs = function() {};
/**
 * load Pokémon database files and store in the given constants.
 */
var $PE_ABILITIES;
var $PE_MOVES;
var $PE_POKEDEX;
var $PE_ITEMS;
DataManager.loadDataFile('$PE_ABILITIES', 'pe/abilities.json');
DataManager.loadDataFile('$PE_MOVES', 'pe/moves.json');
DataManager.loadDataFile('$PE_POKEDEX', 'pe/pokedex.json');

var DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
  var contents = DataManager_makeSaveContents();
  contents.PEPlayer = $Player.data;
  return contents;
};

var Datamanager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
  Datamanager_extractSaveContents(contents);
  $Player.data = contents.PEPlayer ? contents.PEPlayer : $Player.data;
};
var $Player = new PE.Trainers.Player();
