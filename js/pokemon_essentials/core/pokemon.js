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
    var Pokemon;
    (function (Pokemon_1) {
        var MAX_EVS = 508;
        var MAX_EVS_STATS = 252;
        var PokemonData = /** @class */ (function () {
            function PokemonData() {
                this.id = 0;
                this.name = "";
                this.species = "";
                this.abilities = {};
                this.baseStats = { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 };
                this.effortPoints = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
                this.types = [];
                this.learnset = {
                    levelup: null,
                    tm: null,
                    tutor: null
                };
                this.eggGroups = [];
                this.heightm = 0;
                this.weightkg = 0;
                this.color = 0;
                this.rareness = 0;
                this.stepsToHatch = 0;
                this.baseSpecies = null;
                this.forme = null;
                this.gender = null;
                this.otherFormes = null;
                this.pokedex = "";
                this.genderRatio = { M: .5, F: .5 };
            }
            return PokemonData;
        }());
        var Pokemon = /** @class */ (function (_super) {
            __extends(Pokemon, _super);
            /**
             *
             * @param species Pokémon Species ID
             * @param level Pokémon level
             * @param item Pokémon Held Item
             * @param moves Pokémon Moves IDs
             * @param ability Pokémon Abilitie ID
             * @param nature Pokémon Nature ID
             * @param ivs Pokémon IVs
             * @param evs Pokémon Evs
             */
            function Pokemon(species, level, item, moves, ability, nature, ivs, evs) {
                var _this = _super.call(this) || this;
                _this.species = species;
                _this.level = level;
                _this.item = item;
                _this.evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
                _this.fainted = false;
                _this.ivs = {
                    hp: Math.randomInt(30) + 1, atk: Math.randomInt(30) + 1, def: Math.randomInt(30) + 1,
                    spa: Math.randomInt(30) + 1, spd: Math.randomInt(30) + 1, spe: Math.randomInt(30) + 1
                };
                _this.pokerus = Math.randomInt(65356) < SETTINGS.POKERUS_CHANCE;
                _this.stats = { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 };
                _this.shiny = Math.randomInt(65356) < SETTINGS.SHINY_CHANCE;
                if (!_this.species || !_this.level)
                    throw Error("Species and Level are required to create a Pokemon");
                var data = $PE_POKEDEX[_this.species];
                if (!data)
                    throw Error("the " + _this.species + " Pokemon species don't exits");
                Object.assign(_this, data);
                evs = evs || [];
                ivs = ivs || [];
                _this.level = Math.min(SETTINGS.MAXIMUM_LEVEL, level);
                if (!_this.gender)
                    _this.gender = Math.random() < _this.genderRatio.M ? "M" : "F";
                _this.exp = PE.Experience.getExpByLevel(_this.growthRate, _this.level);
                _this.nature = nature || PE.Utils.getRandomFromEnum(PE.Natures);
                for (var i = 0; i < ivs.length; i++) {
                    if (ivs[i])
                        _this.ivs[Object.keys(_this.ivs)[i]] = Math.min(31, ivs[i]);
                }
                var current_evs = 0;
                var evs_count = 0;
                for (var i = 0; i < evs.length; i++) {
                    var points = Math.min(evs[i], MAX_EVS_STATS);
                    evs_count += points;
                    if (evs_count > MAX_EVS)
                        points = MAX_EVS - current_evs;
                    _this.evs[Object.keys(_this.evs)[i]] = points;
                    current_evs += points;
                    if (current_evs >= MAX_EVS)
                        break;
                }
                _this.generateStatsByLevel();
                /**
                 * @type {int} The current HP
                 */
                _this.hp = _this.stats.hp;
                _this.abilityInx = Math.round(Math.random());
                _this.ability = _this.abilities[_this.abilityInx] || _this.abilities[0];
                if (ability)
                    _this.ability = ability;
                if (!_this.learnset.levelup) {
                    _this.learnset = $PE_POKEDEX[_this.baseSpecies].learnset;
                }
                _this.moveset = _this.getMoveset(moves);
                _this.status = PE.Statuses.Healthy;
                _this.statusCount = 0;
                return _this;
                // this.exp = 0;
                // this.happiness = 0;
                // this.item = item || null // Held item
                // this.itemRecycle = null // Consumed held item (used in battle only)
                // this.itemInitial = null // Resulting held item (used in battle only)
                // this.belch = false // Whether Pokémon can use Belch (used in battle only)
                // this.mail = null // Mail
                // this.fused = false // The Pokémon fused into this one
                // this.status = null // Status problem (PBStatuses)
                // this.statusCount = null // Sleep count/Toxic flag
                // this.eggsteps = this.StepsToHatch // Steps to hatch egg, 0 if Pokémon is not an egg
                // this.ballused = false // Ball used
                // this.markings = null // Markings
                // this.obtainMode = 0 // Manner obtained: 0 - met, 1 - as egg, 2 - traded, 4 - fateful encounter
                // this.obtainMap = 0; // Map where obtained
                // this.obtainText = ''; // Replaces the obtain map's name if not nil
                // this.obtainLevel = level; // Level obtained
                // this.hatchedMap = 0; // Map where an egg was hatched
                // this.language = ''; // Language
                // this.ot = ''; // Original Trainer's name
                // this.otgender = 0; // Original Trainer's gender:  0 - male, 1 - female, 2 - mixed, 3 - unknown For information only, not used to verify
            }
            Pokemon.prototype.generateStatsByLevel = function () {
                this.stats.hp = Math.floor(((((2 * this.baseStats.hp) + this.ivs.hp + (this.evs.hp / 4)) * this.level) / 100)
                    + this.level + 10);
                this.stats.atk = Math.floor(Math.floor((((((2 * this.baseStats.atk) + this.ivs.atk + (this.evs.atk / 4))
                    * this.level) / 100) + 5)) * PE.Natures.stats(this.nature).atk);
                this.stats.def = Math.floor(Math.floor((((((2 * this.baseStats.def) + this.ivs.def + (this.evs.def / 4))
                    * this.level) / 100) + 5)) * PE.Natures.stats(this.nature).def);
                this.stats.spa = Math.floor(Math.floor((((((2 * this.baseStats.spa) + this.ivs.spa + (this.evs.spa / 4))
                    * this.level) / 100) + 5)) * PE.Natures.stats(this.nature).spa);
                this.stats.spd = Math.floor(Math.floor((((((2 * this.baseStats.spd) + this.ivs.spd + (this.evs.spd / 4))
                    * this.level) / 100) + 5)) * PE.Natures.stats(this.nature).spd);
                this.stats.spe = Math.floor(Math.floor((((((2 * this.baseStats.spe) + this.ivs.spe + (this.evs.spe / 4)) * this.level) / 100) + 5))
                    * PE.Natures.stats(this.nature).spe);
            };
            Pokemon.prototype.getMoveset = function (moves) {
                if (!moves) {
                    moves = [];
                    for (var level in this.learnset.levelup) {
                        if (parseInt(level) <= this.level) {
                            moves = moves.concat(this.learnset.levelup[level]);
                        }
                        else {
                            break;
                        }
                    }
                    moves = moves.slice(-4);
                }
                var moveset = [];
                for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
                    var m = moves_1[_i];
                    var move = new PE.Battle.Moves.Move(m);
                    move.totalPP = move.pp;
                    moveset.push(move);
                }
                return moveset;
            };
            Pokemon.prototype.gainExp = function (amt) {
                this.exp += amt;
                var done = false;
                while (!done) {
                    if (PE.Experience.getExpByLevel(this.growthRate, this.level + 1) < this.exp) {
                        this.levelUp();
                    }
                    else {
                        done = true;
                    }
                }
            };
            Pokemon.prototype.levelUp = function () {
            };
            return Pokemon;
        }(PokemonData));
        Pokemon_1.Pokemon = Pokemon;
        function getRandomPokemon() {
            var inx = Math.randomInt(Object.keys($PE_POKEDEX).length);
            var level = Math.randomInt(SETTINGS.MAXIMUM_LEVEL) + 1;
            var species = Object.keys($PE_POKEDEX)[inx];
            return new Pokemon(species, level);
        }
        Pokemon_1.getRandomPokemon = getRandomPokemon;
        function getRandomParty(length) {
            if (length > 6)
                length = 6;
            var party = [];
            for (var i = 0; i < length; i++) {
                party.push(getRandomPokemon());
            }
            return party;
        }
        Pokemon_1.getRandomParty = getRandomParty;
    })(Pokemon = PE.Pokemon || (PE.Pokemon = {}));
})(PE || (PE = {}));
