var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PE;
(function (PE) {
    var Weathers;
    (function (Weathers) {
        Weathers[Weathers["None"] = 0] = "None";
        Weathers[Weathers["SunnyDay"] = 1] = "SunnyDay";
        Weathers[Weathers["RainDance"] = 2] = "RainDance";
        Weathers[Weathers["SandStorm"] = 3] = "SandStorm";
        Weathers[Weathers["Hail"] = 4] = "Hail";
        Weathers[Weathers["HarshSun"] = 5] = "HarshSun";
        Weathers[Weathers["HeavyRain"] = 6] = "HeavyRain";
        Weathers[Weathers["StrongWinds"] = 7] = "StrongWinds";
        Weathers[Weathers["ShadowSky"] = 8] = "ShadowSky";
    })(Weathers = PE.Weathers || (PE.Weathers = {}));
    var PrimalWeathers;
    (function (PrimalWeathers) {
        PrimalWeathers[PrimalWeathers["HeavyRain"] = 6] = "HeavyRain";
        PrimalWeathers[PrimalWeathers["StrongWinds"] = 7] = "StrongWinds";
        PrimalWeathers[PrimalWeathers["ShadowSky"] = 8] = "ShadowSky";
    })(PrimalWeathers = PE.PrimalWeathers || (PE.PrimalWeathers = {}));
})(PE || (PE = {}));
(function (PE) {
    var Weathers;
    (function (Weathers) {
        var WeatherLayer = /** @class */ (function (_super) {
            __extends(WeatherLayer, _super);
            function WeatherLayer(weather) {
                if (weather === void 0) { weather = Weathers.None; }
                var _this = _super.call(this, new Bitmap(Graphics.width, Graphics.height)) || this;
                _this.weather = weather;
                _this.setWeather();
                return _this;
            }
            WeatherLayer.prototype.setWeather = function (weather) {
                if (weather === void 0) { weather = Weathers.None; }
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
            };
            return WeatherLayer;
        }(Sprite));
        Weathers.WeatherLayer = WeatherLayer;
    })(Weathers = PE.Weathers || (PE.Weathers = {}));
})(PE || (PE = {}));
