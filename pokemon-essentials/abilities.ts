namespace PE {
  export let ABILITIES_EFFECTS: { Abilitydex?: IAbilitiesEffects } = {};

  export interface IAbilitiesEffects {
    onSwitchIn?(pokmeon: Battle.Battler): void;
    onSwitchOut?(pokmeon: Battle.Battler): void;
    onBoost?(target: Battle.Battler, source: Battle.Battler): void;
    modifyMove?(): void;
    /**
     * Use
     * @param stas The chaged stat
     * @param acc stats modify accumulate by other factors
     * @param pokmeon
     */
    modifyStat?(pokmeon: Battle.Battler, acc: number, ): number;
  }

  export function RegisterAbilityEffects(ability: Abilitydex, effects: IAbilitiesEffects) {
    ABILITIES_EFFECTS[ability] = effects;
  }
  export function RegisterAbilitiesEffects(abilities: Abilitydex[], effects: IAbilitiesEffects) {
    for (const ability of abilities) {
      ABILITIES_EFFECTS[ability] = effects;
    }
  }

  export function ExistAbilityEffect(ability: Abilitydex, effect: string) {
    return ABILITIES_EFFECTS[ability] && ABILITIES_EFFECTS[ability][effect];
  }

  export function GetAbilityAffect(ability: Abilitydex): IAbilitiesEffects {
    return ABILITIES_EFFECTS[ability];
  }
}

namespace PE.Abilities {
  export function getName(id: Abilitydex | string) {
    return i18n._($PE_ABILITIES[id].name);
  }

  export function Effects(effect: string, pokemon: Battle.Battler, ...args) {
    if (ABILITIES_EFFECTS[pokemon.ability] && ABILITIES_EFFECTS[pokemon.ability][effect]) {
      return ABILITIES_EFFECTS[pokemon.ability][effect](pokemon, ...args);
    }
  }
}
