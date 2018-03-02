namespace PE {
  const _queue = [];
  let Speech = [];

  function push(method, scope: any = this) {
    _queue.push({ method: method, scope: scope });
  }

  function pop() {
    if (_queue.length <= 0) return;
    let action = _queue.shift();
    action.method.apply(action.scope);
  }

  function showMessage(text) {
    push(() => $gameMessage.add(text));
  }

  function showGenderSelection() {
    let genders = [];
    for (const gender of SETTINGS.GENDERS) {
      if (!gender) continue;
      genders.push(gender.name);
    }
    push(() => $gameMessage.setChoices(genders, 0, 0););

  }

  export class Scene_Intro extends Scene_Base {
    message: Window_Message;
    bg: Sprite;

    constructor() {
      super();

      Speech = [
        showMessage("Welcome to the world of Pokémon."),
        showMessage("I'm the pokémon profressor"),
        showGenderSelection()
      ];
    }

    create() {
      this.createBackground();

      let professor = new Sprite();
      professor.bitmap = ImageManager.loadBitmap('img/pictures/', 'intro_prof', undefined, undefined);
      professor.x = Graphics.width / 2;
      professor.y = 280;
      professor.anchor.x = 0.5;
      professor.anchor.y = 1;
      professor.scale.x = 2;
      professor.scale.y = 2;
      this.addChild(professor);

      let t = new PE.Sprites.Battler(SETTINGS.INTRO_SPECIES, Sprites.BattlersFacing.Front);
      t.x = professor.x;
      t.y = professor.y;
      t.anchor.x = 1;
      t.anchor.y = 1;
      t.scale.x = 2;
      t.scale.y = 2;
      this.addChild(t);

      this.createMessageWindow();
    }

    createBackground() {
      this.bg = new Sprite();
      this.bg.bitmap = ImageManager.loadBitmap('img/titles1/', 'custom_background', undefined, false);
      this.addChild(this.bg);
    }


    createMessageWindow() {
      this.createWindowLayer();
      this.message = new Window_Message();
      this.addWindow(this.message);
      this.message.subWindows().forEach(function (window) {
        this.addWindow(window);
      }, this);
    }

    update() {
      super.update();
      if (!$gameMessage.isBusy() && Speech.length) pop();
    }
  }
}
