namespace PE {
  export class Scene_Intro extends Scene_Base {
    bg: Sprite;

    constructor() {
      super();
    }

    create() {
      this.createBackground();

      let t = new PE.Sprites.Battler(SETTINGS.INTRO_SPECIES, Sprites.BattlersFacing.Front);
      t.scale.x = 2;
      t.scale.y = 2;
      this.addChild(t);
    }

    createBackground() {
      this.bg = new Sprite();
      this.bg.bitmap = ImageManager.loadBitmap('img/titles1/', 'custom_background', undefined, false);
      this.addChild(this.bg);
    }
  }
}
