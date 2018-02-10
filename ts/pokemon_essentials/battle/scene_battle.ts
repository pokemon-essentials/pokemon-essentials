namespace PE.Battle {




  export class Scene_Battle extends Scene_Base {
    hud: Sprite;
    partyBar: HPBar;
    movesSelection: _MovesSelection;
    battleCommands: BattleCommands;
    message: Window_BattleMessage;

    /** save all the objects display layers */
    layers: { bg: Sprite; bg2: Sprite; weather: Weathers.WeatherLayer } = { bg: undefined, bg2: undefined, weather: undefined };

    create() {
      super.create();
      this.createLayers();
    }

    start() {
      super.start();
      $Battle.scene = this;
      $Battle.start();
      $Battle.changePhase(Phase.ActionSelection);
    }

    update() {
      super.update();
      $Battle.update();
      switch ($Battle.phase) {
        case Phase.ActionSelection:
          this.partyBar.visible = true;
          this.hud.visible = true;
          this.battleCommands.updateInput();
          break;
        case Phase.MoveSelection:
          this.partyBar.visible = false;
          this.hud.visible = false;
          this.movesSelection.updateInput();
          break;
        default:
          if (Input.isTriggered('cancel')) {
            SceneManager.goto(PE.TitleScenes.CustomScene);
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
      this.message = new Window_BattleMessage();
      this.addWindow(this.message);
      this.message.subWindows().forEach(function (window) {
        this.addWindow(window);
      }, this);
    }

    createBattlers() {
      let fx = Graphics.width - 96;
      let fy = 240
      let f = new Sprites.Battler($Battle.opponents[0].leader, Sprites.BattlersFacing.Front);
      f.x = fx;
      f.y = fy;
      f.scale.x = 2;
      f.scale.y = 2;
      f.anchor.x = 0.5;
      f.anchor.y = 1;
      this.addChild(f);

      let px = 96;
      let py = Graphics.height;
      let a = new Sprites.Battler($Battle.player.leader, Sprites.BattlersFacing.Back);
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

      this.partyBar = new HPBar($Battle.player.active, 16, Graphics.height - 64, false);
      this.partyBar.visible = false;
      this.addChild(this.partyBar);

      let h2 = new HPBar($Battle.opponents[0].active, Graphics.width - 208, 48, true);
      this.addChild(h2);

      let x = Graphics.width - 168;
      let y = Graphics.height - 108;
      this.battleCommands = new BattleCommands(x, y);
      this.battleCommands.visible = false;
      this.addChild(this.battleCommands);

      this.movesSelection = new _MovesSelection($Battle.player.active);
      this.addChild(this.movesSelection);

      let msg = i18n._('What will %1 do?', $Battle.player.active.name);
      this.hud = new Sprite(new Bitmap(300, 32));
      this.hud.bitmap.fontSize = 20;
      this.hud.bitmap.drawText(msg, 0, 0, 300, 32, 'right');
      this.hud.x = Graphics.width - 8;
      this.hud.y = Graphics.height;
      this.hud.anchor.x = 1;
      this.hud.anchor.y = 1;
      this.hud.visible = false;
      this.addChild(this.hud);
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
