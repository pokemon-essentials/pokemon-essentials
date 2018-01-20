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
    return tag === Terrain.Water ||
      tag === Terrain.StillWater ||
      tag === Terrain.DeepWater ||
      tag === Terrain.WaterfallCrest ||
      tag === Terrain.Waterfall;
  }

  export function isPassableWater(tag: number) {
    return tag === Terrain.Water ||
      tag === Terrain.StillWater ||
      tag === Terrain.DeepWater ||
      tag === Terrain.WaterfallCrest;
  }

  export function isJustWater(tag: number) {
    return tag === Terrain.Water || tag === Terrain.StillWater || tag === Terrain.DeepWater;
  }

  export function isDeepWater(tag: number) { return tag === Terrain.DeepWater; }

  export function isWaterfall(tag: number) {
    return tag === Terrain.WaterfallCrest || tag === Terrain.Waterfall;
  }

  export function isGrass(tag: number) {
    return tag === Terrain.Grass ||
      tag === Terrain.TallGrass ||
      tag === Terrain.UnderwaterGrass ||
      tag === Terrain.SootGrass;
  }

  /**The Poké Radar only works in these tiles */
  export function isJustGrass(tag: number) {
    return tag === Terrain.Grass || tag === Terrain.SootGrass;
  }

  export function isLedge(tag: number) { return tag === Terrain.Ledge; }

  export function isIce(tag: number) { return tag === Terrain.Ice; }

  export function isBridge(tag: number) { return tag === Terrain.Bridge; }

  export function hasReflections(tag: number) {
    return tag === Terrain.StillWater || tag === Terrain.Puddle;
  }

  export function onlyWalk(tag: number) {
    return tag === Terrain.TallGrass || tag === Terrain.Ice;
  }

  export function isDoubleWildBattle(tag: number) { return tag === Terrain.TallGrass; }
}
