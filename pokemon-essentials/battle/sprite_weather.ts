namespace PE {
  export class SpriteWeather extends Sprite {
    private _sprites: any[];
    type: WEATHERS;
    /**The power of the weather in the range (0, 9). */
    power: number;
    origin: Point;
    private _rainBitmap: Bitmap;
    private _stormBitmap: Bitmap;
    private _snowBitmap: Bitmap;
    _dimmerSprite: ScreenSprite;
    opacityDest: number;
    constructor() {
      super();
      this._width = Graphics.width;
      this._height = Graphics.height;
      this._sprites = [];

      this._createBitmaps();
      this._createDimmer();

      this.type = WEATHERS.None;
      this.power = 0;
      this.origin = new Point();
      this.opacityDest = 100;
    }

    update() {
      this._updateDimmer();
      this._updateAllSprites();
    }

    setWeather(weather: WEATHERS) {
      this.type = weather;
      if (weather === WEATHERS.HarshSunlight) {
        this._dimmerSprite.setColor(255, 255, 150);
        this.power = 9;
      }
      if (weather === WEATHERS.Rain) this.power = 5;
      if (weather === WEATHERS.Hail) this.power = 5;
      this.opacityDest = 100;
    }

    _createBitmaps() {
      this._rainBitmap = new Bitmap(1, 60);
      this._rainBitmap.fillAll("white");
      this._stormBitmap = new Bitmap(2, 100);
      this._stormBitmap.fillAll("white");
      this._snowBitmap = new Bitmap(9, 9);
      this._snowBitmap.drawCircle(4, 4, 4, "white");
    }

    _createDimmer() {
      this._dimmerSprite = new ScreenSprite();
      this._dimmerSprite.setColor(80, 80, 80);
      this.addChild(this._dimmerSprite);
    }

    _updateDimmer() {
      if (this.type === WEATHERS.HarshSunlight) {
        if (this.opacityDest == 0 && this._dimmerSprite.opacity <= 1 && PE.Utils.chance(25)) {
          this.opacityDest = 100;
        }
        this._dimmerSprite.opacity = PE.Utils.lerp(this._dimmerSprite.opacity, this.opacityDest, 0.05);
        if (this._dimmerSprite.opacity >= this.opacityDest - 1) {
          this.opacityDest = 0;
        }
      } else {
        this._dimmerSprite.opacity = Math.floor(this.power * 6);
      }
    }

    _updateAllSprites() {
      var maxSprites = Math.floor(this.power * 10);
      while (this._sprites.length < maxSprites) {
        this._addSprite();
      }
      while (this._sprites.length > maxSprites) {
        this._removeSprite();
      }
      for (const sprite of this._sprites) {
        this._updateSprite(sprite);
        sprite.x = sprite.ax - this.origin.x;
        sprite.y = sprite.ay - this.origin.y;
      }
    }

    _addSprite() {
      var sprite = new Sprite(this.viewport);
      sprite.opacity = 0;
      this._sprites.push(sprite);
      this.addChild(sprite);
    }

    _updateSprite(sprite) {
      switch (this.type) {
        case WEATHERS.Rain:
          this._updateRainSprite(sprite);
          break;
        case WEATHERS.HeavyRain:
          this._updateStormSprite(sprite);
          break;
        case WEATHERS.Hail:
          this._updateSnowSprite(sprite);
          break;
      }
      if (sprite.opacity < 40) {
        this._rebornSprite(sprite);
      }
    }

    private _removeSprite() {
      this.removeChild(this._sprites.pop());
    }

    private _updateRainSprite(sprite) {
      sprite.bitmap = this._rainBitmap;
      sprite.rotation = Math.PI / 16;
      sprite.ax -= 6 * Math.sin(sprite.rotation);
      sprite.ay += 6 * Math.cos(sprite.rotation);
      sprite.opacity -= 6;
    }

    private _updateStormSprite(sprite) {
      sprite.bitmap = this._stormBitmap;
      sprite.rotation = Math.PI / 8;
      sprite.ax -= 8 * Math.sin(sprite.rotation);
      sprite.ay += 8 * Math.cos(sprite.rotation);
      sprite.opacity -= 8;
    }

    _updateSnowSprite(sprite) {
      sprite.bitmap = this._snowBitmap;
      sprite.rotation = Math.PI / 16;
      sprite.ax -= 3 * Math.sin(sprite.rotation);
      sprite.ay += 3 * Math.cos(sprite.rotation);
      sprite.opacity -= 3;
    }

    _rebornSprite(sprite) {
      sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
      sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
      sprite.opacity = 160 + Math.randomInt(60);
    }
  }
}
