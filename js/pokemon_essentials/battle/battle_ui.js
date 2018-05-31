PE.Battle = PE.Battle || {};
PE.Battle.UI = {};
PE.Battle.UI.actionsInx = 0;
PE.Battle.UI.movesInx = 0;

PE.Battle.UI.Window_BattleMessage = class Window_BattleMessage extends Window_Message {
  loadFrameSkin() {
    this.frameskin = ImageManager.loadSystem("battle_message_skin");
  }

  normalColor() {
    return "#ffffff";
  }
};

PE.Battle.UI.CommandButton = class CommandButton extends PE.Sprites.Button {
  constructor(name, frame, x, y) {
    super(80, 40);
    this.name = name;
    this.frame = frame;
    this.x = x;
    this.y = y;
    this._active = false;
    this.bitmap = ImageManager.loadBitmap("img/pictures/Battle/", "battle_buttons");
    this.changeFrame(0, this.frame);
    this._text = new Sprite(new Bitmap(80, 40));
    this._text.bitmap.fontSize = 24;
    this._text.bitmap.outlineWidth = 4;
    this._text.bitmap.outlineColor = "rgba(0,0,0, 0.3)";
    this._text.bitmap.drawText(this.name, 0, 8, 80, 24, "center");
    this._text.x = 0;
    this._text.y = 0;
    this.addChild(this._text);
    this.deactivate();
  }

  activate() {
    this.setBlendColor([0, 0, 0, 0]);
    this._text.setBlendColor([0, 0, 0, 0]);
  }

  deactivate() {
    this.setBlendColor([0, 0, 0, 155]);
    this._text.setBlendColor([0, 0, 0, 155]);
  }
};

PE.Battle.UI.AbilityIndicator = class AbilityIndicator extends Sprite {
  constructor(ability) {
    super(this, new Bitmap(224, 32));
    this.ability = ability;
    this.bitmap.outlineWidth = 3;
    this.bitmap.fontSize = 20;
    this.bitmap.fillAll("rgba(0,0,0,0.7)");
    this.bitmap.drawText(Battle.Abilities.name(ability), 0, 0, 224, 32, "center");
    this.ticks = 0;
  }

  update() {
    super.update();
    this.ticks++;
    if (this.ticks > 60) {
      $Battle.waitMode = 0 /* None */;
      this.destroy();
    }
  }
};

