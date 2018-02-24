/**
 * -----------------------------------------------------------------------------
 * Scene_Base
 *
 * The superclass of all scenes within the game.
 */
declare class Scene_Base extends Stage {
    protected _active: boolean;
    protected _fadeSign: number;
    protected _fadeDuration: number;
    protected _fadeSprite: ScreenSprite;
    protected _windowLayer: WindowLayer;

    create(): void;
    isActive(): boolean;
    isReady(): boolean;
    start(): void;
    update(): void;
    stop(): void;
    isBusy(): boolean;
    terminate(): void;
    createWindowLayer(): void;
    addWindow(window: Window_Base): void;
    startFadeIn(duration: number, white: boolean): void;
    startFadeOut(duration: number, white: boolean): void;
    createFadeSprite(white: boolean): void;
    updateFade(): void;
    updateChildren(): void;
    popScene(): void;
    checkGameover(): void;
    fadeOutAll(): void;
    fadeSpeed(): number;
    slowFadeSpeed(): number;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Boot
 *
 * The scene class for initializing the entire game.
 */
declare class Scene_Boot extends Scene_Base {
    protected _startDate: Date;

    loadSystemImages(): void;
    loadSystemWindowImage(): void;
    isGameFontLoaded(): boolean;
    updateDocumentTitle(): void;
    checkPlayerLocation(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Title
 *
 * The scene class of the title screen.
 */
declare class Scene_Title extends Scene_Base {
    protected _commandWindow: Window_TitleCommand;
    protected _backSprite1: Sprite;
    protected _backSprite2: Sprite;
    protected _gameTitleSprite: Sprite;

    createBackground(): void;
    createForeground(): void;
    drawGameTitle(): void;
    centerSprite(sprite: Sprite): void;
    createCommandWindow(): void;
    commandNewGame(): void;
    commandContinue(): void;
    commandOptions(): void;
    playTitleMusic(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Map
 *
 * The scene class of the map screen.
 */
declare class Scene_Map extends Scene_Base {
    protected _waitCount: number;
    protected _encounterEffectDuration: number;
    protected _mapLoaded: boolean;
    protected _touchCount: number;
    protected _transfer: boolean;

    protected _spriteset: Spriteset_Map;
    protected _mapNameWindow: Window_MapName;
    protected _scrollTextWindow: Window_ScrollText;
    protected _messageWindow: Window_Message;

    menuCalling: boolean;

    onMapLoaded(): void;
    updateMainMultiply(): void;
    updateMain(): void;
    isFastForward(): boolean;
    stop(): void;
    needsFadeIn(): boolean;
    needsSlowFadeOut(): boolean;
    updateWaitCount(): boolean;
    updateDestination(): void;
    isMapTouchOk(): boolean;
    processMapTouch(): void;
    isSceneChangeOk(): boolean;
    updateScene(): void;
    createDisplayObjects(): void;
    createSpriteset(): void;
    createAllWindows(): void;
    createMapNameWindow(): void;
    createMessageWindow(): void;
    createScrollTextWindow(): void;
    updateTransferPlayer(): void;
    updateEncounter(): void;
    updateCallMenu(): void;
    isMenuEnabled(): boolean;
    isMenuCalled(): boolean;
    callMenu(): void;
    updateCallDebug(): void;
    isDebugCalled(): boolean;
    fadeInForTransfer(): void;
    fadeOutForTransfer(): void;
    launchBattle(): void;
    stopAudioOnBattleStart(): void;
    startEncounterEffect(): void;
    updateEncounterEffect(): void;
    snapForBattleBackground(): void;
    startFlashForEncounter(duration: number): void;
    encounterEffectSpeed(): number;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_MenuBase
 *
 * The superclass of all the menu-type scenes.
 */
declare class Scene_MenuBase extends Scene_Base {
    protected _actor: Game_Actor;
    protected _backgroundSprite: Sprite;
    protected _helpWindow: Window_Help;

    actor(): Game_Actor;
    updateActor(): void;
    createBackground(): void;
    setBackgroundOpacity(opacity: number): void;
    createHelpWindow(): void;
    nextActor(): void;
    previousActor(): void;
    onActorChange(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Menu
 *
 * The scene class of the menu screen.
 */
declare class Scene_Menu extends Scene_MenuBase {
    protected _commandWindow: Window_MenuCommand;
    protected _goldWindow: Window_Gold;
    protected _statusWindow: Window_MenuStatus;

    createCommandWindow(): void;
    createGoldWindow(): void;
    createStatusWindow(): void;
    commandItem(): void;
    commandPersonal(): void;
    commandFormation(): void;
    commandOptions(): void;
    commandSave(): void;
    commandGameEnd(): void;
    onPersonalOk(): void;
    onPersonalCancel(): void;
    onFormationOk(): void;
    onFormationCancel(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_ItemBase
 *
 * The superclass of Scene_Item and Scene_Skill.
 */
declare class Scene_ItemBase extends Scene_MenuBase {
    protected _actorWindow: Window_MenuActor;
    protected _itemWindow: Window_Selectable;

    createActorWindow(): void;
    item(): void;
    user(): Game_Actor;
    isCursorLeft(): boolean;
    showSubWindow(window: Window_Base): void;
    hideSubWindow(window: Window_Base): void;
    onActorOk(): void;
    onActorCancel(): void;
    determineItem(): void;
    useItem(): void;
    activateItemWindow(): void;
    itemTargetActors(): Game_Actor;
    canUse(): boolean;
    isItemEffectsValid(): boolean;
    applyItem(): void;
    checkCommonEvent(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Item
 *
 * The scene class of the item screen.
 */
declare class Scene_Item extends Scene_ItemBase {
    protected _categoryWindow: Window_ItemCategory;

    createCategoryWindow(): void;
    createItemWindow(): void;
    onCategoryOk(): void;
    onItemOk(): void;
    onItemCancel(): void;
    playSeForItem(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Skill
 *
 * The scene class of the skill screen.
 */
declare class Scene_Skill extends Scene_ItemBase {
    protected _skillTypeWindow: Window_SkillType;

    createSkillTypeWindow(): void;
    createStatusWindow(): void;
    createItemWindow(): void;
    refreshActor(): void;
    commandSkill(): void;
    onItemCancel(): void;
    playSeForItem(): void;
    onActorChange(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Equip
 *
 * The scene class of the equipment screen.
 */
declare class Scene_Equip extends Scene_MenuBase {
    protected _statusWindow: Window_EquipStatus;
    protected _commandWindow: Window_EquipCommand;
    protected _slotWindow: Window_EquipSlot;
    protected _itemWindow: Window_EquipItem;

    createStatusWindow(): void;
    createCommandWindow(): void;
    createSlotWindow(): void;
    createItemWindow(): void;
    refreshActor(): void;
    commandEquip(): void;
    commandOptimize(): void;
    commandClear(): void;
    onSlotOk(): void;
    onSlotCancel(): void;
    onItemOk(): void;
    onItemCancel(): void;
    onActorChange(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Status
 *
 * The scene class of the status screen.
 */
declare class Scene_Status extends Scene_MenuBase {
    protected _statusWindow: Window_Status;

    refreshActor(): void;
    onActorChange(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Options
 *
 * The scene class of the options screen.
 */
declare class Scene_Options extends Scene_MenuBase {
    protected _optionsWindow: Window_Options;

    createOptionsWindow(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_File
 *
 * The superclass of Scene_Save and Scene_Load.
 */
declare class Scene_File extends Scene_MenuBase {
    protected _listWindow: Window_SavefileList;

    savefileId(): void;
    createHelpWindow(): void;
    createListWindow(): void;
    mode(): void;
    activateListWindow(): void;
    helpWindowText(): string;
    firstSavefileIndex(): number;
    onSavefileOk(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Save
 *
 * The scene class of the save screen.
 */
declare class Scene_Save extends Scene_File {
    mode(): string;
    helpWindowText(): string;
    firstSavefileIndex(): number;
    onSavefileOk(): void;
    onSaveSuccess(): void;
    onSaveFailure(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Load
 *
 * The scene class of the load screen.
 */
declare class Scene_Load extends Scene_File {
    protected _loadSuccess: boolean;

    mode(): string;
    helpWindowText(): string;
    firstSavefileIndex(): number;
    onSavefileOk(): void;
    onLoadSuccess(): void;
    onLoadFailure(): void;
    reloadMapIfUpdated(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_GameEnd
 *
 * The scene class of the game end screen.
 */
declare class Scene_GameEnd extends Scene_MenuBase {
    protected _commandWindow: Window_GameEnd;

    stop(): void;
    createBackground(): void;
    createCommandWindow(): void;
    commandToTitle(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Shop
 *
 * The scene class of the shop screen.
 */
declare class Scene_Shop extends Scene_MenuBase {
    protected _goods: Array<Array<any>>;
    protected _purchaseOnly: boolean;
    protected _item: RPG.BaseItem;

    protected _goldWindow: Window_Gold;
    protected _commandWindow: Window_ShopCommand;
    protected _dummyWindow: Window_Base;
    protected _numberWindow: Window_ShopNumber;
    protected _statusWindow: Window_ShopStatus;
    protected _buyWindow: Window_ShopBuy;
    protected _categoryWindow: Window_ItemCategory;
    protected _sellWindow: Window_ShopSell;
    protected _helpWindow: Window_Help;

    prepare(goods: Array<Array<any>>, purchaseOnly: boolean): void;
    createGoldWindow(): void;
    createCommandWindow(): void;
    createDummyWindow(): void;
    createNumberWindow(): void;
    createStatusWindow(): void;
    createBuyWindow(): void;
    createCategoryWindow(): void;
    createSellWindow(): void;
    activateBuyWindow(): void;
    activateSellWindow(): void;
    commandBuy(): void;
    commandSell(): void;
    onBuyOk(): void;
    onBuyCancel(): void;
    onCategoryOk(): void;
    onCategoryCancel(): void;
    onSellOk(): void;
    onSellCancel(): void;
    onNumberOk(): void;
    onNumberCancel(): void;
    doBuy(number: number): void;
    doSell(number: number): void;
    endNumberInput(): void;
    maxBuy(): number;
    maxSell(): number;
    money(): number;
    currencyUnit(): string;
    buyingPrice(): number;
    sellingPrice(): number;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Name
 *
 * The scene class of the name input screen.
 */
declare class Scene_Name extends Scene_MenuBase {
    prepare(actorId: number, maxLength: number): void;
    createEditWindow(): void;
    createInputWindow(): void;
    onInputOk(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Debug
 *
 * The scene class of the debug screen.
 */
declare class Scene_Debug extends Scene_MenuBase {
    createRangeWindow(): void;
    createEditWindow(): void;
    createDebugHelpWindow(): void;
    onRangeOk(): void;
    onEditCancel(): void;
    refreshHelpWindow(): void;
    helpText(): string;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Battle
 *
 * The scene class of the battle screen.
 */
declare class Scene_Battle extends Scene_Base {
    protected _spriteset: Spriteset_Battle;
    protected _statusWindow: Window_BattleStatus;
    protected _partyCommandWindow: Window_PartyCommand;
    protected _actorCommandWindow: Window_ActorCommand;
    protected _skillWindow: Window_BattleSkill;
    protected _itemWindow: Window_BattleItem;
    protected _actorWindow: Window_BattleActor;
    protected _enemyWindow: Window_BattleEnemy;
    protected _logWindow: Window_BattleLog;
    protected _helpWindow: Window_Help;
    protected _messageWindow: Window_Message;
    protected _scrollTextWindow: Window_ScrollText;

    initialize(): void;
    updateBattleProcess(): void;
    isAnyInputWindowActive(): boolean;
    changeInputWindow(): void;
    stop(): void;
    needsSlowFadeOut(): boolean;
    updateStatusWindow(): void;
    updateWindowPositions(): void;
    createDisplayObjects(): void;
    createSpriteset(): void;
    createAllWindows(): void;
    createLogWindow(): void;
    createStatusWindow(): void;
    createPartyCommandWindow(): void;
    createActorCommandWindow(): void;
    createHelpWindow(): void;
    createSkillWindow(): void;
    createItemWindow(): void;
    createActorWindow(): void;
    createEnemyWindow(): void;
    createMessageWindow(): void;
    createScrollTextWindow(): void;
    refreshStatus(): void;
    startPartyCommandSelection(): void;
    commandFight(): void;
    commandEscape(): void;
    startActorCommandSelection(): void;
    commandAttack(): void;
    commandSkill(): void;
    commandGuard(): void;
    commandItem(): void;
    selectNextCommand(): void;
    selectPreviousCommand(): void;
    selectActorSelection(): void;
    onActorOk(): void;
    onActorCancel(): void;
    selectEnemySelection(): void;
    onEnemyOk(): void;
    onEnemyCancel(): void;
    onSkillOk(): void;
    onSkillCancel(): void;
    onItemOk(): void;
    onItemCancel(): void;
    onSelectAction(): void;
    endCommandSelection(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Scene_Gameover
 *
 * The scene class of the game over screen.
 */
declare class Scene_Gameover extends Scene_Base {
    protected _backSprite: Sprite;

    stop(): void;
    playGameoverMusic(): void;
    createBackground(): void;
    isTriggered(): boolean;
    gotoTitle(): void;
}
