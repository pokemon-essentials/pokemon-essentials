namespace PE {
  export enum Statuses { Healthy, Sleep, Poison, Burn, Paralysis, Frozen }
}

namespace PE.Statuses {
  export function name(id: Statuses) {
    let names = [
      i18n._("Healthy"),
      i18n._("Asleep"),
      i18n._("Poisoned"),
      i18n._("Burned"),
      i18n._("Paralyzed"),
      i18n._("Frozen")
    ]
    return names[id];
  }
}
