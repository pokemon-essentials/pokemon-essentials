namespace PE.Battle.UI {

  export let actionsInx = 0;
  export let movesInx = 0;


  export class Window_BattleMessage extends Window_Message {
    constructor() {
      super();
    }
    frameskin: any;
    loadFrameSkin() {
      this.frameskin = ImageManager.loadSystem('battle_message_skin');
    }

    normalColor() {
      return "#ffffff";
    };
  }


  export class AbilityIndicator extends Sprite {
    ticks: number;
    constructor(public ability: string) {
      super(new Bitmap(224, 32));
      this.bitmap.outlineWidth = 3;
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

  export class HPBar extends Sprite {
    animate: boolean;
    currentHP: any;
    __damage: any;
    indicator: Sprite;
    expbar: Sprite;
    expbox: Sprite;
    text: Sprite;
    bar: Sprite;
    box: Sprite;
    constructor(public pokemon: Battler, public _x: number, public _y: number, public foe: boolean) {
      super();

      this.currentHP = this.pokemon.hp;
      this.pokemon.hpbar = this;
      this.__damage = 0;
      // this.__heal = 0;

      this.create();
      this.animate = false;
      this.setWidth();
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
      this.text.bitmap.drawText(this.pokemon.nickname, this._x, this._y - 26, Graphics.width, 24, 'left');

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
        this.indicator.bitmap.drawText(`${this.currentHP}/${this.pokemon.totalhp}`, this._x + 32, this.box.y + 8, 200, 24, 'left');
      }
      // 192 is original the bar width
      let width = Math.max(0, (192 * this.currentHP) / this.pokemon.totalhp);
      this.bar.setFrame(0, 0, width, 24);
      if (this.currentHP === 0) {
        this.__damage = 0;
      }
      if (this.__damage === 0) {
        this.complete()
      }
    }

    start() {
      this.animate = true;
    }
    onComplete(callback) {
      // this.completeCallbacks.push(callback);
    }


    complete() {
      $Battle.waitMode = WaitMode.None;
      $Battle.changePhase(Phase.None);
      // for (const callback of this.completeCallbacks) {
      //   callback();
      // }
      this.animate = false;
    }

    setWidth() {
      let width = Math.max(0, (192 * this.currentHP) / this.pokemon.totalhp);
      this.bar.setFrame(0, 0, width, 24);
    }
  }

  export class CommandButton extends Sprites.Button {
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

  export class MoveButton extends Sprites.Button {
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


  export class _MovesSelection extends Sprite {
    _moves: any;
    _backButton: Sprite;
    _bg: Sprite;
    _pos: { x: number; y: number; }[];
    constructor(public _pokemon: Battler) {
      super();
      let x = Graphics.width - 392, y = Graphics.height - 120;
      this._pos = [{ x: x, y: y }, { x: x + 196, y: y }, { x: x, y: y + 52 }, { x: x + 196, y: y + 52 }];
      this._moves = [];
      this.createBackground();
      this.createButtons();
      this.visible = false;
    }

    createBackground() {
      // this._bg = new Sprite();
      // this._bg.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'moves_overlay', undefined, undefined);
      // this._bg.x = Graphics.width;
      // this._bg.y = Graphics.height - 152;
      // this._bg.anchor.x = 1;
      // this.addChild(this._bg);

      this._backButton = new Sprite();
      this._backButton.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'back_button', undefined, undefined);
      this._backButton.x = 0;
      this._backButton.y = Graphics.height - 4;
      this._backButton.anchor.y = 1;
      this.addChild(this._backButton);

      let backtext = new Sprite(new Bitmap(64, 40));
      backtext.bitmap.fontSize = 20;
      backtext.bitmap.outlineWidth = 4;
      backtext.bitmap.drawText(i18n._('BACK'), 8, 10, 64, 20, 'left');
      backtext.x = 0;
      backtext.y = Graphics.height - 4;
      backtext.anchor.y = 1;
      this.addChild(backtext);
    }

    createButtons() {
      let i = 0;
      for (let move of this._pokemon.moveset) {
        let button = new MoveButton(move, this._pos[i].x, this._pos[i].y);
        this._moves.push(button);
        this.addChild(button);
        i++;
      }
      this._moves[movesInx].activate();
    }

    updateInput() {
      if (!this.visible) this.visible = true;

      if (Input.isTriggered('cancel')) {
        $Battle.changePhase(Battle.Phase.ActionSelection);
        this.visible = false;
      }

      if (Input.isTriggered('right')) {
        if (this._moves.length <= 1) return;
        this._moves[movesInx].deactivate();
        movesInx++;
        if (movesInx >= this._moves.length) movesInx = 0;
        this._moves[movesInx].activate();
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('left')) {
        if (this._moves.length <= 1) return;
        this._moves[movesInx].deactivate();
        movesInx--;
        if (movesInx < 0) movesInx = this._moves.length - 1;
        this._moves[movesInx].activate();
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('down')) {
        if (this._moves.length < 2) return;
        this._moves[movesInx].deactivate();
        movesInx += 2;
        if (movesInx >= this._moves.length) movesInx = Math.abs(this._moves.length - movesInx);
        this._moves[movesInx].activate();
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('up')) {
        if (this._moves.length <= 2) return;
        this._moves[movesInx].deactivate();
        movesInx -= 2;
        if (movesInx < 0) movesInx = this._moves.length - Math.abs(movesInx);
        this._moves[movesInx].activate();
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('ok')) {
        this.visible = false;
        let move = this._pokemon.moveset[movesInx];
        $Battle.choose(move, $Battle.sides.foe.actives[0]);
        $Battle.changePhase(Battle.Phase.None);
        $Battle.runActions();
      }
    }
  }



  export class BattleCommands extends Sprite {
    _bg: Sprite;
    options: { name: string; frame: number; x: number; y: number; sprite?: CommandButton; action: any }[];
    constructor(public x: number, public y: number) {
      super();
      let startX = 0;
      let startY = 0;
      this.options = [
        { name: 'FIGTH', frame: 0, x: startX, y: startY, action: this.openMovesSelection },
        { name: 'PARTY', frame: 1, x: startX + 84, y: startY, action: this.openParty },
        { name: 'BAG', frame: 2, x: startX, y: startY + 32, action: this.openBag },
        { name: 'RUN', frame: 3, x: startX + 84, y: startY + 32, action: this.run }
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
      // this._bg.bitmap = ImageManager.loadBitmap('img/pictures/Battle/', 'command_overlay', undefined, undefined);
      // this._bg.x = 40;
      // this._bg.y = 20;
      // this.addChild(this._bg);
    }

    createButtons() {
      for (let option of this.options) {
        option.sprite = new CommandButton(option.name, option.frame, option.x, option.y);
        this.addChild(option.sprite);
      }
      this.options[actionsInx].sprite.active = true;
    }

    updateInput() {
      if (!this.visible) this.visible = true;
      // if (this.isBusy()) return;

      if (Input.isTriggered('right')) {
        this.options[actionsInx].sprite.active = false;
        actionsInx++;
        if (actionsInx >= this.options.length) actionsInx = 0;
        this.options[actionsInx].sprite.active = true;
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('left')) {
        this.options[actionsInx].sprite.active = false;
        actionsInx--;
        if (actionsInx < 0) actionsInx = this.options.length - 1;
        this.options[actionsInx].sprite.active = true;
        SoundManager.playCursor();
        return;
      }
      if (Input.isTriggered('down')) {
        this.options[actionsInx].sprite.active = false;
        actionsInx += 2;
        if (actionsInx >= this.options.length) actionsInx -= 4;
        this.options[actionsInx].sprite.active = true;
        SoundManager.playCursor();
        return;
      }
      if (Input.isTriggered('up')) {
        this.options[actionsInx].sprite.active = false;
        actionsInx -= 2;
        if (actionsInx < 0) actionsInx += 4;
        this.options[actionsInx].sprite.active = true;
        SoundManager.playCursor();
        return;
      }

      if (Input.isTriggered('ok')) {
        this.options[actionsInx].action()
        this.visible = false;
      }
    }

    openMovesSelection() {
      $Battle.changePhase(Phase.MoveSelection);
    }
    openParty() {
      SceneManager.push(PE.Party.Scene_Party);
    }
    openBag() { }
    run() {
      $Battle.terminate();
      SceneManager.goto(PE.TitleScenes.CustomScene);
    }

  }


}


