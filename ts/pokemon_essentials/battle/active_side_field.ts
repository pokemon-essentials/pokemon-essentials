namespace PE.Battle {
  export class ActiveSide {
    battlers: number[];
    /** The indexes of active Pokémon in Battle of this side */
    actives: number[];
    effects: {};
    constructor() {
      this.actives = [];
      this.battlers = [];
      this.effects = {};
      this.effects[PE.Effects.CraftyShield] = false;
      this.effects[PE.Effects.EchoedVoiceCounter] = 0;
      this.effects[PE.Effects.EchoedVoiceUsed] = false;
      this.effects[PE.Effects.LastRoundFainted] = -1;
      this.effects[PE.Effects.LightScreen] = 0;
      this.effects[PE.Effects.LuckyChant] = 0;
      this.effects[PE.Effects.MatBlock] = false;
      this.effects[PE.Effects.Mist] = 0;
      this.effects[PE.Effects.QuickGuard] = false;
      this.effects[PE.Effects.Rainbow] = 0;
      this.effects[PE.Effects.Reflect] = 0;
      this.effects[PE.Effects.Round] = 0;
      this.effects[PE.Effects.Safeguard] = 0;
      this.effects[PE.Effects.SeaOfFire] = 0;
      this.effects[PE.Effects.Spikes] = 0;
      this.effects[PE.Effects.StealthRock] = false;
      this.effects[PE.Effects.StickyWeb] = false;
      this.effects[PE.Effects.Swamp] = 0;
      this.effects[PE.Effects.Tailwind] = 0;
      this.effects[PE.Effects.ToxicSpikes] = 0;
      this.effects[PE.Effects.WideGuard] = false;
    }
  }

  export class ActiveField {
    effects: {};
    constructor() {
      this.effects = {};
      this.effects[PE.Effects.ElectricTerrain] = 0;
      this.effects[PE.Effects.FairyLock] = 0;
      this.effects[PE.Effects.FusionBolt] = false;
      this.effects[PE.Effects.FusionFlare] = false;
      this.effects[PE.Effects.GrassyTerrain] = 0;
      this.effects[PE.Effects.Gravity] = 0;
      this.effects[PE.Effects.IonDeluge] = false;
      this.effects[PE.Effects.MagicRoom] = 0;
      this.effects[PE.Effects.MistyTerrain] = 0;
      this.effects[PE.Effects.MudSportField] = 0;
      this.effects[PE.Effects.TrickRoom] = 0;
      this.effects[PE.Effects.WaterSportField] = 0;
      this.effects[PE.Effects.WonderRoom] = 0;
    }
  }
}
