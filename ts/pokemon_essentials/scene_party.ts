namespace PE.Party {
  export class Scene_Party extends Scene_Base {
    bg: Sprite;
    constructor() {
      super();
      this.createBackground();
    }

    createBackground() {
      this.bg = new Sprite();
      this.bg.bitmap = ImageManager.loadBitmap('img/titles1/', 'custom_background', undefined, false);
      this.addChild(this.bg);
    }
  }
}
