namespace PE {
  export let ABILITIES_EFFECTS: {Abilitydex?: IAbilitiesEffects} = {};

  export interface IAbilitiesEffects {
    onSwitchIn?(pokmeon: Battle.Battler): void;
    onSwitchOut?(pokmeon: Battle.Battler): void;
    onBoost?(stat: Stats, target: Battle.Battler, source: Battle.Battler): void;
    modifyMove?(): void;
  }

  export function RegisterAbilityEffects(ability: Abilitydex, effects: IAbilitiesEffects) {
    ABILITIES_EFFECTS[ability] = effects;
  }
  export function RegisterAbilitiesEffects(abilities: Abilitydex[], effects: IAbilitiesEffects) {
    for (const ability of abilities) {
      ABILITIES_EFFECTS[ability] = effects;
    }
  }
}
