/**
 * @namespace SETTINGS
 */
let SETTINGS = {};

SETTINGS.SCREEN_WIDTH = 512;
SETTINGS.SCREEN_HEIGHT = 384;
/** The maximum level Pokémon can reach. */
SETTINGS.MAXIMUM_LEVEL = 100;
/** The odds of a newly generated Pokémon being shiny (out of 65536). */
SETTINGS.SHINY_CHANCE = 8;
/** The odds of a wild Pokémon/bred egg having Pokérus (out of 65536). */
SETTINGS.POKERUS_CHANCE = 3;
SETTINGS.DEFAULT_FONT_SIZE = 24;
SETTINGS.GENDERS = [
  null,
  {
    name: 'Boy',
    sprite: 'dp_hero',
    dashSprite: 'dp_hero_running',
    back: 'dp_back_0'
  },
  {
    name: 'Girl',
    sprite: 'dp_heroine',
    dashSprite: 'dp_heroine_running',
    back: 'trback000'
  }
];
// Intro Scene
SETTINGS.INTRO_SPECIES = Pokedex.PIKACHU;
