class NewBattle_Scene extends Scene_Base {
  battle: Battle_Manager;
  viewport: Sprite;
  sprites: {};
  hpbars: {};
  layers: { bg: Sprite } = { bg: undefined };
  message: PE.Battle.UI.Window_BattleMessage;
  battleCommands: PE.Battle.UI.BattleCommands;
  partyBar: Sprite;

  constructor() {
    super();
    let p1 = [];
    let p2 = [];
    p1.push(new PE.Pokemon.Pokemon(PE.Pokedex.GROUDON, 100));
    for (let index = 0; index < 3; index++) {
      // p1.push(PE.Pokemon.getRandomPokemon(100));
      p2.push(PE.Pokemon.getRandomPokemon(100));
    }
    $BattleManager.init(p1, p2);
  }

  create() {
    super.create();
    this.viewport = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this.viewport);
    this.createBackground();
    this.createMessageWindow();
    this.createUI();
  }

  createBackground() {
    this.layers.bg = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.layers.bg.bitmap = ImageManager.loadBitmap("img/battlebacks/", "bg-forest");
    this.layers.bg.x = Graphics.width / 2;
    this.layers.bg.y = Graphics.height;
    this.layers.bg.anchor.x = 0.5;
    this.layers.bg.anchor.y = 1;
    this.viewport.addChild(this.layers.bg);

    this.sprites = {};
    this.hpbars = {};
    this.partyBar = new Sprite();
  }

  createMessageWindow() {
    this.createWindowLayer();
    this.message = new PE.Battle.UI.Window_BattleMessage();
    this.addWindow(this.message);
    this.message.subWindows().forEach(function(window) {
      this.addWindow(window);
    }, this);
  }

  createBattlers() {
    for (const battler of $BattleManager.sides.foe.actives) {
      if (this.sprites[battler.guid]) {
        if (!this.sprites[battler.guid].visible) {
          this.viewport.addChild(this.sprites[battler.guid]);
          this.sprites[battler.guid].visible = true;
        }
      } else {
        let fx = Graphics.width - 128;
        let fy = 240;
        this.sprites[battler.guid] = new PE.Sprites.Battler(battler.pokemon, PE.Sprites.BattlersFacing.Front);
        this.sprites[battler.guid].x = fx;
        this.sprites[battler.guid].y = fy;
        this.sprites[battler.guid].scale.x = 2;
        this.sprites[battler.guid].scale.y = 2;
        this.sprites[battler.guid].anchor.x = 0.5;
        this.sprites[battler.guid].anchor.y = 1;
        this.viewport.addChild(this.sprites[battler.guid]);
      }

      if (this.hpbars[battler.guid]) {
        if (!this.hpbars[battler.guid].visible) {
          this.hpbars[battler.guid].visible = true;
          this.viewport.addChild(this.hpbars[battler.guid]);
        }
      } else {
        this.hpbars[battler.guid] = new nHPBar(battler, Graphics.width - 208, 48, true);
        this.viewport.addChild(this.hpbars[battler.guid]);
      }
    }

    for (const battler of $BattleManager.sides.player.actives) {
      if (this.sprites[battler.guid]) {
        if (!this.sprites[battler.guid].visible) {
          this.viewport.addChild(this.sprites[battler.guid]);
          this.sprites[battler.guid].visible = true;
        }
      } else {
        let x = 128;
        let y = Graphics.height - 64;
        let index = battler.name + "_" + battler.slotIndex;
        this.sprites[battler.guid] = new PE.Sprites.Battler(battler.pokemon, PE.Sprites.BattlersFacing.Back);
        this.sprites[battler.guid].x = x;
        this.sprites[battler.guid].y = y;
        this.sprites[battler.guid].scale.x = 3;
        this.sprites[battler.guid].scale.y = 3;
        this.sprites[battler.guid].anchor.x = 0.5;
        this.sprites[battler.guid].anchor.y = 1;
        this.viewport.addChild(this.sprites[battler.guid]);
      }

      if (this.hpbars[battler.guid]) {
        if (!this.hpbars[battler.guid].visible) {
          this.hpbars[battler.guid].visible = true;
          this.partyBar.addChild(this.hpbars[battler.guid]);
        }
      } else {
        this.hpbars[battler.guid] = new nHPBar(battler, 16, Graphics.height - 64, false);
        this.partyBar.addChild(this.hpbars[battler.guid]);
      }

      this.viewport.addChild(this.partyBar);

      // this.partyBar.visible = false;
      // this.movesSelection = new PE.UI._MovesSelection(battler);
      // this.viewport.addChild(this.movesSelection);
    }

    // this.viewport.addChild(this.sprites);

    // let trainer = Math.randomInt(243) + 1;
    // this.sprites["front"] = new Sprites.TrainerFront("BW_" + trainer.padZero(3));
    // this.sprites["front"].x = Graphics.width - 96;
    // this.sprites["front"].anchor.x = 0.5;
    // this.addChild(this.sprites["front"]);

    // this.sprites["back"] = new Sprites.TrainerBack();
    // this.sprites["back"].y = Graphics.height;
    // this.sprites["back"].anchor.y = 1;
    // this.addChild(this.sprites["back"]);

    // $Battle.push(() => this.sprites["back"].start(), this);
  }

  createUI() {
    let x = Graphics.width - 168;
    let y = Graphics.height - 108;
    this.battleCommands = new PE.Battle.UI.BattleCommands(x, y);
    this.battleCommands.visible = false;
    this.viewport.addChild(this.battleCommands);
  }

  start() {
    EventManager.on("SWITCH_BATTLERS", this.switchBattlers, this);
    $BattleManager.startBattle();
    this.createBattlers();
  }

  update() {
    super.update();
    if ($BattleManager.phase === Battle_Phase.Input || BattleEventQueue.waitMode === WaitModes.Animation) {
      this.partyBar.visible = true;
    } else {
      this.partyBar.visible = false;
    }
    if (BattleEventQueue.isBusy()) return;
    if (Input.isTriggered("ok")) {
      this.endActionsSelection();
      return;
    }
    // this.battleCommands.updateInput();
    $BattleManager.update();
  }

  endActionsSelection() {
    $BattleManager.endActionsSelection();
  }

  switchBattlers(out: Battle_Battler, enter: Battle_Battler) {
    // this.sprites.bitmap = new Bitmap(Graphics.width, Graphics.height);
    this.viewport.removeChild(this.sprites[out.guid]);
    this.viewport.removeChild(this.hpbars[out.guid]);
    this.partyBar.removeChild(this.hpbars[out.guid]);
    this.sprites[out.guid].visible = false;
    this.hpbars[out.guid].visible = false;
    // delete this.sprites[out.guid];
    this.createBattlers();
  }
}

