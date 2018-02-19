namespace PE {
  export enum Experience {
    Erratic = "Erratic",
    Fast = "Fast",
    MediumFast = "MediumFast",
    MediumSlow = "MediumSlow",
    Slow = "Slow",
    Fluctuating = "Fluctuating",
  }
}

namespace PE.Experience {
  export function getExpByLevel(rate: Experience, level: number) {
    switch (rate) {
      case Experience.Erratic:
        if (level < 50) {
          return Math.round(((level ** 3) * (100 - level)) / 50.0);
        } else if (level < 68) {
          return Math.round(((level ** 3) * (150 - level)) / 100.0);

        } else if (level < 98) {

          return Math.round((Math.floor(level ** 3) * ((1911 - 10.0 * level) / 3.0)) / 500.0);
        } else if (level <= SETTINGS.MAXIMUM_LEVEL) {
          return Math.round(((level ** 3) * (160 - level)) / 100.0);
        }
        break;
      case Experience.Fast:
        return Math.round((4.0 * (level ** 3)) / 5.0);
      case Experience.MediumFast:
        return level ** 3
      case Experience.MediumSlow:
        return Math.round((6.0 / 5.0) * (level ** 3) - 15.0 * (level ** 2) + 100.0 * level - 140);
      case Experience.Slow:
        return Math.round((5.0 * (level ** 3)) / 4.0);
      case Experience.Fluctuating:
        if (level < 15) return Math.round((level ** 3) * ((Math.floor((level + 1) / 3.0) + 24) / 50.0));
        else if (level < 36) return Math.round((level ** 3) * ((level + 14) / 50.0));
        else if (level <= SETTINGS.MAXIMUM_LEVEL) return Math.round((level ** 3) * ((Math.floor(level / 2.0) + 32) / 50.0));
        break;
    }
    return 0;
  }
}

