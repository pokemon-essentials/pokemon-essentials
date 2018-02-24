/**
 * -----------------------------------------------------------------------------
 * Sprite_Base
 *
 * The sprite class with a feature which displays animations.
 */
declare class Sprite_Base extends Sprite {
    protected _animationSprites: Array<Sprite_Animation>;
    protected _effectTarget: Sprite_Base;
    protected _hiding: boolean;

    constructor();

    hide(): void;
    show(): void;
    updateVisibility(): void;
    updateAnimationSprites(): void;
    startAnimation(animation: RPG.Animation, mirror: boolean, delay: number): void;
    isAnimationPlaying(): boolean;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Button
 *
 * The sprite for displaying a button.
 */
declare class Sprite_Button extends Sprite {
    protected _touching: boolean;
    protected _coldFrame: Rectangle;
    protected _hotFrame: Rectangle;
    protected _clickHandler: () => void;

    updateFrame(): void;
    setColdFrame(x: number, y: number, width: number, height: number): void;
    setHotFrame(x: number, y: number, width: number, height: number): void;
    setClickHandler(method: () => void): void;
    callClickHandler(): void;
    processTouch(): void;
    isActive(): boolean;
    isButtonTouched(): boolean;
    canvasToLocalX(x: number): number;
    canvasToLocalY(y: number): number;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Character
 *
 * The sprite for displaying a character.
 */
declare class Sprite_Character extends Sprite_Base {
    protected _character: Game_Character;
    protected _balloonDuration: number;
    protected _tilesetId: number;
    protected _upperBody: Sprite;
    protected _lowerBody: Sprite;
    protected _bushDepth: number;
    protected _balloonSprite: Sprite_Balloon;

    constructor(character: Game_Character);

    initMembers(): void;
    setCharacter(character: Game_Character): void;
    isTile(): boolean;
    tilesetBitmap(tileId: number): Bitmap;
    updateBitmap(): void;
    isImageChanged(): boolean;
    setTileBitmap(): void;
    setCharacterBitmap(): void;
    updateFrame(): void;
    updateTileFrame(): void;
    updateCharacterFrame(): void;
    characterBlockX(): number;
    characterBlockY(): number;
    characterPatternX(): void;
    characterPatternY(): number;
    patternWidth(): number;
    patternHeight(): number;
    updateHalfBodySprites(): void;
    createHalfBodySprites(): void;
    updatePosition(): void;
    updateAnimation(): void;
    updateOther(): void;
    setupAnimation(): void;
    setupBalloon(): void;
    startBalloon(): void;
    updateBalloon(): void;
    endBalloon(): void;
    isBalloonPlaying(): boolean;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Battler
 *
 * The superclass of Sprite_Actor and Sprite_Enemy.
 */
declare class Sprite_Battler extends Sprite_Base {
    protected _battler: Game_Battler;
    protected _damages: Array<Sprite_Damage>;
    protected _homeX: number;
    protected _homeY: number;
    protected _offsetX: number;
    protected _offsetY: number;
    protected _targetOffsetX: number;
    protected _targetOffsetY: number;
    protected _movementDuration: number;
    protected _selectionEffectCount: number;

    constructor(battler?: Game_Battler);

    initMembers(): void;
    setBattler(battler: Game_Battler): void;
    setHome(x: number, y: number): void;
    updateMain(): void;
    updateBitmap(): void;
    updateFrame(): void;
    updateMove(): void;
    updatePosition(): void;
    updateAnimation(): void;
    updateDamagePopup(): void;
    updateSelectionEffect(): void;
    setupAnimation(): void;
    setupDamagePopup(): void;
    damageOffsetX(): number;
    damageOffsetY(): number;
    startMove(x: number, y: number, duration: number): void;
    onMoveEnd(): void;
    isEffecting(): boolean;
    isMoving(): boolean;
    inHomePosition(): boolean;
}


/**
 * -----------------------------------------------------------------------------
 * Sprite_Actor
 *
 * The sprite for displaying an actor.
 */
declare class Sprite_Actor extends Sprite_Battler {
    static MOTIONS: {
        walk: MV.Motion,
        wait: MV.Motion,
        chant: MV.Motion,
        guard: MV.Motion,
        damage: MV.Motion,
        evade: MV.Motion,
        thrust: MV.Motion,
        swing: MV.Motion,
        missile: MV.Motion,
        skill: MV.Motion,
        spell: MV.Motion,
        item: MV.Motion,
        escape: MV.Motion,
        victory: MV.Motion,
        dying: MV.Motion,
        abnormal: MV.Motion,
        sleep: MV.Motion,
        dead: MV.Motion,
    };

