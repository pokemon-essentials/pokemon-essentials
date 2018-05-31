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
    var TitleScenes;
    (function (TitleScenes) {
        var StartPressed = false;
        var CustomScene = /** @class */ (function (_super) {
            __extends(CustomScene, _super);
            function CustomScene() {
                var _this = _super.call(this) || this;
                _this.sprites = {};
                return _this;
            }
            CustomScene.prototype.create = function () {
                this.createBackground();
                this.createForeground();
                this.createWindowLayer();
                this.createCommandWindow();
            };
            CustomScene.prototype.start = function () {
                _super.prototype.start.call(this);
                SceneManager.clearStack();
                this.playTitleMusic();
                this.startFadeIn(this.fadeSpeed(), false);
            };
            CustomScene.prototype.update = function () {
                _super.prototype.update.call(this);
                if ((Input.isTriggered('ok') || TouchInput.isTriggered()) && !this.isBusy()) {
                    StartPressed = true;
                }
                if ((Input.isTriggered('cancel') || TouchInput.isCancelled()) && !this.isBusy()) {
                    StartPressed = false;
                }
                if (StartPressed && !this.isBusy()) {
                    this._commandWindow.open();
                }
                else {
                    this._commandWindow.close();
                }
                this.sprites['start'].visible = !StartPressed;
                this.sprites['bgPattern'].origin.x += 1;
                this.sprites['effect1'].rotation += 0.005;
                this.sprites['effects2'].rotation += 0.01;
            };
            CustomScene.prototype.isBusy = function () {
                return this._commandWindow.isClosing() || _super.prototype.isBusy.call(this);
            };
            CustomScene.prototype.terminate = function () {
                _super.prototype.terminate.call(this);
                SceneManager.snapForBackground();
            };
            CustomScene.prototype.createBackground = function () {
                this.sprites['bg'] = new Sprite(ImageManager.loadTitle1('custom_background'));
                this.addChild(this.sprites['bg']);
                this.sprites['bgPattern'] = new TilingSprite(ImageManager.loadPicture('custom_plane'));
                this.sprites['bgPattern'].move(0, 0, Graphics.width, Graphics.height);
                this.addChild(this.sprites['bgPattern']);
                this.sprites['clouds2'] = new Sprite(ImageManager.loadTitle1('custom_clouds_2'));
                this.addChild(this.sprites['clouds2']);
                this.sprites['effect1'] = new Sprite(ImageManager.loadTitle1('custom_effect'));
                this.sprites['effect1'].x = Graphics.width / 2;
                this.sprites['effect1'].y = 325;
                this.sprites['effect1'].anchor.x = 0.5;
                this.sprites['effect1'].anchor.y = 0.5;
                this.addChild(this.sprites['effect1']);
                this.sprites['effects2'] = new Sprite(ImageManager.loadTitle1('gen_6_effect2'));
                this.sprites['effects2'].x = Graphics.width / 2;
                this.sprites['effects2'].y = 325;
                this.sprites['effects2'].anchor.x = 0.5;
                this.sprites['effects2'].anchor.y = 0.5;
                this.addChild(this.sprites['effects2']);
                this.sprites['clouds1'] = new Sprite(ImageManager.loadTitle1('custom_clouds_1'));
                this.addChild(this.sprites['clouds1']);
                this.sprites['bars'] = new Sprite(ImageManager.loadTitle1('custom_bars'));
                this.addChild(this.sprites['bars']);
                this.sprites['start'] = new PE_Sprite_Blinker(20);
                this.sprites['start'].bitmap = ImageManager.loadTitle1('start');
                this.sprites['start'].y = 362;
                this.addChild(this.sprites['start']);
            };
            CustomScene.prototype.createForeground = function () {
                this._pokelogo = new Sprite();
                this._pokelogo.bitmap = ImageManager.loadTitle1('pokelogo');
                this._pokelogo.x = Graphics.width / 2;
                this._pokelogo.y = 24;
                this._pokelogo.anchor.x = 0.5;
                this.addChild(this._pokelogo);
            };
            CustomScene.prototype.createCommandWindow = function () {
                this._commandWindow = new CustomTitleCommandWindow();
                this._commandWindow.setHandler('battle', this.commandNewGame.bind(this));
                this._commandWindow.setHandler('map', this.commandMap.bind(this));
                this._commandWindow.setHandler('newgame', this.command_newGame.bind(this));
                this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
                this._commandWindow.setHandler('options', this.commandOptions.bind(this));
                this.addWindow(this._commandWindow);
            };
            ;
            CustomScene.prototype.commandNewGame = function () {
                DataManager.setupNewGame();
                this._commandWindow.close();
                this.fadeOutAll();
                SceneManager.goto(PE.Battle.Scene_Battle);
                $Player.party = PE.Pokemon.getRandomParty(6);
                // $Player.party = [new PE.Pokemon.Pokemon(PE.Pokedex.GROUDON, 100)];
                $Battle.setup([PE.Trainers.RandomTrainer()], []);
                $Battle.start();
            };
            ;
            CustomScene.prototype.commandMap = function () {
                DataManager.setupNewGame();
                this._commandWindow.close();
                this.fadeOutAll();
                SceneManager.goto(Scene_Map);
            };
            ;
            CustomScene.prototype.commandContinue = function () {
                this._commandWindow.close();
                SceneManager.push(Scene_Load);
            };
            ;
            CustomScene.prototype.commandOptions = function () {
                this._commandWindow.close();
                SceneManager.push(Scene_Options);
            };
            ;
            CustomScene.prototype.command_newGame = function () {
                this._commandWindow.close();
                SceneManager.push(PE.Scene_Intro);
            };
            CustomScene.prototype.playTitleMusic = function () {
                // AudioManager.playBgm($dataSystem.titleBgm);
                AudioManager.stopBgs();
                AudioManager.stopMe();
            };
            ;
            return CustomScene;
        }(Scene_Base));
        TitleScenes.CustomScene = CustomScene;
        var CustomTitleCommandWindow = /** @class */ (function (_super) {
            __extends(CustomTitleCommandWindow, _super);
            function CustomTitleCommandWindow() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CustomTitleCommandWindow.prototype.makeCommandList = function () {
                this.addCommand(i18n._('Wild Battle'), 'battle');
                this.addCommand(i18n._('New Game'), 'newgame');
                this.addCommand(i18n._('Map'), 'map');
                this.addCommand(i18n._('Options'), 'options');
            };
            CustomTitleCommandWindow.prototype.updatePlacement = function () {
                this.x = (Graphics.boxWidth - this.width);
                this.y = Graphics.boxHeight - this.height;
            };
            CustomTitleCommandWindow.prototype.windowWidth = function () {
                return 180;
            };
            return CustomTitleCommandWindow;
        }(Window_TitleCommand));
        TitleScenes.CustomTitleCommandWindow = CustomTitleCommandWindow;
        var Window_SelectPokemon = /** @class */ (function (_super) {
            __extends(Window_SelectPokemon, _super);
            function Window_SelectPokemon() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Window_SelectPokemon.prototype.makeCommandList = function () {
                for (var pokemon in PE.Pokedex) {
                    if (PE.Pokedex.hasOwnProperty(pokemon)) {
                        this.addCommand(pokemon, 'pokemon');
                    }
                }
            };
            Window_SelectPokemon.prototype.updatePlacement = function () {
                this.x = (Graphics.boxWidth - this.width);
                this.y = Graphics.boxHeight - this.height;
            };
            Window_SelectPokemon.prototype.windowWidth = function () {
                return 260;
            };
            Window_SelectPokemon.prototype.numVisibleRows = function () {
                return 9;
            };
            return Window_SelectPokemon;
        }(Window_Command));
        TitleScenes.Window_SelectPokemon = Window_SelectPokemon;
    })(TitleScenes = PE.TitleScenes || (PE.TitleScenes = {}));
})(PE || (PE = {}));
Scene_Boot.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    }
    else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    }
    else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(PE.TitleScenes.CustomScene);
        // Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
};
