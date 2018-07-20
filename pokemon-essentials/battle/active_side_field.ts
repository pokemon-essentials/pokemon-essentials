namespace PE.Battle {
  interface SideEffects {
    CraftyShield?: boolean;
    EchoedVoiceCounter?: number;
    EchoedVoiceUsed?: boolean;
    LastRoundFainted?: number;
    LightScreen?: number;
    LuckyChant?: number;
    MatBlock?: boolean;
    Mist?: number;
    QuickGuard?: boolean;
    Rainbow?: number;
    Reflect?: number;
    Round?: number;
    Safeguard?: number;
    SeaOfFire?: number;
    Spikes?: number;
    StealthRock?: boolean;
    StickyWeb?: boolean;
    Swamp?: number;
    /** Tail wind effets turn count */
    Tailwind?: number;
    ToxicSpikes?: number;
    WideGuard?: boolean;
  }

  export class ActiveSide {
    battlers: Battler[];
    /** The indexes of active Pokémon in Battle of this side */
    actives: Battler[];

    effects?: SideEffects;
    constructor() {
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

    isAnyUnfainted() {
      for (const pokeindex of this.battlers) {
        if (!$Battle.battlers[pokeindex].isFainted()) return true;
      }
      return false;
    }
  }

  interface FieldEffects {
    Electrify?: boolean;
    ElectricTerrain?: number;
    FairyLock?: number;
    FusionBolt?: boolean;
    FusionFlare?: boolean;
    GrassyTerrain?: number;
    Gravity?: number;
    IonDeluge?: boolean;
    MagicRoom?: number;
    MistyTerrain?: number;
    MudSportField?: number;
    TrickRoom?: number;
    WaterSportField?: number;
    WonderRoom?: number;
  }

  export class ActiveField {
    effects: FieldEffects;
    constructor() {
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
  }
}
