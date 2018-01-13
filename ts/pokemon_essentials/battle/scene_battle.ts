namespace PE.Battle {

  class AbilityIndicator extends Sprite {
    ticks: number;
    constructor(public ability: string) {
      super(new Bitmap(224, 32));
      this.bitmap.fontSize = 20;
      this.bitmap.fillAll('rgba(0,0,0,0.7)');
      this.bitmap.drawText(PE.Abilities.name(ability), 0, 0, 224, 32, 'center');
      this.ticks = 0;
    }

    update() {
      super.update();
      this.ticks++;
      if (this.ticks > 60) {
        $Battle.waitMode = PE.Battle.WaitMode.None;
        this.destroy();
      }
    }
  }

  class HPBar extends Sprite {
    indicator: Sprite;
    expbar: Sprite;
    expbox: Sprite;
    text: Sprite;
    bar: Sprite;
    box: Sprite;
    constructor(public pokemon: PE.Pokemon.Pokemon, public _x: number, public _y: number, public foe: boolean) {
      super();

      // this.currentHP = this.pokemon.hp;
      // this.__damage = 0;
      // this.__heal = 0;

      this.create();

      // this.animate = false;
      // this.completeCallbacks = [];
    }

    create() {
      this.box = new Sprite();
      this.box.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'hp_box', undefined, undefined);
      this.box.x = this._x;
      this.box.y = this._y;
      this.addChild(this.box);

      this.bar = new Sprite();
      this.bar.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'hp_bar', undefined, undefined);
      this.bar.x = this._x;
      this.bar.y = this._y;
      this.addChild(this.bar);

      this.text = new Sprite(new Bitmap(Graphics.width, Graphics.height));
      this.text.x = 0;
      this.text.y = 0;

      this.text.bitmap.fontSize = 24;
      this.text.bitmap.outlineWidth = 4;
      this.text.bitmap.textColor = "#fff";
      this.text.bitmap.drawText(this.pokemon.name, this._x, this._y - 26, Graphics.width, 24, 'left');

      this.text.bitmap.fontSize = 18;
      this.text.bitmap.textColor = "#ff0";
      let w1 = this.text.bitmap.measureTextWidth(`Lv. ${this.pokemon.level}`);
      this.text.bitmap.drawText('Lv. ', this._x + (192 - w1), this._y - 24, Graphics.width, 24, 'left');
      this.text.bitmap.textColor = "#fff";
      let w2 = this.text.bitmap.measureTextWidth(`${this.pokemon.level}`);
      this.text.bitmap.drawText(`${this.pokemon.level}`, this._x + (192 - w2), this._y - 24, Graphics.width, 24, 'left');
      if (this.pokemon.gender !== "N") {
        if (this.pokemon.gender === "M") {
          let w3 = this.text.bitmap.measureTextWidth('♂ ');
          this.text.bitmap.textColor = "#00bdf7";
          this.text.bitmap.drawText('♂', this._x + (192 - w1 - w3), this._y - 24, Graphics.width, 24, 'left');
        } else {
          let w3 = this.text.bitmap.measureTextWidth('♀ ');
          this.text.bitmap.textColor = "#ff3142";
          this.text.bitmap.drawText('♀', this._x + (192 - w1 - w3), this._y - 24, Graphics.width, 24, 'left');
        }
      }

      if (!this.foe) {
        this.expbox = new Sprite();
        this.expbox.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'exp_box', undefined, undefined);
        this.expbox.x = this._x;
        this.expbox.y = this.box.y + 26;
        this.addChild(this.expbox);

        this.expbar = new Sprite();
        this.expbar.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'exp_bar', undefined, undefined);
        this.expbar.x = this._x;
        this.expbar.y = this.box.y + 26;
        this.expbar.setFrame(0, 0, 62, 8);
        this.addChild(this.expbar);

        this.indicator = new Sprite(new Bitmap(Graphics.height, Graphics.width));
        this.indicator.bitmap.textColor = "#fff";
        this.indicator.bitmap.fontSize = 18;
        this.indicator.bitmap.drawText(`${this.pokemon.hp}/${this.pokemon.hp}`, this._x + 32, this.box.y + 8, 200, 24, 'left');
        this.addChild(this.indicator);
      }

      this.addChild(this.text);
    }
  }

  export class Scene_Battle extends Scene_Base {
    message: Window_Message;
    foePokemon: Pokemon.Pokemon;
    partyPokemon: Pokemon.Pokemon;

    /** save all the objects display layers */
    layers: { bg: Sprite; bg2: Sprite; } = { bg: undefined, bg2: undefined };

    create() {
      super.create();
      this.createLayers();
    }

    prepare(party: PE.Pokemon.Pokemon, foe: PE.Pokemon.Pokemon) {
      this.partyPokemon = party;
      this.foePokemon = foe;
    }

    start() {
      super.start();
      $Battle.setup([new PE.Trainers.Trainer([this.partyPokemon])], [new PE.Trainers.Trainer([this.foePokemon])]);
      $Battle.scene = this;
      $Battle.showPausedMessage(i18n._('A wild %1 has apeared!', this.foePokemon.name));
      $Battle.showMessage(i18n._('Go %1!', this.partyPokemon.name));
      $Battle.start();
      $Battle.changePhase(PE.Battle.Phase.ActionSelection);
    }

    update() {
      super.update();
      $Battle.update();
      if (Input.isTriggered('cancel')) {
        SceneManager.goto(Scene_Title);
      }
    }

    stop() {
      super.stop();
    }

    terminate() {
      $Battle.terminate();
      super.terminate();
    }

    createLayers() {
      this.createBackground();
      this.createBattlers();
      this.createWindowLayer();
      this.createMessageWindow();
    }

    createBackground() {
      this.layers['bg'] = new Sprite();
      this.layers['bg'].bitmap = ImageManager.loadBitmap('img/battlebacks/', 'bg-forest', undefined, undefined);
      this.layers['bg'].x = Graphics.width / 2;
      this.layers['bg'].y = Graphics.height + 80;
      this.layers['bg'].anchor.x = 0.5;
      this.layers['bg'].anchor.y = 1;
      this.addChild(this.layers['bg']);

      this.layers['bg2'] = new Sprite();
      this.addChild(this.layers['bg2']);
    }

    createMessageWindow() {
      this.message = new Window_Message();
      this.addWindow(this.message);
      this.message.subWindows().forEach(function (window) {
        this.addWindow(window);
      }, this);
    }

    createBattlers() {
      let fx = Graphics.width - 96;
      let fy = 240
      let f = new PE.Sprites.Battler(this.foePokemon, PE.Sprites.BattlersFacing.Front);
      f.x = fx;
      f.y = fy;
      f.scale.x = 2;
      f.scale.y = 2;
      f.anchor.x = 0.5;
      f.anchor.y = 1;
      this.addChild(f);

      let px = 96;
      let py = Graphics.height;
      let a = new PE.Sprites.Battler(this.partyPokemon, PE.Sprites.BattlersFacing.Back);
      a.x = px;
      a.y = py;
      a.scale.x = 3;
      a.scale.y = 3;
      a.anchor.x = 0.5;
      a.anchor.y = 1;
      this.addChild(a);

      let h = new HPBar(this.partyPokemon, 16, Graphics.height - 64, false);
      this.addChild(h);

      let h2 = new HPBar(this.foePokemon, Graphics.width - 208, 48, true);
      this.addChild(h2);
    }


    showAbilityIndicator(ability: string, foeSide: boolean) {
      let x = 0;
      let y = 192;
      if (foeSide) { x = Graphics.width - 224; y = 96; }
      let sing = new AbilityIndicator(ability);
      sing.x = x;
      sing.y = y;
      this.addChild(sing);
    }
  }
}