    protected _battlerName: string;
    protected _motion: MV.Motion;
    protected _motionCount: number;
    protected _pattern: number;
    protected _mainSprite: Sprite_Base;
    protected _shadowSprite: Sprite;
    protected _weaponSprite: Sprite_Weapon;
    protected _stateSprite: Sprite_StateOverlay;
    protected _actor: Game_Actor;

    constructor(battler?: Game_Actor);

    createMainSprite(): void;
    createShadowSprite(): void;
    createWeaponSprite(): void;
    createStateSprite(): void;
    setBattler(battler: Game_Actor): void;
    moveToStartPosition(): void;
    setActorHome(index: number): void;
    updateShadow(): void;
    setupMotion(): void;
    setupWeaponAnimation(): void;
    startMotion(motionType: string): void;
    updateTargetPosition(): void;
    updateMove(): void;
    updateMotion(): void;
    updateMotionCount(): void;
    motionSpeed(): number;
    refreshMotion(): void;
    startEntryMotion(): void;
    stepForward(): void;
    stepBack(): void;
    retreat(): void;
    damageOffsetX(): number;
    damageOffsetY(): number;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Enemy
 *
 * The sprite for displaying an enemy.
 */
declare class Sprite_Enemy extends Sprite_Battler {
    protected _enemy: Game_Enemy;
    protected _appeared: boolean;
    protected _battlerName: string;
    protected _battlerHue: number;
    protected _effectType: string;
    protected _effectDuration: number;
    protected _shake: number;
    protected _stateIconSprite: Sprite_StateIcon;

    constructor(battler: Game_Enemy);

    createStateIconSprite(): void;
    setBattler(battler: Game_Enemy): void;
    loadBitmap(name: string, hue: number): void;
    updateStateSprite(): void;
    initVisibility(): void;
    setupEffect(): void;
    startEffect(effectType: string): void;
    startAppear(): void;
    startDisappear(): void;
    startWhiten(): void;
    startBlink(): void;
    startCollapse(): void;
    startBossCollapse(): void;
    startInstantCollapse(): void;
    updateEffect(): void;
    isEffecting(): boolean;
    revertToNormal(): void;
    updateWhiten(): void;
    updateBlink(): void;
    updateAppear(): void;
    updateDisappear(): void;
    updateCollapse(): void;
    updateBossCollapse(): void;
    updateInstantCollapse(): void;
    damageOffsetX(): number;
    damageOffsetY(): number;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Animation
 *
 * The sprite for displaying an animation.
 */
declare class Sprite_Animation extends Sprite {
    protected static _checker1: {key: RPG.Animation};
    protected static _checker2: {key: RPG.Animation};

    protected _target: Sprite_Base;
    protected _animation: RPG.Animation;
    protected _mirror: boolean;
    protected _delay: number;
    protected _rate_: number;
    protected _duration: number;
    protected _flashColor: Array<number>;
    protected _flashDuration: number;
    protected _screenFlashDuration: number;
    protected _hidingDuration: number;
    protected _bitmap1: Bitmap;
    protected _bitmap2: Bitmap;
    protected _cellSprites: Array<Sprite>;
    protected _screenFlashSprite: ScreenSprite;
    protected _duplicated: boolean;
    protected _reduceArtifacts: boolean;

