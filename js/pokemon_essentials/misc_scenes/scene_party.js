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
    var Party;
    (function (Party) {
        var Scene_Party = /** @class */ (function (_super) {
            __extends(Scene_Party, _super);
            function Scene_Party() {
                var _this = _super.call(this) || this;
                _this.inx = 0;
                _this.activePanels = [];
                var x = 8;
                var y = 8;
                var spacing = 16;
                _this.panels = [];
                for (var i = 0; i < 3; i++) {
                    _this.panels.push({
                        x: x,
                        y: y,
                        active: false
                    });
                    _this.panels.push({
                        x: x + 256,
                        y: y + spacing,
                        active: false
                    });
                    y += 104;
                }
                _this.sprites = {};
                return _this;
            }
            Scene_Party.prototype.create = function () {
                this.createBackground();
                this.createPanels();
            };
            Scene_Party.prototype.createBackground = function () {
                this.bg = new Sprite();
                this.bg.bitmap = ImageManager.loadBitmap('img/titles1/', 'custom_background', undefined, false);
                this.addChild(this.bg);
            };
            Scene_Party.prototype.createPanels = function () {
                for (var _i = 0, _a = this.panels; _i < _a.length; _i++) {
                    var panel = _a[_i];
                    panel.sprite = new PE_Sprite_Button(224, 96);
                    panel.sprite.bitmap = ImageManager.loadBitmap('img/pictures/party/', 'panels', undefined, undefined);
                    panel.sprite.x = panel.x;
                    panel.sprite.y = panel.y;
                    panel.sprite.changeFrame(2, 0);
                    this.addChild(panel.sprite);
                }
                for (var index = 0; index < $Player.battlers.length; index++) {
                    var pokemon = $Player.battlers[index];
                    var panel_1 = this.panels[index];
                    this.sprites[pokemon.name] = new PE_Sprite_PokeIcon(pokemon, panel_1.sprite.x + 4, panel_1.sprite.y + 2);
                    this.sprites[pokemon.name].scale.x = 2;
                    this.sprites[pokemon.name].scale.y = 2;
                    this.addChild(this.sprites[pokemon.name]);
                    this.sprites['hpbox'] = new Sprite();
                    this.sprites['hpbox'].bitmap = ImageManager.loadBitmap('img/pictures/party/', 'hpbar_box', undefined, undefined);
                    this.sprites['hpbox'].x = 88;
                    this.sprites['hpbox'].y = 40;
                    panel_1.sprite.addChild(this.sprites['hpbox']);
                    this.sprites['hpbar'] = new Sprite();
                    this.sprites['hpbar'].bitmap = ImageManager.loadBitmap('img/pictures/party/', 'hpbar', undefined, undefined);
                    this.sprites['hpbar'].x = 88;
                    this.sprites['hpbar'].y = 40;
                    panel_1.sprite.addChild(this.sprites['hpbar']);
                    this.sprites['text'] = new Sprite(new Bitmap(224, 96));
                    this.sprites['text'].bitmap.fontSize = 20;
                    this.sprites['text'].bitmap.outlineWidth = 4;
                    if (pokemon.gender !== "N") {
                        if (pokemon.gender === "M") {
                            this.sprites['text'].bitmap.textColor = "#00bdf7";
                            // this.sprites['text'].bitmap.shadowColor = "#599";
                            this.sprites['text'].bitmap.drawText('♂', 96, 16, Graphics.width, 24, 'left');
                        }
                        else {
                            this.sprites['text'].bitmap.textColor = "#ff3142";
                            this.sprites['text'].bitmap.shadowColor = "#955";
                            this.sprites['text'].bitmap.drawText('♀', 96, 16, Graphics.width, 24, 'left');
                        }
                        this.sprites['text'].bitmap.textColor = "#fff";
                        // this.sprites['text'].bitmap.shadowColor = "#999";
                        this.sprites['text'].bitmap.drawText(pokemon.name, 112, 16, 224 - 64, 24, 'left');
                    }
                    else {
                        this.sprites['text'].bitmap.textColor = "#fff";
                        // this.sprites['text'].bitmap.shadowColor = "#999";
                        this.sprites['text'].bitmap.drawText(pokemon.name, 96, 16, 224 - 64, 24, 'left');
                    }
                    this.sprites['text'].bitmap.fontSize = 16;
                    this.sprites['text'].bitmap.textColor = "#FFF176";
                    // this.sprites['text'].bitmap.shadowColor = "#993";
                    var width = this.sprites['text'].bitmap.measureTextWidth("Lv. ");
                    this.sprites['text'].bitmap.drawText('Lv. ', 16, 66, 160, 18, 'left');
                    this.sprites['text'].bitmap.textColor = "#FFF";
                    // this.sprites['text'].bitmap.shadowColor = "#999";
                    this.sprites['text'].bitmap.drawText(pokemon.level, 16 + width, 66, 224, 18, 'left');
                    this.sprites['text'].bitmap.fontSize = 16;
                    this.sprites['text'].bitmap.drawText(pokemon.hp + '/' + pokemon.totalhp, 128, 52, 224, 10, 'left');
                    this.sprites['text'].x = 0;
                    this.sprites['text'].y = 0;
                    panel_1.sprite.addChild(this.sprites['text']);
                    panel_1.sprite.changeFrame(1, 0);
                    this.activePanels.push(panel_1);
                }
                this.activePanels[this.inx].sprite.changeFrame(0, 0);
            };
            Scene_Party.prototype.update = function () {
                _super.prototype.update.call(this);
                if (Input.isTriggered('cancel')) {
                    SceneManager.pop();
                    SoundManager.playCancel();
                }
                if (Input.isTriggered('ok')) {
                    if (this.inx != 0) {
                        this.SwitchIn();
                        SceneManager.pop();
                    }
                }
                if (Input.isTriggered('right')) {
                    this.activePanels[this.inx].sprite.changeFrame(1, 0);
                    this.inx++;
                    if (this.inx >= this.activePanels.length) {
                        this.inx = 0;
                    }
                    this.activePanels[this.inx].sprite.changeFrame(0, 0);
                    SoundManager.playCursor();
                }
                if (Input.isTriggered('left')) {
                    this.activePanels[this.inx].sprite.changeFrame(1, 0);
                    this.inx--;
                    if (this.inx < 0) {
                        this.inx = this.activePanels.length - 1;
                    }
                    this.activePanels[this.inx].sprite.changeFrame(0, 0);
                    SoundManager.playCursor();
                }
                if (Input.isTriggered('down')) {
                    if (this.activePanels.length < 2)
                        return;
                    this.activePanels[this.inx].sprite.changeFrame(1, 0);
                    this.inx += 2;
                    if (this.inx >= this.activePanels.length) {
                        this.inx = Math.abs(this.activePanels.length - this.inx);
                    }
                    this.activePanels[this.inx].sprite.changeFrame(0, 0);
                    SoundManager.playCursor();
                }
                if (Input.isTriggered('up')) {
                    if (this.activePanels.length < 2)
                        return;
                    this.activePanels[this.inx].sprite.changeFrame(1, 0);
                    this.inx -= 2;
                    if (this.inx < 0) {
                        this.inx = this.activePanels.length - Math.abs(this.inx);
                    }
                    this.activePanels[this.inx].sprite.changeFrame(0, 0);
                    SoundManager.playCursor();
                }
            };
            Scene_Party.prototype.SwitchIn = function () {
                if ($Battle.canSwitch($Battle.currentInx, $Player.battlers[this.inx].index, false)) {
                    $Battle.switchIn($Player.battlers[this.inx].index);
                }
                // let aux = $Player.party[0];
                // $Player.party[0] = $Player.party[this.inx];
                // $Player.party[this.inx] = aux;
            };
            return Scene_Party;
        }(Scene_Base));
        Party.Scene_Party = Scene_Party;
    })(Party = PE.Party || (PE.Party = {}));
})(PE || (PE = {}));
