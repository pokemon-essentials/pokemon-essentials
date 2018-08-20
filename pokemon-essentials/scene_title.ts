namespace PE.TitleScenes {
  let StartPressed = false;

  export class CustomScene extends Scene_Base {
    _commandWindow: CustomTitleCommandWindow;
    _pokelogo: Sprite;
    sprites: {};
    constructor() {
      super();
      this.sprites = {};
    }

    create() {
      this.createBackground();
      this.createForeground();
      this.createWindowLayer();
      this.createCommandWindow();
    }

    start() {
      super.start();
      SceneManager.clearStack();
      this.playTitleMusic();
      this.startFadeIn(this.fadeSpeed(), false);
    }

    update() {
      super.update();
      if ((Input.isTriggered("ok") || TouchInput.isTriggered()) && !this.isBusy()) {
        StartPressed = true;
      }
      if ((Input.isTriggered("cancel") || TouchInput.isCancelled()) && !this.isBusy()) {
        StartPressed = false;
      }
      if (StartPressed && !this.isBusy()) {
        this._commandWindow.open();
      } else {
        this._commandWindow.close();
      }
      this.sprites["start"].visible = !StartPressed;
      this.sprites["bgPattern"].origin.x += 1;
      this.sprites["effect1"].rotation += 0.005;
      this.sprites["effects2"].rotation += 0.01;
    }

    isBusy() {
      return this._commandWindow.isClosing() || super.isBusy();
    }

    terminate() {
      super.terminate();
      SceneManager.snapForBackground();
    }

    createBackground() {
      this.sprites["bg"] = new Sprite(ImageManager.loadTitle1("custom_background"));
      this.addChild(this.sprites["bg"]);

      this.sprites["bgPattern"] = new TilingSprite(ImageManager.loadPicture("custom_plane"));
      this.sprites["bgPattern"].move(0, 0, Graphics.width, Graphics.height);
      this.addChild(this.sprites["bgPattern"]);

      this.sprites["clouds2"] = new Sprite(ImageManager.loadTitle1("custom_clouds_2"));
      this.addChild(this.sprites["clouds2"]);

      this.sprites["effect1"] = new Sprite(ImageManager.loadTitle1("custom_effect"));
      this.sprites["effect1"].x = Graphics.width / 2;
      this.sprites["effect1"].y = 325;
      this.sprites["effect1"].anchor.x = 0.5;
      this.sprites["effect1"].anchor.y = 0.5;
      this.addChild(this.sprites["effect1"]);

      this.sprites["effects2"] = new Sprite(ImageManager.loadTitle1("gen_6_effect2"));
      this.sprites["effects2"].x = Graphics.width / 2;
      this.sprites["effects2"].y = 325;
      this.sprites["effects2"].anchor.x = 0.5;
      this.sprites["effects2"].anchor.y = 0.5;
      this.addChild(this.sprites["effects2"]);

      this.sprites["clouds1"] = new Sprite(ImageManager.loadTitle1("custom_clouds_1"));
      this.addChild(this.sprites["clouds1"]);

      this.sprites["bars"] = new Sprite(ImageManager.loadTitle1("custom_bars"));
      this.addChild(this.sprites["bars"]);

      this.sprites["start"] = new PE.Sprites.Blinker(20);
      this.sprites["start"].bitmap = ImageManager.loadTitle1("start");
      this.sprites["start"].y = 362;
      this.addChild(this.sprites["start"]);
    }

    createForeground() {
      this._pokelogo = new Sprite();
      this._pokelogo.bitmap = ImageManager.loadTitle1("pokelogo");
      this._pokelogo.x = Graphics.width / 2;
      this._pokelogo.y = 24;
      this._pokelogo.anchor.x = 0.5;
      this.addChild(this._pokelogo);
    }

    createCommandWindow() {
      this._commandWindow = new CustomTitleCommandWindow();
      this._commandWindow.setHandler("battle", this.commandNewGame.bind(this));
      this._commandWindow.setHandler("map", this.commandMap.bind(this));
      this._commandWindow.setHandler("continue", this.commandContinue.bind(this));
      this._commandWindow.setHandler("options", this.commandOptions.bind(this));
      this.addWindow(this._commandWindow);
    }

    commandNewGame() {
      DataManager.setupNewGame();
      this._commandWindow.close();
      this.fadeOutAll();
      SceneManager.goto(PE.Battle_Scene);
      // SceneManager.goto(PE.Battle.Scene_Battle);
      // $Player.party = PE.Pokemon.getRandomParty(6);
      // // $Player.party = [new Pokemon.Pokemon(Pokedex.GROUDON, 100)];
      // $Battle.setup([Trainers.RandomTrainer()], []);
      // $Battle.start();
    }

    commandMap() {
      DataManager.setupNewGame();
      this._commandWindow.close();
      this.fadeOutAll();
      SceneManager.goto(Scene_Map);
    }

    commandContinue() {
      this._commandWindow.close();
      SceneManager.push(Scene_Load);
    }

    commandOptions() {
      this._commandWindow.close();
      SceneManager.push(Scene_Options);
    }

    playTitleMusic() {
      // AudioManager.playBgm($dataSystem.titleBgm);
      AudioManager.stopBgs();
      AudioManager.stopMe();
    }
  }

  export class CustomTitleCommandWindow extends Window_TitleCommand {
    makeCommandList() {
      this.addCommand(i18n._("Wild Battle"), "battle", true);
      this.addCommand(i18n._("Map"), "map", true);
      this.addCommand(i18n._("Options"), "options", true);
    }

    updatePlacement() {
      this.x = Graphics.boxWidth - this.width;
      this.y = Graphics.boxHeight - this.height;
    }
    windowWidth() {
      return 180;
    }
  }

  export class Window_SelectPokemon extends Window_Command {
    makeCommandList() {
      for (const pokemon in POKEDEX) {
        if (POKEDEX.hasOwnProperty(pokemon)) {
          this.addCommand(pokemon, "pokemon", true);
        }
      }
    }

    updatePlacement() {
      this.x = Graphics.boxWidth - this.width;
      this.y = Graphics.boxHeight - this.height;
    }

    windowWidth() {
      return 260;
    }
    numVisibleRows() {
      return 9;
    }
  }
}

Scene_Boot.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  SoundManager.preloadImportantSounds();
  if (DataManager.isBattleTest()) {
    DataManager.setupBattleTest();
    SceneManager.goto(Scene_Battle);
  } else if (DataManager.isEventTest()) {
    DataManager.setupEventTest();
    SceneManager.goto(Scene_Map);
  } else {
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(PE.TitleScenes.CustomScene);
    // Window_TitleCommand.initCommandPosition();
  }
  this.updateDocumentTitle();
};