    initMembers(): void;
    setup(target: Sprite_Base, animation: RPG.Animation, mirror: boolean, delay: number): void;
    remove(): void;
    setupRate(): void;
    setupDuration(): void;
    updateFlash(): void;
    updateScreenFlash(): void;
    absoluteX(): number;
    absoluteY(): number;
    updateHiding(): void;
    isPlaying(): boolean;
    loadBitmaps(): void;
    isReady(): boolean;
    createSprites(): void;
    createCellSprites(): void;
    createScreenFlashSprite(): void;
    updateMain(): void;
    updatePosition(): void;
    updateFrame(): void;
    currentFrameIndex(): number;
    updateAllCellSprites(frame: Array<Array<number>>): void;
    updateCellSprite(sprite: Sprite, cell: Array<number>): void;
    processTimingData(timing: RPG.Animation.Timing): void;
    startFlash(color: Array<number>, duration: number): void;
    startScreenFlash(color: Array<number>, duration: number): void;
    startHiding(duration: number): void;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Damage
 *
 * The sprite for displaying a popup damage.
 */
declare class Sprite_Damage extends Sprite {
    protected _duration: number;
    protected _flashColor: Array<number>;
    protected _flashDuration: number;
    protected _damageBitmap: Bitmap;

    setup(target: Game_Actor): void;
    setupCriticalEffect(): void;
    digitWidth(): number;
    digitHeight(): number;
    createMiss(): void;
    createDigits(baseRow: number, value: number): void;
    createChildSprite(): Sprite;
    updateChild(sprite: Sprite): void;
    updateFlash(): void;
    updateOpacity(): void;
    isPlaying(): boolean;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_StateIcon
 *
 * The sprite for displaying state icons.
 */
declare class Sprite_StateIcon extends Sprite {
    protected static _iconWidth: number;
    protected static _iconHeight: number;

    protected _battler: Game_Battler;
    protected _iconIndex: number;
    protected _animationCount: number;
    protected _animationIndex: number;

