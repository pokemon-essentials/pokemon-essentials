const i18n = {
  /**
   * Locale text to the defined language
   * @param text Text to locale.
   * @param arg aditional variables to replace in the given string.
   */
  _(text: string, ...arg: any[]) {
    var params = Array.prototype.slice.call(arguments, 1);
    return text.format(...params);
  }
};
