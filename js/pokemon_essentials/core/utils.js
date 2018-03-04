var PE;
(function (PE) {
    var Utils;
    (function (Utils) {
        /**
       * Gets random propertie from an object,
       * Used to select items from the json databases files.
       * @param {any} obj
       */
        function getRandomPropertie(obj) {
            var keys = Object.keys(obj);
            var rand = Math.randomInt(keys.length);
            var index = keys[rand];
            return typeof (obj[index]) !== "function" ? obj[index] : getRandomPropertie(obj);
        }
        Utils.getRandomPropertie = getRandomPropertie;
        function getRandomFromEnum(obj) {
            var enumValues = Object.keys(obj).map(function (n) { return parseInt(n); }).filter(function (n) { return !isNaN(n); });
            var keys = Object.keys(obj);
            var rand = Math.randomInt(enumValues.length);
            var index = keys[rand];
            return obj[index];
        }
        Utils.getRandomFromEnum = getRandomFromEnum;
        function capitalize(msg) {
            return msg[0].toUpperCase() + msg.substr(1);
        }
        Utils.capitalize = capitalize;
        function chance(chance) {
            return Math.randomInt(100) < chance;
        }
        Utils.chance = chance;
        function range(range) {
            return Array.apply(null, Array(range)).map(function (_, i) { return i; });
        }
        Utils.range = range;
    })(Utils = PE.Utils || (PE.Utils = {}));
})(PE || (PE = {}));
