namespace i18n {
  export function _(text: string, ...arg: any[]) {
    var params = Array.prototype.slice.call(arguments, 1);
    return text.format(...params);
  }
}
