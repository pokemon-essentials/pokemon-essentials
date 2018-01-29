namespace PE.Battle {

  class AbilityIndicator extends Sprite {
    ticks: number;
    constructor(public ability: string) {
      super(new Bitmap(224, 32));
      this.bitmap.fontSize = 20;
      this.bitmap.fillAll('rgba(0,0,0,0.7)');
      this.bitmap.drawText(Abilities.name(ability), 0, 0, 224, 32, 'center');
      this.ticks = 0;
    }

    update() {
      super.update();
      this.ticks++;
      if (this.ticks > 60) {
        $Battle.waitMode = WaitMode.None;
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
    constructor(public pokemon: Pokemon.Pokemon, public _x: number, public _y: number, public foe: boolean) {
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

  class CommandButton extends Sprites.Button {
    private _active: boolean;
    private _text: Sprite;
    constructor(public name: string, public frame: number, public x: number, public y: number) {
      super(80, 40);
      this._active = false;
      this.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'battle_buttons', undefined, undefined);
      this.changeFrame(1, this.frame);

      this._text = new Sprite(new Bitmap(80, 40));
      this._text.bitmap.fontSize = 24;
      this._text.bitmap.outlineWidth = 4;
      this._text.bitmap.outlineColor = "rgba(0,0,0, 0.3)";
      this._text.bitmap.drawText(this.name, 0, 8, 80, 24, 'center');
      this._text.x = 0;
      this._text.y = 0;
      this._text.visible = false;
      this._text.opacity = 200;
      this.addChild(this._text);
    }

    set active(_active) {
      this._active = _active;
      if (_active) {
        this.changeFrame(0, this.frame);
      } else {
        this.changeFrame(1, this.frame);
      }
      this._text.visible = this._active;
    }
  }

  class MoveButton extends Sprites.Button {
    activeText: Sprite;
    idletext: Sprite;
    row: number;
    _active: boolean;
    constructor(move, public x: number, public y: number) {
      super(192, 64);
      this._active = false;

      // this.frame = frame;
      // this.name = name;
      // this.startY = y;

      this.row = parseInt(Types[move.type]);
      this.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'moves_buttons', undefined, undefined);
      this.changeFrame(1, this.row);


      this.idletext = new Sprite(new Bitmap(192, 64));
      this.idletext.bitmap.fontSize = 18;
      this.idletext.bitmap.outlineWidth = 4;
      this.idletext.bitmap.outlineColor = "rgba(0,0,0, 0.3)";
      this.idletext.bitmap.drawText(move.name, 0, 20, 192, 20, 'center');
      this.idletext.x = 0;
      this.idletext.y = 0;
      this.addChild(this.idletext);

      this.activeText = new Sprite(new Bitmap(192, 64));
      this.activeText.x = 0;
      this.activeText.y = 0;
      this.activeText.bitmap.outlineWidth = 4;
      this.activeText.bitmap.outlineColor = Types.color(move.type);
      this.activeText.bitmap.fontSize = 18;
      this.activeText.bitmap.drawText(move.name, 14, 10, 164, 20, 'center');
      this.activeText.bitmap.fontSize = 14;
      this.activeText.bitmap.drawText(move.type, 14, 36, 192, 20, 'left');
      this.activeText.bitmap.drawText(`PP ${move.pp}/${move.pp}`, 0, 36, 178, 20, 'right');
      this.activeText.visible = false;
      this.addChild(this.activeText);
    }

    activate() {
      this.idletext.visible = false;
      this.activeText.visible = true;
      this.changeFrame(0, this.row);
    }

    deactivate() {
      this.idletext.visible = true;
      this.activeText.visible = false;
      this.changeFrame(1, this.row);
    }
  }


  class _MovesSelection extends Sprite {
    _moves: any;
    _backButton: Sprite;
    _bg: Sprite;
    _inx: number;
    _pos: { x: number; y: number; }[];
    constructor(public _pokemon: Pokemon.Pokemon) {
      super();
      let x = Graphics.width - 392, y = Graphics.height - 152;
      this._pos = [{ x: x, y: y }, { x: x + 196, y: y }, { x: x, y: y + 52 }, { x: x + 196, y: y + 52 }];
      this._inx = 0;
      this._moves = [];
      this.createBackground();
      this.createButtons();
      this.visible = false;
    }

    createBackground() {
      this._bg = new Sprite();
      this._bg.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'moves_overlay', undefined, undefined);
      this._bg.x = Graphics.width;
      this._bg.y = Graphics.height - 152;
      this._bg.anchor.x = 1;
      this.addChild(this._bg);

      this._backButton = new Sprite();
      this._backButton.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'back_button', undefined, undefined);
      this._backButton.x = 0;
      this._backButton.y = Graphics.height - 4;
      this._backButton.anchor.y = 1;
      this.addChild(this._backButton);
    }

    createButtons() {
      let i = 0;
      for (let move of this._pokemon.moveset) {
        let button = new MoveButton(move, this._pos[i].x, this._pos[i].y);
        this._moves.push(button);
        this.addChild(button);
        i++;
      }
      this._moves[this._inx].activate();
    }

    updateInput() {
      if (!this.visible) this.visible = true;

      if (Input.isTriggered('cancel')) {
        $Battle.changePhase(Battle.Phase.ActionSelection);
        this.visible = false;
      }

      if (Input.isTriggered('right')) {
        this._moves[this._inx].deactivate();
        this._inx++;
        if (this._inx >= this._moves.length) this._inx = 0;
        this._moves[this._inx].activate();
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('left')) {
        this._moves[this._inx].deactivate();
        this._inx--;
        if (this._inx < 0) this._inx = this._moves.length - 1;
        this._moves[this._inx].activate();
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('down')) {
        this._moves[this._inx].deactivate();
        this._inx += 2;
        if (this._inx >= this._moves.length) this._inx -= 4;
        this._moves[this._inx].activate();
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('up')) {
        this._moves[this._inx].deactivate();
        this._inx -= 2;
        if (this._inx < 0) this._inx += 4;
        this._moves[this._inx].activate();
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('ok')) {
        this.visible = false;
        let move = this._pokemon.moveset[this._inx];
        $Battle.choose(move, $Battle.sides.foe.actives[0]);
        $Battle.changePhase(Battle.Phase.None);
        $Battle.runActions();
      }
    }
  }



  class BattleCommands extends Sprite {
    _bg: Sprite;
    _inx: number;
    options: { name: string; frame: number; x: number; y: number; sprite?: CommandButton }[];
    constructor(public x: number, public y: number) {
      super();
      let startX = 0;
      let startY = 0;
      this.options = [
        { name: 'FIGTH', frame: 0, x: startX, y: startY },
        { name: 'PARTY', frame: 1, x: startX + 84, y: startY },
        { name: 'BAG', frame: 2, x: startX, y: startY + 32 },
        { name: 'RUN', frame: 3, x: startX + 84, y: startY + 32 }
      ];
      this._inx = 0;
      this.createBackground();
      this.createButtons();
      // this.initialX = x;
      // this.initialY = y;

      // this.destX = x;
      // this.destY = y;
      // this.speed = 3;
    }

    createBackground() {
      this._bg = new Sprite();
      this._bg.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'command_overlay', undefined, undefined);
      this._bg.x = 40;
      this._bg.y = 20;
      this.addChild(this._bg);
    }

    createButtons() {
      for (let option of this.options) {
        option.sprite = new CommandButton(option.name, option.frame, option.x, option.y);
        this.addChild(option.sprite);
      }
      this.options[this._inx].sprite.active = true;
    }

    updateInput() {
      if (!this.visible) this.visible = true;
      // if (this.isBusy()) return;

      if (Input.isTriggered('cancel')) {
        SceneManager.goto(PE.TitleScenes.CustomScene);
      }

      if (Input.isTriggered('right')) {
        this.options[this._inx].sprite.active = false;
        this._inx++;
        if (this._inx >= this.options.length) this._inx = 0;
        this.options[this._inx].sprite.active = true;
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('left')) {
        this.options[this._inx].sprite.active = false;
        this._inx--;
        if (this._inx < 0) this._inx = this.options.length - 1;
        this.options[this._inx].sprite.active = true;
        SoundManager.playCursor();
        return;
      }
      if (Input.isTriggered('down')) {
        this.options[this._inx].sprite.active = false;
        this._inx += 2;
        if (this._inx >= this.options.length) this._inx -= 4;
        this.options[this._inx].sprite.active = true;
        SoundManager.playCursor();
        return;
      }
      if (Input.isTriggered('up')) {
        this.options[this._inx].sprite.active = false;
        this._inx -= 2;
        if (this._inx < 0) this._inx += 4;
        this.options[this._inx].sprite.active = true;
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('ok')) {
        $Battle.changePhase(Phase.MoveSelection);
        this.visible = false;
      }
    }
  }


  export class Scene_Battle extends Scene_Base {
    partyBar: HPBar;
    movesSelection: _MovesSelection;
    battleCommands: BattleCommands;
    message: Window_Message;
    foePokemon: Pokemon.Pokemon;
    partyPokemon: Pokemon.Pokemon;

    /** save all the objects display layers */
    layers: { bg: Sprite; bg2: Sprite; weather: Weathers.WeatherLayer } = { bg: undefined, bg2: undefined, weather: undefined };

    create() {
      super.create();
      this.createLayers();
    }

    prepare(party: Pokemon.Pokemon, foe: Pokemon.Pokemon) {
      this.partyPokemon = party;
      this.foePokemon = foe;
    }

    start() {
      super.start();
      $Battle.setup([new Trainers.Trainer([this.partyPokemon])], [new Trainers.Trainer([this.foePokemon])]);
      $Battle.scene = this;
      $Battle.start();
      $Battle.changePhase(Phase.ActionSelection);
    }

    update() {
      super.update();
      $Battle.update();
      switch ($Battle.phase) {
        case Phase.ActionSelection:
          this.battleCommands.updateInput();
          break;
        case Battle.Phase.MoveSelection:
          this.movesSelection.updateInput();
          break;
        default:
          if (Input.isTriggered('cancel')) {
            SceneManager.goto(Scene_Title);
          }
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

      this.createUI();

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
      let f = new Sprites.Battler(this.foePokemon, Sprites.BattlersFacing.Front);
      f.x = fx;
      f.y = fy;
      f.scale.x = 2;
      f.scale.y = 2;
      f.anchor.x = 0.5;
      f.anchor.y = 1;
      this.addChild(f);

      let px = 96;
      let py = Graphics.height;
      let a = new Sprites.Battler(this.partyPokemon, Sprites.BattlersFacing.Back);
      a.x = px;
      a.y = py;
      a.scale.x = 3;
      a.scale.y = 3;
      a.anchor.x = 0.5;
      a.anchor.y = 1;
      this.addChild(a);



    }


    createUI() {
      this.layers.weather = new Weathers.WeatherLayer();
      this.addChild(this.layers.weather);

      this.partyBar = new HPBar(this.partyPokemon, 16, Graphics.height - 64, false);
      this.addChild(this.partyBar);

      let h2 = new HPBar(this.foePokemon, Graphics.width - 208, 48, true);
      this.addChild(h2);

      let x = Graphics.width - 168;
      let y = Graphics.height - 108;
      this.battleCommands = new BattleCommands(x, y);
      this.battleCommands.visible = false;
      this.addChild(this.battleCommands);

      this.movesSelection = new _MovesSelection(this.partyPokemon);
      this.addChild(this.movesSelection);

      let msg = i18n._('What will %1 do?', this.partyPokemon.name);
      let t = new Sprite(new Bitmap(300, 32));
      t.bitmap.fontSize = 20;
      t.bitmap.drawText(msg, 0, 0, 300, 32, 'right');
      t.x = Graphics.width - 8;
      t.y = Graphics.height;
      t.anchor.x = 1;
      t.anchor.y = 1;
      this.addChild(t);
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
    setWeather(weather: Weathers) {
      this.layers.weather.setWeather(weather);
    }
  }
}
