/**
 * @file Custom Window Implementation,
 * Overwirte some crucial function of the orginal RPG Maker Engine.
 */

const DEFAULT_FONT_COLOR = "#505058";
const DEFAULT_SHADOW_COLOR = "#A0A0A8";
const DEFAULT_FONT_SIZE = 24;

//===========================================================================
// #region Bitmap, change the text draw function
interface Bitmap {
  initialize(width: number, height: number): void;
  shadowColor: String;
}

let Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
  Bitmap_initialize.call(this, width, height);
  this.outlineWidth = 0;
};

/**
 * @description Use multiples text renders to generate a text shadow.
 */
Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
  var context = this._context;
  if (this.outlineWidth == 0) {
    context.fillStyle = this.shadowColor || DEFAULT_SHADOW_COLOR;
    context.fillText(text, tx, ty + 1, maxWidth);
    context.fillText(text, tx, ty + 2, maxWidth);
    context.fillText(text, tx + 1, ty, maxWidth);
    context.fillText(text, tx + 2, ty, maxWidth);
    context.fillText(text, tx + 1, ty + 1, maxWidth);
    context.fillText(text, tx + 2, ty + 2, maxWidth);
  }
  context.fillStyle = this.textColor || DEFAULT_FONT_COLOR;
  context.fillText(text, tx, ty, maxWidth);
};
// #endregion
//===========================================================================

//===========================================================================================
// #region Window, Overwrite the window creation function, to use the Pokémon's windowskins

Object.defineProperty(Window.prototype, "frameskin", {
  get: function() {
    return this._frameskin;
  },
  set: function(value) {
    if (this._frameskin !== value) {
      this._frameskin = value;
      this._frameskin.addLoadListener(this._onWindowskinLoad.bind(this));
    }
  },
  configurable: true
});

interface Window {
  _onWindowskinLoad(): void;
  _createAllParts(): void;
  _refreshBack(): void;
  _refreshFrame(): void;
  _refreshContents(): void;
  _updateContents(): void;
  _refreshCursor(): void;
  _updateCursor(): void;
  _refreshPauseSign(): void;
  changeFrameSkin(filename: string): void;
}

Window.prototype._onWindowskinLoad = function() {
  this._frameX1 = 0;
  this._frameX2 = 0;
  this._frameX3 = 0;
  this._frameY1 = 0;
  this._frameY2 = 0;
  this._frameY3 = 0;
  if (this._frameskin.width === 48 && this._frameskin.height === 48) {
    this._frameX1 = this._frameX2 = this._frameX3 = this._frameY1 = this._frameY2 = this._frameY3 = 16;
  }
  if (this._frameskin.width === 96 && this._frameskin.height === 48) {
    this._frameX1 = 32;
    this._frameX2 = 16;
    this._frameX3 = 48;
    this._frameY1 = 16;
    this._frameY2 = 16;
    this._frameY3 = 16;
  }
  this._paddingLeft = this._frameX1;
  this._paddingTop = this._frameY1;
  this._paddingRight = this._frameX3;
  this._paddingBottom = this._frameY3;

  this._refreshAllParts();
};

let _Window_createAllParts = Window.prototype._createAllParts;
Window.prototype._createAllParts = function() {
  _Window_createAllParts.call(this);
  this._margin = 24;
};

Window.prototype._refreshBack = function() {
  var m = this._margin;
  var w = this._width - (this._paddingLeft + this._paddingRight);
  var h = this._height - (this._paddingTop + this._paddingBottom);

  var bitmap = new Bitmap(w, h);
  this._windowBackSprite.bitmap = bitmap;
  this._windowBackSprite.move(this._paddingLeft, this._paddingTop);

  bitmap.blt(this._frameskin, this._frameX1, this._frameY1, this._frameX2, this._frameY2, 0, 0, w, h);
  var tone = this._colorTone;
  bitmap.adjustTone(tone[0], tone[1], tone[2]);
};

