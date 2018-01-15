namespace PE {
  export enum Weathers {
    None = 0,
    SunnyDay = 1,
    RainDance = 2,
    SandStorm = 3,
    Hail = 4,
    HarshSun = 5,
    HeavyRain = 6,
    StrongWinds = 7,
    ShadowSky = 8
  }

  export enum PrimalWeathers {
    HeavyRain = 6,
    StrongWinds = 7,
    ShadowSky = 8
  }

}
namespace PE.Weathers {
  export class WeatherLayer extends Sprite {
    constructor(public weather = Weathers.None) {
      super(new Bitmap(Graphics.width, Graphics.height));
      this.setWeather();
    }

    setWeather(weather = Weathers.None) {
      this.weather = weather;
      this.bitmap.clear();
      switch (this.weather) {
        case Weathers.RainDance:
          this.bitmap.fillAll('rgba(0, 0, 0, 0.3)');
          break;
        case Weathers.HeavyRain:
          this.bitmap.fillAll('rgba(0, 0, 0, 0.5)');
          break;
        case Weathers.SunnyDay:
          this.bitmap.fillAll('rgba(155, 155, 100, 0.3)');
          break;
        case Weathers.HarshSun:
          this.bitmap.fillAll('rgba(255, 255, 100, 0.2)');
          break;
        case Weathers.Hail:
          this.bitmap.fillAll('rgba(255, 255, 255, 0.3)');
          break;
        case Weathers.SandStorm:
          this.bitmap.fillAll('rgba(165, 42, 42,0.2)');
          break;
        default:
          break;
      }
    }
  }
}
