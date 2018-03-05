var __extends = (this && this.__extends) || (function() {
  var extendStatics = Object.setPrototypeOf ||
    ({
        __proto__: []
      }
      instanceof Array && function(d, b) {
        d.__proto__ = b;
      }) ||
    function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p)) d[p] = b[p];
    };
  return function(d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var PE;
(function(PE) {
  var _queue = [];
  var Speech = [];

  function push(method, scope) {
    if (scope === void 0) {
      scope = this;
    }
    _queue.push({
      method: method,
      scope: scope
    });
  }

  function pop() {
    if (_queue.length <= 0)
      return;
    var action = _queue.shift();
    action.method.apply(action.scope);
  }

  function showMessage(text) {
    push(function() {
      return $gameMessage.add(text);
    });
  }

  function showGenderSelection() {
    var genders = [];
    for (var _i = 0, _a = SETTINGS.GENDERS; _i < _a.length; _i++) {
      var gender = _a[_i];
      if (!gender)
        continue;
      genders.push(gender.name);
    }
    push(function() {
      return $gameMessage.setChoices(genders, 0, 0);
    });
  }
  var Scene_Intro = /** @class */ (function(_super) {
    __extends(Scene_Intro, _super);

    function Scene_Intro() {
      var _this = _super.call(this) || this;
      Speech = [
        showMessage("Welcome to the world of Pokémon."),
        showMessage("I'm the pokémon profressor"),
        showGenderSelection()
      ];
      return _this;
    }
    Scene_Intro.prototype.create = function() {
      this.createBackground();
      var professor = new Sprite();
      professor.bitmap = ImageManager.loadBitmap('img/pictures/', 'intro_prof', undefined, undefined);
      professor.x = Graphics.width / 2;
      professor.y = 280;
      professor.anchor.x = 0.5;
      professor.anchor.y = 1;
      professor.scale.x = 2;
      professor.scale.y = 2;
      this.addChild(professor);
      var t = new PE.Sprites.Battler(PE.Utils.getRandomPropertie(PE.Pokedex), 0 /* Front */ );
      t.x = professor.x;
      t.y = professor.y;
      t.anchor.x = 1;
      t.anchor.y = 1;
      t.scale.x = 2;
      t.scale.y = 2;
      this.addChild(t);
      this.createMessageWindow();
    };
    Scene_Intro.prototype.createBackground = function() {
      this.bg = new Sprite();
      this.bg.bitmap = ImageManager.loadBitmap('img/titles1/', 'custom_background', undefined, false);
      this.addChild(this.bg);
    };
    Scene_Intro.prototype.createMessageWindow = function() {
      this.createWindowLayer();
      this.message = new Window_Message();
      this.addWindow(this.message);
      this.message.subWindows().forEach(function(window) {
        this.addWindow(window);
      }, this);
    };
    Scene_Intro.prototype.update = function() {
      _super.prototype.update.call(this);
      if (Input.isTriggered('cancel')) {
        SceneManager.pop();
        SoundManager.playCancel();
      }
      if (!$gameMessage.isBusy() && Speech.length)
        pop();
    };
    return Scene_Intro;
  }(Scene_Base));
  PE.Scene_Intro = Scene_Intro;
})(PE || (PE = {}));
