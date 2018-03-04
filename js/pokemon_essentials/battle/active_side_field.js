var PE;
(function (PE) {
    var Battle;
    (function (Battle) {
        var ActiveSide = /** @class */ (function () {
            function ActiveSide() {
                this.actives = [];
                this.battlers = [];
                this.effects = {};
                this.effects.CraftyShield = false;
                this.effects.EchoedVoiceCounter = 0;
                this.effects.EchoedVoiceUsed = false;
                this.effects.LastRoundFainted = -1;
                this.effects.LightScreen = 0;
                this.effects.LuckyChant = 0;
                this.effects.MatBlock = false;
                this.effects.Mist = 0;
                this.effects.QuickGuard = false;
                this.effects.Rainbow = 0;
                this.effects.Reflect = 0;
                this.effects.Round = 0;
                this.effects.Safeguard = 0;
                this.effects.SeaOfFire = 0;
                this.effects.Spikes = 0;
                this.effects.StealthRock = false;
                this.effects.StickyWeb = false;
                this.effects.Swamp = 0;
                this.effects.Tailwind = 0;
                this.effects.ToxicSpikes = 0;
                this.effects.WideGuard = false;
            }
            return ActiveSide;
        }());
        Battle.ActiveSide = ActiveSide;
        var ActiveField = /** @class */ (function () {
            function ActiveField() {
                this.effects = {};
                this.effects.ElectricTerrain = 0;
                this.effects.FairyLock = 0;
                this.effects.FusionBolt = false;
                this.effects.FusionFlare = false;
                this.effects.GrassyTerrain = 0;
                this.effects.Gravity = 0;
                this.effects.IonDeluge = false;
                this.effects.MagicRoom = 0;
                this.effects.MistyTerrain = 0;
                this.effects.MudSportField = 0;
                this.effects.TrickRoom = 0;
                this.effects.WaterSportField = 0;
                this.effects.WonderRoom = 0;
            }
            return ActiveField;
        }());
        Battle.ActiveField = ActiveField;
    })(Battle = PE.Battle || (PE.Battle = {}));
})(PE || (PE = {}));
