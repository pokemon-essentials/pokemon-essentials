namespace PE {
  export enum Terrain {
    None,
    Ledge,
    Grass,
    Sand,
    Rock,
    DeepWater,
    StillWater,
    Water,
    Waterfall,
    WaterfallCrest,
    TallGrass,
    UnderwaterGrass,
    Ice,
    Neutral,
    SootGrass,
    Bridge,
    Puddle,
  }
}

namespace PE.Terrain {
  export function isSurfable(tag: number) {
    return isWatter(tag);
  }

  export function isWatter(tag: number) {
    return tag === PE.Terrain.Water ||
      tag === PE.Terrain.StillWater ||
      tag === PE.Terrain.DeepWater ||
      tag === PE.Terrain.WaterfallCrest ||
      tag === PE.Terrain.Waterfall;
  }

  export function isPassableWater(tag: number) {
    return tag === PE.Terrain.Water ||
      tag === PE.Terrain.StillWater ||
      tag === PE.Terrain.DeepWater ||
      tag === PE.Terrain.WaterfallCrest;
  }

  export function isJustWater(tag: number) {
    return tag === PE.Terrain.Water || tag === PE.Terrain.StillWater || tag === PE.Terrain.DeepWater;
  }

  export function isDeepWater(tag: number) { return tag === PE.Terrain.DeepWater; }

  export function isWaterfall(tag: number) {
    return tag === PE.Terrain.WaterfallCrest || tag === PE.Terrain.Waterfall;
  }

  export function isGrass(tag: number) {
    return tag === PE.Terrain.Grass ||
      tag === PE.Terrain.TallGrass ||
      tag === PE.Terrain.UnderwaterGrass ||
      tag === PE.Terrain.SootGrass;
  }

  /**The Poké Radar only works in these tiles */
  export function isJustGrass(tag: number) {
    return tag === PE.Terrain.Grass || tag === PE.Terrain.SootGrass;
  }

  export function isLedge(tag: number) { return tag === PE.Terrain.Ledge; }

  export function isIce(tag: number) { return tag === PE.Terrain.Ice; }

  export function isBridge(tag: number) { return tag === PE.Terrain.Bridge; }

  export function hasReflections(tag: number) {
    return tag === PE.Terrain.StillWater || tag === PE.Terrain.Puddle;
  }

  export function onlyWalk(tag: number) {
    return tag === PE.Terrain.TallGrass || tag === PE.Terrain.Ice;
  }

  export function isDoubleWildBattle(tag: number) { return tag === PE.Terrain.TallGrass; }
}
