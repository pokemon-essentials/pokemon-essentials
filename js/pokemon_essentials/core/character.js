/*
 * @file A custom implemantation of the original plugin by Shaz.
 * @author @Shaz, @andarms
 */
var _initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function () {
    _initMembers.call(this);
    this._isMultiFrame = false;
    this._frames = [4, 4, 4, 4];
};
var _maxPattern = Game_CharacterBase.prototype.maxPattern;
Game_CharacterBase.prototype.maxPattern = function () {
    if (!this._isMultiFrame) {
        return _maxPattern.call(this);
    }
    else {
        return this._frames[(this._direction / 2) - 1];
    }
};
var _pattern = Game_CharacterBase.prototype.pattern;
Game_CharacterBase.prototype.pattern = function () {
    if (!this._isMultiFrame) {
        return _pattern.call(this);
    }
    else {
        return this._pattern < this._frames[this._direction / 2 - 1] ? this._pattern : 0;
    }
};
var _isOriginalPattern = Game_CharacterBase.prototype.isOriginalPattern;
Game_CharacterBase.prototype.isOriginalPattern = function () {
    if (!this._isMultiFrame) {
        return _isOriginalPattern.call(this);
    }
    else {
        return this.pattern() === 0;
    }
};
var _resetPattern = Game_CharacterBase.prototype.resetPattern;
Game_CharacterBase.prototype.resetPattern = function () {
    if (!this._isMultiFrame) {
        _resetPattern.call(this);
    }
    else {
        this.setPattern(0);
    }
};
var _setImage = Game_CharacterBase.prototype.setImage;
Game_CharacterBase.prototype.setImage = function (characterName, characterIndex) {
    _setImage.call(this, characterName, characterIndex);
    this._isMultiFrame = true;
    this._frames = [4, 4, 4, 4];
};
var _setTileImage = Game_CharacterBase.prototype.setTileImage;
Game_CharacterBase.prototype.setTileImage = function (tileId) {
    _setTileImage.call(this, tileId);
    this._isMultiFrame = false;
    this._frames = [4, 4, 4, 4];
};
Game_CharacterBase.prototype.isMultiFrame = function () {
    return this._isMultiFrame;
};
Game_CharacterBase.prototype.getDirectionFrames = function () {
    return this._frames[this._direction / 2 - 1];
};
var _Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function () {
    _Game_Event_initMembers.call(this);
    if (this._isMultiFrame) {
        this._originalPattern = 0;
    }
};
// #endregion
//===========================================================================
//===========================================================================
// #region Sprite_Character, set the height and width with the new pattern
Sprite_Character.prototype.patternWidth = function () {
    return this.bitmap.width / 4;
};
Sprite_Character.prototype.patternHeight = function () {
    if (this._tileId > 0) {
        return $gameMap.tileHeight();
    }
    return this.bitmap.height / 4;
};
// #endregion
//===========================================================================
var charOffsetY = -4;
var _shiftY_ = Game_CharacterBase.prototype.shiftY;
Game_CharacterBase.prototype.shiftY = function () {
    var v = _shiftY_.call(this);
    return v > 0 ? charOffsetY : 0;
};
Game_Player.prototype.PE_GetCharacterName = function () {
    return $gamePlayer.isDashing() ? SETTINGS.GENDERS[$Player.data.gender].dashSprite : SETTINGS.GENDERS[$Player.data.gender].sprite;
};
var _alias_updateDashing = Game_Player.prototype.updateDashing;
Game_Player.prototype.updateDashing = function () {
    _alias_updateDashing.call(this);
    $gamePlayer.refresh();
};
//#endregion
//===========================================================================
//===========================================================================
// #region Sprite_Character
var _alias_updateBitmap = Sprite_Character.prototype.updateBitmap;
Sprite_Character.prototype.updateBitmap = function () {
    if (this._character === $gamePlayer) {
        if (this.isImageChanged()) {
            this._tilesetId = $gameMap.tilesetId();
            this._tileId = this._character.tileId();
            this._characterName = $gamePlayer.PE_GetCharacterName();
            this._characterIndex = 0;
            if (this._tileId > 0) {
                this.setTileBitmap();
            }
            else {
                this.setCharacterBitmap();
            }
        }
    }
    else {
        _alias_updateBitmap.call(this);
    }
};
var _alias_isImageChanged = Sprite_Character.prototype.isImageChanged;
Sprite_Character.prototype.isImageChanged = function () {
    if (this._character === $gamePlayer) {
        return (this._tilesetId !== $gameMap.tilesetId() ||
            this._tileId !== this._character.tileId() ||
            this._characterName !== $gamePlayer.PE_GetCharacterName());
    }
    else {
        return _alias_isImageChanged.call(this);
    }
};
//#endregion
//===========================================================================
//===========================================================================
// Game_Interpreter
//===========================================================================
var _alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _alias_pluginCommand.call(this, command, args);
    if (command.trim() === "PE_SetPlayerGender") {
        var _gender = parseInt(args[0]) - 1;
        if (!SETTINGS.GENDERS[_gender])
            throw new Error("there isn't a gender number " + (_gender + 1) + " in the player SETTINGS.GENDERS list");
        $Player.data.gender = _gender;
        $Player.data.filename = SETTINGS.GENDERS[$Player.data.gender].sprite;
        $gamePlayer.refresh();
    }
};
