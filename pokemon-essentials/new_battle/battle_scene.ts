class NewBattle_Scene extends Scene_Base {
  battle: Battle_Manager;
  viewport: Sprite;
  sprites: Sprite;
  layers: {bg: Sprite} = {bg: undefined};
  message: PE.Battle.UI.Window_BattleMessage;

  constructor() {
    super();
    let p1 = [];
    let p2 = [];
    for (let index = 0; index < 6; index++) {
      p1.push(PE.Pokemon.getRandomPokemon(100));
      p2.push(PE.Pokemon.getRandomPokemon(100));
    }
    this.battle = new Battle_Manager(p1, p2);
  }

  create() {
    super.create();
    this.viewport = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this.viewport);
    this.createBackground();
    this.createMessageWindow();
  }

  createBackground() {
    this.layers.bg = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.layers.bg.bitmap = ImageManager.loadBitmap('img/battlebacks/', 'bg-forest');
    this.layers.bg.x = Graphics.width / 2;
    this.layers.bg.y = Graphics.height;
    this.layers.bg.anchor.x = 0.5;
    this.layers.bg.anchor.y = 1;
    this.viewport.addChild(this.layers.bg);

    this.sprites = new Sprite();
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
    for (const battler of this.battle.sides.foe.actives) {
      let fx = Graphics.width - 128;
      let fy = 240;
      let bsprite = new PE.Sprites.Battler(battler.pokemon, PE.Sprites.BattlersFacing.Front);
      bsprite.x = fx;
      bsprite.y = fy;
      bsprite.scale.x = 2;
      bsprite.scale.y = 2;
      bsprite.anchor.x = 0.5;
      bsprite.anchor.y = 1;
      this.sprites.addChild(bsprite);
    }

    for (const battler of this.battle.sides.player.actives) {
      let x = 128;
      let y = Graphics.height - 64;
      let index = battler.name + '_' + battler.slotIndex;
      let bsprite = new PE.Sprites.Battler(battler.pokemon, PE.Sprites.BattlersFacing.Back);
      bsprite.x = x;
      bsprite.y = y;
      bsprite.scale.x = 3;
      bsprite.scale.y = 3;
      bsprite.anchor.x = 0.5;
      bsprite.anchor.y = 1;
      this.sprites.addChild(bsprite);
    }

    this.viewport.addChild(this.sprites);

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

  start() {
    EventManager.on('SWITCH_BATTLERS', this.switchBattlers, this);
    this.battle.startBattle();
    this.createBattlers();
  }

  update() {
    super.update();
    if (Input.isTriggered('ok')) {
      this.endActionsSelection();
      return;
    }
    this.battle.update();
  }

  endActionsSelection() {
    this.battle.endActionsSelection();
  }

  switchBattlers(battler) {
    this.sprites.bitmap = new Bitmap(Graphics.width, Graphics.height);
    // this.viewport.removeChild(this.sprites);
    this.createBattlers();
  }
}
