var PE = PE || {};
PE.Battle = PE.Battle || {};

function PE_Spriteset_Battle() {
  this.initialize.apply(this, arguments);
}

PE_Spriteset_Battle.prototype = Object.create(Spriteset_Base.prototype);
PE_Spriteset_Battle.prototype.constructor = PE_Spriteset_Battle;

PE_Spriteset_Battle.prototype.initialize = function () {
  Spriteset_Base.prototype.initialize.call(this);
  this._battlebackLocated = false;
};

PE.Battle.Scene_Battle = function () {
  this.initialize.apply(this, arguments);
}

PE.Battle.Scene_Battle.prototype = Object.create(Scene_Base.prototype);
PE.Battle.Scene_Battle.prototype.constructor = Scene_Battle;

PE.Battle.Scene_Battle.prototype.initialize = function () {
  Scene_Base.prototype.initialize.call(this);
  this.layers = {};
  this.sprites = {};
};

PE.Battle.Scene_Battle.prototype.start = function () {
  Scene_Base.prototype.start.call(this);
  $Battle.scene = this;
  if ($Battle.started)
    this.setWeather($Battle.weather);
  $Battle.changePhase(2 /* ActionSelection */);
};

PE.Battle.Scene_Battle.prototype.create = function () {
  Scene_Base.prototype.create.call(this);
  this.phase = "Intro";
  this.createSpriteset();
  this.createBackground();
  this.createWeather();
  this.createUI();
  this.createWindowLayer();
  this.createMessageWindow();
};

PE.Battle.Scene_Battle.prototype.createSpriteset = function () {
  this._spriteset = new PE_Spriteset_Battle();
  this.addChild(this._spriteset);
};

PE.Battle.Scene_Battle.prototype.createBackground = function () {
  this.layers['bg'] = new Sprite();
  this.layers['bg'].bitmap = ImageManager.loadBitmap('img/battlebacks/', 'bg-earthycave');
  this.layers['bg'].x = Graphics.width / 2;
  this.layers['bg'].y = Graphics.height;
  this.layers['bg'].anchor.x = 0.5;
  this.layers['bg'].anchor.y = 1;
  this._spriteset.addChild(this.layers['bg']);
  this.layers['bg2'] = new Sprite();
  this.addChild(this.layers['bg2']);




  var fx = Graphics.width - 160;
  var fy = 240;
  for (const battler of $Battle.sides.foe.actives) {

    this.sprites[battler.index] = new PE.Sprites.Battler(battler.species, 0 /* Front */, battler.pokemon.shiny);
    this.sprites[battler.index].x = fx;
    this.sprites[battler.index].y = fy;
    this.sprites[battler.index].scale.x = 2;
    this.sprites[battler.index].scale.y = 2;
    this.sprites[battler.index].anchor.x = 0.5;
    this.sprites[battler.index].anchor.y = 1;
    this._spriteset.addChild(this.sprites[battler.index]);
  }
  var px = 192;
  var py = Graphics.height - 64;
  for (var _b = 0, _c = $Battle.sides.player.actives; _b < _c.length; _b++) {
    var battler = _c[_b];
    this.sprites[battler.index] = new PE.Sprites.Battler(battler.species, 1 /* Back */, battler.pokemon.shiny);
    this.sprites[battler.index].x = px;
    this.sprites[battler.index].y = py;
    this.sprites[battler.index].scale.x = 3;
    this.sprites[battler.index].scale.y = 3;
    this.sprites[battler.index].anchor.x = 0.5;
    this.sprites[battler.index].anchor.y = 1;
    this._spriteset.addChild(this.sprites[battler.index]);
  }
  $gameScreen.setZoom(fx, fy, 1.4);
  $gameScreen.startZoom(fx, fy, 1, 40);
  // $Battle.push(function () { $gameScreen.changeWeather('snow', 5, 10) }, this);
  ;
};


PE.Battle.Scene_Battle.prototype.createUI = function () {
  this.layers.weather = new PE.Weathers.WeatherLayer();
  this._spriteset.addChild(this.layers.weather);
  var x = Graphics.width - 174;
  var y = Graphics.height - 112;
  this.battleCommands = new PE.Battle.UI.BattleCommands(x, y);
  this.battleCommands.visible = false;
  this._spriteset.addChild(this.battleCommands);
  for (var _i = 0, _a = $Battle.sides.foe.actives; _i < _a.length; _i++) {
    var battler = _a[_i];
    var h2 = new PE.Battle.UI.HPBar(battler, Graphics.width - 208, 48, true);
    this._spriteset.addChild(h2);
  }
  for (var _b = 0, _c = $Battle.sides.player.actives; _b < _c.length; _b++) {
    var battler = _c[_b];
    this.partyBar = new PE.Battle.UI.HPBar(battler, 16, Graphics.height - 64, false);
    this.partyBar.visible = false;
    this._spriteset.addChild(this.partyBar);
    this.movesSelection = new PE.Battle.UI._MovesSelection(battler);
    this._spriteset.addChild(this.movesSelection);
  }
  var msg = i18n._('What will %1 do?', $Battle.battlers[$Battle.currentInx].name);
  this.hud = new Sprite(new Bitmap(300, 32));
  this.hud.bitmap.fontSize = 24;
  this.hud.bitmap.drawText(msg, 0, 0, 300, 32, 'right');
  this.hud.x = Graphics.width - 8;
  this.hud.y = Graphics.height;
  this.hud.anchor.x = 1;
  this.hud.anchor.y = 1;
  this.hud.visible = false;
  this._spriteset.addChild(this.hud);
  // this.zoomIn();
};


PE.Battle.Scene_Battle.prototype.createWeather = function () {
  this._weather = new PE.Weather();
  this._spriteset.addChild(this._weather);
};

PE.Battle.Scene_Battle.prototype.createMessageWindow = function () {
  this.message = new PE.Battle.UI.Window_BattleMessage();
  this.addWindow(this.message);
  this.message.subWindows().forEach(function (window) {
    this.addWindow(window);
  }, this);
};

PE.Battle.Scene_Battle.prototype.update = function () {
  $gameTimer.update(true);
  $gameScreen.update();
  this.updateWeather()
  Scene_Base.prototype.update.call(this);
  $Battle.update();
  switch ($Battle.phase) {
    case 2 /* ActionSelection */:
      this.partyBar.visible = true;
      this.hud.visible = true;
      this.battleCommands.updateInput();
      break;
    case 3 /* MoveSelection */:
      this.partyBar.visible = false;
      this.hud.visible = false;
      this.movesSelection.updateInput();
      break;
    case 4 /* Animation */:
      this.partyBar.visible = true;
      break;
    default:
      this.partyBar.visible = false;
  }
}

PE.Battle.Scene_Battle.prototype.updateWeather = function () {
  this._weather.type = $gameScreen.weatherType();
  this._weather.power = $gameScreen.weatherPower();
  this._weather.origin.x = 0;
  this._weather.origin.y = 0;
};


PE.Battle.Scene_Battle.prototype.showAbilityIndicator = function (ability, foeSide) {
  var x = 0;
  var y = 192;
  if (foeSide) {
    x = Graphics.width - 224;
    y = 96;
  }
  var sing = new PE.Battle.UI.AbilityIndicator(ability);
  sing.x = x;
  sing.y = y;
  this._spriteset.addChild(sing);
};

PE.Battle.Scene_Battle.prototype.setWeather = function (weather) {
  // this.layers.weather.setWeather(weather);
   $gameScreen.changeWeather('rain', 5, 10);
};
