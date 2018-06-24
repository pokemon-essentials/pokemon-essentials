namespace PE {
  /** Pokémon natures */
  export enum Natures {
    Hardy,
    Lonely,
    Brave,
    Adamant,
    Naughty,
    Bold,
    Docile,
    Relaxed,
    Impish,
    Lax,
    Timid,
    Hasty,
    Serious,
    Jolly,
    Naive,
    Modest,
    Mild,
    Quiet,
    Bashful,
    Rash,
    Calm,
    Gentle,
    Sassy,
    Careful,
    Quirky,
  }
}

namespace PE.Natures {
  const NATURES = {
    Hardy: {
      name: 'Hardy',
      stats: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
    },
    Lonely: {
      name: 'Lonely',
      stats: { atk: 1.1, def: 0.9, spa: 1, spd: 1, spe: 1 }
    },
    Brave: {
      name: 'Brave',
      stats: { atk: 1.1, def: 1, spa: 1, spd: 1, spe: 0.9 }
    },
    Adamant: {
      name: 'Adamant',
      stats: { atk: 1.1, def: 1, spa: 0.9, spd: 1, spe: 1 }
    },
    Naughty: {
      name: 'Naughty',
      stats: { atk: 1.1, def: 1, spa: 1, spd: 0.9, spe: 1 }
    },
    Bold: {
      name: 'Bold',
      stats: { atk: 0.9, def: 1.1, spa: 1, spd: 1, spe: 1 }
    },
    Docile: {
      name: 'Docile',
      stats: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
    },
    Relaxed: {
      name: 'Relaxed',
      stats: { atk: 1, def: 1.1, spa: 1, spd: 1, spe: 0.9 }
    },
    Impish: {
      name: 'Impish',
      stats: { atk: 1, def: 1.1, spa: 0.9, spd: 1, spe: 1 }
    },
    Lax: {
      name: 'Lax',
      stats: { atk: 1, def: 1.1, spa: 0.9, spd: 1, spe: 1 }
    },
    Timid: {
      name: 'Timid',
      stats: { atk: 0.9, def: 1, spa: 1, spd: 1, spe: 1.1 }
    },
    Hasty: {
      name: 'Hasty',
      stats: { atk: 1, def: 0.9, spa: 1, spd: 1, spe: 1.1 }
    },
    Serious: {
      name: 'Serious',
      stats: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
    },
    Jolly: {
      name: 'Jolly',
      stats: { atk: 1, def: 1, spa: 0.9, spd: 1, spe: 1.1 }
    },
    Naive: {
      name: 'Naive',
      stats: { atk: 1, def: 1, spa: 1, spd: 0.9, spe: 1.1 }
    },
    Modest: {
      name: 'Modest',
      stats: { atk: 0.9, def: 1, spa: 1.1, spd: 1, spe: 1 }
    },
    Mild: {
      name: 'Mild',
      stats: { atk: 1, def: 0.9, spa: 1.1, spd: 1, spe: 1 }
    },
    Quiet: {
      name: 'Quiet',
      stats: { atk: 1, def: 1, spa: 1.1, spd: 1, spe: 0.9 }
    },
    Bashful: {
      name: 'Bashful',
      stats: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
    },
    Rash: {
      name: 'Rash',
      stats: { atk: 1, def: 1, spa: 1.1, spd: 0.9, spe: 1 }
    },
    Calm: {
      name: 'Calm',
      stats: { atk: 0.9, def: 1, spa: 1, spd: 1.1, spe: 1 }
    },
    Gentle: {
      name: 'Gentle',
      stats: { atk: 1, def: 0.9, spa: 1, spd: 1.1, spe: 1 }
    },
    Sassy: {
      name: 'Sassy',
      stats: { atk: 1, def: 1, spa: 1, spd: 1.1, spe: 0.9 }
    },
    Careful: {
      name: 'Careful',
      stats: { atk: 1, def: 1, spa: 0.9, spd: 1, spe: 1 }
    },
    Quirky: {
      name: 'Quirky',
      stats: { atk: 1, def: 1, spa: 1, spd: 1.1, spe: 1 }
    }
  }

  export function stats(nature: Natures) {
    return NATURES[nature].stats;
  }

  export function name(nature: Natures) {
    return NATURES[nature].name;
  }
}