class nHPBar extends Sprite {
  animate: boolean;
  currentHP: any;
  __damage: any;
  indicator: Sprite;
  expbar: Sprite;
  expbox: Sprite;
  text: Sprite;
  bar: Sprite;
  box: Sprite;
  constructor(public battler: Battle_Battler, public _x: number, public _y: number, public foe: boolean) {
    super();

    this.currentHP = this.battler.hp;
    // this.pokemon.hpbar = this;
    this.__damage = 0;
    // this.__heal = 0;

    this.create();
    this.animate = false;
    this.setWidth();
    // this.completeCallbacks = [];
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
    this.text.bitmap.drawText(this.battler.name, this._x, this._y - 30, Graphics.width, 24, "left");
    this.text.bitmap.fontSize = 18;
    this.text.bitmap.textColor = "#ff0";
    this.text.bitmap.shadowColor = "#cccc00";
    var w1 = this.text.bitmap.measureTextWidth("Lv. " + this.battler.level);
    this.text.bitmap.drawText("Lv. ", this._x + (192 - w1), this._y - 24, Graphics.width, 24, "left");
    this.text.bitmap.textColor = "#fff";
    this.text.bitmap.shadowColor = DEFAULT_SHADOW_COLOR;
    var w2 = this.text.bitmap.measureTextWidth("" + this.battler.level);
    this.text.bitmap.drawText("" + this.battler.level, this._x + (192 - w2), this._y - 24, Graphics.width, 24, "left");
    if (this.battler.pokemon.gender !== "N") {
      if (this.battler.pokemon.gender === "M") {
        var w3 = this.text.bitmap.measureTextWidth("♂ ");
        this.text.bitmap.textColor = "#00bdf7";
        this.text.bitmap.shadowColor = "#0097c5";
        this.text.bitmap.drawText("♂", this._x + (192 - w1 - w3), this._y - 24, Graphics.width, 24, "left");
      } else {
        var w3 = this.text.bitmap.measureTextWidth("♀ ");
        this.text.bitmap.textColor = "#ff3142";
        this.text.bitmap.shadowColor = "#f30014";
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
      this.indicator.bitmap.fontSize = 20;
      this.indicator.bitmap.drawText(this.battler.hp + "/" + this.battler.hp, this._x + 32, this.box.y + 8, 200, 24, "left");
      this.addChild(this.indicator);
    }
    this.addChild(this.text);
    EventManager.on("DAMAGE", this.damage, this);
  }

  update() {
    super.update();
    if (this.animate && this.currentHP !== this.__damage) this.updateDamage();
  }

  damage(battler: Battle_Battler, hp) {
    if (battler.guid !== this.battler.guid) return;
    BattleEventQueue.push(() => {
      this.__damage = this.currentHP - hp;
      if (this.__damage <= 0) this.__damage = 0;
      this.animate = true;
      $BattleManager.wait(WaitModes.Animation);
    }, this);
  }

  updateDamage() {
    this.currentHP--;

    if (this.indicator) {
      this.indicator.bitmap.clear();
      this.indicator.bitmap.drawText(`${this.currentHP}/${this.battler.totalHP}`, this._x + 32, this.box.y + 8, 200, 24, "left");
    }
    // 192 is original the bar width
    let width = Math.max(0, (192 * this.currentHP) / this.battler.totalHP);
    this.bar.setFrame(0, 0, width, 24);

    if (this.currentHP === this.__damage) this.complete();
  }

  complete() {
    $BattleManager.wait(WaitModes.None);
    BattleEventQueue.push(() => {
      this.animate = false;
    }, this);
  }

  setWidth() {
    let width = Math.max(0, (192 * this.currentHP) / this.battler.totalHP);
    this.bar.setFrame(0, 0, width, 24);
  }
}
