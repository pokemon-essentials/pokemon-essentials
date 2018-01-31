namespace PE.Battle.Items {
  export function name(id: string) {
    return i18n._($PE_ITEMS[id].name);
  }

  export function SpeedStatEffects(pokemon: Battler, speed: number) {
    if (pokemon.hasItemIn(['MACHOBRACE', 'POWERWEIGHT', 'POWERBRACER', 'POWERBELT', 'POWERANKLET', 'POWERLENS',
      'POWERBAND', 'IRONBALL'])) {
      speed = Math.round(speed / 2);
    }
    if (pokemon.hasItem('CHOICESCARF')) {
      speed = Math.round(speed * 1.5);
    }
    if (pokemon.hasItem('QUICKPOWDER') && pokemon.species === Pokedex.DITTO && !pokemon.effects.Transform) {
      speed *= 2;
    }
    return speed;
  }
}
