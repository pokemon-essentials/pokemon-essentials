namespace SETTINGS {
  export const SCREEN_WIDTH = 512;
  export const SCREEN_HEIGHT = 384;
  /** The maximum level Pokémon can reach. */
  export const MAXIMUM_LEVEL = 100;
  /** The odds of a newly generated Pokémon being shiny (out of 65536). */
  export const SHINY_CHANCE = 8;
  /** The odds of a wild Pokémon/bred egg having Pokérus (out of 65536). */
  export const POKERUS_CHANCE = 3;

  export const DEFAULT_FONT_SIZE = 24;
  export const GENDERS = [
    null, // to init the gender count on 1
    {
      name: 'Boy',
      sprite: 'dp_hero',
      dashSprite: 'dp_hero_running',
      back: 'trback000'
    },
    {
      name: 'Girl',
      sprite: 'dp_heroine',
      dashSprite: 'dp_heroine_running',
      back: 'trback000'
    }
  ]
}