PE.Battle.UI.HPBar = class HPBar extends Sprite {
  constructor(pokemon, _x, _y, foe) {
    super();
    this.pokemon = pokemon;
    this._x = _x;
    this._y = _y;
    this.foe = foe;
    this.currentHP = this.pokemon.hp;
    this.pokemon.hpbar = this.__damage = 0;
    // this.__heal = 0;
    this.create();
    this.animate = false;
    this.setWidth();
  }

  create() {
    this.box = new Sprite();
    this.box.bitmap = ImageManager.loadBitmap("img/pictures/Battle/", "hp_box");
    this.box.x = this._x;
    this.box.y = this._y;
    this.addChild(this.box);
    this.bar = new Sprite();
    this.bar.bitmap = ImageManager.loadBitmap("img/pictures/Battle/", "hp_bar");
    this.bar.x = this._x;
    this.bar.y = this._y;
    this.addChild(this.bar);
    this.text = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.text.x = 0;
    this.text.y = 0;
    this.text.bitmap.fontSize = 28;
    // this.text.bitmap.outlineWidth = 4;
    this.text.bitmap.textColor = "#fff";
    this.text.bitmap.drawText(this.pokemon.nickname, this._x, this._y - 26, Graphics.width, 24, "left");
    this.text.bitmap.fontSize = 18;
    this.text.bitmap.textColor = "#ff0";
    var w1 = this.text.bitmap.measureTextWidth("Lv. " + this.pokemon.level);
    this.text.bitmap.drawText("Lv. ", this._x + (192 - w1), this._y - 24, Graphics.width, 24, "left");
    this.text.bitmap.textColor = "#fff";
    var w2 = this.text.bitmap.measureTextWidth("" + this.pokemon.level);
    this.text.bitmap.drawText("" + this.pokemon.level, this._x + (192 - w2), this._y - 24, Graphics.width, 24, "left");
    if (this.pokemon.gender !== "N") {
      if (this.pokemon.gender === "M") {
        var w3 = this.text.bitmap.measureTextWidth("♂ ");
        this.text.bitmap.textColor = "#00bdf7";
        this.text.bitmap.drawText("♂", this._x + (192 - w1 - w3), this._y - 24, Graphics.width, 24, "left");
      } else {
        var w3 = this.text.bitmap.measureTextWidth("♀ ");
        this.text.bitmap.textColor = "#ff3142";
        this.text.bitmap.drawText("♀", this._x + (192 - w1 - w3), this._y - 24, Graphics.width, 24, "left");
      }
    }
    if (!this.foe) {
      this.expbox = new Sprite();
      this.expbox.bitmap = ImageManager.loadBitmap("img/pictures/Battle/", "exp_box");
      this.expbox.x = this._x;
      this.expbox.y = this.box.y + 26;
      this.addChild(this.expbox);
      this.expbar = new Sprite();
      this.expbar.bitmap = ImageManager.loadBitmap("img/pictures/Battle/", "exp_bar");
      this.expbar.x = this._x;
      this.expbar.y = this.box.y + 26;
      this.expbar.setFrame(0, 0, 62, 8);
      this.addChild(this.expbar);
      this.indicator = new Sprite(new Bitmap(Graphics.height, Graphics.width));
      this.indicator.bitmap.textColor = "#fff";
      this.indicator.bitmap.fontSize = 18;
      this.indicator.bitmap.drawText(this.pokemon.hp + "/" + this.pokemon.hp, this._x + 32, this.box.y + 8, 200, 24, "left");
      this.addChild(this.indicator);
    }
    this.addChild(this.text);
  }

  update() {
    super.update();
    if (this.animate && this.__damage > 0) this.updateDamage();
  }

  damage(hp) {
    this.__damage = hp;
  }

  updateDamage() {
    this.currentHP--;
    this.__damage--;
    if (this.indicator) {
      this.indicator.bitmap.clear();
      this.indicator.bitmap.drawText(`${this.currentHP}/${this.currentHP}`, this._x + 32, this.box.y + 8, 200, 24, "left");
    }
    // 192 is original the bar width
    var width = Math.max(0, 192 * this.currentHP / this.pokemon.totalhp);
    this.bar.setFrame(0, 0, width, 24);
    if (this.currentHP === 0) {
      this.__damage = 0;
    }
    if (this.__damage === 0) {
      this.complete();
    }
  }
  start() {
    this.animate = true;
  }
  onComplete(callback) {
    // this.completeCallbacks.push(callback);
  }
  complete() {
    $Battle.waitMode = 0 /* None */;
    $Battle.changePhase(0 /* None */);
    // for (const callback of this.completeCallbacks) {
    //   callback();
    // }
    this.animate = false;
  }
  setWidth() {
    var width = Math.max(0, 192 * this.currentHP / this.pokemon.totalhp);
    this.bar.setFrame(0, 0, width, 24);
  }
};

PE.Battle.UI.MoveButton = class MoveButton extends PE.Sprites.Button {
  constructor(move, x, y) {
    super(202, 74);
    this.x = x;
    this.y = y;
    this._active = false;
    this.row = parseInt(PE.Types[move.type]);
    this.bitmap = ImageManager.loadBitmap("img/pictures/Battle/", "moves_buttons");
    this.changeFrame(0, this.row);
    this._text = new Sprite(new Bitmap(192, 64));
    this._text.x = 0;
    this._text.y = 0;
    this._text.bitmap.outlineWidth = 4;
    this._text.bitmap.outlineColor = PE.Types.color(move.type);
    this._text.bitmap.fontSize = 20;
    this._text.bitmap.drawText(move.name, 4, 4, 194, 32, "center");
    this._text.bitmap.fontSize = 20;
    this._text.bitmap.drawText("PP " + move.pp + "/" + move.pp, 112, 38, 192, 32, "left");
    this.addChild(this._text);
    this.setBlendColor([0, 0, 0, 155]);
    this._text.setBlendColor([0, 0, 0, 155]);
  }
  activate() {
    this.setBlendColor([0, 0, 0, 0]);
    this._text.setBlendColor([0, 0, 0, 0]);
  }
  deactivate() {
    this.setBlendColor([0, 0, 0, 155]);
    this._text.setBlendColor([0, 0, 0, 155]);
  }
};

