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
      this.effects[Effects.CraftyShield] = false;
      this.effects[Effects.EchoedVoiceCounter] = 0;
      this.effects[Effects.EchoedVoiceUsed] = false;
      this.effects[Effects.LastRoundFainted] = -1;
      this.effects[Effects.LightScreen] = 0;
      this.effects[Effects.LuckyChant] = 0;
      this.effects[Effects.MatBlock] = false;
      this.effects[Effects.Mist] = 0;
      this.effects[Effects.QuickGuard] = false;
      this.effects[Effects.Rainbow] = 0;
      this.effects[Effects.Reflect] = 0;
      this.effects[Effects.Round] = 0;
      this.effects[Effects.Safeguard] = 0;
      this.effects[Effects.SeaOfFire] = 0;
      this.effects[Effects.Spikes] = 0;
      this.effects[Effects.StealthRock] = false;
      this.effects[Effects.StickyWeb] = false;
      this.effects[Effects.Swamp] = 0;
      this.effects[Effects.Tailwind] = 0;
      this.effects[Effects.ToxicSpikes] = 0;
      this.effects[Effects.WideGuard] = false;
    }
  }

  export class ActiveField {
    effects: {};
    constructor() {
      this.effects = {};
      this.effects[Effects.ElectricTerrain] = 0;
      this.effects[Effects.FairyLock] = 0;
      this.effects[Effects.FusionBolt] = false;
      this.effects[Effects.FusionFlare] = false;
      this.effects[Effects.GrassyTerrain] = 0;
      this.effects[Effects.Gravity] = 0;
      this.effects[Effects.IonDeluge] = false;
      this.effects[Effects.MagicRoom] = 0;
      this.effects[Effects.MistyTerrain] = 0;
      this.effects[Effects.MudSportField] = 0;
      this.effects[Effects.TrickRoom] = 0;
      this.effects[Effects.WaterSportField] = 0;
      this.effects[Effects.WonderRoom] = 0;
    }
  }
}
