class PE_Sprite_Cursor extends Sprite {
  constructor(folder, filename) {
    super();
    this.bitmap = ImageManager.loadBitmap(folder, filename);
    this.ticks = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
  }
  update(folder, filename) {
    super.update();
    this.ticks++;
    if (this.ticks === 30) {
      this.scale.x = 0.9;
      this.scale.y = 0.9;
    }
    if (this.ticks === 60) {
      this.scale.x = 1;
      this.scale.y = 1;
      this.ticks = 0;
    }
  }
}

class PE_Sprite_Blinker extends Sprite {
  /**
   * @param _speed {Number} Blink speed
   */
  constructor(_speed) {
    super();
    this._speed = 60 / _speed;
  }

  update() {
    super.update();
    this.opacity -= this._speed;
    if (this.opacity <= 0 || this.opacity >= 255) {
      this._speed *= -1;
    }
  }
}

class PE_Sprite_Animated extends Sprite_Base {
  constructor(_frameWidth, _frameHeight, frameRate) {
    super();
    this._currFrame = 0;
    this._framesCount = 0;
    this._animationSpeed = 0;
    this.animate = true;

    this._frameWidth = _frameWidth;
    this._frameHeight = _frameHeight;
    this.frameRate = frameRate || 154;

    this._frames = 0;
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
    if (this.animate && this._framesCount === 0) {
      this.changeFrame(this._currFrame);
      this._currFrame++;
      if (this._currFrame === this._frames) {
        this._currFrame = 0;
      }
    }
    this.updateAnimation();
  }

  updateAnimation() {
    this._framesCount++;
    this._framesCount %= this._animationSpeed;
  }
}

const BattlersFacing = {
  Front: 0,
  Back: 1
};

class PE_Sprite_Battler extends PE_Sprite_Animated {
  /**
   * @param pokemon {Pokemon.Pokemon}
   * @param facing {BattlersFacing}
   */
  constructor(pokemon, facing) {
    super();
    this.pokemon = pokemon;
    this.facing = facing;
    this.setFrameRate(15);
    let path = 'img/battlers/';
    if (this.facing === BattlersFacing.Front) path += 'front';
    if (this.facing === BattlersFacing.Back) path += 'back';
    if (this.pokemon.shiny) path += '-shiny';
    path += '/';
    console.log(pokemon)
    this.bitmap = ImageManager.loadBitmap(path, pokemon.toLowerCase());
    this.bitmap.addLoadListener(this.grenerateFrames.bind(this));
    this.visible = false;
  }
}

class PE_Sprite_Button extends Sprite_Button {
  constructor(_width, _height) {
    super();
    this._width = _width;
    this._height = _height;
  }

  changeFrame(col, row) {
    super.setFrame(this._width * col, this._height * row, this._width, this._height);
  }
}

class PE_Sprite_PokeIcon extends Sprite {
  constructor(pokemon, x, y) {
    super();
    this._frameCount = 0;
    this._frameRate = 30;
    let path = 'img/icons/pokemon/';
    path += pokemon.shiny ? 'shiny/' : 'regular/';
    path += '/';
    this.bitmap = ImageManager.loadBitmap(
      'img/icons/pokemon/regular/',
      pokemon.species.toLowerCase(),
      undefined,
      undefined
    );
    this.x = x;
    this.y = y;
    this._dy = 5;
  }

  update() {
    super.update();
    if (this._frameCount === 0) {
      this.y += this._dy;
      this._dy *= -1;
    }
    this._frameCount++;
    this._frameCount %= this._frameRate;
  }
}

class PE_Sprite_TrainerBack extends PE_Sprite_Animated {
  constructor() {
    super();
    this.moving = false;
    let filename = SETTINGS.GENDERS[$Player.data.gender].back;
    this.bitmap = ImageManager.loadBitmap('img/characters/', filename, undefined, undefined);
    this.bitmap.addLoadListener(this.grenerateFrames.bind(this));
    this.setFrameRate(5);
    this.scale.x = 1.5;
    this.scale.y = 1.5;
    this.animate = false;
  }

  start() {
    this.animate = true;
    this.moving = true;
  }

  update() {
    if (this._framesCount === 0) {
      if (this.animate) this.changeFrame(this._currFrame);
      this._currFrame++;
      if (this._currFrame === this._frames) {
        this._currFrame = 0;
        this.animate = false;
        // this.changeFrame(this._currFrame);
      }
    }
    if (this.moving) this.x -= 4;
    if (this.x < -this.width - 64) this.moving = false;
    this.updateAnimation();
  }
}

/**
 * Battle Trainer Pokeball throw 
 */
class PE_Sprite_TrainerFront extends PE_Sprite_Animated {
  constructor(filename) {
    super();
    this.bitmap = ImageManager.loadBitmap('img/characters/trainers/', filename, undefined, undefined);
    this.bitmap.addLoadListener(this.grenerateFrames.bind(this));
    this.setFrameRate(15);
    this.scale.x = 3;
    this.scale.y = 3;
  }

  update() {
    if (this._framesCount === 0) {
      if (this.animate) this.changeFrame(this._currFrame);
      this._currFrame++;
      if (this._currFrame === this._frames) {
        this._currFrame = 0;
        this.animate = !this.animate;
      }
    }
    this.updateAnimation();
  }
}
