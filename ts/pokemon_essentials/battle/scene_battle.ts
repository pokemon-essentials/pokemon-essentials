namespace PE.Battle {

  class AbilitySing extends Sprite {
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
    }


    showAbilityIndicator(ability: string, foeSide: boolean) {
      let x = 0;
      let y = 192;
      if (foeSide) { x = Graphics.width - 224; y = 96; }
      let sing = new AbilitySing(ability);
      sing.x = x;
      sing.y = y;
      this.addChild(sing);
    }
  }
}
