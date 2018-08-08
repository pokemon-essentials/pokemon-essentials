namespace Abilities {
  let AbilitiesEffects = {};

  interface IAbilitiesEffects {}

  export function RegisterEffects(ability: PE.Abilitydex | PE.Abilitydex[], effects: IAbilitiesEffects) {
    if (Array.isArray(ability)) {
      for (const a of ability) {
        AbilitiesEffects[a] = effects;
      }
    } else {
      AbilitiesEffects[ability] = effects;
    }
  }

  export function getEffect(effectId: string, abilityId: PE.Abilitydex) {
    if (AbilitiesEffects[abilityId] && [effectId]) return AbilitiesEffects[abilityId][effectId];
    return undefined;
  }
}
