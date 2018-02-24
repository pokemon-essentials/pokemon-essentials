
/**
 * -----------------------------------------------------------------------------
 * Window_Base
 *
 * The superclass of all windows within the game.
 */
declare class Window_Base extends _Window {
    protected static _iconWidth: number;
    protected static _iconHeight: number;
    protected static _faceWidth: number;
    protected static _faceHeight: number;

    protected _opening: boolean;
    protected _closing: boolean;

    opacity: number;
    backOpacity: number;
    contents: Bitmap;
    windowskin: Bitmap;

    constructor(x: number, y: number, width: number, height: number);

    lineHeight(): number;
    standardFontFace(): string;
    standardFontSize(): number;
    standardPadding(): number;
    textPadding(): number;
    standardBackOpacity(): number;
    loadWindowskin(): void;
    updatePadding(): void;
    updateBackOpacity(): void;
    contentsWidth(): number;
    contentsHeight(): number;
    fittingHeight(numLines: number): number;
    updateTone(): void;
    createContents(): void;
    resetFontSettings(): void;
    resetTextColor(): void;
    updateOpen(): void;
    updateClose(): void;
    open(): void;
    close(): void;
    isOpening(): boolean;
    isClosing(): boolean;
    show(): void;
    hide(): void;
    activate(): void;
    deactivate(): void;
    textColor(n: number): string;
    normalColor(): string;
    systemColor(): string;
    crisisColor(): string;
    deathColor(): string;
    gaugeBackColor(): string;
    hpGaugeColor1(): string;
    hpGaugeColor2(): string;
    mpGaugeColor1(): string;
    mpGaugeColor2(): string;
    mpCostColor(): string;
    powerUpColor(): string;
    powerDownColor(): string;
    tpGaugeColor1(): string;
    tpGaugeColor2(): string;
    tpCostColor(): string;
    pendingColor(): string;
    translucentOpacity(): number;
    changeTextColor(color: string): void;
    changePaintOpacity(enabled: boolean): void;
    drawText(text: string | number, x: number, y: number, maxWidth: number, align: string): void;
    textWidth(text: string): number;
    drawTextEx(text: string, x: number, y: number): number;
    convertEscapeCharacters(text: string): string;
    actorName(n: number): string;
    partyMemberName(n: number): string;
    processCharacter(textState: MV.TextState): void;
    processNormalCharacter(textState: MV.TextState): void;
    processNewLine(textState: MV.TextState): void;
    processNewPage(textState: MV.TextState): void;
    obtainEscapeCode(textState: MV.TextState): string;
    obtainEscapeParam(textState: MV.TextState): number;
    processEscapeCharacter(code: string, textState: MV.TextState): void;
    processDrawIcon(iconIndex: number, textState: MV.TextState): void;
    makeFontBigger(): void;
    makeFontSmaller(): void;
    calcTextHeight(textState: MV.TextState, all: boolean): number;
    drawIcon(iconIndex: number, x: number, y: number): void;
    drawFace(faceName: string, faceIndex: number, x: number, y: number, width?: number, height?: number): void;
    drawCharacter(characterName: string, characterIndex: number, x: number, y: number): void;
    drawGauge(x: number, y: number, width: number, rate: number, color1: string, color2: string): void;
    hpColor(actor: Game_Actor): void;
    mpColor(actor: Game_Actor): void;
    tpColor(actor: Game_Actor): void;
    drawActorCharacter(actor: Game_Actor, x: number, y: number): void;
    drawActorFace(actor: Game_Actor, x: number, y: number, width?: number, height?: number): void;
    drawActorName(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorClass(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorNickname(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorLevel(actor: Game_Actor, x: number, y: number): void;
    drawActorIcons(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawCurrentAndMax(current: number, max: number, x: number, y: number, width: number, color1: string, color2: string): void;
    drawActorHp(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorMp(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorTp(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorSimpleStatus(actor: Game_Actor, x: number, y: number, width: number): void;
    drawItemName(item: RPG.BaseItem, x: number, y: number, width?: number): void;
    drawCurrencyValue(value: number, unit: string, x: number, y: number, width: number): void;
    paramchangeTextColor(change: number): string;
    setBackgroundType(type: number): void;
    showBackgroundDimmer(): void;
    hideBackgroundDimmer(): void;
    updateBackgroundDimmer(): void;
    refreshDimmerBitmap(): void;
    dimColor1(): string;
    dimColor2(): string;
    canvasToLocalX(x: number): number;
    canvasToLocalY(y: number): number;
}

/**
 * -----------------------------------------------------------------------------
 * Window_Selectable
 *
 * The window class with cursor movement and scroll functions.
 */
declare class Window_Selectable extends Window_Base {
    protected _index: number;
    protected _cursorFixed: boolean;
    protected _cursorAll: boolean;
    protected _stayCount: number;
    protected _helpWindow: Window_Help;
    protected _handlers: {[symbol: string]: () => void};
    protected _touching: boolean;
    protected _scrollX: number;
    protected _scrollY: number;

    constructor(x: number, y: number, width: number, height: number);

    index(): number;
    cursorFixed(): boolean;
    setCursorFixed(cursorFixed: boolean): void;
    cursorAll(): boolean;
    setCursorAll(cursorAll: boolean): void;
    maxCols(): number;
    maxItems(): number;
    spacing(): number;
    itemWidth(): number;
    itemHeight(): number;
    maxRows(): number;
    select(index: number): void;
    deselect(): void;
    reselect(): void;
    row(): number;
    topRow(): number;
    maxTopRow(): number;
    setTopRow(row: number): void;
    resetScroll(): void;
    maxPageRows(): number;
    maxPageItems(): number;
    isHorizontal(): boolean;
    bottomRow(): number;
    setBottomRow(row: number): void;
    topIndex(): number;
    itemRect(index: number): Rectangle;
    itemRectForText(index: number): Rectangle;
    setHelpWindow(helpWindow: Window_Help): void;
    showHelpWindow(): void;
    hideHelpWindow(): void;
    setHandler(symbol: string, method: () => void): void;
    isHandled(symbol: string): boolean;
    callHandler(symbol: string): void;
    isOpenAndActive(): boolean;
    isCursorMovable(): boolean;
    cursorDown(wrap?: boolean): void;
    cursorUp(wrap?: boolean): void;
    cursorRight(wrap?: boolean): void;
    cursorLeft(wrap?: boolean): void;
    cursorPagedown(): void;
    cursorPageup(): void;
    scrollDown(): void;
    scrollUp(): void;
    updateArrows(): void;
    processCursorMove(): void;
    processHandling(): void;
    processWheel(): void;
    processTouch(): void;
    isTouchedInsideFrame(): boolean;
    onTouch(triggered: boolean): void;
    hitTest(x: number, y: number): number;
    isContentsArea(x: number, y: number): boolean;
    isTouchOkEnabled(): boolean;
    isOkEnabled(): boolean;
    isCancelEnabled(): boolean;
    isOkTriggered(): boolean;
    isCancelTriggered(): boolean;
    processOk(): void;
    playOkSound(): void;
    playBuzzerSound(): void;
    callOkHandler(): void;
    processCancel(): void;
    callCancelHandler(): void;
    processPageup(): void;
    processPagedown(): void;
    updateInputData(): void;
    updateCursor(): void;
    isCursorVisible(): boolean;
    ensureCursorVisible(): void;
    callUpdateHelp(): void;
    updateHelp(): void;
    setHelpWindowItem(item: any): void;
    isCurrentItemEnabled(): boolean;
    drawAllItems(): void;
    drawItem(index: number): void;
    clearItem(index: number): void;
    redrawItem(index: number): void;
    redrawCurrentItem(): void;
    refresh(): void;
}


/**
 * -----------------------------------------------------------------------------
 * Window_Command
 *
 * The superclass of windows for selecting a command.
 */
declare class Window_Command extends Window_Selectable {
    protected _list: Array<MV.CommandItem>;

    constructor();
    initialize(x: number, y: number): void;

    windowWidth(): number;
    windowHeight(): number;
    numVisibleRows(): number;
    clearCommandList(): void;
    makeCommandList(): void;
    addCommand(name: string, symbol: string, enabled?: boolean, ext?: any): void;
    commandName(index: number): string;
    commandSymbol(index: number): string;
    isCommandEnabled(index: number): boolean;
    currentData(): MV.CommandItem;
    currentSymbol(): string;
    currentExt(): any;
    findSymbol(symbol: string): number;
    selectSymbol(symbol: string): void;
    findExt(ext: any): number;
    selectExt(ext: any): void;
    itemTextAlign(): string;
}

/**
 * -----------------------------------------------------------------------------
 * Window_HorzCommand
 *
 * The command window for the horizontal selection format.
 */
declare class Window_HorzCommand extends Window_Command {
    constructor(x: number, y: number);
}

/**
 * -----------------------------------------------------------------------------
 * Window_Help
 *
 * The window for displaying the description of the selected item.
 */
declare class Window_Help extends Window_Base {
    protected _text: string;

    constructor(numLines?: number);

    setText(text: string): void;
    clear(): void;
    setItem(item: RPG.BaseItem): void;
    refresh(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_Gold
 *
 * The window for displaying the party's gold.
 */
declare class Window_Gold extends Window_Base {
    constructor(x: number, y: number);

    windowWidth(): number;
    windowHeight(): number;
    refresh(): void;
    value(): number;
    currencyUnit(): string;
}

/**
 * -----------------------------------------------------------------------------
 * Window_MenuCommand
 *
 * The window for selecting a command on the menu screen.
 */
declare class Window_MenuCommand extends Window_Command {
    protected static _lastCommandSymbol: string;

    constructor(x: number, y: number);

    initCommandPosition(): void;
    makeCommandList(): void;
    addMainCommands(): void;
    addFormationCommand(): void;
    addOriginalCommands(): void;
    addOptionsCommand(): void;
    addSaveCommand(): void;
    addGameEndCommand(): void;
    needsCommand(name: string): boolean;
    areMainCommandsEnabled(): boolean;
    isFormationEnabled(): boolean;
    isOptionsEnabled(): boolean;
    isSaveEnabled(): boolean;
    isGameEndEnabled(): boolean;
    selectLast(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_MenuStatus
 *
 * The window for displaying party member status on the menu screen.
 */
declare class Window_MenuStatus extends Window_Selectable {
    protected _formationMode: boolean;
    protected _pendingIndex: number;

    constructor(x: number, y: number);

    windowWidth(): number;
    windowHeight(): number;
    itemHeight(): number;
    numVisibleRows(): number;
    loadImages(): void;
    drawItemBackground(index: number): void;
    drawItemImage(index: number): void;
    drawItemStatus(index: number): void;
    selectLast(): void;
    formationMode(): boolean;
    setFormationMode(formationMode: boolean): void;
    pendingIndex(): number;
    setPendingIndex(index: number): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_MenuActor
 *
 * The window for selecting a target actor on the item and skill screens.
 */
declare class Window_MenuActor extends Window_MenuStatus {
    constructor();

    selectForItem(item: RPG.BaseItem): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_ItemCategory
 *
 * The window for selecting a category of items on the item and shop screens.
 */
declare class Window_ItemCategory extends Window_HorzCommand {
    protected _itemWindow: Window_ItemList;

    constructor();

    setItemWindow(itemWindow: Window_ItemList): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_ItemList
 *
 * The window for selecting an item on the item screen.
 */
declare class Window_ItemList extends Window_Selectable {
    protected _category: string;
    protected _data: Array<RPG.BaseItem>;

    constructor(x: number, y: number, width: number, height: number);

    setCategory(category: string): void;
    item(): RPG.BaseItem;
    includes(item: RPG.BaseItem): boolean;
    needsNumber(): boolean;
    isEnabled(item: RPG.BaseItem): boolean;
    selectLast(): void;
    makeItemList(): void;
    numberWidth(): number;
    drawItemNumber(item: RPG.BaseItem, x: number, y: number, width: number): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_SkillType
 *
 * The window for selecting a skill type on the skill screen.
 */
declare class Window_SkillType extends Window_Command {
    protected _actor: Game_Actor;
    protected _skillWindow: Window_SkillList;

    constructor(x: number, y: number);

    setActor(actor: Game_Actor): void;
    setSkillWindow(skillWindow: Window_SkillList): void;
    selectLast(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_SkillStatus
 *
 * The window for displaying the skill user's status on the skill screen.
 */
declare class Window_SkillStatus extends Window_Base {
    protected _actor: Game_Actor;

    constructor(x: number, y: number, width: number, height: number);

    setActor(actor: Game_Actor): void;
    refresh(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_SkillList
 *
 * The window for selecting a skill on the skill screen.
 */
declare class Window_SkillList extends Window_Selectable {
    protected _actor: Game_Actor;
    protected _stypeId: number;
    protected _data: Array<RPG.Skill>;

    constructor(x: number, y: number, witth: number, height: number);

    setActor(actor: Game_Actor): void;
    setStypeId(stypeId: number): void;
    item(): RPG.Skill;
    includes(item: RPG.Skill): boolean;
    isEnabled(item: RPG.Skill): boolean;
    makeItemList(): void;
    selectLast(): void;
    costWidth(): number;
    drawSkillCost(skill: RPG.Skill, x: number, y: number, width: number): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_EquipStatus
 *
 * The window for displaying parameter changes on the equipment screen.
 */
declare class Window_EquipStatus extends Window_Base {
    protected _actor: Game_Actor;
    protected _tempActor: Game_Actor;

    constructor(x: number, y: number);

    windowWidth(): number;
    windowHeight(): number;
    numVisibleRows(): number;
    setActor(actor: Game_Actor): void;
    refresh(): void;
    setTempActor(tempActor: Game_Actor): void;
    drawItem(x: number, y: number, paramId: number): void;
    drawParamName(x: number, y: number, paramId: number): void;
    drawCurrentParam(x: number, y: number, paramId: number): void;
    drawRightArrow(x: number, y: number): void;
    drawNewParam(x: number, y: number, paramId: number): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_EquipCommand
 *
 * The window for selecting a command on the equipment screen.
 */
declare class Window_EquipCommand extends Window_HorzCommand {
    protected _windowWidth: number;

    constructor(x: number, y: number, width: number);
}

/**
 * -----------------------------------------------------------------------------
 * Window_EquipSlot
 *
 * The window for selecting an equipment slot on the equipment screen.
 */
declare class Window_EquipSlot extends Window_Selectable {
    protected _actor: Game_Actor;
    protected _itemWindow: Window_EquipItem;
    protected _statusWindow: Window_EquipStatus;

    constructor(x: number, y: number, width: number, height: number);

    setActor(actor: Game_Actor): void;
    item(): RPG.EquipItem;
    slotName(index: number): string;
    isEnabled(index: number): boolean;
    setStatusWindow(statusWindow: Window_EquipStatus): void;
    setItemWindow(itemWindow: Window_EquipItem): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_EquipItem
 *
 * The window for selecting an equipment item on the equipment screen.
 */
declare class Window_EquipItem extends Window_ItemList {
    protected _actor: Game_Actor;
    protected _slotId: number;
    protected _statusWindow: Window_EquipStatus;

    constructor(x: number, y: number, width: number, height: number);

    setActor(actor: Game_Actor): void;
    setSlotId(slotId: number): void;
    includes(item: RPG.EquipItem): boolean;
    isEnabled(item: RPG.EquipItem): boolean;
    setStatusWindow(statusWindow: Window_EquipStatus): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_Status
 *
 * The window for displaying full status on the status screen.
 */
declare class Window_Status extends Window_Selectable {
    protected _actor: Game_Actor;

    constructor();

    setActor(actor: Game_Actor): void;
    drawBlock1(y: number): void;
    drawBlock2(y: number): void;
    drawBlock3(y: number): void;
    drawBlock4(y: number): void;
    drawHorzLine(y: number): void;
    lineColor(): string;
    drawBasicInfo(x: number, y: number): void;
    drawParameters(x: number, y: number): void;
    drawExpInfo(x: number, y: number): void;
    drawEquipments(x: number, y: number): void;
    drawProfile(x: number, y: number): void;
    maxEquipmentLines(): number;
}

/**
 * -----------------------------------------------------------------------------
 * Window_Options
 *
 * The window for changing various settings on the options screen.
 */
declare class Window_Options extends Window_Command {
    constructor();

    updatePlacement(): void;
    addGeneralOptions(): void;
    addVolumeOptions(): void;
    statusWidth(): number;
    statusText(index: number): string;
    isVolumeSymbol(symbol: string): boolean;
    booleanStatusText(value: boolean): string;
    volumeStatusText(value: number): string;
    volumeOffset(): number;
    changeValue(symbol: string, value: boolean | number): void;
    getConfigValue(symbol: string): boolean;
    setConfigValue(symbol: string, volume: boolean | number): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_SavefileList
 *
 * The window for selecting a save file on the save and load screens.
 */
declare class Window_SavefileList extends Window_Selectable {
    protected _mode: string;

    constructor(x: number, y: number, width: number, height: number);

    setMode(mode: string): void;
    maxVisibleItems(): number;
    itemHeight(): number;
    drawFileId(id: number, x: number, y: number): void;
    drawContents(info: {key: string}, rect: Rectangle, valid: boolean): void;
    drawGameTitle(info: {key: string}, x: number, y: number, width: number): void;
    drawPartyCharacters(info: {key: string}, x: number, y: number): void;
    drawPlaytime(info: {key: string}, x: number, y: number, width: number): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_ShopCommand
 *
 * The window for selecting buy/sell on the shop screen.
 */
declare class Window_ShopCommand extends Window_HorzCommand {
    protected _windowWidth: number;
    protected _purchaseOnly: boolean;

    constructor(width: number, purchaseOnly: boolean);
}

/**
 * -----------------------------------------------------------------------------
 * Window_ShopBuy
 *
 * The window for selecting an item to buy on the shop screen.
 */
declare class Window_ShopBuy extends Window_Selectable {
    protected _shopGoods: Array<Array<any>>;
    protected _money: number;
    protected _data: Array<RPG.BaseItem>;
    protected _price: Array<number>;
    protected _statusWindow: Window_ShopStatus;

    constructor(x: number, y: number, height: number, shopGoods: Array<Array<any>>);

    windowWidth(): number;
    item(): RPG.BaseItem;
    setMoney(money: number): void;
    price(item: RPG.BaseItem): number;
    isEnabled(item: RPG.BaseItem): boolean;
    makeItemList(): void;
    setStatusWindow(statusWindow: Window_ShopStatus): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_ShopSell
 *
 * The window for selecting an item to sell on the shop screen.
 */
declare class Window_ShopSell extends Window_ItemList {
    constructor(x: number, y: number, width: number, height: number);

    isEnabled(item: RPG.BaseItem): boolean;
}

/**
 * -----------------------------------------------------------------------------
 * Window_ShopNumber
 *
 * The window for inputting quantity of items to buy or sell on the shop
 * screen.
 */
declare class Window_ShopNumber extends Window_Selectable {
    protected _item: RPG.BaseItem;
    protected _max: number;
    protected _price: number;
    protected _number: number;
    protected _currencyUnit: string;
    protected _buttons: Array<Sprite_Button>;

    constructor(x: number, y: number, height: number);

    windowWidth(): number;
    number(): number;
    setup(item: RPG.BaseItem, max: number, price: number): void;
    setCurrencyUnit(currencyUnit: string): void;
    createButtons(): void;
    placeButtons(): void;
    updateButtonsVisiblity(): void;
    showButtons(): void;
    hideButtons(): void;
    drawMultiplicationSign(): void;
    drawNumber(): void;
    drawTotalPrice(): void;
    itemY(): number;
    priceY(): number;
    buttonY(): number;
    cursorWidth(): number;
    cursorX(): number;
    maxDigits(): number;
    processNumberChange(): void;
    changeNumber(amount: number): void;
    onButtonUp(): void;
    onButtonUp2(): void;
    onButtonDown(): void;
    onButtonDown2(): void;
    onButtonOk(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_ShopStatus
 *
 * The window for displaying number of items in possession and the actor's
 * equipment on the shop screen.
 */
declare class Window_ShopStatus extends Window_Base {
    protected _item: RPG.BaseItem;
    protected _pageIndex: number;

    constructor(x: number, y: number, width: number, height: number);

    refresh(): void;
    setItem(item: RPG.BaseItem): void;
    isEquipItem(): boolean;
    drawPossession(x: number, y: number): void;
    drawEquipInfo(x: number, y: number): void;
    statusMembers(): Array<Game_Actor>;
    pageSize(): number;
    maxPages(): number;
    drawActorEquipInfo(x: number, y: number, actor: Game_Actor): void;
    drawActorParamChange(x: number, y: number, actor: Game_Actor, item1: RPG.EquipItem): void;
    paramId(): number;
    currentEquippedItem(actor: Game_Actor, etypeId: number): RPG.EquipItem;
    updatePage(): void;
    isPageChangeEnabled(): boolean;
    isPageChangeRequested(): boolean;
    isTouchedInsideFrame(): boolean;
    changePage(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_NameEdit
 *
 * The window for editing an actor's name on the name input screen.
 */
declare class Window_NameEdit extends Window_Base {
    protected _name: string;
    protected _index: number;

    constructor(actor: Game_Actor, maxLength: number);

    windowWidth(): number;
    windowHeight(): number;

    // "name" is defines already by superclass(PIXI.DisplayObject).
    // name(): string;

    restoreDefault(): boolean;
    add(ch: string): boolean;
    back(): boolean;
    faceWidth(): number;
    charWidth(): number;
    left(): number;
    underlineRect(index: number): Rectangle;
    underlineColor(): string;
    drawUnderline(index: number): void;
    drawChar(index: number): void;
    refresh(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_NameInput
 *
 * The window for selecting text characters on the name input screen.
 */
declare class Window_NameInput extends Window_Selectable {
    static LATIN1: Array<string>;
    static LATIN2: Array<string>;
    static RUSSIA: Array<string>;
    static JAPAN1: Array<string>;
    static JAPAN2: Array<string>;
    static JAPAN3: Array<string>;

    protected _editWindow: Window_NameEdit;
    protected _page: number;
    protected _index: number;

    constructor(editWindow: Window_NameEdit);

    windowHeight(): number;
    table(): Array<Array<string>>;
    character(): string;
    isPageChange(): boolean;
    isOk(): boolean;
    processJump(): void;
    processBack(): void;
    onNameAdd(): void;
    onNameOk(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_ChoiceList
 *
 * The window used for the event command [Show Choices].
 */
declare class Window_ChoiceList extends Window_Command {
    protected _messageWindow: Window_Message;
    protected _background: number;

    constructor(messageWindow: Window_Message);

    start(): void;
    selectDefault(): void;
    updatePlacement(): void;
    updateBackground(): void;
    maxChoiceWidth(): number;
    textWidthEx(text: string): number;
}

/**
 * -----------------------------------------------------------------------------
 * Window_NumberInput
 *
 * The window used for the event command [Input Number].
 */
declare class Window_NumberInput extends Window_Selectable {
    protected _messageWindow: Window_Message;
    protected _number: number;
    protected _maxDigits: number;
    protected _buttons: Array<Sprite_Button>;

    constructor(messageWindow: Window_Message);

    start(): void;
    updatePlacement(): void;
    windowWidth(): number;
    windowHeight(): number;
    itemWidth(): number;
    createButtons(): void;
    placeButtons(): void;
    updateButtonsVisiblity(): void;
    showButtons(): void;
    hideButtons(): void;
    buttonY(): number;
    processDigitChange(): void;
    changeDigit(up: boolean): void;
    onButtonUp(): void;
    onButtonDown(): void;
    onButtonOk(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_EventItem
 *
 * The window used for the event command [Select Item].
 */
declare class Window_EventItem extends Window_ItemList {
    protected _messageWindow: Window_Message;

    constructor(messageWindow: Window_Message);

    windowHeight(): number;
    numVisibleRows(): number;
    start(): void;
    updatePlacement(): void;
    includes(item: RPG.BaseItem): boolean;
    isEnabled(item: RPG.BaseItem): boolean;
    onOk(): void;
    onCancel(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_Message
 *
 * The window for displaying text messages.
 */
declare class Window_Message extends Window_Base {
    protected _background: number;
    protected _positionType: number;
    protected _waitCount: number;
    protected _faceBitmap: Bitmap;
    protected _textState: MV.TextState;
    protected _pauseSkip: boolean;
    protected _showFast: boolean;
    protected _lineShowFast: boolean;

    protected _goldWindow: Window_Gold;
    protected _choiceWindow: Window_ChoiceList;
    protected _numberWindow: Window_NumberInput;
    protected _itemWindow: Window_EventItem;

    constructor();

    initMembers(): void;
    subWindows(): Array<Window_Base>;
    createSubWindows(): void;
    windowWidth(): number;
    windowHeight(): number;
    clearFlags(): void;
    numVisibleRows(): number;
    checkToNotClose(): void;
    canStart(): boolean;
    startMessage(): void;
    updatePlacement(): void;
    updateBackground(): void;
    terminateMessage(): void;
    updateWait(): boolean;
    updateLoading(): boolean;
    updateInput(): boolean;
    isAnySubWindowActive(): boolean;
    updateMessage(): boolean;
    onEndOfText(): void;
    startInput(): boolean;
    isTriggered(): boolean;
    doesContinue(): boolean;
    areSettingsChanged(): boolean;
    updateShowFast(): void;
    newPage(textState: MV.TextState): void;
    loadMessageFace(): void;
    drawMessageFace(): void;
    newLineX(): number;
    processNewLine(textState: MV.TextState): void;
    processNewPage(textState: MV.TextState): void;
    isEndOfText(textState: MV.TextState): boolean;
    needsNewPage(textState: MV.TextState): boolean;
    processEscapeCharacter(code: string, textState: MV.TextState): void;
    startWait(count: number): void;
    startPause(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_ScrollText
 *
 * The window for displaying scrolling text. No frame is displayed, but it
 * is handled as a window for convenience.
 */
declare class Window_ScrollText extends Window_Base {
    protected _text: string;
    protected _allTextHeight: number;

    constructor();

    startMessage(): void;
    refresh(): void;
    updateMessage(): void;
    scrollSpeed(): number;
    isFastForward(): boolean;
    fastForwardRate(): number;
    terminateMessage(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_MapName
 *
 * The window for displaying the map name on the map screen.
 */
declare class Window_MapName extends Window_Base {
    protected _showCount: number;

    constructor();

    windowWidth(): number;
    windowHeight(): number;
    updateFadeIn(): void;
    updateFadeOut(): void;
    refresh(): void;
    drawBackground(x: number, y: number, width: number, height: number): void;
}


/**
 * -----------------------------------------------------------------------------
 * Window_BattleLog
 *
 * The window for displaying battle progress. No frame is displayed, but it is
 * handled as a window for convenience.
 */
declare class Window_BattleLog extends Window_Selectable {
    protected _lines: Array<string>;
    protected _methods: Array<MV.BattleLogMethod>;
    protected _waitCount: number;
    protected _waitMode: string;
    protected _baseLineStack: Array<number>;
    protected _spriteset: Spriteset_Battle;

    constructor();

    setSpriteset(spriteset: Spriteset_Battle): void;
    windowWidth(): number;
    windowHeight(): number;
    maxLines(): number;
    createBackBitmap(): void;
    createBackSprite(): void;
    numLines(): number;
    messageSpeed(): number;
    isBusy(): boolean;
    updateWait(): boolean;
    updateWaitCount(): boolean;
    updateWaitMode(): boolean;
    setWaitMode(waitMode: string): void;
    callNextMethod(): void;
    isFastForward(): boolean;
    push(methodName: string, ...args: any[]): void;
    clear(): void;
    wait(): void;
    waitForEffect(): void;
    waitForMovement(): void;
    addText(text: string): void;
    pushBaseLine(): void;
    popBaseLine(): void;
    waitForNewLine(): void;
    popupDamage(target: Game_Battler): void;
    performActionStart(subject: Game_Battler, action: Game_Action): void;
    performAction(subject: Game_Battler, action: Game_Action): void;
    performActionEnd(subject: Game_Battler): void;
    performDamage(target: Game_Battler): void;
    performMiss(target: Game_Battler): void;
    performRecovery(target: Game_Battler): void;
    performEvasion(target: Game_Battler): void;
    performMagicEvasion(target: Game_Battler): void;
    performCounter(target: Game_Battler): void;
    performReflection(target: Game_Battler): void;
    performSubstitute(substitute: Game_Battler, target: Game_Battler): void;
    performCollapse(target: Game_Battler): void;
    showAnimation(subject: Game_Battler, targets: Game_Battler, animationId: number): void;
    showAttackAnimation(subject: Game_Battler, targets: Game_Battler): void;
    showActorAttackAnimation(subject: Game_Battler, targets: Game_Battler): void;
    showEnemyAttackAnimation(subject: Game_Battler, targets: Game_Battler): void;
    showNormalAnimation(targets: Game_Battler, animationId: number, mirror: boolean): void;
    animationBaseDelay(): number;
    animationNextDelay(): number;
    drawBackground(): void;
    backRect(): Rectangle;
    backColor(): string;
    backPaintOpacity(): number;
    drawLineText(index: number): void;
    startTurn(): void;
    startAction(subject: Game_Battler, action: Game_Action, targets: Array<Game_Battler>): void;
    endAction(subject: Game_Battler): void;
    displayCurrentState(subject: Game_Battler): void;
    displayRegeneration(subject: Game_Battler): void;
    displayAction(subject: Game_Battler, item: RPG.UsableItem): void;
    displayCounter(target: Game_Battler): void;
    displayReflection(target: Game_Battler): void;
    displaySubstitute(substitute: Game_Battler, target: Game_Battler): void;
    displayActionResults(subject: Game_Battler, targt: Game_Battler): void;
    displayFailure(target: Game_Battler): void;
    displayCritical(target: Game_Battler): void;
    displayDamage(target: Game_Battler): void;
    displayMiss(target: Game_Battler): void;
    displayEvasion(target: Game_Battler): void;
    displayHpDamage(target: Game_Battler): void;
    displayMpDamage(target: Game_Battler): void;
    displayTpDamage(target: Game_Battler): void;
    displayAffectedStatus(target: Game_Battler): void;
    displayAutoAffectedStatus(target: Game_Battler): void;
    displayChangedStates(target: Game_Battler): void;
    displayAddedStates(target: Game_Battler): void;
    displayRemovedStates(target: Game_Battler): void;
    displayChangedBuffs(target: Game_Battler): void;
    displayBuffs(target: Game_Battler, buffs: Array<number>, fmt: string): void;
    makeHpDamageText(target: Game_Battler): void;
    makeMpDamageText(target: Game_Battler): string;
    makeTpDamageText(target: Game_Battler): string;
}

/**
 * -----------------------------------------------------------------------------
 * Window_PartyCommand
 *
 * The window for selecting whether to fight or escape on the battle screen.
 */
declare class Window_PartyCommand extends Window_Command {
    constructor();

    setup(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_ActorCommand
 *
 * The window for selecting an actor's action on the battle screen.
 */
declare class Window_ActorCommand extends Window_Command {
    protected _actor: Game_Actor;

    constructor();

    addAttackCommand(): void;
    addSkillCommands(): void;
    addGuardCommand(): void;
    addItemCommand(): void;
    setup(actor: Game_Actor): void;
    selectLast(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_BattleStatus
 *
 * The window for displaying the status of party members on the battle screen.
 */
declare class Window_BattleStatus extends Window_Selectable {
    constructor();

    windowWidth(): number;
    windowHeight(): number;
    numVisibleRows(): number;
    basicAreaRect(index: number): Rectangle;
    gaugeAreaRect(index: number): Rectangle;
    gaugeAreaWidth(): number;
    drawBasicArea(rect: Rectangle, actor: Game_Actor): void;
    drawGaugeArea(rect: Rectangle, actor: Game_Actor): void;
    drawGaugeAreaWithTp(rect: Rectangle, actor: Game_Actor): void;
    drawGaugeAreaWithoutTp(rect: Rectangle, actor: Game_Actor): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_BattleActor
 *
 * The window for selecting a target actor on the battle screen.
 */
declare class Window_BattleActor extends Window_BattleStatus {
    constructor(x: number, y: number);

    select(index: number): void;
    actor(): Game_Actor;
}

/**
 * -----------------------------------------------------------------------------
 * Window_BattleEnemy
 *
 * The window for selecting a target enemy on the battle screen.
 */
declare class Window_BattleEnemy extends Window_Selectable {
    protected _enemies: Array<Game_Enemy>;

    constructor(x: number, y: number);

    windowWidth(): number;
    windowHeight(): number;
    numVisibleRows(): number;
    enemy(): Game_Enemy;
    enemyIndex(): number;
    select(index: number): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_BattleSkill
 *
 * The window for selecting a skill to use on the battle screen.
 */
declare class Window_BattleSkill extends Window_SkillList {
    constructor(x: number, y: number, width: number, height: number);
}

/**
 * -----------------------------------------------------------------------------
 * Window_BattleItem
 *
 * The window for selecting an item to use on the battle screen.
 */
declare class Window_BattleItem extends Window_ItemList {
    constructor(x: number, y: number, width: number, height: number);

    includes(item: RPG.UsableItem): boolean;
}

/**
 * -----------------------------------------------------------------------------
 * Window_TitleCommand
 *
 * The window for selecting New Game/Continue on the title screen.
 */
declare class Window_TitleCommand extends Window_Command {
    protected static _lastCommandSymbol: string;

    constructor();

    updatePlacement(): void;
    isContinueEnabled(): boolean;
    initCommandPosition(): void;
    selectLast(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_GameEnd
 *
 * The window for selecting "Go to Title" on the game end screen.
 */
declare class Window_GameEnd extends Window_Command {
    constructor();

    updatePlacement(): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_DebugRange
 *
 * The window for selecting a block of switches/variables on the debug screen.
 */
declare class Window_DebugRange extends Window_Selectable {
    protected static lastTopRow: number;
    protected static lastIndex: number;

    protected _editWindow: Window_DebugEdit;

    constructor(x: number, y: number);

    windowWidth(): number;
    windowHeight(): number;
    mode(): string;
    topId(): number;
    setEditWindow(editWindow: Window_DebugEdit): void;
}

/**
 * -----------------------------------------------------------------------------
 * Window_DebugEdit
 *
 * The window for displaying switches and variables on the debug screen.
 */
declare class Window_DebugEdit extends Window_Selectable {
    protected _mode: string;
    protected _topId: number;

    constructor(x: number, y: number, width: number);

    itemName(dataId: number): string;
    itemStatus(dataId: number): string;
    setMode(mode: string): void;
    setTopId(id: number): void;
    currentId(): number;
    updateSwitch(): void;
    updateVariable(): void;
}
