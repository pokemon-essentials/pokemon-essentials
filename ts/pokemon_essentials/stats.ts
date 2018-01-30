namespace PE {
  export enum Stats { HP, Attack, Defense, Speed, SpAtk, SpDef, Accuracy, Evasion }
}


namespace PE.Stats {
  export function name(stat: number) {
    let names = [
      i18n._('HP'),
      i18n._('Attack'),
      i18n._('Defense'),
      i18n._('Speed'),
      i18n._('SpAtk'),
      i18n._('SpDef'),
      i18n._('Accuracy'),
      i18n._('Evasion'),
    ]
    return names[stat];
  }
}
