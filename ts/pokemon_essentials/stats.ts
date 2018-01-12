namespace PE {
  export enum Stats {
    HP,
    Attack,
    Defense,
    Speed,
    SpAtk,
    SpDef,
    Accuracy,
    Evasion,
  }
}


namespace PE.Stats {
  export function name(stat: PE.Stats) {
    return stat;
  }
}
