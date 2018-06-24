namespace PE {
  export enum Stats {
    HP = "HP",
    Attack = "Attack",
    Defense = "Defense",
    Speed = "Speed",
    SpAtk = "SpAtk",
    SpDef = "SpDef",
    Accuracy = "Accuracy",
    Evasion = "Evasion"
  }
}


namespace PE.Stats {
  export function name(stat: Stats) {
    return i18n._(stat);
  }
}