Window.prototype._refreshFrame = function() {
  var w = this._width;
  var h = this._height;
  var m = 16;
  var bitmap = new Bitmap(w, h);

  if (this._frameskin.width === 48 && this._frameskin.height === 48) {
    var skin = this._frameskin;

    bitmap.blt(skin, 0, this._frameY1, this._frameX1, this._frameY2, 0, this._frameY1, this._frameX1, h - (this._frameY1 + this._frameY3)); // left bar
    bitmap.blt(skin, this._frameX1, 0, this._frameX2, this._frameY1, this._frameX1, 0, w - (this._frameX1 + this._frameX3), this._frameY1); // top bar
    bitmap.blt(
      skin,
      this._frameX1 + this._frameX2,
      this._frameY1,
      this._frameX3,
      this._frameY2,
      w - this._frameX3,
      this._frameY1,
      this._frameX3,
      h - (this._frameY1 + this._frameY3)
    ); // right bar
    bitmap.blt(
      skin,
      this._frameX1,
      this._frameY1 + this._frameY2,
      this._frameX2,
      this._frameY3,
      this._frameX1,
      h - this._frameY3,
      w - (this._frameX1 + this._frameX3),
      this._frameY3
    ); // bottom bar

    bitmap.blt(skin, 0, 0, this._frameX1, this._frameY1, 0, 0, this._frameX1, this._frameY1); // topleft
    bitmap.blt(skin, this._frameX1 + this._frameX2, 0, this._frameX3, this._frameY1, w - this._frameX3, 0, this._frameX3, this._frameY1); // topright
    bitmap.blt(
      skin,
      this._frameX1 + this._frameX2,
      this._frameY1 + this._frameY2,
      this._frameX3,
      this._frameY3,
      w - this._frameX3,
      h - this._frameY3,
      this._frameX3,
      this._frameY3
    ); // bottomright
    bitmap.blt(skin, 0, this._frameY1 + this._frameY2, this._frameX1, this._frameY3, 0, h - this._frameY3, this._frameX1, this._frameY3); // bottomleft
  }

  if (this._frameskin.width === 96 && this._frameskin.height === 48) {
    var skin = this._frameskin;

    bitmap.blt(skin, 0, this._frameY1, this._frameX1, this._frameY2, 0, this._frameY1, this._frameX1, h - (this._frameY1 + this._frameY3)); // left bar
    bitmap.blt(skin, this._frameX1, 0, this._frameX2, this._frameY1, this._frameX1, 0, w - (this._frameX1 + this._frameX3), this._frameY1); // top bar
    bitmap.blt(
      skin,
      this._frameX1 + this._frameX2,
      this._frameY1,
      this._frameX3,
      this._frameY2,
      w - this._frameX3,
      this._frameY1,
      this._frameX3,
      h - (this._frameY1 + this._frameY3)
    ); // right bar
    bitmap.blt(
      skin,
      this._frameX1,
      this._frameY1 + this._frameY2,
      this._frameX2,
      this._frameY3,
      this._frameX1,
      h - this._frameY3,
      w - (this._frameX1 + this._frameX3),
      this._frameY3
    ); // bottom bar

    bitmap.blt(skin, 0, 0, this._frameX1, this._frameY1, 0, 0, this._frameX1, this._frameY1); // topleft
    bitmap.blt(skin, this._frameX1 + this._frameX2, 0, this._frameX3, this._frameY1, w - this._frameX3, 0, this._frameX3, this._frameY1); // topright
    bitmap.blt(
      skin,
      this._frameX1 + this._frameX2,
      this._frameY1 + this._frameY2,
      this._frameX3,
      this._frameY3,
      w - this._frameX3,
      h - this._frameY3,
      this._frameX3,
      this._frameY3
    ); // bottomright
    bitmap.blt(skin, 0, this._frameY1 + this._frameY2, this._frameX1, this._frameY3, 0, h - this._frameY3, this._frameX1, this._frameY3); // bottomleft
  }

  this._windowFrameSprite.bitmap = bitmap;
  this._margin = m;
};

Window.prototype._refreshContents = function() {
  this._windowContentsSprite.move(this._paddingLeft, this._paddingTop);
};

Window.prototype._updateContents = function() {
  var w = this._width - (this._paddingLeft + this._paddingRight);
  var h = this._height - (this._paddingTop + this._paddingBottom);
  if (w > 0 && h > 0) {
    this._windowContentsSprite.setFrame(this.origin.x, this.origin.y, w, h);
    this._windowContentsSprite.visible = this.isOpen();
  } else {
    this._windowContentsSprite.visible = false;
  }
};