    initMembers(): void;
    loadBitmap(): void;
    setup(battler: Game_Battler): void;
    animationWait(): number;
    updateIcon(): void;
    updateFrame(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_StateOverlay
 *
 * The sprite for displaying an overlay image for a state.
 */
declare class Sprite_StateOverlay extends Sprite_Base {
    protected _battler: Game_Battler;
    protected _overlayIndex: number;
    protected _animationCount: number;
    protected _pattern: number;

    initMembers(): void;
    loadBitmap(): void;
    setup(battler: Game_Battler): void;
    animationWait(): number;
    updatePattern(): void;
    updateFrame(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Weapon
 *
 * The sprite for displaying a weapon image for attacking.
 */
declare class Sprite_Weapon extends Sprite_Base {
    protected _weaponImageId: number;
    protected _animationCount: number;
    protected _pattern: number;

    initMembers(): void;
    setup(weaponImageId: number): void;
    animationWait(): number;
    updatePattern(): void;
    loadBitmap(): void;
    updateFrame(): void;
    isPlaying(): boolean;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Balloon
 *
 * The sprite for displaying a balloon icon.
 */
declare class Sprite_Balloon extends Sprite_Base {
    protected _balloonId: number;
    protected _duration: number;

    initMembers(): void;
    loadBitmap(): void;
    setup(balloonId: number): void;
    update(): void;
    updateFrame(): void;
    speed(): number;
    waitTime(): number;
    frameIndex(): number;
    isPlaying(): boolean;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Picture
 *
 * The sprite for displaying a picture.
 */
declare class Sprite_Picture extends Sprite {
    protected _pictureId: number;
    protected _pictureName: string;
    protected _isPicture: boolean;

    constructor(pictureId: number);

    picture(): Game_Picture;
    updateBitmap(): void;
    updateOrigin(): void;
    updatePosition(): void;
    updateScale(): void;
    updateTone(): void;
    updateOther(): void;
    loadBitmap(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Timer
 *
 * The sprite for displaying the timer.
 */
declare class Sprite_Timer extends Sprite {
    protected _seconds: number;

    createBitmap(): void;
    updateBitmap(): void;
    redraw(): void;
    timerText(): string;
    updatePosition(): void;
    updateVisibility(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Sprite_Destination
 *
 * The sprite for displaying the destination place of the touch input.
 */
declare class Sprite_Destination extends Sprite {
    protected _frameCount: number;

    createBitmap(): void;
    updatePosition(): void;
    updateAnimation(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Spriteset_Base
 *
 * The superdeclare class of Spriteset_Map and Spriteset_Battle.
 */
declare class Spriteset_Base extends Sprite {
    protected _tone: Array<number>;
    protected _baseSprite: Sprite;
    protected _blackScreen: ScreenSprite;
    protected _toneFilter: ToneFilter;
    protected _toneSprite: ToneSprite;
    protected _pictureContainer: Sprite;
    protected _timerSprite: Sprite_Timer;
    protected _flashSprite: ScreenSprite;
    protected _fadeSprite: ScreenSprite;

    createLowerLayer(): void;
    createUpperLayer(): void;
    createBaseSprite(): void;
    createToneChanger(): void;
    createWebGLToneChanger(): void;
    createCanvasToneChanger(): void;
    createPictures(): void;
    createTimer(): void;
    createScreenSprites(): void;
    updateScreenSprites(): void;
    updateToneChanger(): void;
    updateWebGLToneChanger(): void;
    updateCanvasToneChanger(): void;
    updatePosition(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Spriteset_Map
 *
 * The set of sprites on the map screen.
 */
declare class Spriteset_Map extends Spriteset_Base {
    protected _parallax: TilingSprite;
    protected _tilemap: Tilemap | ShaderTilemap;
    protected _tileset: RPG.Tileset;
    protected _characterSprites: Array<Sprite_Character>;
    protected _shadowSprite: Sprite;
    protected _destinationSprite: Sprite_Destination;
    protected _weather: Weather;
    protected _parallaxName: string;

    hideCharacters(): void;
    createParallax(): void;
    createTilemap(): void;
    loadTileset(): void;
    createCharacters(): void;
    createShadow(): void;
    createDestination(): void;
    createWeather(): void;
    updateTileset(): void;
    /**
     * Simple fix for canvas parallax issue, destroy old parallax and readd to  the tree.
     */
    protected _canvasReAddParallax(): void;
    updateParallax(): void;
    updateTilemap(): void;
    updateShadow(): void;
    updateWeather(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Spriteset_Battle
 *
 * The set of sprites on the battle screen.
 */
declare class Spriteset_Battle extends Spriteset_Base {
    protected _battlebackLocated: boolean;
    protected _backgroundSprite: Sprite;
    protected _battleField: Sprite;
    protected _back1Sprite: TilingSprite;
    protected _back2Sprite: TilingSprite;
    protected _enemySprites: Array<Sprite_Enemy>;
    protected _actorSprites: Array<Sprite_Actor>;

    createBackground(): void;
    createBattleField(): void;
    createBattleback(): void;
    updateBattleback(): void;
    locateBattleback(): void;
    battleback1Bitmap(): Bitmap;
    battleback2Bitmap(): Bitmap;
    battleback1Name(): string;
    battleback2Name(): string;
    overworldBattleback1Name(): string;
    overworldBattleback2Name(): string;
    normalBattleback1Name(): string;
    normalBattleback2Name(): string;
    terrainBattleback1Name(type: number): string;
    terrainBattleback2Name(type: number): string;
    defaultBattleback1Name(): string;
    defaultBattleback2Name(): string;
    shipBattleback1Name(): string;
    shipBattleback2Name(): string;
    autotileType(z: number): number;
    createEnemies(): void;
    compareEnemySprite(a: Sprite_Enemy, b: Sprite_Enemy): number;
    createActors(): void;
    updateActors(): void;
    battlerSprites(): Array<Sprite_Battler>;
    isAnimationPlaying(): boolean;
    isEffecting(): boolean;
    isAnyoneMoving(): boolean;
    isBusy(): boolean;
}
