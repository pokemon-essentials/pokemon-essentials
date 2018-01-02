namespace PE.Battle {
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

    prepare(party: PE.Pokemon.Pokemon, foe:PE.Pokemon.Pokemon) {
      this.partyPokemon = party;
      this.foePokemon = foe;
    }

    start() {
      super.start();
      PE.Battle.Manager.setup();
      PE.Battle.Manager.showPausedMessage(`A wild ${this.foePokemon.name} has apeared!`);
      PE.Battle.Manager.showMessage(`Go ${this.partyPokemon.name}!`);
      PE.Battle.Manager.changePhase(PE.Battle.Phase.ActionSelection);
    }

    update() {
      super.update();
      PE.Battle.Manager.update();
      if (Input.isTriggered('cancel')) {
        SceneManager.goto(Scene_Title);
      }
    }

    stop() {
      super.stop();
    }

    terminate() {
      super.terminate();
    }

    createLayers() {
      this.createBackground();
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
  }
}