Window.prototype._refreshCursor = function() {
  var pad = this._padding;
  var x = this._cursorRect.x + pad - this.origin.x;
  var y = this._cursorRect.y + pad - this.origin.y;
  var w = this._cursorRect.width;
  var h = this._cursorRect.height;
  var m = 4;
  var x1 = Math.max(x, pad);
  var y1 = Math.max(y, pad);
  var w2 = Math.min(w, this._width - pad - x1);
  var h2 = Math.min(h, this._height - pad - y1);
  var bitmap = new Bitmap(w2, h2);

  this._windowCursorSprite.bitmap = ImageManager.loadPicture("selarrow");
  this._windowCursorSprite.setFrame(0, 0, w2, h2);
  this._windowCursorSprite.move(x1, y1 + 2);
};

Window.prototype._updateCursor = function() {
  var blinkCount = this._animationCount % 40;
  var cursorOpacity = this.contentsOpacity;
  // if (this.active) {
  //     if (blinkCount < 20) {
  //         cursorOpacity -= blinkCount * 8;
  //     } else {
  //         cursorOpacity -= (40 - blinkCount) * 8;
  //     }
  // }
  this._windowCursorSprite.alpha = cursorOpacity / 255;
  this._windowCursorSprite.visible = this.isOpen();
};

Window.prototype._refreshPauseSign = function() {
  var sx = 144;
  var sy = 96;
  var p = 24;
  this._windowPauseSignSprite.bitmap = this._windowskin;
  this._windowPauseSignSprite.anchor.x = 0.5;
  this._windowPauseSignSprite.anchor.y = 1;
  this._windowPauseSignSprite.move(this._width - this._paddingRight / 2, this._height - 16);
  this._windowPauseSignSprite.setFrame(sx, sy, p, p);
  this._windowPauseSignSprite.alpha = 0;
};

Window.prototype.changeFrameSkin = function(filename) {
  this._frameskin = ImageManager.loadSystem(filename);
  this._frameskin.addLoadListener(this._onWindowskinLoad.bind(this));
};
// #endregion
//===========================================================================================

//===========================================================================
// #region Window_Base, overwritefunction tu use custom windowskin

interface Window_Base {
  loadFrameSkin(): void;
}

Window_Base.prototype.loadWindowskin = function() {
  this.loadFrameSkin();
  this.windowskin = ImageManager.loadSystem("Window");
};

Window_Base.prototype.loadFrameSkin = function() {
  this.frameskin = ImageManager.loadSystem("choice 1");
};

Window_Base.prototype.standardFontSize = function() {
  return DEFAULT_FONT_SIZE;
};

Window_Base.prototype.standardPadding = function() {
  return 16;
};

Window_Base.prototype.textPadding = function() {
  return 10;
};

Window_Message.prototype.numVisibleRows = function() {
  return 2;
};

Window_Base.prototype.standardBackOpacity = function() {
  return 255;
};

Window_Base.prototype.refreshDimmerBitmap = function() {};

Window_Base.prototype.setBackgroundType = function(type) {};

Window_Base.prototype.showBackgroundDimmer = function() {};

Window_Base.prototype.hideBackgroundDimmer = function() {};

Window_Base.prototype.updateBackgroundDimmer = function() {};

let _Window_Base_textColor = Window_Base.prototype.textColor;
Window_Base.prototype.textColor = function(n) {
  if (n === 0) return DEFAULT_FONT_COLOR;
  return _Window_Base_textColor.call(this, n);
};
// #endregion
//===========================================================================

//===========================================================================
// #region Window_Message, Message Window use diferent windowskin

Window_Message.prototype.loadFrameSkin = function() {
  this.frameskin = ImageManager.loadSystem("speech hgss 1");
};
// #endregion
//===========================================================================

//===========================================================================
// #region Window_Selectable, use Pokémon's select cursor
Window_Selectable.prototype._updateContents = function() {
  var w = this._width - (this._paddingLeft + this._paddingRight);
  var h = this._height - (this._paddingTop + this._paddingBottom);
  if (w > 0 && h > 0) {
    this._windowContentsSprite.setFrame(this.origin.x - 8, this.origin.y, w, h);
    this._windowContentsSprite.visible = this.isOpen();
  } else {
    this._windowContentsSprite.visible = false;
  }
};
// #endregion
//===========================================================================
