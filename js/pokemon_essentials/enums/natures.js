const Natures = {
  /** Neutral */
  Hardy: 'Hardy',
  /** +Atk / -Def */
  Lonely: 'Lonely',
  /** +Atk / -Spe */
  Brave: 'Brave',
  /** +Atk / -SpA */
  Adamant: 'Adamant',
  /** +Atk / -SpD */
  Naughty: 'Naughty',
  /** +Def / -Atk */
  Bold: 'Bold',
  /** Neutral */
  Docile: 'Docile',
  /** +Def / -Spe */
  Relaxed: 'Relaxed',
  /** +Def / SpA */
  Impish: 'Impish',
  /** +Def / SpD */
  Lax: 'Lax',
  /** +Spe / -Atk */
  Timid: 'Timid',
  /** +Spe / -Def */
  Hasty: 'Hasty',
  /** Neutral */
  Serious: 'Serious',
  /** +Spe / -SpA */
  Jolly: 'Jolly',
  /** +Spe / -SpD */
  Naive: 'Naive',
  /** +SpA / -Atk */
  Modest: 'Modest',
  /** +SpA / -Def */
  Mild: 'Mild',
  /** +SpA / -Spe */
  Quiet: 'Quiet',
  /** Neutral */
  Bashful: 'Bashful',
  /** +SpA / -SpD */
  Rash: 'Rash',
  /** +SpD / -Atk */
  Calm: 'Calm',
  /** +SpD / -Def */
  Gentle: 'Gentle',
  /** +SpD / -Spe */
  Sassy: 'Sassy',
  /** +SpD / - SpA */
  Careful: 'Careful',
  /** Neutral */
  Quirky: 'Quirky'
};

function GetNatureStats(nature) {
  switch (nature) {
    case Natures.Hardy:
      return {atk: 1, def: 1, spa: 1, spd: 1, spe: 1};
    case Natures.Lonely:
      return {atk: 1.1, def: 0.9, spa: 1, spd: 1, spe: 1};
    case Natures.Brave:
      return {atk: 1.1, def: 1, spa: 1, spd: 1, spe: 0.9};
    case Natures.Adamant:
      return {atk: 1.1, def: 1, spa: 0.9, spd: 1, spe: 1};
    case Natures.Naughty:
      return {atk: 1.1, def: 1, spa: 1, spd: 0.9, spe: 1};
    case Natures.Bold:
      return {atk: 0.9, def: 1.1, spa: 1, spd: 1, spe: 1};
    case Natures.Docile:
      return {atk: 1, def: 1, spa: 1, spd: 1, spe: 1};
    case Natures.Relaxed:
      return {atk: 1, def: 1.1, spa: 1, spd: 1, spe: 0.9};
    case Natures.Impish:
      return {atk: 1, def: 1.1, spa: 0.9, spd: 1, spe: 1};
    case Natures.Lax:
      return {atk: 1, def: 1.1, spa: 0.9, spd: 1, spe: 1};
    case Natures.Timid:
      return {atk: 0.9, def: 1, spa: 1, spd: 1, spe: 1.1};
    case Natures.Hasty:
      return {atk: 1, def: 0.9, spa: 1, spd: 1, spe: 1.1};
    case Natures.Serious:
      return {atk: 1, def: 1, spa: 1, spd: 1, spe: 1};
    case Natures.Jolly:
      return {atk: 1, def: 1, spa: 0.9, spd: 1, spe: 1.1};
    case Natures.Naive:
      return {atk: 1, def: 1, spa: 1, spd: 0.9, spe: 1.1};
    case Natures.Modest:
      return {atk: 0.9, def: 1, spa: 1.1, spd: 1, spe: 1};
    case Natures.Mild:
      return {atk: 1, def: 0.9, spa: 1.1, spd: 1, spe: 1};
    case Natures.Quiet:
      return {atk: 1, def: 1, spa: 1.1, spd: 1, spe: 0.9};
    case Natures.Bashful:
      return {atk: 1, def: 1, spa: 1, spd: 1, spe: 1};
    case Natures.Rash:
      return {atk: 1, def: 1, spa: 1.1, spd: 0.9, spe: 1};
    case Natures.Calm:
      return {atk: 0.9, def: 1, spa: 1, spd: 1.1, spe: 1};
    case Natures.Gentle:
      return {atk: 1, def: 0.9, spa: 1, spd: 1.1, spe: 1};
    case Natures.Sassy:
      return {atk: 1, def: 1, spa: 1, spd: 1.1, spe: 0.9};
    case Natures.Careful:
      return {atk: 1, def: 1, spa: 0.9, spd: 1, spe: 1};
    case Natures.Quirky:
      return {atk: 1, def: 1, spa: 1, spd: 1.1, spe: 1};
  }
}

