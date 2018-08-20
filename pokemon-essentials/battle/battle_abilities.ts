namespace PE.Abilities {
  let AbilitiesEffects = {};

  interface IAbilitiesEffects {}

  export function RegisterEffects(ability: PE.ABILITYDEX | PE.ABILITYDEX[], effects: IEventsEffects) {
    if (Array.isArray(ability)) {
      for (const a of ability) {
        AbilitiesEffects[a] = effects;
      }
    } else {
      AbilitiesEffects[ability] = effects;
    }
  }

  export function getEffect(effectId: string, abilityId: PE.ABILITYDEX) {
    if (AbilitiesEffects[abilityId] && [effectId]) return AbilitiesEffects[abilityId][effectId];
    return undefined;
  }

  export function getName(id: PE.ABILITYDEX | string) {
    return i18n._($PE_ABILITIES[id].name);
  }
}