PE.Battle.UI._MovesSelection = class _MovesSelection extends Sprite {
  constructor(_pokemon) {
    super();
    this._pokemon = _pokemon;
    var x = Graphics.width - 412;
    var y = Graphics.height - 156;
    this._pos = [{ x: x, y: y }, { x: x + 206, y: y }, { x: x, y: y + 78 }, { x: x + 206, y: y + 78 }];
    this._moves = [];
    this.createBackground();
    this.createButtons();
    this.visible = false;
  }
  createBackground() {
    // this._bg = new Sprite();
    // this._bg.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'moves_overlay');
    // this._bg.x = Graphics.width;
    // this._bg.y = Graphics.height - 152;
    // this._bg.anchor.x = 1;
    // this.addChild(this._bg);
    this._backButton = new Sprite();
    this._backButton.bitmap = ImageManager.loadBitmap("img/pictures/Battle/", "back_button");
    this._backButton.x = 0;
    this._backButton.y = Graphics.height - 4;
    this._backButton.anchor.y = 1;
    this.addChild(this._backButton);
    var backtext = new Sprite(new Bitmap(64, 40));
    backtext.bitmap.fontSize = 20;
    backtext.bitmap.outlineWidth = 4;
    backtext.bitmap.drawText(i18n._("BACK"), 8, 10, 64, 20, "left");
    backtext.x = 0;
    backtext.y = Graphics.height - 4;
    backtext.anchor.y = 1;
    this.addChild(backtext);
  }
  createButtons() {
    var i = 0;
    for (var _i = 0, _a = this._pokemon.moveset; _i < _a.length; _i++) {
      var move = _a[_i];
      var button = new PE.Battle.UI.MoveButton(move, this._pos[i].x, this._pos[i].y);
      this._moves.push(button);
      this.addChild(button);
      i++;
    }
    this._moves[PE.Battle.UI.movesInx].activate();
  }
  updateInput() {
    if (!this.visible) this.visible = true;
    if (Input.isTriggered("cancel")) {
      $Battle.changePhase(2 /* ActionSelection */);
      this.visible = false;
    }
    if (Input.isTriggered("right")) {
      if (this._moves.length <= 1) return;
      this._moves[PE.Battle.UI.movesInx].deactivate();
      PE.Battle.UI.movesInx++;
      if (UI.movesInx >= this._moves.length) PE.Battle.UI.movesInx = 0;
      this._moves[PE.Battle.UI.movesInx].activate();
      SoundManager.playCursor();
      return;
    }
    if (Input.isTriggered("left")) {
      if (this._moves.length <= 1) return;
      this._moves[PE.Battle.UI.movesInx].deactivate();
      PE.Battle.UI.movesInx--;
      if (UI.movesInx < 0) PE.Battle.UI.movesInx = this._moves.length - 1;
      this._moves[PE.Battle.UI.movesInx].activate();
      SoundManager.playCursor();
      return;
    }
    if (Input.isTriggered("down")) {
      if (this._moves.length < 2) return;
      this._moves[PE.Battle.UI.movesInx].deactivate();
      PE.Battle.UI.movesInx += 2;
      if (UI.movesInx >= this._moves.length) PE.Battle.UI.movesInx = Math.abs(this._moves.length - PE.Battle.UI.movesInx);
      this._moves[PE.Battle.UI.movesInx].activate();
      SoundManager.playCursor();
      return;
    }
    if (Input.isTriggered("up")) {
      if (this._moves.length <= 2) return;
      this._moves[PE.Battle.UI.movesInx].deactivate();
      PE.Battle.UI.movesInx -= 2;
      if (UI.movesInx < 0) PE.Battle.UI.movesInx = this._moves.length - Math.abs(UI.movesInx);
      this._moves[PE.Battle.UI.movesInx].activate();
      SoundManager.playCursor();
      return;
    }
    if (Input.isTriggered("ok")) {
      this.visible = false;
      var move = this._pokemon.moveset[PE.Battle.UI.movesInx];
      $Battle.choose(move, $Battle.sides.foe.actives[0]);
      $Battle.changePhase(0 /* None */);
      $Battle.runActions();
    }
  }
};

