/// <reference path="../weather.ts" />
var PE;
(function (PE) {
    var Battle;
    (function (Battle) {
        var CHARACTERS_PER_LINE = 40;
        ;
        ;
        ;
        ;
        ;
        var Manager = /** @class */ (function () {
            function Manager() {
            }
            Manager.setup = function (opponets, allies) {
                allies.unshift($Player);
                this.trainers = { player: allies, foe: opponets };
                this.player = $Player;
                this.opponents = opponets;
                this.field = new Battle.ActiveField();
                this.sides = { player: new Battle.ActiveSide(), foe: new Battle.ActiveSide() };
                this.actives = [];
                this.battlers = [];
                for (var _i = 0, allies_1 = allies; _i < allies_1.length; _i++) {
                    var trainer = allies_1[_i];
                    var firstIndex = this.battlers.length;
                    for (var _a = 0, _b = trainer.party; _a < _b.length; _a++) {
                        var pokemon = _b[_a];
                        var battler = new Battle.Battler(pokemon, this.battlers.length);
                        this.battlers.push(battler);
                        trainer.battlers.push(battler);
                        this.sides.player.battlers.push(battler.index);
                        battler.sides.own = this.sides.player;
                        battler.sides.foe = this.sides.foe;
                    }
                    this.actives.push(this.battlers[firstIndex]);
                    this.sides.player.actives.push(this.battlers[firstIndex]);
                }
                for (var _c = 0, opponets_1 = opponets; _c < opponets_1.length; _c++) {
                    var trainer = opponets_1[_c];
                    var firstIndex = this.battlers.length;
                    for (var _d = 0, _e = trainer.party; _d < _e.length; _d++) {
                        var pokemon = _e[_d];
                        var battler = new Battle.Battler(pokemon, this.battlers.length);
                        this.battlers.push(battler);
                        trainer.battlers.push(battler);
                        this.sides.foe.battlers.push(battler.index);
                        battler.sides.own = this.sides.foe;
                        battler.sides.foe = this.sides.player;
                    }
                    this.actives.push(this.battlers[firstIndex]);
                    this.sides.foe.actives.push(this.battlers[firstIndex]);
                }
                this.partyOrder = [];
                for (var _f = 0, _g = this.player.battlers; _f < _g.length; _f++) {
                    var pokemon = _g[_f];
                    this.partyOrder.push(pokemon.index);
                }
                this.choices = {};
                this.enviroment = 0 /* None */;
                this.weather = PE.Weathers.None;
                this.weatherDuration = 0;
                this.lastMoveUsed = -1;
                this.lastMoveUser = -1;
                this.amuletCoin = false;
                this.extraMoney = 0;
                this.doubleMoney = 0;
                this.turncount = 0;
                this.priorityQueue = [];
                this.phase = 1 /* Init */;
                this.currentInx = 0;
                Battle.UI.actionsInx = 0;
                Battle.UI.movesInx = 0;
            };
            //==================================================================================================================
            //region Battlers Info
            Manager.isOpposing = function (index) {
                for (var _i = 0, _a = this.sides.foe.battlers; _i < _a.length; _i++) {
                    var foeindex = _a[_i];
                    if (foeindex === index)
                        return true;
                }
                return false;
            };
            /** find the way this works */
            Manager.opponent = function () {
                return false;
            };
            Manager.ownedByPlayer = function (index) {
                for (var _i = 0, _a = this.sides.player.battlers; _i < _a.length; _i++) {
                    var partyindex = _a[_i];
                    if (partyindex === index)
                        return true;
                }
                return false;
            };
            Manager.isUnlosableItem = function (pokemon, item) {
                throw Error('Not Implemented');
            };
            Manager.canChooseNonActive = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                throw Error('Not Implemented');
            };
            Manager.checkGlobalAbility = function (ability) {
                for (var _i = 0, _a = this.actives; _i < _a.length; _i++) {
                    var battler = _a[_i];
                    if (battler.hasAbility(ability))
                        return battler;
                }
                return undefined;
            };
            //endregion
            //==================================================================================================================
            //==================================================================================================================
            //region Check whether actions can be taken
            Manager.canShowCommands = function (index) {
                var pokemon = this.battlers[index];
                if (pokemon.isFainted())
                    return false;
                if (pokemon.effects.TwoTurnAttack > 0 || pokemon.effects.HyperBeam > 0 ||
                    pokemon.effects.Rollout > 0 || pokemon.effects.Outrage > 0 ||
                    pokemon.effects.Uproar > 0 || pokemon.effects.Bide > 0) {
                    return false;
                }
                return true;
            };
            Manager.canShowMovesSelection = function (index) {
                var pokemon = this.battlers[index];
                if (!this.canShowCommands(index))
                    return false;
                var found = false;
                for (var _i = 0, _a = pokemon.moveset; _i < _a.length; _i++) {
                    var move = _a[_i];
                    if (this.canChooseMove(index, move, false))
                        found = true;
                }
                if (!found)
                    return false;
                if (pokemon.effects.Encore)
                    return false;
                return true;
            };
            Manager.canChooseMove = function (index, move, showMessages, sleeptalk) {
                if (sleeptalk === void 0) { sleeptalk = false; }
                var pokemon = this.battlers[index];
                if (!move)
                    return;
                if (move.pp <= 0 && move.totalpp > 0 && sleeptalk) {
                    if (showMessages)
                        this.showMessage(i18n._("There's no PP left for this move!"));
                    return false;
                }
                if (pokemon.hasItem('ASSAULTVEST') && move.isStatus()) {
                    if (showMessages) {
                        var msg = "The effects of the %1 prevent status moves from being used!";
                        this.showMessage(i18n._(msg, Battle.Items.name(pokemon.item)));
                    }
                    return false;
                }
                if (pokemon.hasItemIn(['CHOICEBAND', 'CHOICESPECS', 'CHOICESCARF']) &&
                    pokemon.effects.ChoiceBand !== undefined) {
                    if (move.id !== pokemon.effects.ChoiceBand) {
                        if (showMessages) {
                            var msg = "%1 allows the use of only %2!";
                            this.showMessage(i18n._(msg, Battle.Items.name(pokemon.item), move.name));
                        }
                        return false;
                    }
                }
                if (pokemon.effects.Imprison) {
                    for (var _i = 0, _a = this.sides.foe.actives; _i < _a.length; _i++) {
                        var battler = _a[_i];
                        if (battler.hasMove(move.id)) {
                            this.showMessage(i18n._("%1 can't use the sealed %2!", pokemon.name, move.name));
                            return false;
                        }
                    }
                }
                if (pokemon.effects.Taunt > 0 && move.basePower <= 0) {
                    if (showMessages)
                        this.showMessage(i18n._("%1 can't use %2 after the taunt!", pokemon.name, move.name));
                    return false;
                }
                if (pokemon.effects.Torment && move.id === this.lastMoveUsed) {
                    if (showMessages) {
                        var msg = "%1 can't use the same move twice in a row due to the torment!";
                        this.showMessage(i18n._(msg, pokemon.name, move.name));
                    }
                    return false;
                }
                if (pokemon.effects.DisableMove === move.id && sleeptalk) {
                    if (showMessages)
                        this.showMessage(i18n._("%1's %2 is disabled!", pokemon.name, move.name));
                    return false;
                }
                // if (move.id === "BELCH" && pokemon.belch) {
                if (move.id === "BELCH") {
                    if (showMessages) {
                        var msg = "%1 hasn't eaten any held berry, so it can't possibly belch!";
                        this.showMessage(i18n._(msg, pokemon.name, move.name));
                    }
                    return false;
                }
                if (pokemon.effects.Encore > 0 && pokemon.effects.EncoreMoveId !== move.index) {
                    return false;
                }
                return true;
            };
            //endregion
            //==================================================================================================================
            //------------------------------------------------------------------------------------------------------------------
            //region Attacking
            Manager.autoChooseMove = function (index, showMessages) {
                if (showMessages === void 0) { showMessages = true; }
                var pokemon = this.battlers[index];
                if (pokemon.isFainted()) {
                    this.choices[pokemon.index] = undefined;
                    return;
                }
                if (pokemon.effects.Encore &&
                    this.canChooseMove(pokemon.index, pokemon.effects.EncoreMoveId, false)) {
                    console.log("[Auto choosing Encore move] " + pokemon.effects.EncoreMoveId);
                    this.choices = {
                        action: 0 /* UseMove */,
                        move: pokemon.effects.EncoreMoveId,
                        target: pokemon.sides.foe.actives[0]
                    };
                }
            };
            Manager.getPriority = function () {
                var speeds = [];
                var mPriorities = [];
                var priorityQueue = [];
                for (var _i = 0, _a = this.actives; _i < _a.length; _i++) {
                    var pokemon = _a[_i];
                    speeds.push(pokemon.speed);
                    priorityQueue.push(pokemon.index);
                    if (this.choices[pokemon.index] && this.choices[pokemon.index].action === 0 /* UseMove */) {
                        mPriorities.push(this.choices[pokemon.index].move.priority);
                    }
                }
                // order the speeds, mPriorities and priority arrays (bubble sort) by speeds
                var swapped;
                do {
                    swapped = false;
                    for (var i = 0; i < speeds.length - 1; i++) {
                        if (speeds[i] < speeds[i + 1]) {
                            var aux = speeds[i];
                            speeds[i] = speeds[i + 1];
                            speeds[i + 1] = aux;
                            var aux2 = priorityQueue[i];
                            priorityQueue[i] = priorityQueue[i + 1];
                            priorityQueue[i + 1] = aux2;
                            var aux3 = mPriorities[i];
                            mPriorities[i] = mPriorities[i + 1];
                            mPriorities[i + 1] = aux3;
                            swapped = true;
                        }
                    }
                } while (swapped);
                // order by moves priority
                do {
                    swapped = false;
                    for (var i = 0; i < mPriorities.length - 1; i++) {
                        if (mPriorities[i] < mPriorities[i + 1]) {
                            var aux = mPriorities[i];
                            mPriorities[i] = mPriorities[i + 1];
                            mPriorities[i + 1] = aux;
                            var aux2 = priorityQueue[i];
                            priorityQueue[i] = priorityQueue[i + 1];
                            priorityQueue[i + 1] = aux2;
                            swapped = true;
                        }
                    }
                } while (swapped);
                return priorityQueue;
            };
            //endregion
            //------------------------------------------------------------------------------------------------------------------
            //==================================================================================================================
            // Switching Pokémon.
            Manager.canSwitchLax = function () {
            };
            Manager.canSwitch = function (currIndex, switchingIndex, showMessages, ignoreMeanLook) {
                if (ignoreMeanLook === void 0) { ignoreMeanLook = false; }
                // let currPokemon =
                return true;
            };
            Manager.switchIn = function (index) {
                this.choices[this.currentInx] = ({
                    action: 2 /* Switch */,
                    index: index
                });
                this.runActions();
            };
            //==================================================================================================================
            Manager.start = function () {
                var _this = this;
                console.log("Battle Start");
                $Battle.showPausedMessage(i18n._('A wild %1 has apeared!', this.trainers.foe[0].party[0].name));
                $Battle.showMessage(i18n._('Go %1!', this.trainers.player[0].party[0].name));
                var priority = this.getPriority();
                for (var _i = 0, priority_1 = priority; _i < priority_1.length; _i++) {
                    var index = priority_1[_i];
                    Battle.Abilities.OnSwitchInEffects(this.battlers[index], true);
                }
                this.push(function () { return _this.started = true; });
            };
            Manager.update = function () {
                if (this.isBusy())
                    return;
                this.pop();
            };
            Manager.isBusy = function () {
                return $gameMessage.isBusy() || this.waitMode !== 0 /* None */;
            };
            Manager.push = function (method, scope) {
                if (scope === void 0) { scope = this; }
                this._queue.push({ method: method, scope: scope });
            };
            Manager.pop = function () {
                if (this._queue.length <= 0)
                    return;
                var action = this._queue.shift();
                action.method.apply(action.scope);
            };
            Manager.terminate = function () {
                this.clear();
                console.log("Battle End");
            };
            Manager.clear = function () {
                this._queue = [];
                this.actives = [];
                $Player.battlers = [];
                this.started = false;
                Battle.UI.actionsInx = 0;
                Battle.UI.movesInx = 0;
                this.clearWeather();
            };
            Manager.showMessage = function (msg) {
                msg = PE.Utils.capitalize(msg);
                this.push(function () {
                    while (msg.length > CHARACTERS_PER_LINE) {
                        var line = msg.substring(0, CHARACTERS_PER_LINE);
                        var truncateIndex = Math.min(line.length, line.lastIndexOf(" "));
                        line = line.substring(0, truncateIndex);
                        $gameMessage.add(line + '\\n');
                        msg = msg.substring(truncateIndex + 1);
                    }
                    $gameMessage.add(msg + '\\|\\^');
                });
            };
            Manager.showPausedMessage = function (msg) {
                msg = PE.Utils.capitalize(msg);
                this.push(function () {
                    while (msg.length > CHARACTERS_PER_LINE) {
                        var line = msg.substring(0, CHARACTERS_PER_LINE);
                        var truncateIndex = Math.min(line.length, line.lastIndexOf(" "));
                        line = line.substring(0, truncateIndex + 1);
                        $gameMessage.add(line + '\\n');
                        msg = msg.substring(truncateIndex + 1);
                    }
                    $gameMessage.add(msg);
                });
            };
            Manager.changePhase = function (phase) {
                var _this = this;
                console.log(phase);
                this.push(function () { return _this.phase = phase; });
            };
            Manager.runActions = function () {
                this.turncount++;
                console.log("Turn #" + this.turncount);
                for (var _i = 0, _a = this.actives; _i < _a.length; _i++) {
                    var battler = _a[_i];
                    if (this.choices[battler.index])
                        continue;
                    this.choices[battler.index] = (DummySelection(battler));
                }
                var priority = this.getPriority();
                for (var _b = 0, priority_2 = priority; _b < priority_2.length; _b++) {
                    var index = priority_2[_b];
                    var choice = this.choices[index];
                    if (choice.action === 2 /* Switch */) {
                        var out = this.actives[this.currentInx];
                        var enter = this.battlers[choice.index];
                        this.actives[this.currentInx] = enter;
                        out.sides.own.actives[this.currentInx] = enter;
                        Battle.Abilities.OnSwitchInEffects(enter, true);
                    }
                }
                var _loop_1 = function (index) {
                    var user = this_1.battlers[index];
                    if (user.isFainted())
                        return "continue";
                    var choice = this_1.choices[index];
                    var target = user.sides.foe.actives[choice.target];
                    if (choice.action === 0 /* UseMove */) {
                        console.log(user.name + " Speed: " + user.speed);
                        console.log(user.name + " used " + choice.move.name + ", move priority: " + choice.move.priority);
                        this_1.showMessage(i18n._('%1 used %2', user.name, choice.move.name));
                        var d_1 = this_1.getDamage(user, target, choice.move);
                        if (d_1 > 0) {
                            // target.damage(d)
                            this_1.push(function () { return target.damage(d_1); });
                            ;
                            // console.log(`Damage: ${d}`);
                            // console.log(`${target.name} HP: ${target.totalhp} --> ${target.hp}`);
                        }
                    }
                };
                var this_1 = this;
                // use moves
                for (var _c = 0, priority_3 = priority; _c < priority_3.length; _c++) {
                    var index = priority_3[_c];
                    _loop_1(index);
                }
                this.changePhase(2 /* ActionSelection */);
            };
            Manager.getDamage = function (source, target, move) {
                // http://bulbapedia.bulbagarden.net/wiki/Damage
                var atk = 0;
                var def = 0;
                if (move.category == "SPECIAL") {
                    atk = source.spatk;
                    def = target.spdef;
                }
                else if (move.category == "PHYSICAL") {
                    atk = source.attack;
                    def = target.defense;
                }
                else {
                    return 0;
                }
                var effectiveness = PE.Types.effectiveness(move.type, target.types, target.effects.Type3);
                var msg = null;
                if (effectiveness <= 0.5) {
                    msg = "It's not very effective...";
                }
                else if (effectiveness >= 2) {
                    msg = "It's super effective!";
                }
                else if (effectiveness == 0) {
                    msg = "It doesn't affect " + target.name;
                }
                if (msg) {
                    // PE_BattleControl.push('showMessage', msg);
                    console.log(msg);
                }
                var stab = source.hasType(move.type) ? 1.5 : 1;
                var critical = 1;
                var random = Math.random() * 100;
                if (random < 0.0625) {
                    critical = 1.5;
                    // PE_BattleControl.push('showMessage', "critical hit");
                }
                random = Math.random() * (1 - 0.81) + 0.81;
                var modifier = critical * random * stab * effectiveness;
                var damage = ((((((2 * source.level) / 5) + 2) * move.basePower * (atk / def)) / 50) + 2) * modifier;
                return Math.floor(damage);
            };
            Manager.choose = function (move, target) {
                this.choices[this.actives[this.currentInx].index] = {
                    action: 0 /* UseMove */,
                    move: move,
                    target: 0
                };
            };
            Manager.showAbilityIndicator = function (pokemon) {
                var _this = this;
                var ability = pokemon.ability;
                this.push(function () {
                    var foe = _this.isOpposing(pokemon.index);
                    _this.scene.showAbilityIndicator(ability, foe);
                    _this.waitMode = 2 /* AbilitySing */;
                });
            };
            Manager.changeWaitMode = function (mode) {
                this.waitMode = mode;
            };
            /**
             * Set the battle weather and start it's animation
             * @param weather the new weather
             * @param duration the duration. -1 for unlimited weather time.
             */
            Manager.setWeather = function (weather, duration) {
                var _this = this;
                this.weather = weather;
                this.weatherDuration = duration;
                this.push(function () {
                    _this.scene.setWeather(weather);
                });
            };
            Manager.clearWeather = function () {
                this.weather = PE.Weathers.None;
                this.weatherDuration = 0;
            };
            Manager.nextPickupUse = function () {
                throw Error('not implemented');
            };
            Manager.recoverHPAnimation = function (index) {
                var _this = this;
                this.push(function () {
                    _this.battlers[index].hpbar.start();
                    _this.waitMode = 1 /* Animation */;
                    _this.phase = 4 /* Animation */;
                });
            };
            /**  The initial order of Pokémon in the player's party.*/
            Manager.partyOrder = [];
            Manager._queue = [];
            /** The Pokémon in the field, the ones fithing right now*/
            Manager.actives = [];
            Manager.phase = 0 /* None */;
            Manager.turncount = 0;
            Manager.waitMode = 0 /* None */;
            Manager.started = false;
            return Manager;
        }());
        Battle.Manager = Manager;
    })(Battle = PE.Battle || (PE.Battle = {}));
})(PE || (PE = {}));
var $Battle = PE.Battle.Manager;
function DummySelection(battler) {
    return {
        action: 0 /* UseMove */,
        move: battler.moveset[0],
        target: 0
    };
}
