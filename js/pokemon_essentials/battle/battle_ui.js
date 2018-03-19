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
    var UI;
    (function (UI) {
      UI.actionsInx = 0;
      UI.movesInx = 0;
      var Window_BattleMessage = /** @class */ (function (_super) {
        __extends(Window_BattleMessage, _super);
        function Window_BattleMessage() {
          return _super.call(this) || this;
        }
        Window_BattleMessage.prototype.loadFrameSkin = function () {
          this.frameskin = ImageManager.loadSystem('battle_message_skin');
        };
        Window_BattleMessage.prototype.normalColor = function () {
          return "#ffffff";
        };
        ;
        return Window_BattleMessage;
      }(Window_Message));
      UI.Window_BattleMessage = Window_BattleMessage;
      var AbilityIndicator = /** @class */ (function (_super) {
        __extends(AbilityIndicator, _super);
        function AbilityIndicator(ability) {
          var _this = _super.call(this, new Bitmap(224, 32)) || this;
          _this.ability = ability;
          _this.bitmap.outlineWidth = 3;
          _this.bitmap.fontSize = 20;
          _this.bitmap.fillAll('rgba(0,0,0,0.7)');
          _this.bitmap.drawText(Battle.Abilities.name(ability), 0, 0, 224, 32, 'center');
          _this.ticks = 0;
          return _this;
        }
        AbilityIndicator.prototype.update = function () {
          _super.prototype.update.call(this);
          this.ticks++;
          if (this.ticks > 60) {
            $Battle.waitMode = 0 /* None */;
            this.destroy();
          }
        };
        return AbilityIndicator;
      }(Sprite));
      UI.AbilityIndicator = AbilityIndicator;
      var HPBar = /** @class */ (function (_super) {
        __extends(HPBar, _super);
        function HPBar(pokemon, _x, _y, foe) {
          var _this = _super.call(this) || this;
          _this.pokemon = pokemon;
          _this._x = _x;
          _this._y = _y;
          _this.foe = foe;
          _this.currentHP = _this.pokemon.hp;
          _this.pokemon.hpbar = _this;
          _this.__damage = 0;
          // this.__heal = 0;
          _this.create();
          _this.animate = false;
          _this.setWidth();
          return _this;
          // this.completeCallbacks = [];
        }
        HPBar.prototype.create = function () {
          this.box = new Sprite();
          this.box.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'hp_box');
          this.box.x = this._x;
          this.box.y = this._y;
          this.addChild(this.box);
          this.bar = new Sprite();
          this.bar.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'hp_bar');
          this.bar.x = this._x;
          this.bar.y = this._y;
          this.addChild(this.bar);
          this.text = new Sprite(new Bitmap(Graphics.width, Graphics.height));
          this.text.x = 0;
          this.text.y = 0;
          this.text.bitmap.fontSize = 24;
          this.text.bitmap.outlineWidth = 4;
          this.text.bitmap.textColor = "#fff";
          this.text.bitmap.drawText(this.pokemon.nickname, this._x, this._y - 26, Graphics.width, 24, 'left');
          this.text.bitmap.fontSize = 18;
          this.text.bitmap.textColor = "#ff0";
          var w1 = this.text.bitmap.measureTextWidth("Lv. " + this.pokemon.level);
          this.text.bitmap.drawText('Lv. ', this._x + (192 - w1), this._y - 24, Graphics.width, 24, 'left');
          this.text.bitmap.textColor = "#fff";
          var w2 = this.text.bitmap.measureTextWidth("" + this.pokemon.level);
          this.text.bitmap.drawText("" + this.pokemon.level, this._x + (192 - w2), this._y - 24, Graphics.width, 24, 'left');
          if (this.pokemon.gender !== "N") {
            if (this.pokemon.gender === "M") {
              var w3 = this.text.bitmap.measureTextWidth('♂ ');
              this.text.bitmap.textColor = "#00bdf7";
              this.text.bitmap.drawText('♂', this._x + (192 - w1 - w3), this._y - 24, Graphics.width, 24, 'left');
            }
            else {
              var w3 = this.text.bitmap.measureTextWidth('♀ ');
              this.text.bitmap.textColor = "#ff3142";
              this.text.bitmap.drawText('♀', this._x + (192 - w1 - w3), this._y - 24, Graphics.width, 24, 'left');
            }
          }
          if (!this.foe) {
            this.expbox = new Sprite();
            this.expbox.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'exp_box');
            this.expbox.x = this._x;
            this.expbox.y = this.box.y + 26;
            this.addChild(this.expbox);
            this.expbar = new Sprite();
            this.expbar.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'exp_bar');
            this.expbar.x = this._x;
            this.expbar.y = this.box.y + 26;
            this.expbar.setFrame(0, 0, 62, 8);
            this.addChild(this.expbar);
            this.indicator = new Sprite(new Bitmap(Graphics.height, Graphics.width));
            this.indicator.bitmap.textColor = "#fff";
            this.indicator.bitmap.fontSize = 18;
            this.indicator.bitmap.drawText(this.pokemon.hp + "/" + this.pokemon.hp, this._x + 32, this.box.y + 8, 200, 24, 'left');
            this.addChild(this.indicator);
          }
          this.addChild(this.text);
        };
        HPBar.prototype.update = function () {
          _super.prototype.update.call(this);
          if (this.animate && this.__damage > 0)
            this.updateDamage();
        };
        HPBar.prototype.damage = function (hp) {
          this.__damage = hp;
        };
        HPBar.prototype.updateDamage = function () {
          this.currentHP--;
          this.__damage--;
          if (this.indicator) {
            this.indicator.bitmap.clear();
            this.indicator.bitmap.drawText(this.currentHP + "/" + this.pokemon.totalhp, this._x + 32, this.box.y + 8, 200, 24, 'left');
          }
          // 192 is original the bar width
          var width = Math.max(0, (192 * this.currentHP) / this.pokemon.totalhp);
          this.bar.setFrame(0, 0, width, 24);
          if (this.currentHP === 0) {
            this.__damage = 0;
          }
          if (this.__damage === 0) {
            this.complete();
          }
        };
        HPBar.prototype.start = function () {
          this.animate = true;
        };
        HPBar.prototype.onComplete = function (callback) {
          // this.completeCallbacks.push(callback);
        };
        HPBar.prototype.complete = function () {
          $Battle.waitMode = 0 /* None */;
          $Battle.changePhase(0 /* None */);
          // for (const callback of this.completeCallbacks) {
          //   callback();
          // }
          this.animate = false;
        };
        HPBar.prototype.setWidth = function () {
          var width = Math.max(0, (192 * this.currentHP) / this.pokemon.totalhp);
          this.bar.setFrame(0, 0, width, 24);
        };
        return HPBar;
      }(Sprite));
      UI.HPBar = HPBar;
      var CommandButton = /** @class */ (function (_super) {
        __extends(CommandButton, _super);
        function CommandButton(name, frame, x, y) {
          var _this = _super.call(this, 80, 40) || this;
          _this.name = name;
          _this.frame = frame;
          _this.x = x;
          _this.y = y;
          _this._active = false;
          _this.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'battle_buttons');
          _this.changeFrame(0, _this.frame);
          _this._text = new Sprite(new Bitmap(80, 40));
          _this._text.bitmap.fontSize = 24;
          _this._text.bitmap.outlineWidth = 4;
          _this._text.bitmap.outlineColor = "rgba(0,0,0, 0.3)";
          _this._text.bitmap.drawText(_this.name, 0, 8, 80, 24, 'center');
          _this._text.x = 0;
          _this._text.y = 0;
          _this._text.visible = true;
          _this._text.opacity = 200;
          _this.addChild(_this._text);
          return _this;
        }
        Object.defineProperty(CommandButton.prototype, "active", {
          set: function (_active) {
            this._active = _active;
            if (_active) {
              this.changeFrame(0, this.frame);
            }
            else {
              this.changeFrame(1, this.frame);
            }
            this._text.visible = this._active;
          },
          enumerable: true,
          configurable: true
        });
        return CommandButton;
      }(PE.Sprites.Button));
      UI.CommandButton = CommandButton;
      var MoveButton = /** @class */ (function (_super) {
        __extends(MoveButton, _super);
        function MoveButton(move, x, y) {
          var _this = _super.call(this, 192, 64) || this;
          _this.x = x;
          _this.y = y;
          _this._active = false;
          // this.frame = frame;
          // this.name = name;
          // this.startY = y;
          _this.row = parseInt(PE.Types[move.type]);
          _this.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'moves_buttons');
          _this.changeFrame(1, _this.row);
          _this.idletext = new Sprite(new Bitmap(192, 64));
          _this.idletext.bitmap.fontSize = 18;
          _this.idletext.bitmap.outlineWidth = 4;
          _this.idletext.bitmap.outlineColor = "rgba(0,0,0, 0.3)";
          _this.idletext.bitmap.drawText(move.name, 0, 20, 192, 20, 'center');
          _this.idletext.x = 0;
          _this.idletext.y = 0;
          _this.addChild(_this.idletext);
          _this.activeText = new Sprite(new Bitmap(192, 64));
          _this.activeText.x = 0;
          _this.activeText.y = 0;
          _this.activeText.bitmap.outlineWidth = 4;
          _this.activeText.bitmap.outlineColor = PE.Types.color(move.type);
          _this.activeText.bitmap.fontSize = 18;
          _this.activeText.bitmap.drawText(move.name, 14, 10, 164, 20, 'center');
          _this.activeText.bitmap.fontSize = 14;
          _this.activeText.bitmap.drawText(move.type, 14, 36, 192, 20, 'left');
          _this.activeText.bitmap.drawText("PP " + move.pp + "/" + move.pp, 0, 36, 178, 20, 'right');
          _this.activeText.visible = false;
          _this.addChild(_this.activeText);
          return _this;
        }
        MoveButton.prototype.activate = function () {
          this.idletext.visible = false;
          this.activeText.visible = true;
          this.changeFrame(0, this.row);
        };
        MoveButton.prototype.deactivate = function () {
          this.idletext.visible = true;
          this.activeText.visible = false;
          this.changeFrame(1, this.row);
        };
        return MoveButton;
      }(PE.Sprites.Button));
      UI.MoveButton = MoveButton;
      var _MovesSelection = /** @class */ (function (_super) {
        __extends(_MovesSelection, _super);
        function _MovesSelection(_pokemon) {
          var _this = _super.call(this) || this;
          _this._pokemon = _pokemon;
          var x = Graphics.width - 392, y = Graphics.height - 120;
          _this._pos = [{ x: x, y: y }, { x: x + 196, y: y }, { x: x, y: y + 52 }, { x: x + 196, y: y + 52 }];
          _this._moves = [];
          _this.createBackground();
          _this.createButtons();
          _this.visible = false;
          return _this;
        }
        _MovesSelection.prototype.createBackground = function () {
          // this._bg = new Sprite();
          // this._bg.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'moves_overlay');
          // this._bg.x = Graphics.width;
          // this._bg.y = Graphics.height - 152;
          // this._bg.anchor.x = 1;
          // this.addChild(this._bg);
          this._backButton = new Sprite();
          this._backButton.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'back_button');
          this._backButton.x = 0;
          this._backButton.y = Graphics.height - 4;
          this._backButton.anchor.y = 1;
          this.addChild(this._backButton);
          var backtext = new Sprite(new Bitmap(64, 40));
          backtext.bitmap.fontSize = 20;
          backtext.bitmap.outlineWidth = 4;
          backtext.bitmap.drawText(i18n._('BACK'), 8, 10, 64, 20, 'left');
          backtext.x = 0;
          backtext.y = Graphics.height - 4;
          backtext.anchor.y = 1;
          this.addChild(backtext);
        };
        _MovesSelection.prototype.createButtons = function () {
          var i = 0;
          for (var _i = 0, _a = this._pokemon.moveset; _i < _a.length; _i++) {
            var move = _a[_i];
            var button = new MoveButton(move, this._pos[i].x, this._pos[i].y);
            this._moves.push(button);
            this.addChild(button);
            i++;
          }
          this._moves[UI.movesInx].activate();
        };
        _MovesSelection.prototype.updateInput = function () {
          if (!this.visible)
            this.visible = true;
          if (Input.isTriggered('cancel')) {
            $Battle.changePhase(2 /* ActionSelection */);
            this.visible = false;
          }
          if (Input.isTriggered('right')) {
            if (this._moves.length <= 1)
              return;
            this._moves[UI.movesInx].deactivate();
            UI.movesInx++;
            if (UI.movesInx >= this._moves.length)
              UI.movesInx = 0;
            this._moves[UI.movesInx].activate();
            SoundManager.playCursor();
            return;
          }
          if (Input.isTriggered('left')) {
            if (this._moves.length <= 1)
              return;
            this._moves[UI.movesInx].deactivate();
            UI.movesInx--;
            if (UI.movesInx < 0)
              UI.movesInx = this._moves.length - 1;
            this._moves[UI.movesInx].activate();
            SoundManager.playCursor();
            return;
          }
          if (Input.isTriggered('down')) {
            if (this._moves.length < 2)
              return;
            this._moves[UI.movesInx].deactivate();
            UI.movesInx += 2;
            if (UI.movesInx >= this._moves.length)
              UI.movesInx = Math.abs(this._moves.length - UI.movesInx);
            this._moves[UI.movesInx].activate();
            SoundManager.playCursor();
            return;
          }
          if (Input.isTriggered('up')) {
            if (this._moves.length <= 2)
              return;
            this._moves[UI.movesInx].deactivate();
            UI.movesInx -= 2;
            if (UI.movesInx < 0)
              UI.movesInx = this._moves.length - Math.abs(UI.movesInx);
            this._moves[UI.movesInx].activate();
            SoundManager.playCursor();
            return;
          }
          if (Input.isTriggered('ok')) {
            this.visible = false;
            var move = this._pokemon.moveset[UI.movesInx];
            $Battle.choose(move, $Battle.sides.foe.actives[0]);
            $Battle.changePhase(0 /* None */);
            $Battle.runActions();
          }
        };
        return _MovesSelection;
      }(Sprite));
      UI._MovesSelection = _MovesSelection;
      var BattleCommands = /** @class */ (function (_super) {
        __extends(BattleCommands, _super);
        function BattleCommands(x, y) {
          var _this = _super.call(this) || this;
          _this.x = 320;
          _this.y = 250;
          var startX = 0;
          var startY = 0;
          _this.options = [
            { name: 'FIGTH', frame: 0, x: startX, y: startY, action: _this.openMovesSelection },
            { name: 'PARTY', frame: 1, x: startX + 96, y: startY, action: _this.openParty },
            { name: 'BAG', frame: 2, x: startX, y: startY + 48, action: _this.openBag },
            { name: 'RUN', frame: 3, x: startX + 96, y: startY + 48, action: _this.run }
          ];
          _this.createBackground();
          _this.createButtons();
          return _this;
          // this.initialX = x;
          // this.initialY = y;
          // this.destX = x;
          // this.destY = y;
          // this.speed = 3;
        }
        BattleCommands.prototype.createBackground = function () {
          // this._bg = new Sprite();
          // this._bg.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'command_overlay');
          // this._bg.x = 40;
          // this._bg.y = 20;
          // this.addChild(this._bg);
        };
        BattleCommands.prototype.createButtons = function () {
          for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            option.sprite = new CommandButton(option.name, option.frame, option.x, option.y);
            this.addChild(option.sprite);
          }
          var active = this.options[UI.actionsInx].sprite;
          active.active = true;

          this.cursor = new PE_Sprite_Cursor('img/pictures/battle/', 'action_selector');
          this.cursor.x = active.x + 40;
          this.cursor.y = active.y + 20;
          this.addChild(this.cursor);
        };
        BattleCommands.prototype.updateInput = function () {
          if (!this.visible)
            this.visible = true;
          // if (this.isBusy()) return;
          if (Input.isTriggered('right')) {

            UI.actionsInx++;
            if (UI.actionsInx >= this.options.length)
              UI.actionsInx = 0;
            var a = this.options[UI.actionsInx].sprite;
            this.cursor.x = a.x + 40;
            this.cursor.y = a.y + 20;
            SoundManager.playCursor();
            return;
          }
          if (Input.isTriggered('left')) {

            UI.actionsInx--;
            if (UI.actionsInx < 0)
              UI.actionsInx = this.options.length - 1;
            var a = this.options[UI.actionsInx].sprite;
            this.cursor.x = a.x + 40;
            this.cursor.y = a.y + 20;
            SoundManager.playCursor();
            return;
          }
          if (Input.isTriggered('down')) {

            UI.actionsInx += 2;
            if (UI.actionsInx >= this.options.length)
              UI.actionsInx -= 4;
            var a = this.options[UI.actionsInx].sprite;
            this.cursor.x = a.x + 40;
            this.cursor.y = a.y + 20;
            SoundManager.playCursor();
            return;
          }
          if (Input.isTriggered('up')) {

            UI.actionsInx -= 2;
            if (UI.actionsInx < 0)
              UI.actionsInx += 4;
            var a = this.options[UI.actionsInx].sprite;
            this.cursor.x = a.x + 40;
            this.cursor.y = a.y + 20;
            SoundManager.playCursor();
            return;
          }
          if (Input.isTriggered('ok')) {
            this.options[UI.actionsInx].action();
            this.visible = false;
          }
        };
        BattleCommands.prototype.openMovesSelection = function () {
          $Battle.changePhase(3 /* MoveSelection */);
        };
        BattleCommands.prototype.openParty = function () {
          SceneManager.push(PE.Party.Scene_Party);
        };
        BattleCommands.prototype.openBag = function () { };
        BattleCommands.prototype.run = function () {
          $Battle.terminate();
          SceneManager.goto(PE.TitleScenes.CustomScene);
        };
        return BattleCommands;
      }(Sprite));
      UI.BattleCommands = BattleCommands;
    })(UI = Battle.UI || (Battle.UI = {}));
  })(Battle = PE.Battle || (PE.Battle = {}));
})(PE || (PE = {}));