PE.Battle.UI.BattleCommands = class BattleCommands extends Sprite {
  constructor(x, y) {
    super();
    this.x = Graphics.width - 192;
    this.y = Graphics.height - 128;
    var startX = 0;
    var startY = 0;
    this.options = [
      { name: "FIGTH", frame: 0, x: startX, y: startY, action: this.openMovesSelection },
      { name: "PARTY", frame: 1, x: startX + 96, y: startY, action: this.openParty },
      { name: "BAG", frame: 2, x: startX, y: startY + 48, action: this.openBag },
      { name: "RUN", frame: 3, x: startX + 96, y: startY + 48, action: this.run }
    ];
    this.createBackground();
    this.createButtons();

    // this.initialX = x;
    // this.initialY = y;
    // this.destX = x;
    // this.destY = y;
    // this.speed = 3;
  }
  createBackground() {
    // this._bg = new Sprite();
    // this._bg.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'command_overlay');
    // this._bg.x = 40;
    // this._bg.y = 20;
    // this.addChild(this._bg);
  }
  createButtons() {
    for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
      var option = _a[_i];
      option.sprite = new PE.Battle.UI.CommandButton(option.name, option.frame, option.x, option.y);
      this.addChild(option.sprite);
    }
    this.options[PE.Battle.UI.actionsInx].sprite.activate();

    // this.cursor = new PE_Sprite_Cursor("img/pictures/battle/", "action_selector");
    // this.cursor.x = active.x + 40;
    // this.cursor.y = active.y + 20;
    // this.addChild(this.cursor);
  }
  updateInput() {
    if (!this.visible) this.visible = true;
    // if (this.isBusy()) return;
    if (Input.isTriggered("right")) {
      this.options[PE.Battle.UI.actionsInx].sprite.deactivate();
      PE.Battle.UI.actionsInx++;
      if (UI.actionsInx >= this.options.length) PE.Battle.UI.actionsInx = 0;
      var a = this.options[PE.Battle.UI.actionsInx].sprite;
      a.activate();
      SoundManager.playCursor();
      return;
    }
    if (Input.isTriggered("left")) {
      this.options[PE.Battle.UI.actionsInx].sprite.deactivate();
      PE.Battle.UI.actionsInx--;
      if (UI.actionsInx < 0) PE.Battle.UI.actionsInx = this.options.length - 1;
      var a = this.options[PE.Battle.UI.actionsInx].sprite;
      a.activate();
      SoundManager.playCursor();
      return;
    }
    if (Input.isTriggered("down")) {
      this.options[PE.Battle.UI.actionsInx].sprite.deactivate();
      PE.Battle.UI.actionsInx += 2;
      if (UI.actionsInx >= this.options.length) PE.Battle.UI.actionsInx -= 4;
      var a = this.options[PE.Battle.UI.actionsInx].sprite;
      a.activate();
      SoundManager.playCursor();
      return;
    }
    if (Input.isTriggered("up")) {
      this.options[PE.Battle.UI.actionsInx].sprite.deactivate();
      PE.Battle.UI.actionsInx -= 2;
      if (UI.actionsInx < 0) PE.Battle.UI.actionsInx += 4;
      var a = this.options[PE.Battle.UI.actionsInx].sprite;
      a.activate();
      SoundManager.playCursor();
      return;
    }
    if (Input.isTriggered("ok")) {
      this.options[PE.Battle.UI.actionsInx].action();
      this.visible = false;
    }
  }
  openMovesSelection() {
    $Battle.changePhase(3 /* MoveSelection */);
  }
  openParty() {
    SceneManager.push(PE.Party.Scene_Party);
  }
  openBag() {}
  run() {
    $Battle.terminate();
    SceneManager.goto(PE.TitleScenes.CustomScene);
  }
};
