namespace PE.Battle {
  export class Scene_Battle extends Scene_Base {

    partyPokemon: Pokemon.Pokemon;

    /** save all the objects display layers */
    layers: { bg: Sprite; bg2: Sprite; } = { bg: undefined, bg2: undefined };

    create() {
      super.create();
      this.createLayers();
    }

    prepare(party: PE.Pokemon.Pokemon) {
      this.partyPokemon = party;
      console.log(this.partyPokemon);
    }

    start() {
      super.start();
    }

    update() {
      super.update();
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
  }
}
