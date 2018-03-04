var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PE;
(function (PE) {
    var Sprites;
    (function (Sprites) {
        var Blinker = /** @class */ (function (_super) {
            __extends(Blinker, _super);
            function Blinker(_speed) {
                var _this = _super.call(this) || this;
                _this._speed = _speed;
                _this._speed = 60 / _this._speed;
                return _this;
            }
            Blinker.prototype.update = function () {
                _super.prototype.update.call(this);
                this.opacity -= this._speed;
                if (this.opacity <= 0 || this.opacity >= 255) {
                    this._speed *= -1;
                }
            };
            return Blinker;
        }(Sprite));
        Sprites.Blinker = Blinker;
        var SpriteAnimated = /** @class */ (function (_super) {
            __extends(SpriteAnimated, _super);
            function SpriteAnimated(_frameWidth, _frameHeight, frameRate) {
                if (frameRate === void 0) { frameRate = 15; }
                var _this = _super.call(this) || this;
                _this._frameWidth = _frameWidth;
                _this._frameHeight = _frameHeight;
                _this._currFrame = 0;
                _this._frames = 0;
                _this._framesCount = 0;
                _this._animationSpeed = 0;
                _this.animate = true;
                _this.setFrameRate(frameRate);
                return _this;
            }
            SpriteAnimated.prototype.setFrameRate = function (frames) {
                this._animationSpeed = Math.ceil(60 / frames);
            };
            SpriteAnimated.prototype.grenerateFrames = function () {
                this._currFrame = 0;
                if (!this._frameWidth)
                    this._frameWidth = this.bitmap.height;
                if (!this._frameHeight)
                    this._frameHeight = this.bitmap.height;
                this._frames = this.bitmap.width / this._frameWidth;
                this.changeFrame(0);
            };
            SpriteAnimated.prototype.changeFrame = function (frame) {
                this.setFrame(this._frameWidth * frame, 0, this._frameWidth, this._frameHeight);
                this.visible = true;
            };
            SpriteAnimated.prototype.update = function () {
                _super.prototype.update.call(this);
                if (this.animate && this._framesCount === 0) {
                    this.changeFrame(this._currFrame);
                    this._currFrame++;
                    if (this._currFrame === this._frames) {
                        this._currFrame = 0;
                    }
                }
                this.updateAnimation();
            };
            ;
            SpriteAnimated.prototype.updateAnimation = function () {
                this._framesCount++;
                this._framesCount %= this._animationSpeed;
            };
            return SpriteAnimated;
        }(Sprite_Base));
        var Battler = /** @class */ (function (_super) {
            __extends(Battler, _super);
            function Battler(species, facing, shiny) {
                if (shiny === void 0) { shiny = false; }
                var _this = _super.call(this) || this;
                _this.species = species;
                _this.facing = facing;
                _this.setFrameRate(15);
                var path = 'img/battlers/';
                if (_this.facing === 0 /* Front */)
                    path += 'front';
                if (_this.facing === 1 /* Back */)
                    path += 'back';
                if (shiny)
                    path += '-shiny';
                path += '/';
                _this.bitmap = ImageManager.loadBitmap(path, _this.species.toLowerCase(), undefined, undefined);
                _this.bitmap.addLoadListener(_this.grenerateFrames.bind(_this));
                _this.visible = false;
                return _this;
            }
            return Battler;
        }(SpriteAnimated));
        Sprites.Battler = Battler;
        var Button = /** @class */ (function (_super) {
            __extends(Button, _super);
            function Button(_width, _height) {
                var _this = _super.call(this) || this;
                _this._width = _width;
                _this._height = _height;
                return _this;
            }
            Button.prototype.changeFrame = function (col, row) {
                _super.prototype.setFrame.call(this, this._width * col, this._height * row, this._width, this._height);
            };
            return Button;
        }(Sprite_Button));
        Sprites.Button = Button;
        var PokeIcon = /** @class */ (function (_super) {
            __extends(PokeIcon, _super);
            function PokeIcon(pokemon, x, y) {
                var _this = _super.call(this) || this;
                _this._frameCount = 0;
                _this._frameRate = 30;
                var path = 'img/icons/pokemon/';
                path += pokemon.shiny ? 'shiny/' : 'regular/';
                path += '/';
                _this.bitmap = ImageManager.loadBitmap('img/icons/pokemon/regular/', pokemon.species.toLowerCase(), undefined, undefined);
                _this.x = x;
                _this.y = y;
                _this._dy = 5;
                return _this;
            }
            PokeIcon.prototype.update = function () {
                _super.prototype.update.call(this);
                if (this._frameCount === 0) {
                    this.y += this._dy;
                    this._dy *= -1;
                }
                this._frameCount++;
                this._frameCount %= this._frameRate;
            };
            return PokeIcon;
        }(Sprite));
        Sprites.PokeIcon = PokeIcon;
        var TrainerBack = /** @class */ (function (_super) {
            __extends(TrainerBack, _super);
            function TrainerBack() {
                var _this = _super.call(this) || this;
                _this.moving = false;
                var filename = SETTINGS.GENDERS[$Player.data.gender].back;
                _this.bitmap = ImageManager.loadBitmap('img/characters/', filename, undefined, undefined);
                _this.bitmap.addLoadListener(_this.grenerateFrames.bind(_this));
                _this.setFrameRate(5);
                _this.scale.x = 1.5;
                _this.scale.y = 1.5;
                _this.animate = false;
                return _this;
            }
            TrainerBack.prototype.start = function () {
                this.animate = true;
                this.moving = true;
            };
            TrainerBack.prototype.update = function () {
                if (this._framesCount === 0) {
                    if (this.animate)
                        this.changeFrame(this._currFrame);
                    this._currFrame++;
                    if (this._currFrame === this._frames) {
                        this._currFrame = 0;
                        this.animate = false;
                        // this.changeFrame(this._currFrame);
                    }
                }
                if (this.moving)
                    this.x -= 4;
                if (this.x < -this.width - 64)
                    this.moving = false;
                this.updateAnimation();
            };
            return TrainerBack;
        }(SpriteAnimated));
        Sprites.TrainerBack = TrainerBack;
        var TrainerFront = /** @class */ (function (_super) {
            __extends(TrainerFront, _super);
            function TrainerFront(filename) {
                var _this = _super.call(this) || this;
                _this.bitmap = ImageManager.loadBitmap('img/characters/trainers/', filename, undefined, undefined);
                _this.bitmap.addLoadListener(_this.grenerateFrames.bind(_this));
                _this.setFrameRate(15);
                _this.scale.x = 3;
                _this.scale.y = 3;
                return _this;
            }
            TrainerFront.prototype.update = function () {
                if (this._framesCount === 0) {
                    if (this.animate)
                        this.changeFrame(this._currFrame);
                    this._currFrame++;
                    if (this._currFrame === this._frames) {
                        this._currFrame = 0;
                        this.animate = !this.animate;
                    }
                }
                this.updateAnimation();
            };
            return TrainerFront;
        }(SpriteAnimated));
        Sprites.TrainerFront = TrainerFront;
    })(Sprites = PE.Sprites || (PE.Sprites = {}));
})(PE || (PE = {}));
