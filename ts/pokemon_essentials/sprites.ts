namespace PE.Sprites {
  class SpriteAnimated extends Sprite_Base {
    private _currFrame: number = 0;
    private _frames: number = 0;
    private _framesCount: number = 0;
    private _animationSpeed: number = 0;
    constructor(private _frameWidth?: number, private _frameHeight?: number, frameRate: number = 15) {
      super();
      this.setFrameRate(frameRate);
    }


    setFrameRate(frames) {
      this._animationSpeed = Math.ceil(60 / frames);
    }

    grenerateFrames() {
      this._currFrame = 0;
      if (!this._frameWidth) this._frameWidth = this.bitmap.height;
      if (!this._frameHeight) this._frameHeight = this.bitmap.height;
      this._frames = this.bitmap.width / this._frameWidth;
      this.changeFrame(0);
    }

    changeFrame(frame) {
      this.setFrame(this._frameWidth * frame, 0, this._frameWidth, this._frameHeight);
      this.visible = true;
    }

    update() {
      super.update.call(this);
      if (this._framesCount === 0) {
        this.changeFrame(this._currFrame);
        this._currFrame++;
        if (this._currFrame === this._frames) {
          this._currFrame = 0
        }
      }
      this.updateAnimation();
    };

    updateAnimation() {
      this._framesCount++;
      this._framesCount %= this._animationSpeed;
    }
  }

  export const enum BattlersFacing { Front, Back }

  export class Battler extends SpriteAnimated {

    constructor(public pokemon: PE.Pokemon.Pokemon, public facing: BattlersFacing) {
      super();
      this.setFrameRate(15)
      let path = 'img/battlers/';
      if (this.facing === BattlersFacing.Front) path += 'front';
      if (this.facing === BattlersFacing.Back) path += 'back';
      if (this.pokemon.shiny) path += '-shiny';
      path += '/';
      this.bitmap = ImageManager.loadBitmap(path, pokemon.species.toLowerCase(), undefined, undefined);
      this.bitmap.addLoadListener(this.grenerateFrames.bind(this));
      this.visible = false;
    }

  }

  export class Button extends Sprite_Button {
    constructor(public _width: number, public _height: number) {
      super();
    }

    changeFrame(col: number, row: number) {
      super.setFrame(this._width * col, this._height * row, this._width, this._height);
    }
  }
}
