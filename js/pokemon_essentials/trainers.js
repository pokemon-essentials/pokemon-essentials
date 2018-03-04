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
    var Trainers;
    (function (Trainers) {
        var Trainer = /** @class */ (function () {
            function Trainer() {
                this.battlers = [];
                this.data = { party: undefined, name: undefined };
                this.data.gender = 1;
            }
            Object.defineProperty(Trainer.prototype, "party", {
                get: function () {
                    return this.data.party;
                },
                set: function (members) {
                    this.data.party = members;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Trainer.prototype, "active", {
                get: function () {
                    return this.battlers[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Trainer.prototype, "leader", {
                get: function () {
                    return this.data.party[0];
                },
                enumerable: true,
                configurable: true
            });
            return Trainer;
        }());
        Trainers.Trainer = Trainer;
        var Player = /** @class */ (function (_super) {
            __extends(Player, _super);
            function Player() {
                return _super.call(this) || this;
            }
            return Player;
        }(Trainer));
        Trainers.Player = Player;
        var NPCTrainer = /** @class */ (function (_super) {
            __extends(NPCTrainer, _super);
            function NPCTrainer(party) {
                var _this = _super.call(this) || this;
                if (party.length === 0)
                    throw Error('Trainer must have at least one Pokémon in party');
                _this.data = { name: "", party: party };
                return _this;
            }
            return NPCTrainer;
        }(Trainer));
        Trainers.NPCTrainer = NPCTrainer;
        function RandomTrainer() {
            var length = Math.randomInt(5) + 1;
            var party = [];
            for (var i = 0; i < length; i++) {
                party.push(PE.Pokemon.getRandomPokemon());
            }
            return new NPCTrainer(party);
        }
        Trainers.RandomTrainer = RandomTrainer;
    })(Trainers = PE.Trainers || (PE.Trainers = {}));
})(PE || (PE = {}));
