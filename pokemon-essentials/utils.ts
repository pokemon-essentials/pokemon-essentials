namespace PE.Utils {
  /**
   * Gets random propertie from an object,
   * Used to select items from the json databases files.
   * @param {any} obj
   */
  export function getRandomPropertie(obj: any) {
    let keys = Object.keys(obj);
    let rand = Math.randomInt(keys.length);
    let index = keys[rand];
    return typeof obj[index] !== 'function' ? obj[index] : getRandomPropertie(obj);
  }

  export function getRandomFromEnum(obj) {
    const enumValues = Object.keys(obj)
      .map(n => parseInt(n))
      .filter(n => !isNaN(n));
    let keys = Object.keys(obj);
    let rand = Math.randomInt(enumValues.length);
    let index = keys[rand];
    return obj[index];
  }

  export function capitalize(msg: string) {
    return msg[0].toUpperCase() + msg.substr(1);
  }

  export function chance(chance: number) {
    return Math.randomInt(100) < chance;
  }

  export function range(range) {
    return Array.apply(null, Array(range)).map(function(_, i) {
      return i;
    });
  }

  export function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
