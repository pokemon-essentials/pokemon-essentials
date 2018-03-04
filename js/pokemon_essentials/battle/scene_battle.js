var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PE;
(function (PE) {
    var Battle;
    (function (Battle) {
        var Scene_Battle = /** @class */ (function (_super) {
            __extends(Scene_Battle, _super);
            function Scene_Battle() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.layers = { bg: undefined, bg2: undefined, weather: undefined };
                _this.sprites = {};
                return _this;
            }
            Scene_Battle.prototype.create = function () {
                this.viewport = new Sprite(new Bitmap(Graphics.width, Graphics.height));
                this.addChild(this.viewport);
                _super.prototype.create.call(this);
                this.createLayers();
            };
            Scene_Battle.prototype.start = function () {
                _super.prototype.start.call(this);
                $Battle.scene = this;
                if ($Battle.started)
                    this.setWeather($Battle.weather);
                $Battle.changePhase(2 /* ActionSelection */);
            };
            Scene_Battle.prototype.update = function () {
                _super.prototype.update.call(this);
                // if (this.scale.x > 1) this.scale.x -= 0.01;
                // if (this.scale.y > 1) this.scale.y -= 0.01;
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
            };
            Scene_Battle.prototype.stop = function () {
                _super.prototype.stop.call(this);
            };
            Scene_Battle.prototype.terminate = function () {
                _super.prototype.terminate.call(this);
            };
            Scene_Battle.prototype.createLayers = function () {
                this.createBackground();
                this.createBattlers();
                this.createUI();
                this.createWindowLayer();
                this.createMessageWindow();
            };
            Scene_Battle.prototype.createBackground = function () {
                this.layers['bg'] = new Sprite();
                this.layers['bg'].bitmap = ImageManager.loadBitmap('img/battlebacks/', 'bg-forest', undefined, undefined);
                this.layers['bg'].x = Graphics.width / 2;
                this.layers['bg'].y = Graphics.height + 80;
                this.layers['bg'].anchor.x = 0.5;
                this.layers['bg'].anchor.y = 1;
                this.viewport.addChild(this.layers['bg']);
                this.layers['bg2'] = new Sprite();
                this.viewport.addChild(this.layers['bg2']);
            };
            Scene_Battle.prototype.createMessageWindow = function () {
                this.message = new Battle.UI.Window_BattleMessage();
                this.addWindow(this.message);
                this.message.subWindows().forEach(function (window) {
                    this.addWindow(window);
                }, this);
            };
            Scene_Battle.prototype.createBattlers = function () {
                var _this = this;
                for (var _i = 0, _a = $Battle.sides.foe.actives; _i < _a.length; _i++) {
                    var battler = _a[_i];
                    var fx = Graphics.width - 96;
                    var fy = 240;
                    this.sprites[battler.index] = new PE.Sprites.Battler(battler.species, 0 /* Front */, battler.pokemon.shiny);
                    this.sprites[battler.index].x = fx;
                    this.sprites[battler.index].y = fy;
                    this.sprites[battler.index].scale.x = 2;
                    this.sprites[battler.index].scale.y = 2;
                    this.sprites[battler.index].anchor.x = 0.5;
                    this.sprites[battler.index].anchor.y = 1;
                    this.viewport.addChild(this.sprites[battler.index]);
                }
                for (var _b = 0, _c = $Battle.sides.player.actives; _b < _c.length; _b++) {
                    var battler = _c[_b];
                    var x = 96;
                    var y = Graphics.height;
                    this.sprites[battler.index] = new PE.Sprites.Battler(battler.species, 1 /* Back */, battler.pokemon.shiny);
                    this.sprites[battler.index].x = x;
                    this.sprites[battler.index].y = y;
                    this.sprites[battler.index].scale.x = 3;
                    this.sprites[battler.index].scale.y = 3;
                    this.sprites[battler.index].anchor.x = 0.5;
                    this.sprites[battler.index].anchor.y = 1;
                    this.viewport.addChild(this.sprites[battler.index]);
                }
                // let trainer = Math.randomInt(243) + 1;
                // this.sprites['front'] = new Sprites.TrainerFront('BW_' + trainer.padZero(3));
                // this.sprites['front'].x = Graphics.width - 96;
                // this.sprites['front'].anchor.x = 0.5;
                // this.addChild(this.sprites['front']);
                this.sprites['back'] = new PE.Sprites.TrainerBack();
                this.sprites['back'].y = Graphics.height;
                this.sprites['back'].anchor.y = 1;
                this.addChild(this.sprites['back']);
                $Battle.push(function () { return _this.sprites['back'].start(); }, this);
            };
            Scene_Battle.prototype.createUI = function () {
                this.layers.weather = new PE.Weathers.WeatherLayer();
                this.viewport.addChild(this.layers.weather);
                var x = Graphics.width - 168;
                var y = Graphics.height - 108;
                this.battleCommands = new Battle.UI.BattleCommands(x, y);
                this.battleCommands.visible = false;
                this.viewport.addChild(this.battleCommands);
                for (var _i = 0, _a = $Battle.sides.foe.actives; _i < _a.length; _i++) {
                    var battler = _a[_i];
                    var h2 = new Battle.UI.HPBar(battler, Graphics.width - 208, 48, true);
                    this.viewport.addChild(h2);
                }
                for (var _b = 0, _c = $Battle.sides.player.actives; _b < _c.length; _b++) {
                    var battler = _c[_b];
                    this.partyBar = new Battle.UI.HPBar(battler, 16, Graphics.height - 64, false);
                    this.partyBar.visible = false;
                    this.viewport.addChild(this.partyBar);
                    this.movesSelection = new Battle.UI._MovesSelection(battler);
                    this.viewport.addChild(this.movesSelection);
                }
                var msg = i18n._('What will %1 do?', $Battle.battlers[$Battle.currentInx].name);
                this.hud = new Sprite(new Bitmap(300, 32));
                this.hud.bitmap.fontSize = 20;
                this.hud.bitmap.drawText(msg, 0, 0, 300, 32, 'right');
                this.hud.x = Graphics.width - 8;
                this.hud.y = Graphics.height;
                this.hud.anchor.x = 1;
                this.hud.anchor.y = 1;
                this.hud.visible = false;
                this.viewport.addChild(this.hud);
                // this.zoomIn();
            };
            Scene_Battle.prototype.showAbilityIndicator = function (ability, foeSide) {
                var x = 0;
                var y = 192;
                if (foeSide) {
                    x = Graphics.width - 224;
                    y = 96;
                }
                var sing = new Battle.UI.AbilityIndicator(ability);
                sing.x = x;
                sing.y = y;
                this.viewport.addChild(sing);
            };
            Scene_Battle.prototype.setWeather = function (weather) {
                this.layers.weather.setWeather(weather);
            };
            Scene_Battle.prototype.zoomIn = function () {
                this.viewport.scale.x = 2;
                this.viewport.scale.y = 2;
            };
            return Scene_Battle;
        }(Scene_Base));
        Battle.Scene_Battle = Scene_Battle;
    })(Battle = PE.Battle || (PE.Battle = {}));
})(PE || (PE = {}));
